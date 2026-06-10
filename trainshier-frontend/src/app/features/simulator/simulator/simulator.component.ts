import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  code: string;
  barcode: string;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface Sale {
  product: string;
  quantity: number;
  total: number;
  date: string;
}

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {

  role: string = 'APRENDIZ';

  simulationStarted = false;
  simulationFinished = false;

  successMessage = '';
  errorMessage = '';

  score = 0;

  salesCount = 0;
  servedProducts = 0;
  totalClients = 0;

  timeLeft = 60;
  timer: any;

  difficulty = 'MEDIA';

  traineeResponse = '';

  coachFeedback = '';

  customerSatisfaction = 100;

  saleDate =
    new Date().toISOString().split('T')[0];

  specialEvent = 'Día Normal';

  specialDiscount = 0;

  discountValue = 0;

  currentCustomer: any = {
    name: '',
    mood: '',
    patience: 5,
    request: '',
    message: ''
  };

  customers = [

    {
      name: 'Laura Gómez',
      mood: 'Feliz',
      patience: 5,
      request: '2 Leches y 1 Pan',
      message:
      'Buenos días, necesito dos leches y un pan por favor.'
    },

    {
      name: 'Carlos Ruiz',
      mood: 'Apurado',
      patience: 2,
      request: '1 Chocolate',
      message:
      'Tengo poco tiempo, por favor atiéndeme rápido.'
    },

    {
      name: 'Martha Díaz',
      mood: 'Molesta',
      patience: 1,
      request: '1 Arroz Premium',
      message:
      'La vez pasada me cobraron mal.'
    },

    {
      name: 'Valentina Castro',
      mood: 'Impaciente',
      patience: 2,
      request: '3 Gaseosas',
      message:
      '¿Falta mucho para terminar?'
    },

    {
      name: 'Andrés Moreno',
      mood: 'Tranquilo',
      patience: 5,
      request: '2 Chocolates',
      message:
      'Gracias por atenderme.'
    }

  ];

  products: Product[] = [];

  newProduct = {
    name: '',
    code: '',
    barcode: '',
    price: 0,
    stock: 0
  };

  cart: CartItem[] = [];

  productCode = '';

  subtotal = 0;

  ivaPercentage = 19;

  ivaValue = 0;

  totalToPay = 0;

  paymentMethod = 'Efectivo';

  cashReceived = 0;

  change = 0;

  salesHistory: Sale[] = [];

  ngOnInit(): void {

    const savedRole =
      localStorage.getItem('role');

    if (savedRole) {
      this.role = savedRole.toUpperCase();
    }

    this.loadProducts();

    this.loadSalesHistory();

    this.generateCustomer();

    this.updateSpecialDay();

  }


  loadProducts(): void {

    const savedProducts =
      localStorage.getItem('trainshier_products');

    if (savedProducts) {

      this.products =
        JSON.parse(savedProducts);

      return;

    }

    this.products = [

      {
        id: 1,
        code: '1001',
        barcode: '7701001001',
        name: 'Leche 1L',
        price: 4500,
        stock: 50
      },

      {
        id: 2,
        code: '1002',
        barcode: '7701001002',
        name: 'Pan Integral',
        price: 5500,
        stock: 40
      },

      {
        id: 3,
        code: '1003',
        barcode: '7701001003',
        name: 'Chocolate',
        price: 3000,
        stock: 60
      },

      {
        id: 4,
        code: '1004',
        barcode: '7701001004',
        name: 'Arroz Premium',
        price: 8000,
        stock: 35
      },

      {
        id: 5,
        code: '1005',
        barcode: '7701001005',
        name: 'Gaseosa Cola',
        price: 6000,
        stock: 80
      }

    ];

    this.saveProducts();

  }

  saveProducts(): void {

    localStorage.setItem(
      'trainshier_products',
      JSON.stringify(this.products)
    );

  }

  loadSalesHistory(): void {

    const saved =
      localStorage.getItem('trainshier_sales');

    if (saved) {

      this.salesHistory =
        JSON.parse(saved);

    }

  }

  saveSalesHistory(): void {

    localStorage.setItem(
      'trainshier_sales',
      JSON.stringify(this.salesHistory)
    );

  }

  generateCustomer(): void {

    const randomIndex =
      Math.floor(
        Math.random() * this.customers.length
      );

    this.currentCustomer =
      this.customers[randomIndex];

    this.customerSatisfaction = 100;

    this.totalClients++;

  }

  updateSpecialDay(): void {

    const date =
      new Date(this.saleDate);

    const day =
      date.getDate();

    const month =
      date.getMonth() + 1;

    this.specialEvent =
      'Día Normal';

    this.specialDiscount = 0;

    if (
      month === 1 &&
      day === 1
    ) {

      this.specialEvent =
        'Año Nuevo';

      this.specialDiscount = 25;

    }

    else if (
      month === 2 &&
      day === 14
    ) {

      this.specialEvent =
        'San Valentín';

      this.specialDiscount = 10;

    }

    else if (
      month === 10 &&
      day === 31
    ) {

      this.specialEvent =
        'Halloween';

      this.specialDiscount = 15;

    }

    else if (
      month === 12 &&
      day === 24
    ) {

      this.specialEvent =
        'Navidad';

      this.specialDiscount = 20;

    }

  }

  addProduct(): void {

    if (
      !this.newProduct.name ||
      !this.newProduct.code
    ) {
      return;
    }

    const product: Product = {

      id: Date.now(),

      name: this.newProduct.name,

      code: this.newProduct.code,

      barcode: this.newProduct.barcode,

      price: this.newProduct.price,

      stock: this.newProduct.stock

    };

    this.products.push(product);

    this.saveProducts();

    this.newProduct = {
      name: '',
      code: '',
      barcode: '',
      price: 0,
      stock: 0
    };

  }

  editProduct(product: Product): void {

    const newPrice =
      prompt(
        'Nuevo precio',
        product.price.toString()
      );

    if (newPrice) {

      product.price =
        Number(newPrice);

      this.saveProducts();

    }

  }

deleteProduct(product: Product): void {

  const confirmed =
    confirm(
      '¿Eliminar producto?'
    );

  if (!confirmed) {
    return;
  }

  this.products =
    this.products.filter(
      p => p.id !== product.id
    );

  this.saveProducts();

}
    startSimulation(): void {

      if (this.role === 'OBSERVADOR') {

        this.errorMessage =
          'Los observadores no pueden iniciar simulaciones';

        return;

      }

      this.simulationStarted = true;

      this.successMessage =
        'Simulación iniciada';

      this.errorMessage = '';

      clearInterval(this.timer);

      this.setDifficultyTime();

      this.timer = setInterval(() => {

        this.timeLeft--;

        if (this.timeLeft <= 0) {

          clearInterval(this.timer);

          this.customerSatisfaction -= 30;

          this.errorMessage =
            'El cliente perdió la paciencia';

        }

      }, 1000);

    }

    setDifficultyTime(): void {

      switch (this.difficulty) {

        case 'FACIL':
          this.timeLeft = 120;
          break;

        case 'MEDIA':
          this.timeLeft = 90;
          break;

        case 'DIFICIL':
          this.timeLeft = 45;
          break;

        default:
          this.timeLeft = 90;

      }

    }


    registerByCode(): void {

      if (!this.productCode) {
        return;
      }

      const product = this.products.find(

        p =>
          p.code === this.productCode ||
          p.barcode === this.productCode

      );

      if (!product) {

        this.errorMessage =
          'Producto no encontrado';

        return;

      }

      if (product.stock <= 0) {

        this.errorMessage =
          'Producto sin stock';

        return;

      }

      this.addToCart(product);

      this.productCode = '';

    }

    simulateBarcodeScan(): void {

      if (this.products.length === 0) {
        return;
      }

      const randomProduct =

        this.products[
          Math.floor(
            Math.random() *
            this.products.length
          )
        ];

      this.productCode =
        randomProduct.barcode;

      this.registerByCode();

    }

    addToCart(product: Product): void {

      const existingItem =
        this.cart.find(

          item =>
            item.code === product.code

        );

      if (existingItem) {

        existingItem.quantity++;

        existingItem.subtotal =
          existingItem.quantity *
          existingItem.price;

      }

      else {

        this.cart.push({

          code: product.code,

          name: product.name,

          price: product.price,

          quantity: 1,

          subtotal: product.price

        });

      }

      this.calculateTotals();

    }

    increaseQuantity(item: CartItem): void {

      item.quantity++;

      item.subtotal =
        item.quantity *
        item.price;

      this.calculateTotals();

    }

    decreaseQuantity(item: CartItem): void {

      if (item.quantity <= 1) {

        this.removeItem(item);

        return;

      }

      item.quantity--;

      item.subtotal =
        item.quantity *
        item.price;

      this.calculateTotals();

    }

    removeItem(item: CartItem): void {

      this.cart =
        this.cart.filter(

          p => p !== item

        );

      this.calculateTotals();

    }

    clearCart(): void {

      this.cart = [];

      this.calculateTotals();

    }

    calculateTotals(): void {

      this.subtotal = 0;

      this.cart.forEach(item => {

        this.subtotal +=
          item.subtotal;

      });

      this.ivaValue =

        this.subtotal *
        (this.ivaPercentage / 100);

      this.discountValue =

        this.subtotal *
        (this.specialDiscount / 100);

      this.totalToPay =

        this.subtotal +
        this.ivaValue -
        this.discountValue;

      this.calculatePayment();

    }

    calculatePayment(): void {

      if (

        this.paymentMethod !== 'Efectivo'

      ) {

        this.change = 0;

        return;

      }

      this.change =

        this.cashReceived -
        this.totalToPay;

    }

    registerSale(): void {

      if (this.cart.length === 0) {

        this.errorMessage =
          'No hay productos registrados';

        return;

      }

      if (

        this.paymentMethod === 'Efectivo' &&
        this.cashReceived < this.totalToPay

      ) {

        this.errorMessage =
          'Dinero insuficiente';

        return;

      }

      this.cart.forEach(item => {

        const product =
          this.products.find(

            p =>
              p.code === item.code

          );

        if (product) {

          product.stock -=
            item.quantity;

        }

        this.salesHistory.push({

          product:
            item.name,

          quantity:
            item.quantity,

          total:
            item.subtotal,

          date:
            new Date()
              .toLocaleString()

        });

      });

      this.saveProducts();

      this.saveSalesHistory();

      this.salesCount++;

      this.servedProducts +=
        this.cart.length;

      this.score += 100;

      this.successMessage =
        'Venta registrada correctamente';

      this.errorMessage = '';

      this.customerSatisfaction =
        Math.min(
          100,
          this.customerSatisfaction + 10
        );

      this.clearCart();

      this.cashReceived = 0;

      this.change = 0;

      this.generateCustomer();

    }

    evaluateResponse(): void {

      const response =

        this.traineeResponse
        .toLowerCase();

      if (

        response.includes('buenos') ||
        response.includes('gracias') ||
        response.includes('claro') ||
        response.includes('ayudar')

      ) {

        this.coachFeedback =

          'Excelente atención al cliente. Respuesta amable y profesional.';

        this.score += 25;

        this.customerSatisfaction += 5;

      }

      else {

        this.coachFeedback =

          'La respuesta puede mejorar. Usa lenguaje amable y cordial.';

        this.score -= 5;

        this.customerSatisfaction -= 5;

      }

    }

    finishSimulation(): void {

      clearInterval(this.timer);

      this.simulationFinished = true;

      this.simulationStarted = false;

      this.successMessage =
        'Simulación finalizada';

    }

    resetSimulation(): void {

      clearInterval(this.timer);

      this.simulationStarted = false;
      this.simulationFinished = false;

      this.cart = [];

      this.subtotal = 0;
      this.ivaValue = 0;
      this.discountValue = 0;
      this.totalToPay = 0;

      this.cashReceived = 0;
      this.change = 0;

      this.score = 0;

      this.salesCount = 0;
      this.servedProducts = 0;

      this.customerSatisfaction = 100;

      this.successMessage = '';
      this.errorMessage = '';

      this.coachFeedback = '';
      this.traineeResponse = '';

      this.generateCustomer();

    }

  }
