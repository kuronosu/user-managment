import "./App.css";
import React, { useEffect, useState } from "react";
import { observeUsers } from "./firestore";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./routes/Home";
import Root from "./routes/root";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  return (
    <div>
      <label>Nombre</label>
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Telefono</label>
      <input
        type="number"
        placeholder="Telefono"
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
