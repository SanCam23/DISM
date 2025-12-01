import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const MY_API_KEY = 'clave_secreta_dism'; 

  const authReq = req.clone({
    headers: req.headers.set('x-api-key', MY_API_KEY)
  });

  return next(authReq);
};