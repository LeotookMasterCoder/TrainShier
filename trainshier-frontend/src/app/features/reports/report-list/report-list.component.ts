import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportsComponent implements OnInit {

  totalUsers: number = 18;

  totalTransactions: number = 145;

  totalSimulations: number = 312;

  averageScore: number = 91;

  totalRevenue: number = 5680000;

  totalErrors: number = 102;

  averageAttentionTime: string = '1.8 min';

  activeProducts: number = 15;

  // ==========================
  // FILTROS
  // ==========================

  startDate: string = '';

  endDate: string = '';

  selectedRole: string = 'TODOS';

  users: any[] = [

    {
      name: 'Laura Gómez',
      role: 'APRENDIZ',
      simulations: 22,
      effectiveness: 94
    },

    {
      name: 'Carlos Ruiz',
      role: 'APRENDIZ',
      simulations: 18,
      effectiveness: 87
    },

    {
      name: 'Martha Díaz',
      role: 'INSTRUCTOR',
      simulations: 0,
      effectiveness: 100
    },

    {
      name: 'Andrés Moreno',
      role: 'APRENDIZ',
      simulations: 31,
      effectiveness: 98
    },

    {
      name: 'Valentina Castro',
      role: 'APRENDIZ',
      simulations: 25,
      effectiveness: 92
    }

  ];

  originalUsers: any[] = [];

  topUsers: any[] = [

    {
      name: 'Andrés Moreno',
      effectiveness: 98
    },

    {
      name: 'Laura Gómez',
      effectiveness: 94
    },

    {
      name: 'Valentina Castro',
      effectiveness: 92
    },

    {
      name: 'Carlos Ruiz',
      effectiveness: 87
    }

  ];

  topProducts: any[] = [

    {
      name: 'Leche Entera',
      sales: 120
    },

    {
      name: 'Pan Integral',
      sales: 97
    },

    {
      name: 'Chocolate',
      sales: 84
    },

    {
      name: 'Arroz Premium',
      sales: 79
    },

    {
      name: 'Queso Mozzarella',
      sales: 65
    }

  ];

  aiReport: string =
    'Los aprendices presentan un desempeño sobresaliente. El error más frecuente está relacionado con el cálculo del cambio en pagos en efectivo. Se recomienda reforzar ejercicios de caja registradora y validación de descuentos promocionales.';

  totalClientsServed: number = 986;

  totalDiscountsApplied: number = 243;

  averageTicket: number = 28500;

  bestSellingDay: string = 'Viernes';

  worstSellingDay: string = 'Lunes';

  ngOnInit(): void {

    this.originalUsers = [...this.users];

    this.generateAIAnalysis();

  }

  applyFilters(): void {

    if (this.selectedRole === 'TODOS') {

      this.users = [...this.originalUsers];

      return;

    }

    this.users = this.originalUsers.filter(
      user =>
        user.role === this.selectedRole
    );

  }

  exportPDF(): void {

    console.log(
      'Exportando PDF...'
    );

  }

  exportExcel(): void {

    console.log(
      'Exportando Excel...'
    );

  }

  generateAIAnalysis(): void {

    if (this.averageScore >= 90) {

      this.aiReport =
        'El rendimiento general es excelente. Los aprendices dominan los procesos de caja, descuentos y atención al cliente. Se recomienda continuar fortaleciendo la precisión en el cálculo de cambios.';

    } else if (this.averageScore >= 70) {

      this.aiReport =
        'El rendimiento general es bueno. Se observan oportunidades de mejora en tiempos de atención y manejo de descuentos promocionales.';

    } else {

      this.aiReport =
        'El desempeño requiere acompañamiento adicional. Se recomienda reforzar los fundamentos del sistema POS y simulaciones prácticas.';

    }

  }

  getSuccessRate(): number {

    return this.averageScore;

  }

  getTotalSales(): number {

    return this.totalTransactions;

  }

  getTotalRevenue(): number {

    return this.totalRevenue;

  }

}
