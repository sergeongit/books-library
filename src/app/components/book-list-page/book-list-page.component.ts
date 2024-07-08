import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {BooksStorageService} from "../../services/books-storage.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDialog} from "@angular/material/dialog";
import {BookDetailedPopupComponent} from "../book-detailed-popup/book-detailed-popup.component";
import {BookInterface} from "../../interfaces/book.interface";
import {AsyncPipe} from "@angular/common";
import {IconBookComponent} from "../../shared/ui/icons/icon-book/icon-book.component";
import {Observable} from "rxjs";
import {BookEditPopupComponent} from "../book-edit-popup/book-edit-popup.component";
import {BookSearchComponent} from "../book-search/book-search.component";

@Component({
  selector: 'app-book-list-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, AsyncPipe, IconBookComponent, BookSearchComponent],
  templateUrl: './book-list-page.component.html',
  styleUrl: './book-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListPageComponent {
  private booksService = inject(BooksStorageService);
  readonly dialog = inject(MatDialog);
  booksListObservable: Observable<BookInterface[]> = this.booksService.getBooksList();

  showDetails(book: BookInterface, index: number): void {
    const dialogRef = this.dialog.open(BookDetailedPopupComponent, {data: {book, index}});
  }

  addBook() {
    const dialogRef = this.dialog.open(BookEditPopupComponent);
  }

  editBook(event: Event, book: BookInterface, index: number) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(BookEditPopupComponent, {data: {book, index}});
  }

  deleteBook(event: Event, book: BookInterface) {
    event.stopPropagation();
    this.booksService.deleteBook(book);
  }
}
