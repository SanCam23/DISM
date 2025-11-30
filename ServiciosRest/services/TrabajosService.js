const connection = require('../config/database');

// Obtener listado completo de trabajos
const getTrabajos = async (req, res) => {
  console.log("GET /trabajos llamado");

  connection.query('SELECT * FROM Trabajos', (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Registrar nuevo trabajo en el sistema
const createTrabajo = async (req, res) => {
  const { Nombre } = req.body;
  console.log("POST /trabajos llamado con:", req.body);

  connection.query(
    'INSERT INTO Trabajos (Nombre) VALUES (?)',
    [Nombre],
    (err, results) => {
      if (err) {
        console.error("Error al insertar trabajo:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          IdTrabajo: results.insertId,
          message: 'Trabajo creado correctamente'
        });
      }
    }
  );
};

// Obtener información de trabajo específico
const getTrabajoById = async (req, res) => {
  const { id } = req.params;
  console.log(`GET /trabajos/${id} llamado`);

  connection.query('SELECT * FROM Trabajos WHERE IdTrabajo = ?', [id], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Trabajo no encontrado' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Actualizar datos de trabajo existente
const updateTrabajo = async (req, res) => {
  const { id } = req.params;
  const { Nombre } = req.body;
  console.log(`PUT /trabajos/${id} llamado con:`, req.body);

  connection.query(
    'UPDATE Trabajos SET Nombre = ? WHERE IdTrabajo = ?',
    [Nombre, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar trabajo:", err);
        return res.status(500).json({ error: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Trabajo no encontrado' });
      }

      res.status(200).json({ message: 'Trabajo actualizado correctamente' });
    }
  );
};


// Eliminar trabajo del sistema
const deleteTrabajo = async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /trabajos/${id} llamado`);

  connection.query('DELETE FROM Trabajos WHERE IdTrabajo = ?', [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar trabajo:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Trabajo eliminado correctamente' });
    }
  });
};

module.exports = {
  getTrabajos,
  createTrabajo,
  getTrabajoById,
  updateTrabajo,
  deleteTrabajo
};