import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { HistorialComponent } from './pages/historial/historial.component';

const routes: Routes = [
  { path: 'reportes', component: ReportesComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'historial', component: HistorialComponent },
  { path: '', redirectTo: 'reportes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}