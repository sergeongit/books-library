import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditPopupComponent } from './book-edit-popup.component';

describe('BookEditPopupComponent', () => {
  let component: BookEditPopupComponent;
  let fixture: ComponentFixture<BookEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEditPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
