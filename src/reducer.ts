export const initialState: AppState = {
  columns: [],
};

type AppState = {
  columns: string[];
};

type CreateColumn = {
  type: "CREATE_COLUMN";
  payload: string;
};

export type AppActions = CreateColumn;

export const reducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case "CREATE_COLUMN":
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };

    default: {
      return state;
    }
  }
};
