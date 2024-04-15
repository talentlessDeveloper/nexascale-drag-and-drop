import { Fragment } from "react";

import EditColumnForm from "./edit-column-form";
import { Item } from "~/api";
import DropArea from "./drop-area";
import TaskCard from "./task-card";
import CreateCardForm from "./create-card-form";

type ColumnProps = {
  name: string;
  id: string;
  items: Item[];
};

const Column = ({ name, id, items }: ColumnProps) => {
  // const onDropToDropArea = (
  //   e: DragEvent<HTMLDivElement>,
  //   targetColumnId: string,
  //   targetIndex: number
  // ) => {
  //   const stringifiedTask = e.dataTransfer.getData("task");
  //   let draggedTask = JSON.parse(stringifiedTask) as Item | null;
  //   if (!draggedTask) {
  //     return;
  //   }

  //   // remove dragged tasks from tasks array
  //   const tasksWithoutDragged = [...items].filter(
  //     (t) => t.id !== draggedTask?.id
  //   );

  //   // change draggedTask status
  //   draggedTask = {
  //     ...draggedTask,
  //     columnId: targetColumnId,
  //   };

  //   // get tasks where status === targetColumnId alone

  //   const tasksIntargetColumnId = tasksWithoutDragged.filter(
  //     (t) => t.columnId === targetColumnId
  //   );

  //   tasksIntargetColumnId.splice(targetIndex, 0, draggedTask);
  //   const taskWithouttargetColumnId = tasksWithoutDragged.filter(
  //     (t) => t.columnId !== targetColumnId
  //   );

  //   const newTasks = [...taskWithouttargetColumnId, ...tasksIntargetColumnId];
  //   console.log(newTasks);
  //   //    dispatch({ type: "SET_TASKS", payload: newTasks });

  //   // console.log({
  //   //   wifhoutDragged: tasksWithoutDragged,
  //   //   withoutStatus: taskWithouttargetColumnId,
  //   // });

  //   // console.log(targetIndex);

  //   // console.log(tasksIntargetColumnId);
  //   // console.log(draggedTask.status, "status to be" + targetColumnId);
  // };

  return (
    <div
      className="w-80  flex-shrink-0 flex flex-col gap-[2px]  p-5 rounded-xl bg-primary-foreground shadow-md"
      onDragOver={(e) => e.preventDefault()}
    >
      <EditColumnForm fieldName="name" value={name}>
        <input type="hidden" name="intent" value="update-column" />
        <input type="hidden" name="id" value={id} />
      </EditColumnForm>
      <DropArea
        items={items}
        targetColumnId={id}
        targetIndex={0}
        previousOrder={0}
        nextOrder={items[0] ? items[0].order : 1}
      />
      {items.length > 0
        ? items
            .sort((a, b) => a.order - b.order)
            .map((item, index, items) => {
              const areaIndex = index + 1;
              return (
                <Fragment key={item.id}>
                  <>
                    <TaskCard item={item} />
                    <DropArea
                      items={items}
                      targetColumnId={id}
                      targetIndex={index + 1}
                      previousOrder={
                        items[areaIndex - 1] ? items[areaIndex - 1].order : 0
                      }
                      nextOrder={
                        items[areaIndex]
                          ? items[areaIndex].order
                          : item.order + 1
                      }
                    />
                  </>
                </Fragment>
              );
            })
        : null}

      <CreateCardForm items={items} columnId={id} />
    </div>
  );
};

export default Column;
