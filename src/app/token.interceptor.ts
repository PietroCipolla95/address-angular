import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let http = inject(HttpClient)
  let route = inject(Router)

  const token: any = localStorage.getItem('token')



  if (token) {

    let decodedToken: any = jwtDecode(token)
    const expiresIn = decodedToken.exp - Date.now() / 1000; // Convert expiresIn to seconds
    const refreshThreshold = 300; // 5 minutes before expiration in seconds

    try {

      if (expiresIn < refreshThreshold) {
        console.log('token expired');
        http.post('http://127.0.0.1:8000/api/auth/refresh', token).subscribe((response: any) => {
          const newToken = response.access_token;

          // Update the token in localStorage
          localStorage.setItem('token', newToken);

          // Clone the original request with the new token
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });

          // Retry the original request with the new token
          return next(authReq);
        })

      } else {

        console.log('token not expired');
      }

    } catch (error) {

      console.error('Failed to refresh token:', error);
      // Handle refresh failure (e.g., navigate to login page)
      route.navigate(['/login']);
    }

  } else {

    route.navigate(['/login'])
  }

  return next(req);
};
