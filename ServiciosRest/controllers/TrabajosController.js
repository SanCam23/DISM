'use strict';

const TrabajosService = require('../services/TrabajosService');

exports.getTrabajos = function(req, res) {
  TrabajosService.getTrabajos(req, res);
};

exports.createTrabajo = function(req, res) {
  TrabajosService.createTrabajo(req, res);
};

exports.getTrabajoById = function(req, res) {
  TrabajosService.getTrabajoById(req, res);
};

exports.updateTrabajo = function(req, res) {
  TrabajosService.updateTrabajo(req, res);
};

exports.deleteTrabajo = function(req, res) {
  TrabajosService.deleteTrabajo(req, res);
};