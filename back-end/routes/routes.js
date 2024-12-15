const express = require("express");
const routes = express.Router();
const { sql, poolPromise } = require("../db/database");
routes.use(express.json());

routes.get("/", (req, res) => {
  res.send("Saludos desde Express");
});

routes.get("/productos", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("Listar_productos");
    if (result.recordset.length == 0) {
      res.status(404).send("Sin datos");
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    res.status(500).send("Error en la consulta");
  }
});

routes.get("/clientes", async (req, res) => {
  const estado = req.query.estado;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("estado", sql.Int, estado)
      .execute("Listar_clientes_pendientes");
    if (result.recordset.length == 0) {
      res.status(404).send("Sin datos");
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    res.status(500).send("Error en la consulta");
  }
});

routes.get("/historial_pedidos", async (req, res) => {
  const id_usuario = req.query.id_usuario;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id_cliente", sql.Int, id_usuario)
      .execute("historia");
    if (result.recordset.length == 0) {
      res.status(404).send("Sin datos");
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    res.status(500).send("Error en la consulta");
  }
});
routes.post("/procesar_orden", async (req, res) => {
  const {
    id_usuario,
    id_direccion,
    id_estado,
    orden_detalles,
    id_metodo_pago,
    nombre_factura,
    nit,
  } = req.body; 
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id_usuario", sql.Int, id_usuario)
      .input("id_direccion", sql.Int, id_direccion)
      .input("id_estado", sql.Int, id_estado)
      .input("orden_detalles", sql.NVarChar(sql.MAX), orden_detalles)
      .input("id_metodo_pago", sql.Int, id_metodo_pago)
      .input("nombre_factura", sql.VarChar(200), nombre_factura)
      .input("nit", sql.VarChar(20), nit)
      .execute("procesar_orden");
    if (result.recordset.length == 0) {
      res.status(404).send("Sin datos");
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    res.status(500).send("Error en la consulta");
  }
});

module.exports = routes;
