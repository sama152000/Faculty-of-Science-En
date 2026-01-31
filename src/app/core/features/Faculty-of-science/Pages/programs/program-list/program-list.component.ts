import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { Program } from '../../../model/program.model';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule, SkeletonModule, CleanHtmlPipe],
  templateUrl: './program-list.component.html',
  styleUrls: ['../programs.component.css'],
})
export class ProgramListComponent {
  // Using input() function for signal-based inputs
  programs = input<Program[]>([]);
  loading = input<boolean>(false);
  selectedProgramId = input<string | null>(null);

  @Output() programSelected = new EventEmitter<Program>();

  isSelected(programId: string): boolean {
    return this.selectedProgramId() === programId;
  }

  onSelectProgram(program: Program): void {
    this.programSelected.emit(program);
  }

  getProgramImage(program: Program): string | null {
    if (program.programAttachments && program.programAttachments.length > 0) {
      return program.programAttachments[0].url;
    }
    return null;
  }

  getShortDescription(program: Program): string {
    if (program.about) {
      // Strip HTML tags and limit to 80 characters
      const text = program.about.replace(/<[^>]*>/g, '');
      return text.length > 80 ? text.substring(0, 80) + '...' : text;
    }
    return '';
  }
}
