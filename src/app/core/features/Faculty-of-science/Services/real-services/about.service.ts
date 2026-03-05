/**
 * About Service
 * Handles all API operations related to about pages/information
 * @version 1.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ApiResponse, PaginatedResponse } from '../../../../models/api.models';
import { PageRequest } from '../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';

/**
 * Goal Interface
 */
export interface Goal {
  id: string;
  index: number;
  goalName: string;
  aboutId: string;
}

/**
 * About/Page Interface
 */
export interface About {
  id: string;
  content: string;
  mission: string;
  vision: string;
  history: string;
  goals: Goal[];
  pageId: string;
  pageName: string;
  pageNameEn: string;
  pageType: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get about pages with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated about pages response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<About>> {
    return this.http
      .post<PaginatedResponse<About>>(API_ENDPOINTS.PAGES.GET_PAGED, data)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        }),
      );
  }

  /**
   * Get about page by ID
   * @param id about page unique identifier
   * @returns Observable of about page details
   */
  getById(id: string): Observable<ApiResponse<About>> {
    return this.http
      .get<ApiResponse<About>>(API_ENDPOINTS.PAGES.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        }),
      );
  }

  /**
   * Get all about pages
   * @returns Observable of all about pages
   */
  getAllAboutPages(): Observable<ApiResponse<About[]>> {
    return this.http
      .get<ApiResponse<About[]>>(API_ENDPOINTS.PAGES.GET_ALL)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        }),
      );
  }

  /**
   * Get about page by slug
   * Useful for routing based on slug instead of ID
   * @param slug The slug identifier (e.g., 'vision', 'mission')
   */
  getBySlug(slug: string): Observable<ApiResponse<About[]>> {
    // Filter by slug using getAllAboutPages
    // Backend should ideally have a dedicated endpoint for this
    return this.getAllAboutPages();
  }



  /**
   * الحصول على صفحة "عن الكلية" بشكل محدد
   * تصفية الصفحات للحصول على صفحة "عن الكلية"
   * @returns Observable يحتوي على بيانات صفحة "عن الكلية"
   */

  getAboutFaculty(): Observable<About | null> {
    return this.getAllAboutPages().pipe(
      map((response) => {
        if (!response?.success || !response?.data?.length) {
          return null;
        }

        return (
          response.data.find((page) => page.pageType === 'AboutUniversity' || page.pageNameEn === 'about') ||
          null
        );
      }),
      catchError((error) => {
        console.error('Failed to load About Faculty:', error);
        return of(null);
      })
    );
  }

  // getAboutFaculty(): Observable<About | null> {
  //   return this.getAllAboutPages().pipe(
  //     map((response) => {
  //       if (!response?.success || !response?.data?.length) {
  //         return null;
  //       }

  //       return (
  //         response.data.find((page) => {
  //           const type = page.pageType?.trim()?.toLowerCase();
  //           const nameEn = page.pageNameEn?.trim()?.toLowerCase();
  //           const nameAr = page.pageName?.trim();

  //           return (
  //             type === 'aboutuniversity' ||
  //             nameEn === 'about faculty' ||
  //             nameAr === 'عن الكلية'
  //           );
  //         }) || null
  //       );
  //     }),
  //     catchError((error) => {
  //       console.error('Failed to load About Faculty:', error);
  //       return of(null);
  //     }),
  //   );
  // }
}
