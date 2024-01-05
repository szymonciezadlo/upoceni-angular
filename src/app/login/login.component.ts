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
    if (!authForm.valid) {
      return;
    }
    this.authService
      .login(authForm.form.value.username, authForm.form.value.password)
      .subscribe((user) => {
        if (user) {
          let date = new Date()
          this.router.navigate(['user/games/' + date.getFullYear() +'/' + date.getMonth()])
        }
      });

  }
}
