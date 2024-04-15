import { PlusIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

type CreateColumnFormProps = {
  overflowRef: React.RefObject<HTMLDivElement>;
};

const CreateColumnForm = ({ overflowRef }: CreateColumnFormProps) => {
  const [showColumnForm, setShowColumnForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher();

  const { toast } = useToast();

  const scrollRight = () => {
    if (!overflowRef.current) return;
    const scrollWidth = overflowRef.current.scrollWidth;

    overflowRef.current.scrollLeft = scrollWidth;
  };

  return (
    <>
      {showColumnForm ? (
        <fetcher.Form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("yayaya");
            if (!inputRef.current?.value) {
              toast({
                title: "No Empty Field",
                description: "Column Name cannot be empty",
              });
              return;
            }
            const formData = new FormData(e.currentTarget);
            formData.set("id", crypto.randomUUID());
            fetcher.submit(formData, {
              method: "POST",
              navigate: false,
            });
            scrollRight();
            setShowColumnForm(false);
            inputRef.current.value = "";
          }}
        >
          <label htmlFor="column-name" className="sr-only">
            Column{" "}
          </label>
          <input type="hidden" name="intent" value="create-column" />
          <Input
            name="name"
            id="name"
            placeholder="Enter Column Name"
            ref={inputRef}
            autoFocus
          />
          <div className="flex justify-between">
            <Button>Create Column</Button>
            <Button onClick={() => setShowColumnForm(false)}>
              <XIcon />
            </Button>
          </div>
        </fetcher.Form>
      ) : (
        <Button onClick={() => setShowColumnForm(true)}>
          <PlusIcon />
        </Button>
      )}
    </>
  );
};

export default CreateColumnForm;
