import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AppActions } from "~/reducer";

type CreateColumnFormProps = {
  dispatch: React.Dispatch<AppActions>;
};

const CreateColumnForm = ({ dispatch }: CreateColumnFormProps) => {
  const [showColumnForm, setShowColumnForm] = useState(false);

  const [columnTitle, setColumnTitle] = useState("");
  return (
    <>
      {showColumnForm ? (
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "CREATE_COLUMN", payload: columnTitle });
            setColumnTitle("");
            setShowColumnForm(false);
          }}
        >
          <label htmlFor="column-name" className="sr-only">
            Column{" "}
          </label>
          <Input
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
          <div className="flex justify-between">
            <Button>Create Column</Button>
            <Button onClick={() => setShowColumnForm(false)}>
              <XIcon />
            </Button>
          </div>
        </form>
      ) : (
        <Button onClick={() => setShowColumnForm(true)}>
          <PlusIcon />
        </Button>
      )}
    </>
  );
};

export default CreateColumnForm;
