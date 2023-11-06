/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrmAuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideCrmConfig } from '../../config';

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CrmAuthService,
        provideCrmConfig({
          apiBaseUrl: '/',
        }),
      ],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([CrmAuthService], (service: CrmAuthService) => {
    expect(service).toBeTruthy();
  }));
});
