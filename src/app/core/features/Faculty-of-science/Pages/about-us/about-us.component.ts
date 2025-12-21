import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// PrimeNG
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

// Base Component
import { BaseComponent } from '../../../../../shared/components/base.component';
import { PagesService } from '../../Services/real-services/pages.service';
import { DeanSpeechsService } from '../../Services/real-services/dean-speechs.service';

// Services & Models

interface Tab {
  id: string;
  title: string;
  icon: string;
  content: string | any[];
  type?: 'text' | 'array' | 'Dean';
}

interface AboutPage {
  pageName?: string;
  content?: string;
  vision?: string;
  mission?: string;
  history?: string;
  goals?: Goal[];
  [key: string]: any;
}

interface DeanSpeech {
  memberName?: string;
  memberPosition?: string;
  speech?: string;
  deanSpeechAttachments?: { url: string }[];
}

interface Goal {
  index?: number;
  goalName: string;
  id?: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent extends BaseComponent implements OnInit {
  // Services
  private readonly pagesService = inject(PagesService);
  private readonly deanSpeechsService = inject(DeanSpeechsService);

  // Component-specific State
  protected aboutData = signal<AboutPage | null>(null);
  protected presidentData = signal<DeanSpeech | null>(null);
  protected tabs = signal<Tab[]>([]);
  protected activeTab = signal<string>('Dean');
  protected isVisible = signal<boolean>(false);

  // Computed values
  protected activeTabData = computed(() => {
    const tabId = this.activeTab();
    return this.tabs().find((t) => t.id === tabId);
  });

  protected activeTabTitle = computed(() => {
    return this.activeTabData()?.title || '';
  });

  protected activeTabContent = computed(() => {
    return this.activeTabData()?.content || '';
  });

  protected activeTabIcon = computed(() => {
    return this.activeTabData()?.icon || '';
  });

  ngOnInit(): void {
    this.loadAboutData();
    this.loadPresidentData();
    setTimeout(() => this.isVisible.set(true), 200);
  }

  /**
   * Load about university data from API
   */
  private loadAboutData(): void {
    this.setLoading();

    this.pagesService
      .getAllPages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const data = response.data?.find(
            (item: any) => item.pageName === 'عن الكلية' || 'About Faculty'
          );

          if (data) {
            this.aboutData.set(data);
            this.buildTabs();
            this.setSuccess();
          } else {
            this.setError('لم يتم العثور على بيانات عن الكلية');
          }
        },
        error: (error) => {
          this.handleError(error, 'فشل تحميل بيانات عن الكلية');
        },
      });
  }

  /**
   * Load president message data from API
   */
  private loadPresidentData(): void {
    this.deanSpeechsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const data = response?.data?.[0];
          if (data) {
            this.presidentData.set(data);
            this.buildTabs();
          }
        },
        error: (error) => {
          console.error('Failed to load president message:', error);
          // Don't set error state, just continue without president message
        },
      });
  }

  /**
   * Build tabs from loaded data
   */
  private buildTabs(): void {
    const data = this.aboutData();
    if (!data) return;

    const newTabs: Tab[] = [];

    // Add president message tab first if available
    const deanSpeech = this.presidentData();
    if (deanSpeech) {
      newTabs.push({
        id: 'Dean',
        title: "Dean's Message",
        icon: 'pi pi-user',
        content: deanSpeech.speech ?? 'Not Found Speech',
        type: 'Dean',
      });
    } else {
      // If no president data, set vision as active tab
      this.activeTab.set('introduction');
    }

    // Add other tabs
    newTabs.push(
      {
        id: 'introduction',
        title: 'Introduction',
        icon: 'pi pi-eye',
        content: data.content ?? 'Not Found Content',
      },
      {
        id: 'vision',
        title: 'Vision',
        icon: 'pi pi-eye',
        content: data.vision ?? 'Not Found Vision',
      },
      {
        id: 'mission',
        title: 'Mission',
        icon: 'pi pi-flag',
        content: data.mission ?? 'Not Found Mission',
      },
      {
        id: 'history',
        title: 'History',
        icon: 'pi pi-history',
        content: data.history ?? 'Not Found History',
        type: 'text',
      },
      {
        id: 'goals',
        title: 'Objectives',
        icon: 'pi pi-bullseye',
        content: data.goals ?? [],
        type: 'array',
      }
    );

    this.tabs.set(newTabs);
  }

  /**
   * Set active tab
   */
  protected setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  /**
   * Retry loading (from BaseComponent)
   */
  protected override retry(): void {
    this.loadAboutData();
  }

  /**
   * Check if content is array (for goals)
   */
  protected isArray(content: any): boolean {
    return Array.isArray(content);
  }
}
