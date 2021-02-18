import { TestBed } from '@angular/core/testing';

import { RobinHubAceService } from './ace.service';

describe('AceService', () => {
  let service: RobinHubAceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobinHubAceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
