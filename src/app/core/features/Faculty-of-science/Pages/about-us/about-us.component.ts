import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsService } from '../../Services/about-us.service';
import { AboutUsData } from '../../model/about-us.model';
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutSections: AboutUsData[] = [];
  activeTab: string = 'introduction';
  
  introduction?: AboutUsData;
  vision?: AboutUsData;
  mission?: AboutUsData;
  objectives?: AboutUsData;
  history?: AboutUsData;
  deanMessage?: AboutUsData;

  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.loadAboutData();
  }

  private loadAboutData(): void {
    this.aboutSections = this.aboutUsService.getAboutContent();
    this.introduction = this.aboutUsService.getIntroduction();
    this.vision = this.aboutUsService.getVision();
    this.mission = this.aboutUsService.getMission();
    this.objectives = this.aboutUsService.getObjectives();
    this.history = this.aboutUsService.getHistory();
    this.deanMessage = this.aboutUsService.getDeanMessage();
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}