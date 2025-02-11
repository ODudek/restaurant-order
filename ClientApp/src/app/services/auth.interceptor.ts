import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authSerivce: AuthService) {
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authSerivce.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", token)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}