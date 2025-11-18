const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    this.expressServer.launch();

    console.log('===============================================');
    console.log(`Servicios REST de DISM escuchando en el puerto ${config.URL_PORT}`);
    console.log(`Documentación Swagger disponible en: http://localhost:${config.URL_PORT}/api-docs/`);
    console.log('===============================================');

    logger.info('Servicios REST DISM en ejecución correctamente', {
      service: 'servicios-rest-dism',
      swagger: `http://localhost:${config.URL_PORT}/api-docs/`
    });

  } catch (error) {
    logger.error('Error al iniciar los Servicios REST', error.message);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
