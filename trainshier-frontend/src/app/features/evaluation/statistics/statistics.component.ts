import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  data: any = null;

  constructor(private service: ReportService){}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(){

    this.service.getStatistics().subscribe({

      next: (res: any) => {
        this.data = res;
      },

      error: () => {

        this.data = {
          totalSimulations: 0,
          averageScore: 0,
          successPayments: 0,
          rejectedSales: 0
        };

      }

    });

  }

}
