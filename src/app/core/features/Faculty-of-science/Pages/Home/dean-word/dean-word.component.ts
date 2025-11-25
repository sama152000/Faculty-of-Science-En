import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dean-word',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dean-word.component.html',
  styleUrls: ['./dean-word.component.css']
})
export class DeanWordComponent {
  deanInfo = {
    name: 'Prof. Dr. Mohamed Hassan',
    title: 'Dean of the Faculty of Science',
    image: './assets/deanp.jpg',
    message: `Welcome to the Faculty of Science — a hub of knowledge, innovation, and discovery. 
              We take pride in shaping future scientists through research excellence, high-quality education, 
              and dedication to serving our community. Our faculty is committed to advancing scientific 
              knowledge and preparing the next generation of leaders in science and technology.`
  };
}