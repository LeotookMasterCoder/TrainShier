import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  datos:any[]=[
    {fecha:'2025-09-08', producto:'Transferencias', total:25000, estado:'Completada'},
    {fecha:'2025-07-04', producto:'Retiro', total:30000, estado:'Cancelada'},
    {fecha:'2025-03-02', producto:'Depósito', total:20000, estado:'Pendiente'}
  ];

  getCompletadas(){
    return this.datos.filter(d=>d.estado==='Completada').length;
  }

  getCanceladas(){
    return this.datos.filter(d=>d.estado==='Cancelada').length;
  }

  getEfectividad(){
    return Math.round((this.getCompletadas()*100)/(this.datos.length||1));
  }

}