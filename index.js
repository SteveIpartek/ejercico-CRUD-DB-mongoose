// index.js
const express = require('express');
const app = express();
const PORT = 8080; // Puedes usar otro puerto si lo deseas, como 3000 o 5000
const { dbConnection } = require('./config/config');
const tasksRoutes = require('./routes/tasks'); // Importa las rutas de tareas

// Middlewares
app.use(express.json()); // Para que Express pueda parsear el body de las peticiones en formato JSON

// Rutas de la API
// Monta las rutas de tareas bajo el prefijo '/tasks'
app.use('/tasks', tasksRoutes);

// Conexión a la base de datos
dbConnection();

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));