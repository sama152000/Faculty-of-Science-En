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
import { AboutService } from '../../Services/real-services/about.service';
import { DeanSpeechsService } from '../../Services/real-services/dean-speechs.service';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe';

// الخدمات والنماذج

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
  imports: [CommonModule, CleanHtmlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent extends BaseComponent implements OnInit {
  // الخدمات
  private readonly aboutService = inject(AboutService);
  private readonly deanSpeechsService = inject(DeanSpeechsService);

  // حالة الكومبوننت
  protected aboutData = signal<AboutPage | null>(null);
  protected presidentData = signal<DeanSpeech | null>(null);
  protected tabs = signal<Tab[]>([]);
  protected activeTab = signal<string>('Dean');
  protected isVisible = signal<boolean>(false);

  // القيم المحسوبة
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
    this.loadPresidentData();
    this.loadAboutData();
    setTimeout(() => this.isVisible.set(true), 200);
  }

  /**
   * تحميل بيانات "عن الكلية" من API
   */
  private loadAboutData(): void {
    this.setLoading();

    this.aboutService
      .getAboutFaculty()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (!data) {
            this.setError('Faculty data was not found');
            return;
          }

          this.aboutData.set(data);
          this.buildTabs();
          this.setSuccess();
        },
        error: (error) => {
          this.handleError(error, 'Failed to load faculty data');
        },
      });
  }

  /**
   * تحميل بيانات كلمة العميد من API
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
          console.error("Failed to load Dean's speech:", error);
          // عدم تعيين حالة الخطأ، الاستمرار بدون كلمة العميد
        },
      });
  }

  /**
   * بناء التبويبات من البيانات المحملة
   */
  private buildTabs(): void {
    const data = this.aboutData();
    if (!data) return;

    const newTabs: Tab[] = [];

    // إضافة تبويب كلمة العميد أولاً إذا كان متاحاً
    const deanSpeech = this.presidentData();
    if (deanSpeech) {
      newTabs.push({
        id: 'Dean',
        title: "Dean's Speech",
        icon: 'pi pi-user',
        content: deanSpeech.speech ?? "Dean's speech was not found",
        type: 'Dean',
      });
    } else {
      // إذا لم تكن هناك بيانات العميد، تعيين التبويب النشط إلى "المقدمة"
      this.activeTab.set('introduction');
    }

    // إضافة التبويبات الأخرى
    newTabs.push(
      {
        id: 'introduction',
        title: 'Introduction',
        icon: 'pi pi-book', // كتاب = تقديم / تعريف
        content: data.content ?? 'Content was not found',
      },
      {
        id: 'vision',
        title: 'Vision',
        icon: 'pi pi-eye', // عين = رؤية
        content: data.vision ?? 'Vision was not found',
      },
      {
        id: 'mission',
        title: 'Mission',
        icon: 'pi pi-send', // إرسال = رسالة / مهمة
        content: data.mission ?? 'Mission was not found',
      },
      {
        id: 'history',
        title: 'History',
        icon: 'pi pi-clock', // ساعة = تاريخ / زمن
        content: data.history ?? 'History was not found',
        type: 'text',
      },
      {
        id: 'goals',
        title: 'Goals',
        icon: 'pi pi-bullseye', // هدف = أهداف
        content: data.goals ?? [],
        type: 'array',
      }
    );

    this.tabs.set(newTabs);
  }

  /**
   * تعيين التبويب النشط
   */
  protected setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  /**
   * إعادة محاولة التحميل (من BaseComponent)
   */
  protected override retry(): void {
    this.loadAboutData();
  }

  /**
   * التحقق من أن المحتوى عبارة عن مصفوفة (للأهداف)
   */
  protected isArray(content: any): boolean {
    return Array.isArray(content);
  }
}
