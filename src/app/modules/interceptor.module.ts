import { Injectable, NgModule, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { LocalStorageService } from "../services/local-storage.service";
import { TOKEN_NAME } from "../services/local-storage.service";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  headers: HttpHeaders;
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.injector.get(LocalStorageService).getValue(TOKEN_NAME);
    let headerJson = {
      "Content-Type": "application/json",
      'Accept': "application/json"
    };

    if (token) {
      headerJson["Authorization"] = `Bearer ${token}`;
    }

    request = request.clone({ headers: new HttpHeaders(headerJson) });
    return next.handle(request);
  }
}

import { JwtModule ,JwtModuleOptions} from "@auth0/angular-jwt";

export function gettoken (){
  return localStorage.getItem(TOKEN_NAME);
};

const jwtConf: JwtModuleOptions = {
  config: {
    tokenGetter: gettoken
  }
}

@NgModule({
  imports: [
    JwtModule.forRoot(
      jwtConf
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class InterceptorModule {}
