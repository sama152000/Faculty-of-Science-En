import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/Faculty-of-science/Pages/Home/Home.component';
import { AboutUsComponent } from './core/features/Faculty-of-science/Pages/about-us/about-us.component';
import { NewsListComponent } from './core/features/Faculty-of-science/Pages/news-list/news-list.component';
import { NewsDetailsComponent } from './core/features/Faculty-of-science/Pages/news-list/news-details/news-details.component';
import { DepartmentsComponent } from './core/features/Faculty-of-science/Pages/departments/departments.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutUsComponent },
     { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/:id', component: DepartmentsComponent },

  { path: '**', redirectTo: '/home' }


];
