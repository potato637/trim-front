import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { UrlContextProvider } from "./context/url_context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UrlContextProvider>
      <RouterProvider router={router} />
    </UrlContextProvider>
  </React.StrictMode>
);
