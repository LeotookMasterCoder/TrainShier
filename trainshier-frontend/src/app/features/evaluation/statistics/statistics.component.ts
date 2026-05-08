import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  data: any;

  constructor(private service: ReportService){}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(){

    this.service.getStatistics().subscribe((res: any) => {
      this.data = res;
    });
  }
}
