import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role:string='OBSERVADOR';
  userName:string='Invitado';

  ngOnInit(): void {

    this.role = localStorage.getItem('role') || 'OBSERVADOR';

    this.userName =
      localStorage.getItem('name') ||
      'Invitado';

  }

}
