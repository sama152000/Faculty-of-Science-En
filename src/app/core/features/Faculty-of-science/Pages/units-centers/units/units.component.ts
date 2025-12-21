/**
 * Units Component
 * Displays units data from the API
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import {
  UnitService,
  Unit,
} from '../../../Services/real-services/units/unit.service';
import {
  UnitDetailService,
  UnitDetail,
} from '../../../Services/real-services/units/unitdetail.service';
import {
  UnitMemberService,
  UnitMember,
} from '../../../Services/real-services/units/unitmember.service';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    CardModule,
    ButtonModule,
    TagModule,
    AvatarModule,
  ],
  templateUrl: './units.component.html',
  styleUrls: ['../units-centers.component.css'],
})
export class UnitsComponent implements OnInit {
  private readonly unitService = inject(UnitService);
  private readonly unitDetailService = inject(UnitDetailService);
  private readonly unitMemberService = inject(UnitMemberService);

  // State signals
  units = signal<Unit[]>([]);
  selectedUnit = signal<Unit | null>(null);
  unitDetails = signal<UnitDetail[]>([]);
  unitMembers = signal<UnitMember[]>([]);
  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);
  activeSection = signal('overview');

  // Computed signals
  hasData = computed(() => this.units().length > 0);
  hasDetails = computed(() => this.unitDetails().length > 0);
  hasMembers = computed(() => this.unitMembers().length > 0);
  leader = computed(() => this.unitMembers().find((m) => m.isLeader));

  ngOnInit(): void {
    this.loadUnits();
  }

  loadUnits(): void {
    this.loading.set(true);
    this.error.set(null);

    this.unitService.getAllUnits().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.units.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load units');
        this.loading.set(false);
        console.error('Error loading units:', err);
      },
    });
  }

  selectUnit(unit: Unit): void {
    this.selectedUnit.set(unit);
    this.activeSection.set('overview');
    this.loadUnitDetails(unit.id);
    this.loadUnitMembers(unit.id);
  }

  loadUnitDetails(unitId: string): void {
    this.detailsLoading.set(true);
    this.unitDetailService.getByUnitId(unitId).subscribe({
      next: (details) => {
        this.unitDetails.set(details);
        this.detailsLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading unit details:', err);
        this.detailsLoading.set(false);
      },
    });
  }

  loadUnitMembers(unitId: string): void {
    this.unitMemberService.getByUnitId(unitId).subscribe({
      next: (members) => {
        this.unitMembers.set(members);
      },
      error: (err) => {
        console.error('Error loading unit members:', err);
      },
    });
  }

  closeDetails(): void {
    this.selectedUnit.set(null);
    this.unitDetails.set([]);
    this.unitMembers.set([]);
  }

  isUnitSelected(unitId: string): boolean {
    return this.selectedUnit()?.id === unitId;
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  isActiveSection(section: string): boolean {
    return this.activeSection() === section;
  }

  retry(): void {
    this.loadUnits();
  }

  getUnitImage(unit: Unit): string | null {
    if (unit.unitAttachments && unit.unitAttachments.length > 0) {
      return unit.unitAttachments[0].url;
    }
    return null;
  }
}
