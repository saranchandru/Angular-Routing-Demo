import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutesGuard } from './app.routes.guard';
import { MessageConstant } from './utilities/message-constants';
import { UserRole } from './utilities/user/user-role.enum';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'claims' },
  {
    // Enabled for all logged in users.
    path: 'claims',
    canActivate: [appRoutesGuard],
    children: [{
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./claims/claims.component').then(cc => cc.ClaimsComponent),
      title: `${MessageConstant.pageTitle} - Claims`,
    }, {
      path: 'detail',
      loadComponent: () => import('./claims/claim-detail/claim-detail.component').then(cdc => cdc.ClaimDetailComponent),
      title: `${MessageConstant.pageTitle} - Claim Detail`,
    }]
    // data: { roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER] }
  },
  {
    // Enabled for user & manager role.
    path: 'support',
    loadComponent: () => import('./support/support.component').then(sc => sc.SupportComponent),
    canActivate: [appRoutesGuard],
    title: `${MessageConstant.pageTitle} - Support`,
    data: { roles: [UserRole.MANAGER, UserRole.USER] }
  },
  {
    // Enabled for admin & manager role.
    path: 'policies',
    loadComponent: () => import('./policies/policies.component').then(pc => pc.PoliciesComponent),
    canActivate: [appRoutesGuard],
    data: { roles: [UserRole.ADMIN, UserRole.MANAGER] },
    title: `${MessageConstant.pageTitle} - Policies`,
  },
  {
    // Enabled for admin role.
    path: 'feedback',
    loadComponent: () => import('./feedback/feedback.component').then(fc => fc.FeedbackComponent),
    canActivate: [appRoutesGuard],
    title: `${MessageConstant.pageTitle} - Feedback`,
    data: { roles: [UserRole.ADMIN] }
  },
  {
    // Enabled for all users.
    path: 'login',
    loadComponent: () => import('./login/login.component').then(lc => lc.LoginComponent),
    title: `${MessageConstant.pageTitle} - Login`,
  },
  {
    // Enabled for all users
    path: 'restriction',
    loadComponent: () => import('./restriction/restriction.component').then(rc => rc.RestrictionComponent),
    title: `${MessageConstant.pageTitle} - Access Restricted`,
  },
  {
    // Enabled for all users
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then(pnfc => pnfc.PageNotFoundComponent),
    title: `${MessageConstant.pageTitle} - Page Not Found`,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
