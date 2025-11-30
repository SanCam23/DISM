const connection = require('../config/database');

// Obtener listado completo de usuarios
const getUsuarios = async (req, res) => {
  console.log("GET /usuarios llamado");

  connection.query('SELECT * FROM Usuarios', (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Registrar nuevo usuario en el sistema
const createUsuario = async (req, res) => {
  const { Nombre, Usuario, Clave } = req.body;
  console.log("POST /usuarios llamado con:", req.body);

  connection.query(
    'INSERT INTO Usuarios (Nombre, Usuario, Clave) VALUES (?, ?, ?)',
    [Nombre, Usuario, Clave],
    (err, results) => {
      if (err) {
        console.error("Error al insertar usuario:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ 
          IdUsuario: results.insertId,
          message: 'Usuario creado correctamente'
        });
      }
    }
  );
};

// Obtener información de usuario específico
const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  console.log(`GET /usuarios/${id} llamado`);

  connection.query('SELECT * FROM Usuarios WHERE IdUsuario = ?', [id], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Actualizar datos de usuario existente
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Usuario, Clave } = req.body;
  console.log(`PUT /usuarios/${id} llamado con:`, req.body);

  connection.query(
    'UPDATE Usuarios SET Nombre = ?, Usuario = ?, Clave = ? WHERE IdUsuario = ?',
    [Nombre, Usuario, Clave, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      }
    }
  );
};

// Eliminar usuario del sistema
const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /usuarios/${id} llamado`);

  connection.query('DELETE FROM Usuarios WHERE IdUsuario = ?', [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    }
  });
};

// Validar credenciales de acceso
const loginUsuario = async (req, res) => {
  const { Usuario, Clave } = req.body;
  console.log("POST /usuarios/login llamado con:", req.body);

  connection.query(
    'SELECT * FROM Usuarios WHERE Usuario = ? AND Clave = ?',
    [Usuario, Clave],
    (err, results) => {
      if (err) {
        console.error("Error en la consulta:", err);
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      } else {
        res.status(200).json({ 
          usuario: results[0],
          message: 'Login exitoso'
        });
      }
    }
  );
};

module.exports = {
  getUsuarios,
  createUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  loginUsuario
};