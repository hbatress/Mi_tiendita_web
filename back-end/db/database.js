
const sql = require('mssql');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();


// Configuración de la conexión a la base de datos
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true, // Usar en Azure
        trustServerCertificate: true // Cambiar a true para desarrollo local
    }
};

// Conectar a la base de datos
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err);
    });

module.exports = {
    sql, poolPromise
};