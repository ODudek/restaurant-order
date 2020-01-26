import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isLogged.pipe(map(logged => {
            if (!logged) {
                this.router.navigate(['login']);
                return logged;
            }
            return logged;
        })
        )
    }
}