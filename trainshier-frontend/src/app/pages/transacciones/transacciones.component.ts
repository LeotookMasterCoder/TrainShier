import { Component } from '@angular/core';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent {

  datos:any[]=[
    {id:101,fecha:'2025-08-14',tipo:'Venta',cliente:'C001',producto:'P45',cantidad:10,total:30000,estado:'ok'},
    {id:102,fecha:'2025-09-01',tipo:'Devolución',cliente:'C002',producto:'P10',cantidad:2,total:-32000,estado:'bad'}
  ];

}
