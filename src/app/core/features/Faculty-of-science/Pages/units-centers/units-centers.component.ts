/**
 * Units & Centers Component
 * Main container that displays Units and Centers tabs using child components.
 * Loads menu data to get child slugs dynamically for routing.
 */
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { UnitsComponent } from './units/units.component';
import { MenusService, MenuItem } from '../../Services/real-services/menus.service';

@Component({
  selector: 'app-units-centers',
  standalone: true,
  imports: [CommonModule, RouterModule, CentersComponent, UnitsComponent],
  templateUrl: './units-centers.component.html',
  styleUrls: ['./units-centers.component.css'],
})
export class UnitsCentersComponent implements OnInit {
  private readonly menusService = inject(MenusService);
  private readonly route = inject(ActivatedRoute);

  // Active tab state
  activeTab = signal<string>('units');

  // Dynamic slugs from menu API
  unitsCategorySlug = signal<string>('units');
  centersCategorySlug = signal<string>('centers');

  ngOnInit(): void {
    this.loadMenuSlugs();
  }

  private loadMenuSlugs(): void {
    // Get current route path to find the matching parent menu item
    const currentPath = this.route.snapshot.url.map(s => s.path).join('/') || 'units-centers';

    this.menusService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Find the parent menu item matching this page
          const parentMenu = this.findMenuBySlug(response.data, currentPath);
          if (parentMenu && parentMenu.childs) {
            // Extract child slugs dynamically
            for (const child of parentMenu.childs) {
              const childSlug = this.sanitizeSlug(child.slug || child.titleEn);
              // Match by titleEn or slug pattern
              if (childSlug.includes('unit') || child.title.includes('وحد')) {
                this.unitsCategorySlug.set(childSlug);
                this.activeTab.set(childSlug); // Set default tab
              } else if (childSlug.includes('center') || child.title.includes('مراكز') || child.title.includes('مركز')) {
                this.centersCategorySlug.set(childSlug);
              }
            }
          }
        }
      },
      error: (err) => {
        console.error('Error loading menu slugs:', err);
        // Fallback: keep default values
      },
    });
  }

  private findMenuBySlug(items: MenuItem[], slug: string): MenuItem | null {
    for (const item of items) {
      if (this.sanitizeSlug(item.slug || item.titleEn) === slug) {
        return item;
      }
      if (item.childs && item.childs.length > 0) {
        const found = this.findMenuBySlug(item.childs, slug);
        if (found) return found;
      }
    }
    return null;
  }

  private sanitizeSlug(text: string): string {
    return (text || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  isActiveTab(tab: string): boolean {
    return this.activeTab() === tab;
  }
}
