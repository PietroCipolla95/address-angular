import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let http = inject(HttpClient)
  let route = inject(Router)

  const token = localStorage.getItem('token')

  if (token) {

    let decodedToken = jwtDecode(token)

    const isExpired = decodedToken && decodedToken.exp ? (decodedToken.exp < Date.now() / 1000) : false;

    try {

      if (isExpired) {
        console.log('token expired');
        http.post('http://127.0.0.1:8000/api/auth/refresh', token).subscribe((response: any) => {
          console.log(response);
          const newToken = response.access_token
          localStorage.setItem('token', newToken)
          let refreshReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });

          console.log('token refreshed');
          return next(refreshReq);
        })

      } else {

        console.log('token not expired');
      }

    } catch (error) {

      console.log('invalid token');
      localStorage.removeItem('token')
      route.navigate(['/login'])
    }

  } else {

    route.navigate(['/login'])
  }

  return next(req);
};
