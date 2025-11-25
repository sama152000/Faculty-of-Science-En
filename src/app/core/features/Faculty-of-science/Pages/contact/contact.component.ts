import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../Services/contact.service';
import { ContactInfo, StaffContact } from '../../model/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactInfo: ContactInfo[] = [];
  staffContacts: StaffContact[] = [];
  selectedContact: ContactInfo | null = null;
  loading = true;
  activeSection = 'general';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContactData();
  }

  loadContactData(): void {
    this.contactInfo = this.contactService.getContactInfo();
    this.staffContacts = this.contactService.getStaffContacts();
    this.selectedContact = this.contactInfo[0]; // Select first contact by default
    this.loading = false;
  }

  selectContact(contact: ContactInfo): void {
    this.selectedContact = contact;
  }

  isContactSelected(contactId: string): boolean {
    return this.selectedContact?.id === contactId;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }

  getStaffByDepartment(department: string): StaffContact[] {
    return this.contactService.getStaffByDepartment(department);
  }

  getKeyStaff(): StaffContact[] {
    return this.staffContacts.filter(staff => 
      staff.position.includes('Dean') || 
      staff.position.includes('Head') || 
      staff.position.includes('Director')
    );
  }
}