import { TestBed } from '@angular/core/testing';

import { BooksStorageService } from './books-storage.service';

describe('BooksStorageService', () => {
  let service: BooksStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
