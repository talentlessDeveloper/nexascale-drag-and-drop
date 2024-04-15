import { ReactNode, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFetcher } from "react-router-dom";
import { flushSync } from "react-dom";

type EditColumnFormProps = {
  id?: string;
  value: string;
  children: ReactNode;
  fieldName: string;
};

const EditColumnForm = ({
  value,
  fieldName,
  children,
}: EditColumnFormProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher();

  if (fetcher.formData?.has(fieldName)) {
    value = String(fetcher.formData.get(fieldName));
    console.log("fetcher", value);
  }

  return (
    <>
      {edit ? (
        <fetcher.Form
          method="post"
          onSubmit={() => {
            flushSync(() => {
              setEdit(false);
            });
          }}
        >
          {children}
          <Input
            name={fieldName}
            defaultValue={value}
            ref={inputRef}
            onBlur={(e) => {
              if (
                inputRef.current?.value !== value &&
                inputRef.current?.value.trim() !== ""
              ) {
                fetcher.submit(
                  e.currentTarget.parentElement as HTMLFormElement
                );
              }
              setEdit(false);
              console.log(e.currentTarget.parentElement);
            }}
            autoFocus
          />
        </fetcher.Form>
      ) : (
        <Button
          variant={"ghost"}
          onClick={() => setEdit(true)}
          className="flex justify-start"
        >
          {" "}
          <h3 className="mb-3 capitalize font-bold">{value}</h3>
        </Button>
      )}
    </>
  );
};

export default EditColumnForm;
