/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CrmCompanyService } from './company.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideCrmConfig } from '../../config';

describe('Service: Company', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideCrmConfig({
          apiBaseUrl: '/api/'
        }),
        CrmCompanyService
      ],
    });
  });

  it('should ...', inject([CrmCompanyService], (service: CrmCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
