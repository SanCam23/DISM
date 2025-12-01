const connection = require('../config/database');

const checkApiKey = (req, res, next) => {
  // 1. Buscamos la key en la cabecera (header)
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'Acceso denegado. Falta la API Key.' });
  }

  // 2. Comprobamos si existe en la Base de Datos
  const query = 'SELECT * FROM apikey WHERE `Key` = ?'; // Usamos backticks por si Key es palabra reservada
  
  connection.query(query, [apiKey], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al validar la API Key' });
    }
    
    if (results.length > 0) {
      // Clave válida, Dejamos pasar la petición
      next();
    } else {
      res.status(403).json({ error: 'API Key no válida.' });
    }
  });
};

module.exports = checkApiKey;