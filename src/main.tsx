import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { ThemeProvider } from "./context/theme-context.tsx";
import "./index.css";
import { routes } from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>
);
