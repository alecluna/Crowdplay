import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BrowserRouter from "../node_modules/react-router-dom/BrowserRouter";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
