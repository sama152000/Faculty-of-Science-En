import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { LogosService } from '../../../Services/real-services/logos.service';
import { ContactsService } from '../../../Services/real-services/contacts.service';

// Contact Interface
export interface Contact {
  id: string;
  phone?: string;
  email?: string;
  address?: string;
  fax?: string;
  workingHours?: string;
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

  logo = signal<string | null>(null);
  contact = signal<Contact | null>(null);
  isMobileMenuOpen = false;

  ngOnInit(): void {
    this.loadLogo();
    this.loadContactInfo();
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
        }
      },
      error: (err) => console.error('Error loading contacts:', err),
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
