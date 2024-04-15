import { DragEvent, useState } from "react";
import { useSubmit } from "react-router-dom";
import { Intents, Item } from "~/api";

type DropAreaProps = {
  // onDropToDropArea: (
  //   e: DragEvent<HTMLDivElement>,
  //   targetColumnId: string,
  //   targetIndex: number
  // ) => void;

  targetColumnId: string;
  targetIndex: number;
  previousOrder: number;
  nextOrder: number;
  items: Item[];
};

const DropArea = ({
  targetColumnId,
  // targetIndex,
  previousOrder,
  nextOrder,
  items,
}: DropAreaProps) => {
  const [visible, setVisible] = useState(false);
  const showArea = () => {
    setVisible(true);
  };
  const hideArea = () => {
    setVisible(false);
  };

  const submit = useSubmit();

  const onDropAreaDrop = (
    e: DragEvent<HTMLDivElement>,
    prevOrder: number,
    nextOrder: number
  ) => {
    const transferredItem = JSON.parse(e.dataTransfer.getData("item")) as Item;

    const moveOrder =
      prevOrder === 0 && items.length === 0
        ? nextOrder
        : (prevOrder + nextOrder) / 2;

    const mutatedItem: Item = {
      order: moveOrder,
      columnId: targetColumnId,
      title: transferredItem.title,
      id: transferredItem.id,
    };

    submit(
      {
        ...mutatedItem,
        intent: Intents.moveCard,
      },
      {
        navigate: false,
        method: "POST",
      }
    );
    console.log("moveOrder ==>", { moveOrder, prevOrder, nextOrder });
  };

  return (
    <div
      className={`border-2 border-dashed border-gray-600  h-2 ${
        visible ? "opacity-100 py-5" : "opacity-0"
      }`}
      onDragEnter={showArea}
      onDragLeave={hideArea}
      onDrop={(e) => {
        onDropAreaDrop(e, previousOrder, nextOrder);
        setVisible(false);
      }}
    />
  );
};

export default DropArea;
