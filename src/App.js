import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { createUser, observeUsers } from "./firestore";
import UserList from "./Components/UserList";
import UserForm from "./Components/UserForm";
import { MdAdd } from "react-icons/md";

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

function App() {
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState("list");

  useEffect(() => observeUsers((users) => setUsers(users)), []);
  return (
    <div className="w-full h-full bg-[#121212] grid place-items-center">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-4/6 h-2/4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl">Manage Users</h1>
          <MdAdd
            size={34}
            className="hover:rotate-45 duration-150 p-1 m-1 cursor-pointer"
            onClick={() => setMode("create")}
          />
        </div>
        <UserList
          users={users}
          onEdit={() => console.log("Edit")}
          onDelete={() => console.log("Delete")}
        />
      </div>
      {/* <UserForm /> */}
    </div>
  );
}

export default App;
