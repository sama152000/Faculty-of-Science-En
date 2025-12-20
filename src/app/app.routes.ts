import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/Home/Home.component'
      ).then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/about-us/about-us.component'
      ).then((m) => m.AboutUsComponent),
  },
  {
    path: 'news',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/news-list/news-list.component'
      ).then((m) => m.NewsListComponent),
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/news-list/news-details/news-details.component'
      ).then((m) => m.NewsDetailsComponent),
  },
  {
    path: 'departments',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/departments/departments.component'
      ).then((m) => m.DepartmentsComponent),
  },
  {
    path: 'departments/:id',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/departments/departments.component'
      ).then((m) => m.DepartmentsComponent),
  },
  {
    path: 'sectors',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/sectors/sectors.component'
      ).then((m) => m.SectorsComponent),
  },
  {
    path: 'sectors/:id',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/sectors/sectors.component'
      ).then((m) => m.SectorsComponent),
  },
  {
    path: 'units',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/units-centers/units-centers.component'
      ).then((m) => m.UnitsCentersComponent),
  },
  {
    path: 'units/:id',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/units-centers/units-centers.component'
      ).then((m) => m.UnitsCentersComponent),
  },
  {
    path: 'programs',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/programs/programs.component'
      ).then((m) => m.ProgramsComponent),
  },
  {
    path: 'programs/:id',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/programs/programs.component'
      ).then((m) => m.ProgramsComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/services/services.component'
      ).then((m) => m.ServicesComponent),
  },
  {
    path: 'services/:id',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/services/services.component'
      ).then((m) => m.ServicesComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/contact/contact.component'
      ).then((m) => m.ContactComponent),
  },
  { path: '**', redirectTo: '/home' },
];
