import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { notAuthGuard } from './guards/not-auth.guard';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { SendResetPasswordComponent } from './pages/send-reset-password/send-reset-password.component';
import { VerifySessionComponent } from './pages/verify-session/verify-session.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [notAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'verify',
        component: VerifySessionComponent
      },
      {
        path: 'send-resest-password',
        component: SendResetPasswordComponent
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then(
        (m) => m.AuthComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
        ),
      },
      {
        path: 'me',
        loadComponent: () => import('./pages/me/me.component').then((m) => m.MeComponent),
        children: [
          {
            path: '',
            redirectTo: 'activity',
            pathMatch: 'full'
          },
          {

            path: 'activity',
            loadComponent: () => import('./pages/activity/activity.component').then((m) => m.ActivityComponent),
          },
          {

            path: 'reset-password',
            loadComponent: () => import('./pages/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
          }
        ]
      },
      {
        path: 'actors',
        loadComponent: () => import('./sections/actor/actor.component').then((m) => m.ActorComponent),
      },
      {
        path: 'categories',
        loadComponent: () => import('./sections/category/category.component').then((m) => m.CategoryComponent),
      },
      {
        path: 'cities',
        loadComponent: () => import('./sections/city/city.component').then((m) => m.CityComponent),
      },
      {
        path: 'customers',
        loadComponent: () => import('./sections/customer/customer.component').then((m) => m.CustomerComponent),
      },
      {
        path: 'countries',
        loadComponent: () => import('./sections/country/country.component').then((m) => m.CountryComponent),
      },
      {
        path: 'inventories',
        loadComponent: () => import('./sections/inventory/inventory.component').then((m) => m.InventoryComponent),
      },
      {
        path: 'languages',
        loadComponent: () => import('./sections/language/language.component').then((m) => m.LanguageComponent),
      },
      {
        path: 'payments',
        loadComponent: () => import('./sections/payment/payment.component').then((m) => m.PaymentComponent),
      },
      {
        path: 'rentals',
        loadComponent: () => import('./sections/rental/rental.component').then((m) => m.RentalComponent),
      },
      {
        path: 'staffs',
        loadComponent: () => import('./sections/staff/staff.component').then((m) => m.StaffComponent),
      },
      {
        path: 'stores',
        loadComponent: () => import('./sections/store/store.component').then((m) => m.StoreComponent),
      },
      {
        path: 'addresses',
        loadComponent: () => import('./sections/address/address.component').then((m) => m.AddressComponent),
      },
      {
        path: 'films',
        loadComponent: () => import('./sections/film/film.component').then((m) => m.FilmComponent),
      },
      {
        path: 'roles',
        loadComponent: () => import('./sections/role/role.component').then((m) => m.RoleComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./sections/user/user.component').then((m) => m.UserComponent),
      },
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
