import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LogosService } from '../../../Services/real-services/logos.service';
import { ContactsService } from '../../../Services/real-services/contacts.service';
import { MenusService, MenuItem } from '../../../Services/real-services/menus.service';

// Contact Interface
export interface Contact {
  id: string;
  phone?: string;
  email?: string;
  address?: string;
  fax?: string;
  webSite?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private readonly logoservice = inject(LogosService);
  private readonly contactsService = inject(ContactsService);
  private readonly menusService = inject(MenusService);

  private readonly router = inject(Router);

  logo = signal<string | null>(null);
  contact = signal<Contact | null>(null);
  menuItems = signal<MenuItem[]>([]);
  currentUrl = signal<string>('');
  isMobileMenuOpen = false;
  openDropdowns = signal<Set<string>>(new Set());

  openDropdown(id: string): void {
    if (this.isMobileMenuOpen) return; // Only hover on desktop
    const current = new Set(this.openDropdowns());
    current.add(id);
    this.openDropdowns.set(current);
  }

  closeDropdown(id: string): void {
    if (this.isMobileMenuOpen) return; // Only hover on desktop
    const current = new Set(this.openDropdowns());
    current.delete(id);
    this.openDropdowns.set(current);
  }

  toggleDropdown(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const current = new Set(this.openDropdowns());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.openDropdowns.set(current);
  }

  isDropdownOpen(id: string): boolean {
    return this.openDropdowns().has(id);
  }

  closeAllDropdowns(): void {
    this.openDropdowns.set(new Set());
  }

  sanitizeSlug(slug: string): string {
    return slug.trim().replace(/\s+/g, '-').toLowerCase();
  }

  private sanitizeMenuItemSlugs(item: MenuItem): MenuItem {
    return {
      ...item,
      slug: this.sanitizeSlug(item.slug || item.titleEn || ''),
      titleEn: this.sanitizeSlug(item.titleEn || ''),
      childs: item.childs ? item.childs.map((child) => this.sanitizeMenuItemSlugs(child)) : [],
    };
  }

  ngOnInit(): void {
    this.loadLogo();
    this.loadContactInfo();
    this.loadMenus();

    // Track current URL for active state
    this.currentUrl.set(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.currentUrl.set(e.urlAfterRedirects || e.url));
  }

  /**
   * Check if a menu item's route is active (matches current URL prefix).
   * Works for parent items with children.
   */
  isRouteActive(slug: string): boolean {
    const sanitized = this.sanitizeSlug(slug);
    const url = this.currentUrl();
    return url === '/' + sanitized || url.startsWith('/' + sanitized + '/');
  }

  loadLogo(): void {
    this.logoservice.getAllLogos().subscribe({
      next: (res) => {
        if (res.data && res.data.length > 0) {
          this.logo.set(res.data[0].url);
        }
      },
      error: (err) => console.error('Error loading logo:', err),
    });
  }

  loadContactInfo(): void {
    this.contactsService.getAllContacts().subscribe({
      next: (res) => {
        if (res.success && res.data && res.data.length > 0) {
          this.contact.set(res.data[0]);
          // console.log(this.contact(), 'this.contactthis.contactthis.contact');

        }
      },
      error: (err) => console.error('Error loading contacts:', err),
    });
  }

  loadMenus(): void {
    this.menusService.getAll().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const mainMenus = res.data
            .filter((item) => (item.menuType?.toLowerCase() === 'main' || item.menuType === 'رئيسية') && item.parentId === null)
            .sort((a, b) => a.order - b.order)
            .map((item) => this.sanitizeMenuItemSlugs(item));
          this.menuItems.set(mainMenus);
        }
      },
      error: (err) => console.error('Error loading menus:', err),
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
