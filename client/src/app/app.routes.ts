import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'invite',
    pathMatch: 'full',
  },
  {
    path: 'invite',
    loadComponent: () =>
      import('./features/invite-code/components/invite-form/invite-form.component').then(
        (m) => m.InviteFormComponent,
      ),
  },
  {
    path: 'thank-you',
    loadComponent: () =>
      import('./features/invite-code/components/thank-you/thank-you.component').then(
        (m) => m.ThankYouComponent,
      ),
  },
  {
    path: 'join-beta',
    loadComponent: () =>
      import('./features/join-beta/components/join-beta-form/join-beta-form.component').then(
        (m) => m.JoinBetaFormComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'invite',
  },
];
