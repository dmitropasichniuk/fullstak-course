import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutsComponent } from './shared/layouts/auth-layouts/auth-layouts.component';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {OverviewPageComponent} from './overview-page/overview-page.component'
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component'
import {HistoryPageComponent} from './history-page/history-page.component'
import {OrderPageComponent} from './order-page/order-page.component'
import {CategoriesPageComponent} from './categories-page/categories-page.component'
import {AuthGuard} from './shared/classes/auth.guard'

const routes: Routes = [
  {
    path: '', component: AuthLayoutsComponent, children: [
      {path:'', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}

    ]
  },

  {
    path: '', component: SiteLayoutsComponent, canActivate: [AuthGuard] ,children: [
      {path: 'overview', component: OverviewPageComponent},
      {path: 'analytics', component: AnalyticsPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'order', component: OrderPageComponent},
      {path: 'categories', component: CategoriesPageComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
