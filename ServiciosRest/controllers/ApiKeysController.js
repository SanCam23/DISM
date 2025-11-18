'use strict';

const ApiKeysService = require('../services/ApiKeysService');

exports.getApiKeys = function (req, res) {
  ApiKeysService.getApiKeys(req, res);
};

exports.createApiKey = function (req, res) {
  ApiKeysService.createApiKey(req, res);
};

exports.getApiKeyById = function (req, res) {
  ApiKeysService.getApiKeyById(req, res);
};

exports.updateApiKey = function (req, res) {
  ApiKeysService.updateApiKey(req, res);
};

exports.deleteApiKey = function (req, res) {
  ApiKeysService.deleteApiKey(req, res);
};

exports.verifyApiKey = function (req, res) {
  ApiKeysService.verifyApiKey(req, res);
};
