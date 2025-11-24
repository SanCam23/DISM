const connection = require('../config/database');

// Obtener todos los fichajes
const getFichajes = async (req, res) => {
  console.log("GET /fichajes llamado");

  const query = `
    SELECT f.*, u.Nombre as UsuarioNombre, t.Nombre as TrabajoNombre 
    FROM Fichajes f 
    LEFT JOIN Usuarios u ON f.IdUsuario = u.IdUsuario 
    LEFT JOIN Trabajos t ON f.IdTrabajo = t.IdTrabajo
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Obtener fichajes por usuario y fecha (solo inicio opcional)
const getFichajesByUsuario = async (req, res) => {
  const { usuarioId, fechaInicio, fechaFin } = req.query;
  console.log(`GET /fichajes/usuario llamado con:`, req.query);

  let query = `
    SELECT f.*, u.Nombre as UsuarioNombre, t.Nombre as TrabajoNombre 
    FROM Fichajes f 
    LEFT JOIN Usuarios u ON f.IdUsuario = u.IdUsuario 
    LEFT JOIN Trabajos t ON f.IdTrabajo = t.IdTrabajo 
    WHERE f.IdUsuario = ?
  `;

  let params = [usuarioId];

  if (fechaInicio && !fechaFin) {
    query += ' AND DATE(f.FechaHoraEntrada) = ?';
    params.push(fechaInicio);
  }

  if (fechaInicio && fechaFin) {
    query += ' AND DATE(f.FechaHoraEntrada) BETWEEN ? AND ?';
    params.push(fechaInicio, fechaFin);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado o sin fichajes' });
    }

    res.status(200).json(results);
  });
};


// Crear un nuevo fichaje (entrada)
const createFichaje = async (req, res) => {
  const { IdUsuario, IdTrabajo, GeolocalizacionLatitud, GeolocalizacionLongitud } = req.body;
  console.log("POST /fichajes llamado con:", req.body);

  // Verificar si ya existe un fichaje abierto en las últimas 12 horas
  const checkQuery = `
    SELECT * FROM Fichajes 
    WHERE IdUsuario = ? AND FechaHoraSalida IS NULL 
    AND FechaHoraEntrada >= DATE_SUB(NOW(), INTERVAL 12 HOUR)
  `;

  connection.query(checkQuery, [IdUsuario], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else if (results.length > 0) {
      res.status(400).json({ error: 'Ya existe un fichaje abierto en las últimas 12 horas' });
    } else {
      // Crear nuevo fichaje
      connection.query(
        'INSERT INTO Fichajes (IdUsuario, IdTrabajo, FechaHoraEntrada, GeolocalizacionLatitud, GeolocalizacionLongitud) VALUES (?, ?, NOW(), ?, ?)',
        [IdUsuario, IdTrabajo, GeolocalizacionLatitud, GeolocalizacionLongitud],
        (err, results) => {
          if (err) {
            console.error("Error al insertar fichaje:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.status(201).json({
              IdFichaje: results.insertId,
              message: 'Fichaje de entrada registrado correctamente'
            });
          }
        }
      );
    }
  });
};

// Finalizar fichaje (salida)
const finalizarFichaje = async (req, res) => {
  const { id } = req.params;
  console.log(`PUT /fichajes/${id}/finalizar llamado`);

  // Obtener el fichaje actual
  connection.query('SELECT * FROM Fichajes WHERE IdFichaje = ?', [id], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Fichaje no encontrado' });
    } else {
      const fichaje = results[0];

      if (fichaje.FechaHoraSalida) {
        res.status(400).json({ error: 'El fichaje ya está finalizado' });
        return;
      }

      const fechaEntrada = new Date(fichaje.FechaHoraEntrada);
      const fechaSalida = new Date();
      const horasTrabajadas = Math.round((fechaSalida - fechaEntrada) / (1000 * 60 * 60));

      connection.query(
        'UPDATE Fichajes SET FechaHoraSalida = NOW(), HorasTrabajadas = ? WHERE IdFichaje = ?',
        [horasTrabajadas, id],
        (err, results) => {
          if (err) {
            console.error("Error al actualizar fichaje:", err);
            res.status(500).json({ error: err.message });
          } else {
            res.status(200).json({
              message: 'Fichaje de salida registrado correctamente',
              horasTrabajadas: horasTrabajadas
            });
          }
        }
      );
    }
  });
};

// Obtener fichaje actual del usuario (últimas 12 horas)
const getFichajeActual = async (req, res) => {
  const { usuarioId } = req.params;
  console.log(`GET /fichajes/actual/${usuarioId} llamado`);

  const query = `
    SELECT f.*, t.Nombre as TrabajoNombre 
    FROM Fichajes f 
    LEFT JOIN Trabajos t ON f.IdTrabajo = t.IdTrabajo 
    WHERE f.IdUsuario = ? AND f.FechaHoraSalida IS NULL 
    AND f.FechaHoraEntrada >= DATE_SUB(NOW(), INTERVAL 12 HOUR)
    ORDER BY f.FechaHoraEntrada DESC 
    LIMIT 1
  `;

  connection.query(query, [usuarioId], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No hay fichaje activo' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

const procesarCierreAutomatico = () => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE fichajes 
      SET
        FechaHoraSalida = DATE_ADD(FechaHoraEntrada, INTERVAL 12 HOUR),
        HorasTrabajadas = 12
      WHERE
        FechaHoraSalida IS NULL
        AND TIMESTAMPDIFF(HOUR, FechaHoraEntrada, NOW()) >= 12;
    `;

    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error interno al cerrar fichajes:", err.message);
        reject(err);
      } else {
        if (results.affectedRows > 0) {
            console.log(`[AUTO] Se han cerrado automáticamente ${results.affectedRows} fichajes vencidos.`);
        } else {
            console.log(`[AUTO] No se encontraron fichajes vencidos para cerrar.`);
        }
        resolve(results);
      }
    });
  });
};

// --- MODIFICACIÓN DEL CONTROLLER MANUAL ---
// Ahora este endpoint simplemente llama a la función de arriba.
const cerrarFichajesAntiguosManual = async (req, res) => {
  console.log("POST /fichajes/cerrar-antiguos llamado");
  
  try {
    const results = await procesarCierreAutomatico();
    res.status(200).json({
      message: 'Proceso de cierre finalizado.',
      fichajesCerrados: results.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getFichajes,
  getFichajesByUsuario,
  createFichaje,
  finalizarFichaje,
  getFichajeActual,
  cerrarFichajesAntiguosManual,
  procesarCierreAutomatico
};


