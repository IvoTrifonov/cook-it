import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from '@angular/compiler/src/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(e => {
        if (e instanceof HttpResponse && e.url.includes('signin')) {
          const authToken = e.body.accessToken;
        }

        return e;
      }),
      // catchError(err => {
      //   console.log(err);
      //   return of(err);
      // })
    );
  }

}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true
};