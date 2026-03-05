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
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/departments/departments.component'
      ).then((m) => m.DepartmentsComponent),
  },
  {
    path: 'departments/:slug',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/departments/department-detail/department-detail.component'
      ).then((m) => m.DepartmentDetailComponent),
  },
  {
    path: 'sectors',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/sectors/sectors.component'
      ).then((m) => m.SectorsComponent),
  },
  {
    path: 'sectors/:slug',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/sectors/sector-detail/sector-detail.component'
      ).then((m) => m.SectorDetailComponent),
  },
  {
    path: 'units-centers',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/units-centers/units-centers.component'
      ).then((m) => m.UnitsCentersComponent),
  },
  {
    path: 'units-centers/:id',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/units-centers/units-centers.component'
      ).then((m) => m.UnitsCentersComponent),
  },
  {
    path: 'programs',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/programs/programs.component'
      ).then((m) => m.ProgramsComponent),
  },
  {
    path: 'programs/:slug',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/programs/program-detail/program-detail.component'
      ).then((m) => m.ProgramDetailComponent),
  },
  {
    path: 'services',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/services/services.component'
      ).then((m) => m.ServicesComponent),
  },
  {
    path: 'services/:slug',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/services/service-detail/service-detail.component'
      ).then((m) => m.ServiceDetailComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/contact/contact.component'
      ).then((m) => m.ContactComponent),
  },
  {
    path: 'units-centers',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/units-centers/units-centers.component'
      ).then((m) => m.UnitsCentersComponent),
  },
  {
    path: 'units-centers/units/:slug',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/units-centers/units/unit-detail/unit-detail.component'
      ).then((m) => m.UnitDetailComponent),
  },
  {
    path: 'units-centers/centers/:slug',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/units-centers/centers/center-detail/center-detail.component'
      ).then((m) => m.CenterDetailComponent),
  },
  {
    path: 'custom-page/:slug',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-science/Pages/custom-page/custom-page.component'
      ).then((m) => m.CustomPageComponent),
  },
  { path: '**', redirectTo: '/home' },
];
