import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

interface LoginBody {
    login: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    isLogged: BehaviorSubject<boolean>;
    baseUrl: string
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        this.baseUrl = baseUrl;
    }

    public logIn(body: LoginBody) {
        
        return this.http.post(this.baseUrl + environment.LOGIN_URL, 
            body
           ).pipe(
               map((response: any) => {
                  this.isLogged.next(response);
                  return response;
               }
            ));
    }

}