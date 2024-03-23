import { TestBed } from '@angular/core/testing';

import { HibeatService } from './hibeat.service';

describe('HibeatService', () => {
  let service: HibeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HibeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
