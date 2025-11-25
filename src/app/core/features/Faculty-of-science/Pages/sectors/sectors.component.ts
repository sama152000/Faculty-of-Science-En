import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectorsService } from '../../Services/sectors.service';
import { Sector } from '../../model/sector.model';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  sectors: Sector[] = [];
  selectedSector: Sector | null = null;
  loading = true;
  activeSection = 'overview';

  constructor(private sectorsService: SectorsService) {}

  ngOnInit(): void {
    this.loadSectors();
  }

  loadSectors(): void {
    this.sectors = this.sectorsService.getAll();
    this.loading = false;
  }

  selectSector(sector: Sector): void {
    this.selectedSector = sector;
    this.activeSection = 'overview';
  }

  closeDetails(): void {
    this.selectedSector = null;
  }

  isSectorSelected(sectorId: string): boolean {
    return this.selectedSector?.id === sectorId;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }
}