import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import App, { loader as appLoader, actions as appAction } from "~/App";
import ErrorPage from "./error-page";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <App />,
            loader: appLoader,
            action: appAction,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
