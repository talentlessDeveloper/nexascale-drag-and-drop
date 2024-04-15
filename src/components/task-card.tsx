import { Item } from "~/api";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";

type TaskCardProps = {
  item: Item;
};
const TaskCard = ({ item }: TaskCardProps) => {
  return (
    <div
      className="bg-secondary px-2 py-3 shadow-md rounded-xl flex justify-between hover:cursor-grabbing"
      key={item.id}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("item", JSON.stringify(item));
      }}
    >
      <h3>{item.title}</h3>
      <Button variant={"ghost"}>
        <Trash2Icon size={16} className="hover:text-red-500" />
      </Button>
    </div>
  );
};

export default TaskCard;
