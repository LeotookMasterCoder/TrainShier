import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reports: any[] = [];

  constructor(private service: ReportService){}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(){
    this.service.getAll().subscribe((res: any) => {
      this.reports = res;
    });
  }
}
