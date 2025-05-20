// config/config.js
const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); // Utiliza MONGO_URL
        console.log('Base de datos conectada con éxito');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = {
    dbConnection,
};