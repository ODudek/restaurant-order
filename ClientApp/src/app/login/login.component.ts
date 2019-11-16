import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    loginForm = new FormGroup({
        login: new FormControl(''),
        password: new FormControl('')
    })
    subscription: Subscription;
    constructor(private loginService: LoginService, private router: Router) {

    }
    public onLogin() {
        if (this.loginForm.valid) {
            this.subscription = this.loginService.logIn(this.loginForm.value)
                .subscribe(
                    (response: any) => {
                        this.router.navigate(['/admin']);
                    }
                );
        }
    }
}
