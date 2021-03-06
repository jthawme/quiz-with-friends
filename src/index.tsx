import React from "react";
import ReactDOM from "react-dom";

import { Router } from "@reach/router";

import "normalize.css";
import "./styles/global.scss";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Create } from "./pages/Create";
import { Game } from "./pages/Game";
import { Play } from "./pages/Play";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Create path="/create" />
        <Game path="/game/:roomCode" />
        <Play path="/play/:roomCode" />
      </Router>
    </Layout>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
