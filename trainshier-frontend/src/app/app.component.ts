import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.scss']
})

export class AppComponent{

  constructor(private router:Router){}

  showNavbar():boolean{

    return ![
      '/',
      '/login',
      '/register',
      '/recover-password'
    ].includes(this.router.url);
  }
}
