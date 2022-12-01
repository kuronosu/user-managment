import logo from "./logo.svg";
import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { createUser, getUsers } from "./firestore";

function App() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  function Modificar() {
    console.log("Modificar");
  }

  function Eliminar() {
    console.log("Eliminar");
  }

  function Modificar() {
    console.log("Modificar");
  }

  function Eliminar() {
    console.log("Eliminar");
  }

  return (
    <Fragment>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Telefono</label>
        <input
          type="number"
          placeholder="Telefono"
          onChange={(e) => {
            setTelefono(e.target.value);
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            createUser({ nombre, email, telefono }).then(() => {
              setUsers((prev) => [...prev, { nombre, email, telefono }]);
            });
          }}
        >
          Agregar
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <button onClick={Modificar}>Modificar</button>
            <button onClick={Eliminar}>Eliminar</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;
