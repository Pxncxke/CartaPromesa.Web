import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/features/home-shell/home-shell.routes')
      .then((r) => r.routes)
  }
];
