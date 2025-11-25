import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { DeanWordComponent } from "./dean-word/dean-word.component";
import { OurDepartmentsComponent } from "./our-departments/our-departments.component";
import { LatestNewsComponent } from "./latest-news/latest-news.component";
import { UpcomingEventsComponent } from "./upcoming-events/upcoming-events.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { OurGalleryComponent } from "./our-gallery/our-gallery.component";
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [HeroComponent, DeanWordComponent, OurDepartmentsComponent, LatestNewsComponent, UpcomingEventsComponent, StatisticsComponent, OurGalleryComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
