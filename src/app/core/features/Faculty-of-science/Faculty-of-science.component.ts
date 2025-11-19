import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./Pages/shared/header/header.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./Pages/shared/footer/footer.component";

@Component({
  selector: 'app-Faculty-of-science',
  templateUrl: './Faculty-of-science.component.html',
  styleUrls: ['./Faculty-of-science.component.css'],
  imports: [HeaderComponent, RouterModule, FooterComponent]
})
export class FacultyOfScienceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
