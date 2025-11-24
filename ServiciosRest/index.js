const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');
const FichajesService = require('./services/FichajesService'); // <--- 1. ¡IMPORTANTE! AÑADIR ESTA LÍNEA

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

    // Verificación automática al inicio
    console.log('Verificando fichajes abiertos de más de 12 horas...');
    await FichajesService.procesarCierreAutomatico();

  } catch (error) {
    console.error(error); // <--- Añadido para ver el error real en consola
    logger.error('Error al iniciar los Servicios REST', error.message);
    
    // Corrección del cierre: verificamos si existe el servidor antes de cerrar
    if (this.expressServer) {
        await this.expressServer.close();
    }
  }
};

launchServer().catch(e => logger.error(e));