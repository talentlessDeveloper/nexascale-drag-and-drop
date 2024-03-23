import { useReducer } from "react";
import CreateColumnForm from "./components/create-column-form";
import { ModeToggle } from "./components/mode-toggle";
import { initialState, reducer } from "./reducer";
import { Button } from "./components/ui/button";
import { PlusIcon } from "lucide-react";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="">
      <header>
        <nav className="container mx-auto flex justify-between items-center py-5 shadow-md">
          <a href="/" className="text-2xl">
            NexaScale
          </a>

          <ModeToggle />
        </nav>
      </header>
      <main>
        <h1 className="text-center text-3xl font-semibold my-8">
          Drag And Drop
        </h1>
        <div className="container mx-auto pt-10  overflow-scroll pb-10">
          <div className="flex items-start  h-full gap-4 ">
            {state.columns.length > 0
              ? state.columns.map((column) => {
                  return (
                    <div
                      key={column}
                      className="w-80  flex-shrink-0 flex flex-col gap-[2px]  p-5 rounded-xl bg-primary-foreground shadow-md"
                    >
                      <h3>{column}</h3>
                      <Button
                        variant={"ghost"}
                        className="flex gap-4 justify-start px-1  w-full items-center"
                      >
                        {" "}
                        <span>
                          <PlusIcon />
                        </span>{" "}
                        <span className="">Add Card</span>
                      </Button>
                    </div>
                  );
                })
              : null}
            <CreateColumnForm dispatch={dispatch} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
