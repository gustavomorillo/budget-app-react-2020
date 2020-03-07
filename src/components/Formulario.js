import React, { useState } from "react";
import Error from "./Error";
import shortid from "shortid";
import PropTypes from "prop-types";

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const agregarGasto = e => {
    e.preventDefault();

    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    };
    guardarGasto(gasto);
    guardarCrearGasto(true);
    guardarNombre("");
    guardarCantidad("");
    console.log("submited");
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Add expenses here</h2>
      {error ? <Error mensaje="Invalid input" /> : null}
      <div className="campo">
        <label>Name of the expense</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ex. Food"
          value={nombre}
          onChange={e => guardarNombre(e.target.value)}
        ></input>
      </div>
      <div className="campo">
        <label>Expense</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ex. 300"
          value={cantidad}
          onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
        ></input>
        <input type="submit" className="button-primary u-full-width" value="Add expense"></input>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired
};

export default Formulario;
