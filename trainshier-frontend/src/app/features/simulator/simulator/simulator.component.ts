import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})

export class SimulatorComponent implements OnInit {

  tutorialVisible = true;

  currentTip = '';

  copilotMessage = '';

  currentClient: any;

  products = [

    {
      name:'Leche',
      price:4000
    },

    {
      name:'Pan',
      price:3000
    },

    {
      name:'Huevos',
      price:14000
    },

    {
      name:'Pollo',
      price:28000
    },

    {
      name:'Arroz',
      price:6000
    }

  ];

  clients = [

    {
      name:'Carlos',
      mood:'Molesto',
      budget:20000
    },

    {
      name:'Laura',
      mood:'Feliz',
      budget:50000
    },

    {
      name:'Andres',
      mood:'Apurado',
      budget:15000
    }

  ];

  cart:any[] = [];

  total = 0;

  received = 0;

  change = 0;

  statusMessage = '';

  statusType = '';

  successTransactions = 0;

  failedTransactions = 0;

  tips = [

    'Escanea correctamente los productos.',
    'Valida el dinero recibido.',
    'Aplica descuentos cuando sea necesario.',
    'Entrega el cambio exacto.',
    'Mantén una buena atención al cliente.'

  ];

  ngOnInit(): void {

    this.nextClient();

    this.randomTip();

  }

  startPractice(){

    this.tutorialVisible = false;

  }

  randomTip(){

    const randomIndex =
      Math.floor(Math.random() * this.tips.length);

    this.currentTip = this.tips[randomIndex];

  }

  nextClient(){

    const randomIndex =
      Math.floor(Math.random() * this.clients.length);

    this.currentClient = this.clients[randomIndex];

    this.generateCopilotMessage();

    this.cart = [];

    this.total = 0;

    this.received = 0;

    this.change = 0;

    this.statusMessage = '';

  }

  generateCopilotMessage(){

    if(this.currentClient.mood === 'Molesto'){

      this.copilotMessage =
        'Copilot IA: El cliente está molesto, atiéndelo rápido y con precisión.';

    }

    else if(this.currentClient.mood === 'Apurado'){

      this.copilotMessage =
        'Copilot IA: El cliente tiene poco tiempo, evita errores en caja.';

    }

    else{

      this.copilotMessage =
        'Copilot IA: Cliente tranquilo, aprovecha para brindar buena atención.';

    }

  }

  addProduct(product:any){

    this.cart.push(product);

    this.calculateTotal();

  }

  calculateTotal(){

    this.total = this.cart.reduce(
      (acc,item) => acc + item.price,
      0
    );

  }

  applyDiscount(){

    this.total =
      this.total - (this.total * 0.10);

    this.statusMessage =
      'Descuento aplicado correctamente';

    this.statusType = 'success';

  }

  processPayment(){

    if(this.received < this.total){

      this.statusMessage =
        'Fondos insuficientes';

      this.statusType = 'error';

      this.failedTransactions++;

      return;

    }

    this.change =
      this.received - this.total;

    this.statusMessage =
      'Pago realizado correctamente';

    this.statusType = 'success';

    this.successTransactions++;

  }

  cancelSale(){

    this.cart = [];

    this.total = 0;

    this.received = 0;

    this.change = 0;

    this.statusMessage =
      'Venta cancelada';

    this.statusType = 'error';

  }

}
