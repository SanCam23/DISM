class Service {
  static successResponse(payload) {
    return payload;
  }

  static rejectResponse(message, code = 500) {
    const error = new Error(message);
    error.status = code;
    throw error;
  }
}

module.exports = Service;
