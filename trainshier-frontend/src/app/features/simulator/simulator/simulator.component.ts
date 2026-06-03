import { Component, OnInit } from '@angular/core';

@Component({
  selector:'app-simulator',
  templateUrl:'./simulator.component.html',
  styleUrls:['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit{

  role:string='observador';

  simulationStarted:boolean=false;

  successMessage:string='';
  errorMessage:string='';

  successCount:number=0;
  failCount:number=0;
  servedProducts:number=0;

  totalClients:number=0;

  timeLeft:number=60;

  timer:any;

  simulationFinished:boolean=false;

  currentCustomer:any={
    name:'Cliente pendiente',
    mood:'Neutral',
    product:'Ninguno',
    time:60
  };

  customers:any[]=[

    {
      name:'Laura Gómez',
      mood:'Feliz',
      product:'Leche 3 L',
      time:60
    },

    {
      name:'Carlos Ruiz',
      mood:'Apurado',
      product:'Pan Integral',
      time:45
    },

    {
      name:'Martha Díaz',
      mood:'Molesta',
      product:'Chocolate',
      time:35
    },

    {
      name:'Julián Pérez',
      mood:'Tranquilo',
      product:'Arroz Premium',
      time:55
    },

    {
      name:'Valentina Castro',
      mood:'Impaciente',
      product:'Queso Mozzarella',
      time:40
    },

    {
      name:'Andrés Moreno',
      mood:'Serio',
      product:'Gaseosa Cola',
      time:50
    }

  ];

  products:any[]=[

    {
      name:'Leche 3 L',
      description:'Leche deslactosada premium',
      price:12000,
      image:'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1200&auto=format&fit=crop'
    },

    {
      name:'Pan Integral',
      description:'Pan fresco integral',
      price:8500,
      image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop'
    },

    {
      name:'Chocolate',
      description:'Chocolate tradicional',
      price:4000,
      image:'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop'
    },

    {
      name:'Arroz Premium',
      description:'Arroz de alta calidad',
      price:7000,
      image:'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop'
    },

    {
      name:'Queso Mozzarella',
      description:'Queso fresco premium',
      price:15000,
      image:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1200&auto=format&fit=crop'
    },

    {
      name:'Gaseosa Cola',
      description:'Bebida gaseosa fría',
      price:6000,
      image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop'
    }

  ];

  ngOnInit():void{

    const savedRole=localStorage.getItem('role');

    if(savedRole){
      this.role=savedRole;
    }

    this.generateCustomer();

  }

  generateCustomer():void{

    const random=
    this.customers[
      Math.floor(Math.random()*this.customers.length)
    ];

    this.currentCustomer=random;

    this.timeLeft=random.time;

    this.totalClients++;

  }

  startSimulation():void{

    if(this.role==='observador'){

      this.errorMessage=
      'Los observadores no pueden acceder al simulador';

      return;

    }

    this.simulationStarted=true;

    this.simulationFinished=false;

    this.successMessage=
    'Simulación iniciada correctamente';

    this.errorMessage='';

    clearInterval(this.timer);

    this.timer=setInterval(()=>{

      this.timeLeft--;

      if(this.timeLeft<=0){

        this.failCount++;

        this.errorMessage=
        'Tiempo agotado. El cliente se fue molesto.';

        this.successMessage='';

        this.generateCustomer();

      }

    },1000);

  }

  finishSimulation():void{

    clearInterval(this.timer);

    this.simulationStarted=false;

    this.simulationFinished=true;

    this.errorMessage='';

    this.successMessage=
    'La simulación finalizó correctamente';

  }

  selectProduct(product:any):void{

    if(!this.simulationStarted){

      this.errorMessage=
      'Debes iniciar la simulación primero';

      this.successMessage='';

      return;

    }

    if(product.name===this.currentCustomer.product){

      this.successMessage=
      'Cliente atendido correctamente';

      this.errorMessage='';

      this.successCount++;

      this.servedProducts++;

      clearInterval(this.timer);

      setTimeout(()=>{

        this.generateCustomer();

        this.startSimulation();

      },1500);

    }else{

      this.errorMessage=
      'Producto incorrecto para el cliente';

      this.successMessage='';

      this.failCount++;

    }

  }

  resetSimulation():void{

    clearInterval(this.timer);

    this.successCount=0;

    this.failCount=0;

    this.servedProducts=0;

    this.totalClients=0;

    this.simulationStarted=false;

    this.simulationFinished=false;

    this.successMessage='';

    this.errorMessage='';

    this.generateCustomer();

  }

}
