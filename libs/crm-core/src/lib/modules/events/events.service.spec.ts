/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { EventsBusService } from './events.service';

describe('Service: EventsBus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsBusService],
    });
  });

  it('should ...', inject([EventsBusService], (service: EventsBusService) => {
    expect(service).toBeTruthy();
  }));
});
