import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Pagina4 = () => {
  const [sesiones, setSesiones] = useState([
    { id: 1, nombre: 'Sesión 1', fecha: '2023-06-01' },
    { id: 2, nombre: 'Sesión 2', fecha: '2023-06-02' },
    { id: 3, nombre: 'Sesión 3', fecha: '2023-06-03' },
    { id: 4, nombre: 'Sesión 4', fecha: '2023-06-04' },
    { id: 5, nombre: 'Sesión 5', fecha: '2023-06-05' },
  ]);
  const [selectedSessions, setSelectedSessions] = useState([]);

  const buscarSesiones = () => {
    const idBusqueda = document.getElementById('id').value;
    const fechaBusqueda = document.getElementById('fecha').value;

    const sesionesEncontradas = sesiones.filter((sesion) => {
      const coincideID = idBusqueda && sesion.id.toString() === idBusqueda;
      const coincideFecha = fechaBusqueda && sesion.fecha === fechaBusqueda;
      return coincideID || coincideFecha;
    });

    setSelectedSessions((prevSessions) => [...prevSessions, ...sesionesEncontradas]);
  };

  return (
    <div className="container">
      <h1>Buscar Sesión</h1>
      <div className="form-container">
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" placeholder="Ingresa el ID" />
        <label htmlFor="fecha">Fecha:</label>
        <input type="date" id="fecha" />
      </div>
      <div className="buttons">
        <button onClick={buscarSesiones} className="button">
          Buscar
        </button>
      </div>
      <div className="sessions-container">
        <h2>Sesiones Encontradas</h2>
        {selectedSessions.length > 0 ? (
          selectedSessions.map((session) => (
            <div className="session" key={session.id}>
              <h3>ID: {session.id}</h3>
              <p>Nombre: {session.nombre}</p>
              <p>Fecha: {session.fecha}</p>
            </div>
          ))
        ) : (
          <p className="no-sessions">No se encontraron sesiones</p>
        )}
      </div>
      <div className="sessions-container">
        <h2>Todas las Sesiones</h2>
        {sesiones.length > 0 ? (
          <div className="sessions-box">
            {sesiones.map((sesion) => (
              <div className="session" key={sesion.id}>
                <h3>ID: {sesion.id}</h3>
                <p>Nombre: {sesion.nombre}</p>
                <p>Fecha: {sesion.fecha}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-sessions">No se encontraron sesiones</p>
        )}
      </div>
      <div className="container">
        <div className="buttons">
          <Link to="/" className="button">
            Inicio
          </Link>
          <Link to="/pagina2" className="button">
            Ver Sesiones Pasadas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagina4;
