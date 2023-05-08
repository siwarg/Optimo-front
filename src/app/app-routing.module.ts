import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[MsalGuard],
    children: [
      {
        path: 'workorder',
        component: WorkOrderComponent
      },
      {
        path: 'assignment',
        component: AssignmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      initialNavigation: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
