import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {BooksStorageService} from "../../services/books-storage.service";
import {IconBookComponent} from "../../shared/ui/icons/icon-book/icon-book.component";
import {BookInPopupInterface} from "../../interfaces/book-in-popup.interface";
import {BookEditPopupComponent} from "../book-edit-popup/book-edit-popup.component";

@Component({
  selector: 'app-book-detailed-popup',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, IconBookComponent],
  templateUrl: './book-detailed-popup.component.html',
  styleUrl: './book-detailed-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailedPopupComponent {
  readonly dialogRef = inject(MatDialogRef<BookDetailedPopupComponent>);
  readonly data = inject<BookInPopupInterface>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);
  private booksService = inject(BooksStorageService);

  editBook() {
    this.dialog.open(BookEditPopupComponent, {data: this.data});
    this.dialogRef.close()
  }

  deleteBook() {
    this.booksService.deleteBook(this.data.book);
    this.dialogRef.close();
  }
}
