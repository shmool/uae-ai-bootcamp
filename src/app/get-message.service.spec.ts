import { TestBed } from '@angular/core/testing';

import { GetMessageService } from './get-message.service';

describe('GetMessageService', () => {
  let service: GetMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
