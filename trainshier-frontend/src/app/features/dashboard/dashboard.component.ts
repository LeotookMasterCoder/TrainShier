import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) {}

  enterObserver(): void {

    localStorage.setItem('role', 'OBSERVADOR');
    localStorage.setItem('name', 'Usuario Observador');

    this.router.navigate(['/home']);

  }

}
