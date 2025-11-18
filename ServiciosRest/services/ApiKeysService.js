'use strict';
const connection = require('../config/database');

// Obtener todas las API Keys
const getApiKeys = async (req, res) => {
  console.log("GET /apikey llamado");

  connection.query('SELECT * FROM ApiKey', (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Crear nueva API Key
const createApiKey = async (req, res) => {
  const { Key } = req.body;
  console.log("POST /apikey llamado con:", req.body);

  if (!Key) {
    return res.status(400).json({ error: "El campo 'Key' es obligatorio" });
  }

  connection.query(
    'INSERT INTO ApiKey (`Key`) VALUES (?)',
    [Key],
    (err, results) => {
      if (err) {
        console.error("Error al insertar ApiKey:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          IdKey: results.insertId,
          message: 'ApiKey creada correctamente'
        });
      }
    }
  );
};

// Obtener ApiKey por ID
const getApiKeyById = async (req, res) => {
  const { id } = req.params;
  console.log(`GET /apikey/${id} llamado`);

  connection.query('SELECT * FROM ApiKey WHERE IdKey = ?', [id], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'ApiKey no encontrada' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Actualizar ApiKey
const updateApiKey = async (req, res) => {
  const { id } = req.params;
  const { Key } = req.body;
  console.log(`PUT /apikey/${id} llamado con:`, req.body);

  connection.query(
    'UPDATE ApiKey SET `Key` = ? WHERE IdKey = ?',
    [Key, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar ApiKey:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'ApiKey actualizada correctamente' });
      }
    }
  );
};

// Eliminar ApiKey
const deleteApiKey = async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /apikey/${id} llamado`);

  connection.query('DELETE FROM ApiKey WHERE IdKey = ?', [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar ApiKey:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'ApiKey eliminada correctamente' });
    }
  });
};

// Verificar ApiKey
const verifyApiKey = async (req, res) => {
  const { key } = req.params;
  console.log(`GET /apikey/verificar/${key} llamado`);

  connection.query('SELECT * FROM ApiKey WHERE `Key` = ?', [key], (err, results) => {
    if (err) {
      console.error("Error en la verificación:", err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(401).json({ valid: false, message: "ApiKey no válida" });
    } else {
      res.status(200).json({ valid: true, message: "ApiKey válida" });
    }
  });
};

module.exports = {
  getApiKeys,
  createApiKey,
  getApiKeyById,
  updateApiKey,
  deleteApiKey,
  verifyApiKey
};
