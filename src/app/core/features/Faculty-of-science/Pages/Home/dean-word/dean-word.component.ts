import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeanSpeechsService } from '../../../Services/real-services/dean-speechs.service';
import { DeanSpeech } from '../../../model/deanspeech.model';

@Component({
  selector: 'app-dean-word',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dean-word.component.html',
  styleUrls: ['./dean-word.component.css'],
})
export class DeanWordComponent implements OnInit {
  private readonly deanSpeechsService = inject(DeanSpeechsService);

  deanSpeech: DeanSpeech | null = null;
  loading = true;
  error = false;

  ngOnInit(): void {
    this.loadDeanSpeech();
  }

  private loadDeanSpeech(): void {
    this.loading = true;
    this.error = false;

    this.deanSpeechsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length > 0) {
          this.deanSpeech = response.data[0]; // Get the first dean speech
          console.log(this.deanSpeech);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dean speech:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  // Getters for template binding
  get deanName(): string {
    return this.deanSpeech?.memberName ?? 'Not Found';
  }

  get deanTitle(): string {
    return this.deanSpeech?.memberPosition ?? 'Not Found';
  }

  get deanMessage(): string {
    return this.deanSpeech?.speech ?? 'Not Found';
  }

  get deanImage(): string {
    if (
      this.deanSpeech?.deanSpeechAttachments &&
      this.deanSpeech.deanSpeechAttachments.length > 0
    ) {
      return this.deanSpeech.deanSpeechAttachments[0].url;
    }
    return 'Not Found';
  }
}
