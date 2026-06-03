import { Component } from '@angular/core';

@Component({
  selector:'app-report-list',
  templateUrl:'./report-list.component.html',
  styleUrls:['./report-list.component.scss']
})
export class ReportListComponent{

  reports = [
    {
      title:'Reporte semanal',
      description:'Rendimiento de aprendices',
      status:'Completado'
    },
    {
      title:'Reporte mensual',
      description:'Análisis de caja',
      status:'Pendiente'
    }
  ];

}
