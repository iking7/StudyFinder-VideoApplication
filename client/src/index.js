// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code

import React from 'react';
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { v4 as uuid } from "uuid";

const rootElement = document.getElementById("root");
let url = "/room/" + uuid()
if (window.location.pathname === '/') {
    var call = true
} else {
    var call = false
}

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={url} />} />
        <Route path="/room/:roomID" element={<App call={call}/>} />
      </Routes>
    </BrowserRouter>,
  rootElement
);