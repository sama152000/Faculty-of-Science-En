import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

// Services
import { ContactsService } from '../../../Services/real-services/contacts.service';
import { VisitorsService } from '../../../Services/real-services/visitors.service';
import {
  DepartmentsService,
  Department,
} from '../../../Services/real-services/departments';
import {
  MenusService,
  MenuItem,
} from '../../../Services/real-services/menus.service';

// Models
import { ContactInfo, SocialLink } from '../../../model/contact.model';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';
import { AboutService } from '../../../Services/real-services/about.service';

// About Page Interface
interface AboutPage {
  pageName?: string;
  content?: string;
  vision?: string;
  mission?: string;
  history?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, CleanHtmlPipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  // ============================================
  // DEPENDENCY INJECTION
  // ============================================
  private readonly contactsService = inject(ContactsService);
  private readonly aboutService = inject(AboutService);
  private readonly departmentsService = inject(DepartmentsService);
  private readonly menusService = inject(MenusService);
  private readonly visitorsService = inject(VisitorsService);
  private readonly destroyRef = inject(DestroyRef);

  // ============================================
  // STATE SIGNALS
  // ============================================
  protected readonly contactInfo = signal<ContactInfo | null>(null);
  protected readonly aboutData = signal<AboutPage | null>(null);
  protected readonly departments = signal<Department[]>([]);
  protected readonly menuItems = signal<MenuItem[]>([]);
  protected readonly showScrollTop = signal<boolean>(false);
  protected readonly todayVisitors = signal<number>(0);
  protected readonly monthVisitors = signal<number>(0);
  protected readonly totalVisitors = signal<number>(0);
  protected readonly visitorsLoaded = signal<boolean>(false);
  protected readonly currentYear = new Date().getFullYear();

  // Scroll listener reference
  private scrollListener: (() => void) | null = null;

  // ============================================
  // COMPUTED SIGNALS
  // ============================================

  /** First 5 departments for footer */
  protected readonly footerDepartments = computed<Department[]>(() => {
    return this.departments().slice(0, 5);
  });

  /** Vision text for footer */
  protected readonly visionText = computed<string>(() => {
    return (
      this.aboutData()?.vision ||
      'Faculty of Science at Luxor University is committed to excellence in education, scientific research, and innovation for a better future. 🎓✨'
    );
  });

  /** Has contact info loaded */
  protected readonly hasContactInfo = computed<boolean>(() => {
    return this.contactInfo() !== null;
  });

  /** Social media links */
  protected readonly socialLinks = computed<SocialLink[]>(() => {
    const contact = this.contactInfo();
    if (!contact) return [];

    const links: SocialLink[] = [];

    if (contact.facebook) {
      links.push({
        platform: 'Facebook',
        url: contact.facebook,
        icon: 'pi pi-facebook',
        color: '#1877F2',
      });
    }
    // if (contact.twitter) {
    //   links.push({
    //     platform: 'Twitter',
    //     url: contact.twitter,
    //     icon: 'pi pi-twitter',
    //     color: '#1DA1F2',
    //   });
    // }
    // if (contact.instagram) {
    //   links.push({
    //     platform: 'Instagram',
    //     url: contact.instagram,
    //     icon: 'pi pi-instagram',
    //     color: '#E4405F',
    //   });
    // }
    // if (contact.linkedIn) {
    //   links.push({
    //     platform: 'LinkedIn',
    //     url: contact.linkedIn,
    //     icon: 'pi pi-linkedin',
    //     color: '#0A66C2',
    //   });
    // }
    // if (contact.youTube) {
    //   links.push({
    //     platform: 'YouTube',
    //     url: contact.youTube,
    //     icon: 'pi pi-youtube',
    //     color: '#FF0000',
    //   });
    // }
    // if (contact.whatsApp) {
    //   links.push({
    //     platform: 'WhatsApp',
    //     url: `https://wa.me/${contact.whatsApp.replace(/\D/g, '')}`,
    //     icon: 'pi pi-whatsapp',
    //     color: '#25D366',
    //   });
    // }

    return links;
  });

  /** Has social links */
  protected readonly hasSocialLinks = computed<boolean>(() => {
    return this.socialLinks().length > 0;
  });

  // ============================================
  // LIFECYCLE
  // ============================================
  ngOnInit(): void {
    this.loadContactInfo();
    this.loadAboutData();
    this.loadDepartments();
    this.loadMenus();
    this.loadVisitorStats();
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    this.removeScrollListener();
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Load contact information from API
   */
  private loadContactInfo(): void {
    this.contactsService
      .getAllContacts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data?.length > 0) {
            this.contactInfo.set(response.data[0]);
          }
        },
        error: (error: Error) => {
          console.error(
            'Failed to load contact info for footer:',
            error.message,
          );
        },
      });
  }

  /**
   * Load about data (vision) from API
   */
  private loadAboutData(): void {
    this.aboutService
      .getAboutFaculty()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.aboutData.set(data);
        },
        error: (error) => {
          console.error('Failed to load about data for footer:', error.message);
        },
      });
  }

  /**
   * Load departments from API
   */
  private loadDepartments(): void {
    this.departmentsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.departments.set(response.data);
          }
        },
        error: (error: Error) => {
          console.error(
            'Failed to load departments for footer:',
            error.message,
          );
        },
      });
  }

  /**
   * Load menu items from API
   */
  private loadMenus(): void {
    this.menusService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const mainMenus = response.data
              .filter(
                (item) =>
                  (item.menuType?.toLowerCase() === 'main' ||
                    item.menuType === 'Main') &&
                  item.parentId === null,
              )
              .sort((a, b) => a.order - b.order);
            this.menuItems.set(mainMenus);
          }
        },
        error: (error: Error) => {
          console.error('Failed to load menus for footer:', error.message);
        },
      });
  }

  /**
   * Load visitor statistics from API
   */
  private loadVisitorStats(): void {
    forkJoin({
      today: this.visitorsService.getToday(),
      month: this.visitorsService.getMonth(),
      total: this.visitorsService.getTotal(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (stats) => {
          this.todayVisitors.set(stats.today.todayViews ?? 0);
          this.monthVisitors.set(stats.month.monthViews ?? 0);
          this.totalVisitors.set(stats.total.totalViews ?? 0);
          console.log(stats);

          this.visitorsLoaded.set(true);
        },
        error: (error: Error) => {
          console.error(
            'Failed to load visitor stats for footer:',
            error.message,
          );
        },
      });
  }

  /**
   * Setup scroll event listener
   */
  private setupScrollListener(): void {
    this.scrollListener = () => {
      this.showScrollTop.set(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', this.scrollListener);
  }

  /**
   * Remove scroll event listener
   */
  private removeScrollListener(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  // ============================================
  // PROTECTED METHODS
  // ============================================

  /**
   * Scroll to top of page
   */
  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /**
   * Open social link in new tab
   */
  protected openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
