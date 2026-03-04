import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenusService, MenuItem } from '../../../Services/real-services/menus.service';

@Component({
  selector: 'app-quick-nav-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quick-nav-sidebar.component.html',
  styleUrls: ['./quick-nav-sidebar.component.css'],
})
export class QuickNavSidebarComponent implements OnInit {
  private readonly menusService = inject(MenusService);

  menuItems = signal<MenuItem[]>([]);

  /** Default icon when menu item has no icon */
  readonly defaultIcon = 'pi pi-angle-left';

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menusService.getAll().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const mainMenus = res.data
            .filter(
              (item) =>
                (item.menuType?.toLowerCase() === 'main' ||
                  item.menuType === 'رئيسية') &&
                item.parentId === null
            )
            .sort((a, b) => a.order - b.order);
          this.menuItems.set(mainMenus);
        }
      },
      error: (err) => console.error('Error loading menus:', err),
    });
  }
}
