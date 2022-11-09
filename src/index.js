import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BookProvider from "./frontEnd/context/Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BookProvider>
    <App />
  </BookProvider>
);
