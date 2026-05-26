import { Component } from '@angular/core';

@Component({
  selector:'app-simulator',
  templateUrl:'./simulator.component.html',
  styleUrls:['./simulator.component.scss']
})
export class SimulatorComponent {

  products=[
    {
      name:'Arroz',
      price:12
    },
    {
      name:'Leche',
      price:8
    },
    {
      name:'Pan',
      price:5
    },
    {
      name:'Huevos',
      price:15
    },
    {
      name:'Gaseosa',
      price:7
    }
  ];

  cart:any[]=[];

  total=0;

  payment=0;

  resultMessage='';

  success=false;

  currentClient={
    name:'Cliente',
    money:Math.floor(Math.random()*500)+100
  };

  rfidCard='';

  barcode='';

  addProduct(product:any){

    this.cart.push(product);

    this.total+=product.price;
  }

  applyDiscount(){

    this.total=this.total-(this.total*0.1);

    this.resultMessage='Descuento aplicado';
    this.success=true;
  }

  processPayment(){

    if(this.payment < this.total){

      this.resultMessage='Dinero insuficiente';
      this.success=false;
      return;
    }

    const change=this.payment-this.total;

    this.resultMessage=
    'Pago exitoso | Cambio: $'+change;

    this.success=true;

    alert('Examen finalizado correctamente');

    this.nextClient();
  }

  cancelPurchase(){

    this.cart=[];

    this.total=0;

    this.payment=0;

    this.resultMessage='Compra cancelada';

    this.success=false;
  }

  nextClient(){

    this.cart=[];

    this.total=0;

    this.payment=0;

    this.currentClient={
      name:'Cliente '+Math.floor(Math.random()*100),
      money:Math.floor(Math.random()*500)+100
    };
  }

  processRFID(){

    if(this.rfidCard.trim().length < 5){

      this.resultMessage='Tarjeta RFID inválida';
      this.success=false;
      return;
    }

    this.resultMessage='Tarjeta RFID escaneada correctamente';
    this.success=true;
  }

  scanProduct(){

    if(this.barcode.trim().length < 3){

      this.resultMessage='Código inválido';
      this.success=false;
      return;
    }

    this.resultMessage='Producto escaneado correctamente';
    this.success=true;
  }
}
