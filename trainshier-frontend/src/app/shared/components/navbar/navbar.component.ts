import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:'app-navbar',
  templateUrl:'./navbar.component.html',
  styleUrls:['./navbar.component.scss']
})
export class NavbarComponent{

  darkMode:boolean=false;

  isLoggedIn:boolean=false;

  role:string='OBSERVADOR';

  profileImage:string='assets/img/default-profile.png';

  constructor(
    private router:Router
  ){

    const savedTheme=localStorage.getItem('theme');

    if(savedTheme==='dark'){

      this.darkMode=true;
      document.body.classList.add('dark-mode');

    }

    const savedRole=localStorage.getItem('role');

    if(savedRole){

      this.role=savedRole.toUpperCase();

    }

    const token=localStorage.getItem('token');

    if(token){

      this.isLoggedIn=true;

    }

    const savedImage=
      localStorage.getItem('profileImage');

    if(savedImage){

      this.profileImage=savedImage;

    }

  }

  isObserver():boolean{

    return this.role==='OBSERVADOR';

  }

  toggleTheme():void{

    this.darkMode=!this.darkMode;

    if(this.darkMode){

      document.body.classList.add('dark-mode');
      localStorage.setItem('theme','dark');

    }else{

      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme','light');

    }

  }

  logout():void{

    localStorage.clear();

    this.router.navigate(['/dashboard']);

  }

}
