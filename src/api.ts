export type ColumnT = {
  name: string;
  id: string;
};
export const Intents = {
  createCard: "create-card" as const,
  updateCard: "update-card" as const,
  deleteCard: "delete-card" as const,
  updateColumn: "update-column" as const,
  createColumn: "create-column" as const,
  moveCard: "move-card" as const,
};
export type Item = {
  title: string;
  columnId: string;
  id: string;
  order: number;
};

export const getTasks = async (): Promise<Item[]> => {
  try {
    const res = await fetch("/tasks");
    if (res.ok) {
      const data = await res.json();
      // Check if data is truthy
      if (data?.length > 0) {
        return data as Item[];
      } else {
        return [];
      }
    } else {
      throw new Response("Cannot Get Tasks, Please try again later");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message);
    } else {
      throw new Response("Unknown error occurred while fetching tasks");
    }
  }
};

export const getColumns = async () => {
  try {
    const res = await fetch("/columns");
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        return data as ColumnT[];
      }
      return [];
    }
    throw new Response("Cannot Get Columns, Please try again later");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message);
    } else {
      throw new Response("Unknown error occurred while fetching tasks");
    }
  }
};

export const createColumn = async (
  data: ColumnT
): Promise<{ message: string }> => {
  try {
    const res = await fetch("/columns", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return {
        message: "success",
      };
    } else {
      console.error("else rubbish");
      throw new Response("Cannot Post");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("catch rubbish error");
      throw new Response(error.message);
    } else {
      console.error("catch else rubbish");
      throw new Response("Unknown error occurred while creating column");
    }
  }
};

export const createCard = async (data: Item): Promise<{ message: string }> => {
  try {
    const res = await fetch("/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return {
        message: "success",
      };
    } else {
      throw new Response("Cannot Post");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message);
    } else {
      throw new Response("Unknown error occurred while creating column");
    }
  }
};
export const updateCard = async (data: Item): Promise<{ message: string }> => {
  try {
    const res = await fetch(`/tasks/${data.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return {
        message: "success",
      };
    } else {
      throw new Response("Cannot Post");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message);
    } else {
      throw new Response("Unknown error occurred while updating task");
    }
  }
};

export const updateColumn = async (
  data: ColumnT
): Promise<{ message: string }> => {
  try {
    const res = await fetch(`/columns/${data.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: data.name }),
    });

    if (res.ok) {
      return {
        message: "success",
      };
    } else {
      console.error("else rubbish");
      throw new Response("Cannot Post");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("catch rubbish error");
      throw new Response(error.message);
    } else {
      console.error("catch else rubbish");
      throw new Response("Unknown error occurred while creating column");
    }
  }
};
