import {
  ActionFunctionArgs,
  useFetchers,
  useLoaderData,
} from "react-router-dom";
import {
  Intents,
  createCard,
  createColumn,
  getColumns,
  getTasks,
  updateCard,
  updateColumn,
  type ColumnT,
  type Item,
} from "./api";
import Column from "./components/column";
import CreateColumnForm from "./components/create-column-form";
import { badRequest } from "./lib/utils";
import { useRef } from "react";

export const loader = async () => {
  const items = await getTasks();
  const columns = await getColumns();

  return {
    items,
    columns,
  };
};

export const actions = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (!intent) throw badRequest("Intent Missing");
  switch (intent) {
    case Intents.createColumn: {
      const { id, name } = Object.fromEntries(formData);
      await createColumn({ id: String(id), name: String(name) });
      break;
    }
    case Intents.createCard:
      {
        const {
          title,
          order,
          columnId,
          id: cardId,
        } = Object.fromEntries(formData);

        await createCard({
          title: String(title),
          order: +String(order),
          columnId: String(columnId),
          id: String(cardId),
        });
      }
      break;
    case Intents.updateColumn:
      await updateColumn({
        id: String(formData.get("id")),
        name: String(formData.get("name")),
      });
      break;
    case Intents.moveCard: {
      const cardData = Object.fromEntries(formData);

      await updateCard({
        order: +String(cardData.order),
        columnId: String(cardData.columnId),
        id: String(cardData.id),
        title: String(cardData.title),
      });
      break;
    }
    default: {
      throw badRequest("Unknown Intent");
    }
  }
  return { ok: true };
};

function App() {
  const { items, columns } = useLoaderData() as {
    items: Item[];
    columns: ColumnT[];
  };

  const overflowRef = useRef<HTMLDivElement>(null);

  const pendingColumns = usePendingColumns();
  const pendingItems = usePendingItems();

  const itemsById = new Map(
    [...items, ...pendingItems].map((item) => [item.id, item])
  );
  const columnsById = new Map<string, ColumnT & { items: Item[] }>(
    [...columns, ...pendingColumns].map((c) => [c.id, { ...c, items: [] }])
  );

  for (const item of itemsById.values()) {
    const columnId = item.columnId;
    const column = columnsById.get(columnId);
    if (!column) {
      console.log("Missing Column", {
        byId: columnsById,
        id: columnId,
      });
      return;
    }
    column.items.push(item);
  }

  const mergedColumns = [...columnsById.values()];

  return (
    <div className="">
      <main>
        <h1 className="text-center text-3xl font-semibold my-8">
          Drag And Drop
        </h1>
        <div
          className="container mx-auto pt-10  overflow-scroll pb-10"
          ref={overflowRef}
        >
          <div className="flex items-start  h-full gap-4 ">
            {columns.length > 0 ? (
              mergedColumns.map((col) => {
                return (
                  <Column
                    name={col.name}
                    key={col.id}
                    id={col.id}
                    items={col.items}
                  />
                );
              })
            ) : (
              <div className="text-center">No available Task</div>
            )}
            <CreateColumnForm overflowRef={overflowRef} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

const usePendingColumns = () => {
  type CreateColumnFetcher = ReturnType<typeof useFetchers>[number] & {
    formData: FormData;
  };
  const fetchers = useFetchers();
  return fetchers
    .filter(
      (f): f is CreateColumnFetcher =>
        f.formData?.get("intent") === Intents.createColumn
    )
    .map((fetcher) => {
      const name = String(fetcher.formData.get("name"));
      const id = String(fetcher.formData.get("id"));

      return { name, id };
    });
};

const usePendingItems = () => {
  type CreateItemFetcher = ReturnType<typeof useFetchers>[number] & {
    formData: FormData;
  };
  const fetchers = useFetchers();

  return fetchers
    .filter((fetcher): fetcher is CreateItemFetcher => {
      const intent = fetcher.formData?.get("intent");
      return intent === Intents.createCard || intent === Intents.moveCard;
    })
    .map((fetcher) => {
      const { id, title, columnId, order } = Object.fromEntries(
        fetcher.formData
      );
      return {
        id: String(id),
        title: String(title),
        columnId: String(columnId),
        order: +String(order),
      };
    });
};
