import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportsComponent implements OnInit{

  totalUsers:number=18;

  totalTransactions:number=145;

  totalSimulations:number=312;

  averageScore:number=91;

  users:any[]=[

    {
      name:'Laura Gómez',
      role:'APRENDIZ',
      simulations:22,
      effectiveness:94
    },

    {
      name:'Carlos Ruiz',
      role:'APRENDIZ',
      simulations:18,
      effectiveness:87
    },

    {
      name:'Martha Díaz',
      role:'INSTRUCTOR',
      simulations:0,
      effectiveness:100
    }

  ];

  ngOnInit():void{}

}
