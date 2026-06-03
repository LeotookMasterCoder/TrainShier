import { Component, OnInit } from '@angular/core';

@Component({
  selector:'app-statistics',
  templateUrl:'./statistics.component.html',
  styleUrls:['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{

  totalUsers:number=42;

  totalTransactions:number=387;

  totalSimulations:number=215;

  successRate:number=91;

  totalCustomers:number=653;

  productsSold:number=1248;

  instructors:number=6;

  apprentices:number=36;

  bestScore:number=100;

  averageScore:number=91;

  totalErrors:number=38;

  activeSimulations:number=8;

  ranking:any[]=[

    {
      name:'Laura Gómez',
      role:'APRENDIZ',
      effectiveness:98,
      simulations:34
    },

    {
      name:'Carlos Ruiz',
      role:'APRENDIZ',
      effectiveness:96,
      simulations:29
    },

    {
      name:'Valentina Castro',
      role:'APRENDIZ',
      effectiveness:94,
      simulations:27
    },

    {
      name:'Julián Pérez',
      role:'APRENDIZ',
      effectiveness:92,
      simulations:25
    },

    {
      name:'Andrés Moreno',
      role:'APRENDIZ',
      effectiveness:89,
      simulations:20
    }

  ];

  ngOnInit(): void {

    this.loadStatistics();

  }

  loadStatistics():void{

    this.totalUsers=
      Number(localStorage.getItem('totalUsers'))
      || this.totalUsers;

    this.totalTransactions=
      Number(localStorage.getItem('totalTransactions'))
      || this.totalTransactions;

    this.totalSimulations=
      Number(localStorage.getItem('totalSimulations'))
      || this.totalSimulations;

  }

}
