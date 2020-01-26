import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IResponse } from '../login/login.component';
import { JwtHelperService } from "@auth0/angular-jwt";

interface LoginBody {
    login: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
    baseUrl: string
    helper: JwtHelperService;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
        this.helper = new JwtHelperService();
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        if (!this.helper.isTokenExpired(token)) {
            this.isLogged.next(true);
        } else {
            this.isLogged.next(false);
        }
        return true
    }

    public logIn(body: LoginBody) {
        return this.http.post(this.baseUrl + environment.LOGIN_URL,
            body
        ).pipe(
            map((response: IResponse) => {
                this.isLogged.next(response.success);
                return response;
            }
            ));
    }

    public saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    public removeToken() {
        localStorage.removeItem('token')
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public validateToken() {

    }
}