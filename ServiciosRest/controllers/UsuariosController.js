'use strict';

const UsuariosService = require('../services/UsuariosService');

exports.getUsuarios = function(req, res) {
  UsuariosService.getUsuarios(req, res);
};

exports.createUsuario = function(req, res) {
  UsuariosService.createUsuario(req, res);
};

exports.getUsuarioById = function(req, res) {
  UsuariosService.getUsuarioById(req, res);
};

exports.updateUsuario = function(req, res) {
  UsuariosService.updateUsuario(req, res);
};

exports.deleteUsuario = function(req, res) {
  UsuariosService.deleteUsuario(req, res);
};

exports.loginUsuario = function(req, res) {
  UsuariosService.loginUsuario(req, res);
};