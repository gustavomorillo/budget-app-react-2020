import React, { useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, agregarGasto] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCrearGasto] = useState(false);

  useEffect(() => {
    if (creargasto) {
      agregarGasto([...gastos, gasto]);
    }

    const presupuestoRestante = restante - gasto.cantidad;
    guardarRestante(presupuestoRestante);

    guardarCrearGasto(false);
  }, [gasto]);

  return (
    <div className="container">
      <header>
        <h1>Weekly expense</h1>
        <div className="contenido-principal contenido">
          {mostrarpregunta ? (
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario guardarGasto={guardarGasto} guardarCrearGasto={guardarCrearGasto} />
              </div>
              <div className="one-half column">
                <Listado gastos={gastos} />
                <ControlPresupuesto presupuesto={presupuesto} restante={restante}></ControlPresupuesto>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
