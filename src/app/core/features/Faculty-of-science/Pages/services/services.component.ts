import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesService } from '../../Services/services.service';
import { Service } from '../../model/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  categories: string[] = [];
  selectedService: Service | null = null;
  selectedCategory = 'All Services';
  loading = true;
  activeSection = 'overview';

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
  }

  loadServices(): void {
    this.services = this.servicesService.getAll();
    this.loading = false;
  }

  loadCategories(): void {
    this.categories = this.servicesService.getCategories();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.services = this.servicesService.getByCategory(category);
    this.selectedService = null;
  }

  selectService(service: Service): void {
    this.selectedService = service;
    this.activeSection = 'overview';
  }

  closeDetails(): void {
    this.selectedService = null;
  }

  isServiceSelected(serviceId: string): boolean {
    return this.selectedService?.id === serviceId;
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }
}