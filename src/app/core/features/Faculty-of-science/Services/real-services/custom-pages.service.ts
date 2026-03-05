/**
 * Custom Pages Service
 * Handles all API operations related to custom pages
 * @version 1.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import {
  ApiResponse,
  PaginatedResponse,
} from '../../../../models/api.models';
import { PageRequest } from '../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';

/**
 * Page Attachment Interface
 */
export interface PageAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  pageId: string;
}

/**
 * Custom Page Interface
 */
export interface CustomPage {
  id: string;
  pageId: string;
  slug: string;
  pageType: string;
  pageTemplate: string;
  subTitle: string;
  content: string;
  status: string;
  publishedDate: string;
  featuredImagePath: string;
  pageAttachments: PageAttachment[];
}

@Injectable({
  providedIn: 'root',
})
export class CustomPagesService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get custom pages with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated custom pages response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<CustomPage>> {
    return this.http
      .post<PaginatedResponse<CustomPage>>(
        API_ENDPOINTS.CUSTOMEPAGES.GET_PAGED,
        data
      )
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get custom page by ID
   * @param id custom page unique identifier
   * @returns Observable of custom page
   */
  getById(id: string): Observable<ApiResponse<CustomPage>> {
    return this.http
      .get<ApiResponse<CustomPage>>(
        API_ENDPOINTS.CUSTOMEPAGES.GET_BY_ID(id)
      )
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all custom pages
   * @returns Observable of all custom pages
   */
  getAll(): Observable<ApiResponse<CustomPage[]>> {
    return this.http
      .get<ApiResponse<CustomPage[]>>(API_ENDPOINTS.CUSTOMEPAGES.GET_ALL)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get custom page by slug
   * @param slug The page slug to search for
   * @returns Observable of the matching custom page
   */
  getBySlug(slug: string): Observable<CustomPage | null> {
    return new Observable((observer) => {
      this.getAll().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const found = response.data.find(
              (page) => page.slug === slug
            );
            observer.next(found || null);
            observer.complete();
          } else {
            observer.next(null);
            observer.complete();
          }
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  /**
   * Get custom page by pageId
   * @param pageId The page ID to filter by
   * @returns Observable of the matching custom page
   */
  getByPageId(pageId: string): Observable<CustomPage | null> {
    return new Observable((observer) => {
      this.getAll().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const found = response.data.find(
              (page) => page.pageId === pageId
            );
            observer.next(found || null);
            observer.complete();
          } else {
            observer.next(null);
            observer.complete();
          }
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
}
