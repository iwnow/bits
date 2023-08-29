import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideCrmConfig } from '../config';
import { CommonService } from './common.service';

describe('Service: server/common', () => {
  let common: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideCrmConfig({
          apiBaseUrl: '/api/',
        }),
        CommonService,
      ],
    });
    common = TestBed.inject(CommonService);
  });

  it('should create', () => {
    expect(common).toBeTruthy();
  });

  describe('method apiUrl', () => {
    it('should return url with apiBaseUrl config', () => {
      const url = '/test/method';

      const result = common.apiUrl(url);

      expect(result).toBe('/api/test/method');
    });
  });
});
