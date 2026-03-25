import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { HistorialComponent } from './pages/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportesComponent,
    EstadisticasComponent,
    TransaccionesComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
