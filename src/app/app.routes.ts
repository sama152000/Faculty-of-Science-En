import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/Faculty-of-science/Pages/Home/Home.component';
import { AboutUsComponent } from './core/features/Faculty-of-science/Pages/about-us/about-us.component';
import { NewsListComponent } from './core/features/Faculty-of-science/Pages/news-list/news-list.component';
import { NewsDetailsComponent } from './core/features/Faculty-of-science/Pages/news-list/news-details/news-details.component';
import { DepartmentsComponent } from './core/features/Faculty-of-science/Pages/departments/departments.component';
import { SectorsComponent } from './core/features/Faculty-of-science/Pages/sectors/sectors.component';
import { UnitsCentersComponent } from './core/features/Faculty-of-science/Pages/units-centers/units-centers.component';
import { ProgramsComponent } from './core/features/Faculty-of-science/Pages/programs/programs.component';
import { ServicesComponent } from './core/features/Faculty-of-science/Pages/services/services.component';
import { ContactComponent } from './core/features/Faculty-of-science/Pages/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutUsComponent },
     { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/:id', component: DepartmentsComponent },
  { path: 'sectors', component: SectorsComponent },
  { path: 'sectors/:id', component: SectorsComponent },
 { path: 'units', component: UnitsCentersComponent },
  { path: 'units/:id', component: UnitsCentersComponent },
 { path: 'programs', component: ProgramsComponent },
  { path: 'programs/:id', component: ProgramsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:id', component:  ServicesComponent  },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' }


];
