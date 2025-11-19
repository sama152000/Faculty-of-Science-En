import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { QuickNavSidebarComponent } from "./core/features/Faculty-of-science/Pages/shared/quick-nav-sidebar/quick-nav-sidebar.component";
import { HeaderComponent } from "./core/features/Faculty-of-science/Pages/shared/header/header.component";
import { FooterComponent } from "./core/features/Faculty-of-science/Pages/shared/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CommonModule, RouterModule, QuickNavSidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected   title = 'Faculty of Science - Luxor University';

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
