import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailedPopupComponent } from './book-detailed-popup.component';

describe('BookDetailedPopupComponent', () => {
  let component: BookDetailedPopupComponent;
  let fixture: ComponentFixture<BookDetailedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailedPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
