/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrmCore } from './core.service';

describe('Service: Core', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrmCore]
    });
  });

  it('should create', inject([CrmCore], (service: CrmCore) => {
    expect(service).toBeTruthy();
  }));
});
