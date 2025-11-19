/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AboutUsService } from './about-us.service';

describe('Service: AboutUs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutUsService]
    });
  });

  it('should ...', inject([AboutUsService], (service: AboutUsService) => {
    expect(service).toBeTruthy();
  }));
});
