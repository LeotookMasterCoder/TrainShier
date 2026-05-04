import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private token: TokenService){}

  logout(){
    this.token.clear();
    this.router.navigate(['/login']);
  }

  isLogged(){
    return this.token.get() != null;
  }
}
