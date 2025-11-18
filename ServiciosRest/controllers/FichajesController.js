'use strict';

const FichajesService = require('../services/FichajesService');

exports.getFichajes = function(req, res) {
  FichajesService.getFichajes(req, res);
};

exports.createFichaje = function(req, res) {
  FichajesService.createFichaje(req, res);
};

exports.getFichajesByUsuario = function(req, res) {
  FichajesService.getFichajesByUsuario(req, res);
};

exports.getFichajeActual = function(req, res) {
  FichajesService.getFichajeActual(req, res);
};

exports.finalizarFichaje = function(req, res) {
  FichajesService.finalizarFichaje(req, res);
};

exports.cerrarFichajesAntiguosManual = function(req, res) {
  FichajesService.cerrarFichajesAntiguosManual(req, res);
}