import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  totalReports = 0;
  completedReports = 0;
  pendingReports = 0;

  searchTerm = '';

  reports = [
    {
      title: 'Reporte semanal',
      description: 'Rendimiento de aprendices durante la semana.',
      status: 'Completado',
      date: '2026-06-01',
      author: 'Instructor Principal'
    },
    {
      title: 'Reporte mensual',
      description: 'Análisis de caja y desempeño comercial.',
      status: 'Pendiente',
      date: '2026-06-05',
      author: 'Administrador'
    },
    {
      title: 'Reporte de simulaciones',
      description: 'Estadísticas de simulaciones realizadas.',
      status: 'Completado',
      date: '2026-06-08',
      author: 'Sistema'
    },
    {
      title: 'Reporte de incidencias',
      description: 'Errores frecuentes detectados.',
      status: 'Pendiente',
      date: '2026-06-09',
      author: 'Instructor'
    }
  ];

  filteredReports: any[] = [];

  ngOnInit(): void {
    this.filteredReports = [...this.reports];
    this.calculateKPIs();
  }

  calculateKPIs(): void {

    this.totalReports = this.reports.length;

    this.completedReports =
      this.reports.filter(
        report => report.status === 'Completado'
      ).length;

    this.pendingReports =
      this.reports.filter(
        report => report.status === 'Pendiente'
      ).length;
  }

  filterReports(): void {

    const term =
      this.searchTerm.toLowerCase();

    this.filteredReports =
      this.reports.filter(report =>
        report.title.toLowerCase().includes(term) ||
        report.description.toLowerCase().includes(term) ||
        report.author.toLowerCase().includes(term)
      );
  }

  exportReports(): void {

    const content =
      JSON.stringify(
        this.filteredReports,
        null,
        2
      );

    const blob =
      new Blob(
        [content],
        { type: 'application/json' }
      );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement('a');

    a.href = url;

    a.download =
      'reportes-trainshier.json';

    a.click();

    window.URL.revokeObjectURL(url);

  }

}
