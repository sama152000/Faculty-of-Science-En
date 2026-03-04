/**
 * Menus Service
 * Handles all API operations related to menus
 * @version 1.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ApiResponse, PaginatedResponse } from '../../../../models/api.models';
import { PageRequest } from '../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';

/**
 * Menu Item Interface
 * childs array contains the same structure recursively
 */
export interface MenuItem {
  id: string;
  pageId: string;
  title: string;
  titleEn: string;
  slug: string;
  icon: string;
  order: number;
  menuTypeId: string;
  menuType: string;
  parentId: string | null;
  parentName: string | null;
  childs: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get menus with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated menus response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<MenuItem>> {
    return this.http
      .post<PaginatedResponse<MenuItem>>(API_ENDPOINTS.MENUS.GET_PAGED, data)
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
   * Get menu item by ID
   * @param id Menu item unique identifier
   * @returns Observable of menu item details
   */
  getById(id: string): Observable<ApiResponse<MenuItem>> {
    return this.http
      .get<ApiResponse<MenuItem>>(API_ENDPOINTS.MENUS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        }),
      );
  }

  /**
   * Get all menus
   * @returns Observable of all menu items
   */
  getAll(): Observable<ApiResponse<MenuItem[]>> {
    return this.http
      .get<ApiResponse<MenuItem[]>>(API_ENDPOINTS.MENUS.GET_ALL)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        }),
      );
  }
}
