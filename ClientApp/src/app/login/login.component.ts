import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export interface IResponse {
    success: boolean;
    token: string;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    invalid = false;
    loading = false;
    loginForm = new FormGroup({
        login: new FormControl(''),
        password: new FormControl('')
    })
    errorMsg = '';
    subscription: Subscription;
    constructor(private authService: AuthService, private router: Router) {

    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['admin']);
        }
    }
    public onLogin() {
        if (this.loginForm.valid) {
            this.loading = true;
            this.subscription = this.authService.logIn(this.loginForm.value)
                .subscribe(
                    (response: IResponse) => {
                        if (!response.success) {
                            this.invalid = true;
                            this.errorMsg = 'Wrong login or password';
                        }
                        this.loading = false;
                        this.authService.saveToken(response.token);
                        this.router.navigate(['admin']);
                    },
                    (error: HttpErrorResponse) => {
                        this.errorMsg = error.statusText;
                        this.invalid = true;
                        this.loading = false;
                    }
                );
        }
    }
}
