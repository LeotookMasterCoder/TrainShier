import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';

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

interface SimulationSummary {
  finalScore: number;
  totalSalesCount: number;
  totalServedProducts: number;
  totalClientsAttended: number;
  averageSatisfaction: number;
  completionDate: string;
}

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {

  /* =========================================
      ESTADÍSTICAS FLOTANTES
  ========================================= */
  showStats: boolean = false;
  h: boolean = false;
  @ViewChild('statsDropdown') statsDropdown!: ElementRef;

  /* =========================================
      ROLES
  ========================================= */
  role: string = 'APRENDIZ';

  /* =========================================
      ESTADO GENERAL Y MENSAJES (TOASTS)
  ========================================= */
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

  /* =========================================
      REPORTE GUARDADO
  ========================================= */
  savedSimulationReport: SimulationSummary | null = null;

  /* =========================================
      IA COACH
  ========================================= */
  traineeResponse = '';
  coachFeedback = '';
  customerSatisfaction = 100;

  /* =========================================
      CALENDARIO
  ========================================= */
  saleDate = new Date().toISOString().split('T')[0];
  specialEvent = 'Día Normal';
  specialDiscount = 0;
  discountValue = 0;

  /* =========================================
      CLIENTE IA
  ========================================= */
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
      message: 'Buenos días, necesito dos leches y un pan por favor.'
    },
    {
      name: 'Carlos Ruiz',
      mood: 'Apurado',
      patience: 2,
      request: '1 Chocolate',
      message: 'Tengo poco tiempo, por favor atiéndeme rápido.'
    },
    {
      name: 'Martha Díaz',
      mood: 'Molesta',
      patience: 1,
      request: '1 Arroz Premium',
      message: 'La vez pasada me cobraron mal.'
    },
    {
      name: 'Valentina Castro',
      mood: 'Impaciente',
      patience: 2,
      request: '3 Gaseosas',
      message: '¿Falta mucho para terminar?'
    },
    {
      name: 'Andrés Moreno',
      mood: 'Tranquilo',
      patience: 5,
      request: '2 Chocolates',
      message: 'Gracias por atenderme.'
    }
  ];

  /* =========================================
      PRODUCTOS Y BUSCADOR
  ========================================= */
  products: Product[] = [];

  newProduct = {
    name: '',
    code: '',
    barcode: '',
    price: 0,
    stock: 0
  };

  searchQuery: string = '';

  get filteredProducts(): Product[] {
    if (!this.searchQuery.trim()) {
      return this.products;
    }
    const query = this.searchQuery.toLowerCase().trim();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.code.toLowerCase().includes(query)
    );
  }

  /* =========================================
      CARRITO
  ========================================= */
  cart: CartItem[] = [];
  productCode = '';
  subtotal = 0;
  ivaPercentage = 19;
  ivaValue = 0;
  totalToPay = 0;
  paymentMethod = 'Efectivo';
  cashReceived : number | null = null;
  change = 0;

  /* =========================================
      HISTORIAL
  ========================================= */
  salesHistory: Sale[] = [];

  /* =========================================
      INIT
  ========================================= */
  ngOnInit(): void {
    const savedRole = localStorage.getItem('role');

    if (savedRole) {
      this.role = savedRole.toUpperCase();
    }

    this.loadProducts();
    this.loadSalesHistory();
    this.generateCustomer();
    this.updateSpecialDay();
  }

  /* =========================================
      SISTEMA AUXILIAR DE NOTIFICACIONES (TOAST)
  ========================================= */
  private showToast(message: string, isError: boolean = false): void {
    if (isError) {
      this.errorMessage = message;
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 3000);
    } else {
      this.successMessage = message;
      this.errorMessage = '';
      setTimeout(() => this.successMessage = '', 3000);
    }
  }

  /* =========================================
      MÉTODOS CONTROL DE INTERFAZ
  ========================================= */
  toggleStats(event: Event): void {
    event.stopPropagation();
    this.showStats = !this.showStats;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent): void {
    if (
      this.showStats &&
      this.statsDropdown &&
      !this.statsDropdown.nativeElement.contains(event.target)
    ) {
      this.showStats = false;
    }
  }

  /* =========================================
      LOCAL STORAGE
  ========================================= */
  loadProducts(): void {
    const savedProducts = localStorage.getItem('trainshier_products');

    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
      return;
    }

    this.products = [
      { id: 1, code: '1001', barcode: '7701001001', name: 'Leche 1L', price: 4500, stock: 50 },
      { id: 2, code: '1002', barcode: '7701001002', name: 'Pan Integral', price: 5500, stock: 40 },
      { id: 3, code: '1003', barcode: '7701001003', name: 'Chocolate', price: 3000, stock: 60 },
      { id: 4, code: '1004', barcode: '7701001004', name: 'Arroz Premium', price: 8000, stock: 35 },
      { id: 5, code: '1005', barcode: '7701001005', name: 'Gaseosa Cola', price: 6000, stock: 80 }
    ];

    this.saveProducts();
  }

  saveProducts(): void {
    localStorage.setItem('trainshier_products', JSON.stringify(this.products));
  }

  loadSalesHistory(): void {
    const saved = localStorage.getItem('trainshier_sales');
    if (saved) {
      this.salesHistory = JSON.parse(saved);
    }
  }

  saveSalesHistory(): void {
    localStorage.setItem('trainshier_sales', JSON.stringify(this.salesHistory));
  }

  /* =========================================
      CLIENTE IA
  ========================================= */
  generateCustomer(): void {
    const randomIndex = Math.floor(Math.random() * this.customers.length);
    this.currentCustomer = this.customers[randomIndex];
    this.customerSatisfaction = 100;
    this.totalClients++;
  }

  /* =========================================
      CALENDARIO COMERCIAL
  ========================================= */
  updateSpecialDay(): void {
    const date = new Date(this.saleDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    this.specialEvent = 'Día Normal';
    this.specialDiscount = 0;

    if (month === 1 && day === 1) {
      this.specialEvent = 'Año Nuevo';
      this.specialDiscount = 25;
    } else if (month === 2 && day === 14) {
      this.specialEvent = 'San Valentín';
      this.specialDiscount = 10;
    } else if (month === 10 && day === 31) {
      this.specialEvent = 'Halloween';
      this.specialDiscount = 15;
    } else if (month === 12 && day === 24) {
      this.specialEvent = 'Navidad';
      this.specialDiscount = 20;
    }
  }

  /* =========================================
      CRUD PRODUCTOS
  ========================================= */
  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.code) {
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

    this.newProduct = { name: '', code: '', barcode: '', price: 0, stock: 0 };
  }

  editProduct(product: Product): void {
    const newPrice = prompt('Nuevo precio', product.price.toString());
    if (newPrice) {
      product.price = Number(newPrice);
      this.saveProducts();
    }
  }

  deleteProduct(product: Product): void {
    const confirmed = confirm('¿Eliminar producto?');
    if (!confirmed) {
      return;
    }
    this.products = this.products.filter(p => p.id !== product.id);
    this.saveProducts();
  }

  /* =========================================
      SIMULACIÓN Y CONTADOR DE TIEMPO
  ========================================= */
  startSimulation(): void {
    if (this.role === 'OBSERVADOR') {
      this.showToast('Los observadores no pueden iniciar simulaciones', true);
      return;
    }

    this.simulationStarted = true;
    this.showToast('Simulación iniciada');
    this.errorMessage = '';

    clearInterval(this.timer);
    this.setDifficultyTime();

    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.customerSatisfaction = Math.max(0, this.customerSatisfaction - 30);
        this.showToast('El cliente perdió la paciencia', true);
      }
    }, 1000);
  }

  setDifficultyTime(): void {
    let baseTimePerPatiencePoint = 20;

    switch (this.difficulty) {
      case 'FACIL':
        baseTimePerPatiencePoint = 30;
        break;
      case 'MEDIA':
        baseTimePerPatiencePoint = 20;
        break;
      case 'DIFICIL':
        baseTimePerPatiencePoint = 12;
        break;
      default:
        baseTimePerPatiencePoint = 20;
    }

    this.timeLeft = this.currentCustomer.patience * baseTimePerPatiencePoint;
  }

  /* =========================================
      REGISTRO POR CÓDIGO (OPTIMIZADO PISTOLA)
  ========================================= */
  registerByCode(): void {
    if (!this.productCode || !this.productCode.trim()) {
      return;
    }

    const limpiado = this.productCode.trim();

    const product = this.products.find(
      p => p.code === limpiado || p.barcode === limpiado
    );

    if (!product) {
      this.showToast(`Código ${limpiado} no encontrado`, true);
      this.productCode = '';
      return;
    }

    if (product.stock <= 0) {
      this.showToast(`El producto ${product.name} no tiene stock`, true);
      this.productCode = '';
      return;
    }

    this.addToCart(product);
    this.productCode = '';
  }

  /* =========================================
      CARRITO Y CONTROLES DE FLUJO
  ========================================= */
  addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.code === product.code);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
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
    item.subtotal = item.quantity * item.price;
    this.calculateTotals();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity <= 1) {
      this.removeItem(item);
      return;
    }

    item.quantity--;
    item.subtotal = item.quantity * item.price;
    this.calculateTotals();
  }

  removeItem(item: CartItem): void {
    this.cart = this.cart.filter(p => p !== item);
    this.calculateTotals();
    this.showToast(`Se quitó ${item.name} del carrito`);
  }

  clearCart(): void {
    this.cart = [];
    this.calculateTotals();
  }

  /* =========================================
      CÁLCULOS
  ========================================= */
  calculateTotals(): void {
    this.subtotal = 0;

    this.cart.forEach(item => {
      this.subtotal += item.subtotal;
    });

    this.ivaValue = this.subtotal * (this.ivaPercentage / 100);
    this.discountValue = this.subtotal * (this.specialDiscount / 100);
    this.totalToPay = this.subtotal + this.ivaValue - this.discountValue;

    this.calculatePayment();
  }

  calculatePayment(): void {
    if (this.paymentMethod !== 'Efectivo') {
      this.change = 0;
      return;
    }
    const cash = this.cashReceived ?? 0;
    this.change = cash - this.totalToPay;
  }

  /* =========================================
      REGISTRAR VENTA
  ========================================= */
  registerSale(): void {
    const cash = this.cashReceived ?? 0;
    if (this.cart.length === 0) {
      this.showToast('No hay productos registrados', true);
      return;
    }

    if (this.paymentMethod === 'Efectivo' && cash < this.totalToPay) {
      this.showToast('Dinero insuficiente', true);
      return;
    }

    this.cart.forEach(item => {
      const product = this.products.find(p => p.code === item.code);
      if (product) {
        product.stock -= item.quantity;
      }

      this.salesHistory.push({
        product: item.name,
        quantity: item.quantity,
        total: item.subtotal,
        date: new Date().toLocaleString()
      });
    });

    this.saveProducts();
    this.saveSalesHistory();

    this.salesCount++;
    this.servedProducts += this.cart.length;
    this.score += 100;

    this.showToast('Venta registrada correctamente');

    this.clearCart();
    this.cashReceived = null;
    this.change = 0;

    this.generateCustomer();

    if (this.simulationStarted) {
      clearInterval(this.timer);
      this.setDifficultyTime();

      this.timer = setInterval(() => {
        this.timeLeft--;

        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.customerSatisfaction = Math.max(0, this.customerSatisfaction - 30);
          this.showToast('El cliente perdió la paciencia', true);
        }
      }, 1000);
    }
  }

  /* =========================================
      AI COACH
  ========================================= */
  evaluateResponse(): void {
    const response = this.traineeResponse.toLowerCase();

    if (
      response.includes('buenos') ||
      response.includes('gracias') ||
      response.includes('claro') ||
      response.includes('ayudar')
    ) {
      this.coachFeedback = 'Excelente atención al cliente. Respuesta amable y profesional.';
      this.score += 25;
      this.customerSatisfaction += 5;
    } else {
      this.coachFeedback = 'La respuesta puede mejorar. Usa lenguaje amable y cordial.';
      this.score -= 5;
      this.customerSatisfaction -= 5;
    }
  }

  /* =========================================
      FINALIZAR SIMULACIÓN
  ========================================= */
  finishSimulation(): void {
    clearInterval(this.timer);

    this.savedSimulationReport = {
      finalScore: this.score,
      totalSalesCount: this.salesCount,
      totalServedProducts: this.servedProducts,
      totalClientsAttended: this.totalClients,
      averageSatisfaction: this.customerSatisfaction,
      completionDate: new Date().toISOString()
    };

    console.log('Estadísticas capturadas para uso posterior:', this.savedSimulationReport);

    this.resetSimulation();

    this.simulationFinished = true;
    this.simulationStarted = false;
    this.showToast('Simulación finalizada y datos restaurados');
  }

  /* =========================================
      REINICIAR / LIMPIAR VARIABLES
  ========================================= */
  resetSimulation(): void {
    clearInterval(this.timer);

    this.simulationStarted = false;
    this.simulationFinished = false;

    this.cart = [];
    this.subtotal = 0;
    this.ivaValue = 0;
    this.discountValue = 0;
    this.totalToPay = 0;

    this.cashReceived = null;
    this.change = 0;

    this.score = 0;
    this.salesCount = 0;
    this.servedProducts = 0;
    this.totalClients = 0;

    this.customerSatisfaction = 100;

    this.successMessage = '';
    this.errorMessage = '';

    this.coachFeedback = '';
    this.traineeResponse = '';

    this.generateCustomer();
  }

  cambiar(): void {
    this.h = !this.h;
  }
}
