import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // Aquí pondremos la key que tienes en tu base de datos.
  // Según tu SQL, tendrás que insertar una manual o mirar cuál generó el sistema.
  // Por ejemplo, asumimos que tienes una key '123456' en la tabla ApiKey.
  const MY_API_KEY = 'clave_secreta_dism'; 

  const authReq = req.clone({
    headers: req.headers.set('x-api-key', MY_API_KEY)
  });

  return next(authReq);
};