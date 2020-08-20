import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { StudentProvider } from "./../src/context/StudentContext";
// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

// Now we can render our application into it
ReactDOM.render(
  <StudentProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </StudentProvider>,
  document.getElementById("root")
);
