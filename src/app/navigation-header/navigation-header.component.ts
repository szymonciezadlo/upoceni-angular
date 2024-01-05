import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent {
  today: Date = new Date();
  constructor(private authService: AuthService){}

  isLogged(){
    return this.authService.isAuthenticated();
  }

  deleteCookie() {
    document.cookie = '';
  }
}
