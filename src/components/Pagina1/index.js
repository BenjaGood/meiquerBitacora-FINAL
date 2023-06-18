
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pagina1 = () => {
  const [nombresAsistentes, setNombresAsistentes] = useState([]);
  const [formValues, setFormValues] = useState({
    procesoAprendizaje: '',
    solucionadorProblemas: '',
    ideas: '',
    usoHerramientas: '',
    procedimiento: '',
    recordarInformacion: '',
    companeros: false,
    implementadores: false,
    disenadoresContenido: false,
    involucradoYPropone: false,
    involucrado: false,
    cooperativo: false,
    indiferente: false,
    desinteresado: false,
    proactivo: '',
    atento: '',
    indiferenteComportamiento: '',
    desinteresadoComportamiento: '',
    disruptivo: '',
    emocionadoInspirado: '',
    positivoDispuesto: '',
    atentoParticipativo: '',
    frustradoPreocupado: '',
    molestoTriste: '',
    opinionesExternas: '',
    interesEnLosDemas: '',
    escuchar: ''
  });
  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/participantes')
      .then((response) => {
        const nombres = response.data.map((asistente) => asistente.nombre);
        setNombresAsistentes(nombres);
      })
      .catch((error) => {
        console.error('Error al obtener los nombres de los asistentes:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleAsistentesChange = (e) => {
    const { value } = e.target;
    const selectedAsistentes = value.split(',').map((asistente) => asistente.trim());
    setAsistentes(selectedAsistentes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Guardar los datos en la tabla Cognitivo
    const cognitivoData = {
      pensOrdenAlto: parseInt(formValues.procesoAprendizaje),
      pensMinRequerido: parseInt(formValues.solucionadorProblemas),
      pensNoRelacionado: parseInt(formValues.ideas),
      pensDesconocidos: parseInt(formValues.usoHerramientas)
    };

    axios
      .post('http://localhost:3001/cognitivo', cognitivoData)
      .then(() => {
        console.log('Datos de Cognitivo guardados exitosamente');
      })
      .catch((error) => {
        console.error('Error al guardar los datos de Cognitivo:', error);
      });

    // 2. Guardar los datos en la tabla Interacciones
    const interaccionesData = {
      conCompaneros: formValues.companeros ? 1 : 0,
      conImplementadores: formValues.implementadores ? 1 : 0,
      disenadoresContenido: formValues.disenadoresContenido ? 1 : 0
    };

    axios
      .post('http://localhost:3001/interacciones', interaccionesData)
      .then(() => {
        console.log('Datos de Interacciones guardados exitosamente');
      })
      .catch((error) => {
        console.error('Error al guardar los datos de Interacciones:', error);
      });

    // 3. Guardar los datos en la tabla NivelDeInteres
    const nivelInteresData = {
      pensandoProcesoAprendizaje: parseInt(formValues.recordarInformacion),
      solucionadorProblemas: formValues.solucionadorProblemas ? 1 : 0,
      ideas: formValues.ideas ? 1 : 0,
      usoHerramientas: formValues.usoHerramientas ? 1 : 0,
      procedimiento: formValues.procedimiento ? 1 : 0,
      recordarCiertaInfo: formValues.recordarInformacion ? 1 : 0
    };

    axios
      .post('http://localhost:3001/niveldeinteres', nivelInteresData)
      .then(() => {
        console.log('Datos de NivelDeInteres guardados exitosamente');
      })
      .catch((error) => {
        console.error('Error al guardar los datos de NivelDeInteres:', error);
      });

    // 4. Guardar los datos en la tabla Comportamiento
    const comportamientoData = {
      proactivo: formValues.proactivo,
      atento: formValues.atento,
      indiferente: formValues.indiferenteComportamiento,
      desinteresado: formValues.desinteresadoComportamiento,
      disruptivo: formValues.disruptivo
    };

    axios
      .post('http://localhost:3001/comportamiento', comportamientoData)
      .then(() => {
        console.log('Datos de Comportamiento guardados exitosamente');
      })
      .catch((error) => {
        console.error('Error al guardar los datos de Comportamiento:', error);
      });

    // 5. Guardar los datos en la tabla Emocional
    const emocionalData = {
      emocionado_inspirado: formValues.emocionadoInspirado,
      positivo_dispuesto: formValues.positivoDispuesto,
      atento_participativo: formValues.atentoParticipativo,
      frustrado_preocupado: formValues.frustradoPreocupado,
      molesto_triste: formValues.molestoTriste
    };

    axios
      .post('http://localhost:3001/emocional', emocionalData)
      .then(() => {
        console.log('Datos de Emocional guardados exitosamente');
      })
      .catch((error) => {
        console.error('Error al guardar los datos de Emocional:', error);
      });

    // 6. Guardar los datos en la tabla Apertura
    const aperturaData = {
      opinionesExternas: formValues.opinionesExternas,
      interesEnLosDemas: formValues.interesEnLosDemas,
      escuchar: formValues.escuchar
    };

    axios
      .post('http://localhost:3001/apertura', aperturaData)
      .then(() => {
        console.log('Datos de Apertura guardados exitosamente');
      })
      .catch((error) => {
        console.error('Error al guardar los datos de Apertura:', error);
      });

    // 7. Guardar los datos en la tabla Involucramiento
    const involucramientoData = {
      involucradoYPropone: formValues.involucradoYPropone,
      involucrado: formValues.involucrado,
      cooperativo: formValues.cooperativo,
      indiferente: formValues.indiferente,
      desinteresado: formValues.desinteresado
    };

    axios
      .post('http://localhost:3001/involucramiento', involucramientoData)
      .then(() => {
        console.log('Datos de Involucramiento guardados exitosamente');
        // Realizar alguna acción adicional o redirigir a otra página
      })
      .catch((error) => {
        console.error('Error al guardar los datos de Involucramiento:', error);
      });
  };

  const renderSliderValue = (value) => {
    return (
      <div className="slider-value">
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <div className="content">
        <div className="box-container">
          <div className="interest-container">
            <div className="meiquer-color">
              <h2 className="white-title">Nivel de interés</h2>
              <div className="slider-container">
                <p>Pensando en el proceso de aprendizaje</p>
                <input type="range" min="1" max="5" step="1" id="proceso-aprendizaje" name="procesoAprendizaje" value={formValues.procesoAprendizaje} onChange={handleChange} />
                {renderSliderValue(formValues.procesoAprendizaje)}
              </div>
              <div className="slider-container">
                <p>Solucionador de problemas</p>
                <input type="range" min="1" max="5" step="1" id="solucionador-problemas" name="solucionadorProblemas" value={formValues.solucionadorProblemas} onChange={handleChange} />
                {renderSliderValue(formValues.solucionadorProblemas)}
              </div>
              <div className="slider-container">
                <p>Ideas</p>
                <input type="range" min="1" max="5" step="1" id="ideas" name="ideas" value={formValues.ideas} onChange={handleChange} />
                {renderSliderValue(formValues.ideas)}
              </div>
              <div className="slider-container">
                <p>Uso de herramientas físicas</p>
                <input type="range" min="1" max="5" step="1" id="herramientas-fisicas" name="usoHerramientas" value={formValues.usoHerramientas} onChange={handleChange} />
                {renderSliderValue(formValues.usoHerramientas)}
              </div>
              <div className="slider-container">
                <p>Procedimiento</p>
                <input type="range" min="1" max="5" step="1" id="procedimiento" name="procedimiento" value={formValues.procedimiento} onChange={handleChange} />
                {renderSliderValue(formValues.procedimiento)}
              </div>
              <div className="slider-container">
                <p>Recordar cierta información</p>
                <input type="range" min="1" max="5" step="1" id="recordar-informacion" name="recordarInformacion" value={formValues.recordarInformacion} onChange={handleChange} />
                {renderSliderValue(formValues.recordarInformacion)}
              </div>
            </div>
          </div>
          <div className="implementers-container">
            <div className="meiquer-color">
              <h2 className="white-title">Involucramiento de implementadores</h2>
              <p>Involucrado y propone <input type="checkbox" id="Involucrado-propone" name="involucradoYPropone" checked={formValues.involucradoYPropone} onChange={handleChange} /></p>
              <p>Involucrado <input type="checkbox" id="Involucrado" name="involucrado" checked={formValues.involucrado} onChange={handleChange} /></p>
              <p>Cooperativo <input type="checkbox" id="Cooperativo" name="cooperativo" checked={formValues.cooperativo} onChange={handleChange} /></p>
              <p>Indiferente <input type="checkbox" id="Indiferente" name="indiferente" checked={formValues.indiferente} onChange={handleChange} /></p>
              <p>Desinteresado <input type="checkbox" id="Desinteresado" name="desinteresado" checked={formValues.desinteresado} onChange={handleChange} /></p>
            </div>
          </div>
          <div className="disenadores-container">
            <div className="meiquer-color">
              <h2 className="white-title">Interacciones con diseñadores de contenido</h2>
              <p>Con compañeros <input type="checkbox" id="companeros" name="companeros" checked={formValues.companeros} onChange={handleChange} /></p>
              <p>Con implementadores <input type="checkbox" id="implementadores" name="implementadores" checked={formValues.implementadores} onChange={handleChange} /></p>
              <p>Con diseñadores de contenido <input type="checkbox" id="disenadores-contenido" name="disenadoresContenido" checked={formValues.disenadoresContenido} onChange={handleChange} /></p>
            </div>
          </div>
          <div className="behavior-container">
            <div className="meiquer-color">
              <h2 className="white-title">Comportamiento</h2>
              <p>Proactivo <input type="text" id="proactivo" name="proactivo" value={formValues.proactivo} onChange={handleChange} /></p>
              <p>Atento <input type="text" id="atento" name="atento" value={formValues.atento} onChange={handleChange} /></p>
              <p>Indiferente <input type="text" id="indiferente-comportamiento" name="indiferenteComportamiento" value={formValues.indiferenteComportamiento} onChange={handleChange} /></p>
              <p>Desinteresado <input type="text" id="desinteresado-comportamiento" name="desinteresadoComportamiento" value={formValues.desinteresadoComportamiento} onChange={handleChange} /></p>
              <p>Disruptivo <input type="text" id="disruptivo" name="disruptivo" value={formValues.disruptivo} onChange={handleChange} /></p>
            </div>
          </div>
          <div className="emotional-container">
            <div className="meiquer-color">
              <h2 className="white-title">Estados emocionales</h2>
              <p>Emocionado / Inspirado <input type="text" id="emocionado-inspirado" name="emocionadoInspirado" value={formValues.emocionadoInspirado} onChange={handleChange} /></p>
              <p>Positivo / Dispuesto <input type="text" id="positivo-dispuesto" name="positivoDispuesto" value={formValues.positivoDispuesto} onChange={handleChange} /></p>
              <p>Atento / Participativo <input type="text" id="atento-participativo" name="atentoParticipativo" value={formValues.atentoParticipativo} onChange={handleChange} /></p>
              <p>Frustrado / Preocupado <input type="text" id="frustrado-preocupado" name="frustradoPreocupado" value={formValues.frustradoPreocupado} onChange={handleChange} /></p>
              <p>Molesto / Triste <input type="text" id="molesto-triste" name="molestoTriste" value={formValues.molestoTriste} onChange={handleChange} /></p>
            </div>
          </div>
          <div className="openness-container">
            <div className="meiquer-color">
              <h2 className="white-title">Apertura</h2>
              <p>Opiniones externas <input type="text" id="opiniones-externas" name="opinionesExternas" value={formValues.opinionesExternas} onChange={handleChange} /></p>
              <p>Interés en los demás <input type="text" id="interes-en-los-demas" name="interesEnLosDemas" value={formValues.interesEnLosDemas} onChange={handleChange} /></p>
              <p>Escuchar <input type="text" id="escuchar" name="escuchar" value={formValues.escuchar} onChange={handleChange} /></p>
            </div>
          </div>
        </div>
        <div className="select-participants-container">
          <h2>Asistentes</h2>
          <select multiple value={asistentes} onChange={handleAsistentesChange}>
            {nombresAsistentes.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="buttons">
        <Link to="/" className="button">Volver</Link>
        <button className="button" type="submit" onClick={handleSubmit}>Guardar</button>
      </div>
    </div>
  );
};

export default Pagina1;
