import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../home-page/home-page.routes').then((r) => r.routes)
  }
]
