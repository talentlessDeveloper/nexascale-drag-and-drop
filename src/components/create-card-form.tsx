import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Form, useSubmit } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Item } from "~/api";

type CreateCardFormProps = {
  columnId: string;
  items: Item[];
};

const CreateCardForm = ({ columnId, items }: CreateCardFormProps) => {
  const [showCardColumnForm, setShowCardColumnForm] = useState<string | null>(
    null
  );

  const [cardTitle, setCardTitle] = useState("");
  const submit = useSubmit();

  return (
    <>
      {showCardColumnForm === columnId ? (
        <Form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!cardTitle) {
              return;
            }
            const formData = new FormData(e.currentTarget);
            formData.set("id", crypto.randomUUID());

            const prevTask = items[items.length - 1];
            formData.set(
              "order",
              String(items.length > 0 ? prevTask.order + 1 : 1)
            );

            submit(formData, {
              method: "POST",
              navigate: false,
              unstable_flushSync: true,
            });

            // dispatch({ type: "CREATE_CARD", payload: task });
            setCardTitle("");
          }}
        >
          <input type="hidden" name="intent" value="create-card" />
          <input type="hidden" name="columnId" value={columnId} />
          <label htmlFor="title" className="sr-only">
            create Card
          </label>
          <Input
            required
            id="title"
            name="title"
            className="w-full bg-primary-foreground"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Button>Save Card</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowCardColumnForm("")}
            >
              <XIcon />
            </Button>
          </div>
        </Form>
      ) : (
        <Button
          variant={"ghost"}
          className="flex gap-4 justify-start px-1  w-full items-center"
          onClick={() => setShowCardColumnForm(columnId)}
        >
          {" "}
          <span>
            <PlusIcon />
          </span>{" "}
          <span className="">Add Card</span>
        </Button>
      )}
    </>
  );
};

export default CreateCardForm;
