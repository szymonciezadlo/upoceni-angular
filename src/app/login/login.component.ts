import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(authForm: NgForm) {
    this.authService
      .login(authForm.form.value.username, authForm.form.value.password)
      .subscribe((user) => {
        console.log(user);
        if (user) {
          this.router.navigate(['user/',user.id,'games'])
        } else {

        }
      });
    this.authService.test();
    if (!authForm.valid) {
      return;
    }
  }
}
