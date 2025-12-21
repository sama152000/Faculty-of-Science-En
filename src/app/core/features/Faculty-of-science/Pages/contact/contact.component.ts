import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// PrimeNG Modules
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

// Base Component
import { BaseComponent } from '../../../../../shared/components/base.component';

// Services
import { ContactsService } from '../../Services/real-services/contacts.service';
import { MemberService } from '../../Services/real-services/member.service';

// Models
import { ContactInfo, SocialLink } from '../../model/contact.model';
import { Member, MemberType } from '../../model/member.model';

// Types
type ActiveSection = 'general' | 'staff' | 'location';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    RouterModule,
    // PrimeNG
    SkeletonModule,
    CardModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    DividerModule,
    TooltipModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent extends BaseComponent implements OnInit {
  // ============================================
  // DEPENDENCY INJECTION
  // ============================================
  private readonly contactsService = inject(ContactsService);
  private readonly memberService = inject(MemberService);

  // ============================================
  // STATE SIGNALS
  // ============================================
  protected readonly contactInfo = signal<ContactInfo | null>(null);
  protected readonly members = signal<Member[]>([]);
  protected readonly activeSection = signal<ActiveSection>('general');
  protected readonly membersLoading = signal<boolean>(false);

  // ============================================
  // COMPUTED SIGNALS
  // ============================================

  /** Has contact info */
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
    if (contact.twitter) {
      links.push({
        platform: 'Twitter',
        url: contact.twitter,
        icon: 'pi pi-twitter',
        color: '#1DA1F2',
      });
    }
    if (contact.instagram) {
      links.push({
        platform: 'Instagram',
        url: contact.instagram,
        icon: 'pi pi-instagram',
        color: '#E4405F',
      });
    }
    if (contact.linkedIn) {
      links.push({
        platform: 'LinkedIn',
        url: contact.linkedIn,
        icon: 'pi pi-linkedin',
        color: '#0A66C2',
      });
    }
    if (contact.youTube) {
      links.push({
        platform: 'YouTube',
        url: contact.youTube,
        icon: 'pi pi-youtube',
        color: '#FF0000',
      });
    }
    if (contact.whatsApp) {
      links.push({
        platform: 'WhatsApp',
        url: `https://wa.me/${contact.whatsApp.replace(/\D/g, '')}`,
        icon: 'pi pi-whatsapp',
        color: '#25D366',
      });
    }

    return links;
  });

  /** Has social links */
  protected readonly hasSocialLinks = computed<boolean>(() => {
    return this.socialLinks().length > 0;
  });

  /** President/Dean member */
  protected readonly president = computed<Member | null>(() => {
    return this.members().find((m) => m.isPresident) ?? null;
  });

  /** Key staff (Vice Deans, etc.) */
  protected readonly keyStaff = computed<Member[]>(() => {
    return this.members().filter(
      (m) => !m.isPresident && m.memberType === 'Sector'
    );
  });

  /** Department members */
  protected readonly departmentMembers = computed<Member[]>(() => {
    return this.members().filter((m) => m.memberType === 'Department');
  });

  /** Has members */
  protected readonly hasMembers = computed<boolean>(() => {
    return this.members().length > 0;
  });

  /** Total members count */
  protected readonly totalMembersCount = computed<number>(() => {
    return this.members().length;
  });

  // ============================================
  // LIFECYCLE
  // ============================================
  ngOnInit(): void {
    this.loadContactData();
    this.loadMembers();
  }

  // ============================================
  // PRIVATE METHODS - DATA LOADING
  // ============================================

  /**
   * Load contact information from API
   */
  private loadContactData(): void {
    this.setLoading();

    this.contactsService
      .getAllContacts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data?.length > 0) {
            this.contactInfo.set(response.data[0]);
            this.setSuccess();
          } else {
            this.setError('No contact information found');
          }
        },
        error: (error: Error) => {
          this.handleError(error, 'Failed to load contact information');
        },
      });
  }

  /**
   * Load members from API
   */
  private loadMembers(): void {
    this.membersLoading.set(true);

    this.memberService
      .getAllMembers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            // Sort: President first, then by memberType
            const sorted = this.sortMembers(response.data);
            this.members.set(sorted);
          }
          this.membersLoading.set(false);
        },
        error: (error: Error) => {
          console.error('Failed to load members:', error.message);
          this.membersLoading.set(false);
        },
      });
  }

  /**
   * Sort members with President first
   */
  private sortMembers(members: Member[]): Member[] {
    return [...members].sort((a, b) => {
      // President first
      if (a.isPresident && !b.isPresident) return -1;
      if (!a.isPresident && b.isPresident) return 1;
      // Then by memberType priority
      const typePriority: Record<MemberType, number> = {
        President: 0,
        Sector: 1,
        Department: 2,
        Program: 3,
        Management: 4,
      };
      return (
        (typePriority[a.memberType] ?? 5) - (typePriority[b.memberType] ?? 5)
      );
    });
  }

  // ============================================
  // PROTECTED METHODS - UI ACTIONS
  // ============================================

  /**
   * Set active section
   */
  protected setActiveSection(section: ActiveSection): void {
    this.activeSection.set(section);
  }

  /**
   * Check if section is active
   */
  protected isActiveSection(section: ActiveSection): boolean {
    return this.activeSection() === section;
  }

  // ============================================
  // PROTECTED METHODS - UTILITIES
  // ============================================

  /**
   * Get member avatar URL
   */
  protected getMemberAvatar(member: Member): string {
    return (
      member.memberAttachments?.[0]?.url ?? 'assets/images/default-avatar.png'
    );
  }

  /**
   * Check if member has avatar
   */
  protected hasAvatar(member: Member): boolean {
    return (member.memberAttachments?.length ?? 0) > 0;
  }

  /**
   * Get member type badge severity
   */
  protected getMemberTypeSeverity(
    type: MemberType
  ): 'success' | 'info' | 'warn' | 'secondary' {
    switch (type) {
      case 'President':
        return 'success';
      case 'Sector':
        return 'info';
      case 'Department':
        return 'warn';
      default:
        return 'secondary';
    }
  }

  /**
   * Open social link in new tab
   */
  protected openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Open map location
   */
  protected openMap(): void {
    const mapUrl = this.contactInfo()?.mapLocation;
    if (mapUrl) {
      window.open(mapUrl, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Call phone number
   */
  protected callPhone(): void {
    const phone = this.contactInfo()?.phone;
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }

  /**
   * Send email
   */
  protected sendEmail(): void {
    const email = this.contactInfo()?.email;
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  }

  /**
   * Open website
   */
  protected openWebsite(): void {
    const website = this.contactInfo()?.webSite;
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  }

  // ============================================
  // ABSTRACT IMPLEMENTATION
  // ============================================
  protected override retry(): void {
    this.loadContactData();
    this.loadMembers();
  }
}
