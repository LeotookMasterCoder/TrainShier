import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  darkMode = false;

  constructor(
    private router: Router,
    private token: TokenService
  ){}

  logout(){

    this.token.clear();

    this.router.navigate(['/login']);
  }

  isLogged(){

    return this.token.get() != null;
  }

  showNavbar(): boolean {

    return ![
      '/',
      '/login',
      '/register',
      '/recover-password'
    ].includes(this.router.url);
  }

  toggleTheme(){

    this.darkMode = !this.darkMode;

    document.body.classList.toggle('dark-mode');
  }
}
