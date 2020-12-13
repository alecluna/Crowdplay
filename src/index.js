import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BrowserRouter from "../node_modules/react-router-dom/BrowserRouter";
import { StoreProvider } from "./store";

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);
