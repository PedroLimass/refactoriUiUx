import React from "react";
import ReactDOM from "react-dom";
import ListaDeUsuarios from "./ListaDeUsuarios";
import { Header } from "./Components/Header";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <ListaDeUsuarios />
  </React.StrictMode>,
  document.getElementById("root")
);
