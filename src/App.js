import logo from './logo.svg';
import './App.css';
import React, {Fragment, useState} from 'react';

function App() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState(0);

  function Agregar(){
    console.log('nombre: ', nombre)
  }
  
  function Modificar(){
    console.log('Modificar')
  }
  
  function Eliminar(){
    console.log('Eliminar')
  }

  return (
    <Fragment>
      <div>
        <label>Nombre</label>
        <input type='text' placeholder="Nombre" onChange={(e) => {setNombre(e.target.value)}}/>
        <label>Email</label>
        <input type='text' placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
        <label>Telefono</label>
        <input type='number' placeholder="Telefono" onChange={(e) => {setTelefono(e.target.value)}} />
      </div>
      <div>
        <button onClick={Agregar} >Agregar</button>
        <button onClick={Modificar} >Modificar</button>
        <button onClick={Eliminar} >Eliminar</button>
      </div>
    </Fragment>
  );
}

export default App;
