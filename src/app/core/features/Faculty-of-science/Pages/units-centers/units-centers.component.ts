import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnitsCentersService } from '../../Services/units.service';
import { UnitCenter } from '../../model/unit-center.model';

@Component({
  selector: 'app-units-centers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './units-centers.component.html',
  styleUrls: ['./units-centers.component.css']
})
export class UnitsCentersComponent implements OnInit {
  units: UnitCenter[] = [];
  centers: UnitCenter[] = [];
  selectedItem: UnitCenter | null = null;
  activeTab = 'units';
  loading = true;
  activeSection = 'overview';

  constructor(private unitsCentersService: UnitsCentersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.units = this.unitsCentersService.getUnits();
    this.centers = this.unitsCentersService.getCenters();
    this.loading = false;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.selectedItem = null;
  }

  isActiveTab(tab: string): boolean {
    return this.activeTab === tab;
  }

  getCurrentItems(): UnitCenter[] {
    return this.activeTab === 'units' ? this.units : this.centers;
  }

  selectItem(item: UnitCenter): void {
    this.selectedItem = item;
    this.activeSection = 'overview';
  }

  closeDetails(): void {
    this.selectedItem = null;
  }

  isItemSelected(itemId: string): boolean {
    return this.selectedItem?.id === itemId;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }
}