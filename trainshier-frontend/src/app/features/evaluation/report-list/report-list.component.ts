import { Component, OnInit } from '@angular/core';

@Component({
  selector:'app-report-list',
  templateUrl:'./report-list.component.html',
  styleUrls:['./report-list.component.scss']
})
export class ReportListComponent implements OnInit{

  reports:any[]=[];

  ngOnInit():void{

    this.reports=[
      {
        apprentice:'Darwing',
        transactions:24,
        averageTime:'2m 15s',
        errors:1,
        score:96
      },
      {
        apprentice:'Carlos',
        transactions:15,
        averageTime:'3m 10s',
        errors:4,
        score:78
      },
      {
        apprentice:'Laura',
        transactions:31,
        averageTime:'1m 55s',
        errors:0,
        score:99
      }
    ];

  }

}
