import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { RecoverPasswordComponent } from './features/auth/recover-password/recover-password.component';

import { TransactionListComponent } from './features/transactions/transaction-list/transaction-list.component';

import { ReportListComponent } from './features/evaluation/report-list/report-list.component';
import { InstructorCommentsComponent } from './features/evaluation/instructor-comments/instructor-comments.component';
import { StatisticsComponent } from './features/evaluation/statistics/statistics.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },

  {
    path: 'transactions',
    component: TransactionListComponent
  },

  {
    path: 'reports',
    component: ReportListComponent
  },

  {
    path: 'comments',
    component: InstructorCommentsComponent
  },

  {
    path: 'statistics',
    component: StatisticsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
