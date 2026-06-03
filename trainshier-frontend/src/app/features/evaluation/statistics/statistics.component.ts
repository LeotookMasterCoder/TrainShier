import { Component } from '@angular/core';

@Component({
  selector:'app-statistics',
  templateUrl:'./statistics.component.html',
  styleUrls:['./statistics.component.scss']
})
export class StatisticsComponent{

  stats = [
    {
      title:'Simulaciones exitosas',
      value:'92%'
    },
    {
      title:'Tiempo promedio',
      value:'38s'
    },
    {
      title:'Aprendices activos',
      value:'245'
    }
  ];

}
