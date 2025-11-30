const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');
const FichajesService = require('./services/FichajesService');

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

    // Procesar cierre automático de fichajes abiertos de más de 12 horas
    console.log('Verificando fichajes abiertos de más de 12 horas...');
    await FichajesService.procesarCierreAutomatico();

  } catch (error) {
    console.error(error);
    logger.error('Error al iniciar los Servicios REST', error.message);
    
    // Verificar existencia del servidor antes de cerrarlo
    if (this.expressServer) {
        await this.expressServer.close();
    }
  }
};

launchServer().catch(e => logger.error(e));