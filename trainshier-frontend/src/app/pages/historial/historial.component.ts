import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {

  datos:any[]=[
    {fecha:'2025-06-07',practica:'Configuracion',duracion:'50m',estado:'Fallida'},
    {fecha:'2025-03-05',practica:'Simulacion',duracion:'1h',estado:'Completada'}
  ];

}
