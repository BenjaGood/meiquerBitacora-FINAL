import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const getCognitivoData = async () => {
  // Datos falsos de prueba
  const pensOrdenAltoAverage = 4.2;
  const pensMinRequeridoAverage = 3.8;
  const pensNoRelacionadoAverage = 2.5;
  const pensDesconocidosAverage = 4.0;

  const chartData = {
    labels: ['Pensamiento de orden alto', 'Pensamiento mínimo requerido', 'Pensamientos no relacionados', 'Pensamientos desconocidos'],
    datasets: [
      {
        label: 'Promedio',
        data: [pensOrdenAltoAverage, pensMinRequeridoAverage, pensNoRelacionadoAverage, pensDesconocidosAverage],
        backgroundColor: '#36b4c4',
      },
    ],
  };

  return chartData;
};

const getInteraccionesData = async () => {
  // Datos falsos de prueba
  const conCompanerosAverage = 4.8;
  const conImplementadoresAverage = 3.5;
  const disenadoresContenidoAverage = 4.2;

  const chartData = {
    labels: ['Con compañeros', 'Con implementadores', 'Con diseñadores de contenido'],
    datasets: [
      {
        label: 'Promedio',
        data: [conCompanerosAverage, conImplementadoresAverage, disenadoresContenidoAverage],
        backgroundColor: '#36b4c4',
      },
    ],
  };

  return chartData;
};

const getNivelDeInteres = async () => {
  // Datos falsos de prueba
  const pensandoProcesoAprendizajeAverage = 4.5;
  const solucionadorProblemasAverage = 3.2;
  const ideasAverage = 4.0;
  const usoHerramientasAverage = 3.8;
  const procedimientoAverage = 4.1;
  const recordarCiertaInfoAverage = 3.6;

  const chartData = {
    labels: ['Pensando en el aprendizaje', 'Solucionador de problemas', 'Ideas', 'Uso de herramientas', 'Procedimiento (seguir pasos)', 'Recordar cierta información'],
    datasets: [
      {
        label: 'Promedio',
        data: [pensandoProcesoAprendizajeAverage, solucionadorProblemasAverage, ideasAverage, usoHerramientasAverage, procedimientoAverage, recordarCiertaInfoAverage],
        backgroundColor: '#36b4c4',
      },
    ],
  };

  return chartData;
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const Pagina3 = () => {
  const chartRefA = useRef(null); // Cognitivo
  const chartRefB = useRef(null); // Interacciones
  const chartRefC = useRef(null); // Nivel de interés

  useEffect(() => {
    getCognitivoData()
      .then(data => {
        if (chartRefA.current) {
          const context = chartRefA.current.getContext('2d');
          new Chart(context, {
            type: 'bar',
            data: data,
            options: options,
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    getInteraccionesData()
      .then(data => {
        if (chartRefB.current) {
          const context = chartRefB.current.getContext('2d');
          new Chart(context, {
            type: 'bar',
            data: data,
            options: options,
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    getNivelDeInteres()
      .then(data => {
        if (chartRefC.current) {
          const context = chartRefC.current.getContext('2d');
          new Chart(context, {
            type: 'bar',
            data: data,
            options: options,
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Análisis</h1>
      <h2>Desempeño Interacciones</h2>
      <div>
        <canvas ref={chartRefB} width={400} height={300} />
      </div>
      <h2>Desempeño cognitivo</h2>
      <div>
        <canvas ref={chartRefA} width={400} height={300} />
      </div>
      <h2>Nivel de interés</h2>
      <div>
        <canvas ref={chartRefC} width={400} height={300} />
      </div>
      <div className="buttons">
        <Link to="/" className="button">Inicio</Link>
        <Link to="/pagina2" className="button">Ver resumen</Link>
      </div>
    </div>
  );
};

export default Pagina3;
