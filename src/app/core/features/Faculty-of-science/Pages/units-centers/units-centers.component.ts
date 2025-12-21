/**
 * Units & Centers Component
 * Main container that displays Units and Centers tabs using child components
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { UnitsComponent } from './units/units.component';

@Component({
  selector: 'app-units-centers',
  standalone: true,
  imports: [CommonModule, RouterModule, CentersComponent, UnitsComponent],
  templateUrl: './units-centers.component.html',
  styleUrls: ['./units-centers.component.css'],
})
export class UnitsCentersComponent {
  // Active tab state
  activeTab = signal<'units' | 'centers'>('units');

  setActiveTab(tab: 'units' | 'centers'): void {
    this.activeTab.set(tab);
  }

  isActiveTab(tab: string): boolean {
    return this.activeTab() === tab;
  }
}
