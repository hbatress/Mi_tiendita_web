const express = require("express");
const routes = express.Router();
const { sql, poolPromise } = require("../db/database");
const { MAX } = require("mssql");
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

/*api para procesar los pedidos de los clientes */
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
    if (result.rowsAffected[0] > 0) {
      res.status(200).send("Orden procesada exitosamente");
    } else {
      res.status(400).send("No se pudo procesar la orden");
    }
  } catch (error) {
    res.status(500).send(`Error en la consulta: ${error.message}`);
  }
});

routes.post("/insert_producto", async (req, res) => {
  const { categoria, producto, marca, codigo, stock, precio, imagen } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id_categoria", sql.Int, categoria)
      .input("nombre", sql.VarChar(100), producto)
      .input("marca", sql.VarChar(50), marca)
      .input("codigo", sql.VarChar(20), codigo)
      .input("stock", sql.Float, stock)
      .input("precio", sql.Float, precio)
      .input("imagen", sql.VarChar(sql.MAX), imagen)
      .execute("insertar_producto");

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Producto insertado correctamente" });
    } else {
      res.status(400).json({ message: "No se pudo insertar el producto" });
    }
  } catch (err) {
    res.status(500).json({ message: `Error al insertar el producto: ${err.message}` });
  }
});

module.exports = routes;
