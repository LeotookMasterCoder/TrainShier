import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showMenu = false;

  profileImage =
    localStorage.getItem('profileImage') ||
    '/assets/img/default-profile.png';

  constructor(private router: Router){}

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  changeTheme(mode: string){

    if(mode === 'dark'){
      document.body.style.background = '#111827';
      document.body.style.color = 'white';
    }

    else{
      document.body.style.background = '#f3f4f6';
      document.body.style.color = '#111827';
    }
  }

  logout(){

    localStorage.clear();

    this.router.navigate(['/']);
  }

}
