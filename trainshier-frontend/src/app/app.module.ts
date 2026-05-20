import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { RecoverPasswordComponent } from './features/auth/recover-password/recover-password.component';

import { TransactionListComponent } from './features/transactions/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './features/transactions/transaction-form/transaction-form.component';

import { ReportListComponent } from './features/evaluation/report-list/report-list.component';
import { InstructorCommentsComponent } from './features/evaluation/instructor-comments/instructor-comments.component';
import { StatisticsComponent } from './features/evaluation/statistics/statistics.component';
import { SimulatorModule } from './features/simulator/simulator.module';
@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    HomeComponent,

    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,

    TransactionListComponent,
    TransactionFormComponent,

    ReportListComponent,
    InstructorCommentsComponent,
    StatisticsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SimulatorModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
