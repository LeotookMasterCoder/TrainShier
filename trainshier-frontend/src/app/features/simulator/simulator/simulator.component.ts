import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {

  products = [

    {
      name: 'Milk',
      price: 2000
    },

    {
      name: 'Bread',
      price: 3500
    },

    {
      name: 'Rice',
      price: 5000
    },

    {
      name: 'Eggs',
      price: 12000
    },

    {
      name: 'Chicken',
      price: 18000
    }
  ];

  cart: any[] = [];

  total = 0;

  received = 0;

  change = 0;

  statusMessage = '';

  statusType = '';

  currentClient: any;

  simulatedClients = [

    {
      name: 'Carlos',
      mood: 'Calm',
      budget: 50000
    },

    {
      name: 'Laura',
      mood: 'Angry',
      budget: 15000
    },

    {
      name: 'Andres',
      mood: 'Fast',
      budget: 30000
    },

    {
      name: 'Valentina',
      mood: 'Distracted',
      budget: 25000
    }
  ];

  ngOnInit(): void {
    this.nextClient();
  }

  nextClient(){

    const random =
      Math.floor(
        Math.random() *
        this.simulatedClients.length
      );

    this.currentClient =
      this.simulatedClients[random];

    this.cart = [];

    this.total = 0;

    this.received = 0;

    this.change = 0;

    this.statusMessage = '';
  }

  addProduct(product: any){

    this.cart.push(product);

    this.calculateTotal();
  }

  calculateTotal(){

    this.total = this.cart.reduce(
      (acc, item) => acc + item.price,
      0
    );
  }

  applyDiscount(){

    this.total =
      this.total - (this.total * 0.10);

    this.statusMessage =
      '10% discount applied';

    this.statusType = 'success';
  }

  processPayment(){

    if(this.received < this.total){

      this.statusMessage =
        'Insufficient payment';

      this.statusType = 'error';

      return;
    }

    this.change =
      this.received - this.total;

    this.statusMessage =
      'Successful payment';

    this.statusType = 'success';
  }

  cancelSale(){

    this.cart = [];

    this.total = 0;

    this.received = 0;

    this.change = 0;

    this.statusMessage =
      'Sale cancelled';

    this.statusType = 'error';
  }
}
