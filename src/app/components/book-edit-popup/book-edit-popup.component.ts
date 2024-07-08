import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookInPopupInterface} from "../../interfaces/book-in-popup.interface";
import {BooksStorageService} from "../../services/books-storage.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-book-edit-popup',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './book-edit-popup.component.html',
  styleUrl: './book-edit-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditPopupComponent {
  readonly dialogRef = inject(MatDialogRef<BookEditPopupComponent>);
  readonly data = inject<BookInPopupInterface>(MAT_DIALOG_DATA);
  private booksService = inject(BooksStorageService);
  private fb = inject(FormBuilder);

  bookForm: FormGroup = this.fb.group(
    {
      title: [this.data?.book?.title, Validators.required],
      year_of_publication: [this.data?.book?.year_of_publication, [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      author: [this.data?.book?.author, Validators.required],
      description: [this.data?.book?.description, Validators.maxLength(120)],
      cover: [this.data?.book?.cover, Validators.pattern('https?://.*\\.(jpeg|jpg|gif|png|webp)(\\?.*)?$')],
    }
  );

  onSubmit(): void {
    if (this.data && this.bookForm.valid) {
      // for editing existing book
      this.booksService.editBook({...this.bookForm.value, visible: true}, this.data.index);
    } else if (this.bookForm.valid) {
      // for creating new book
      this.booksService.addBook({...this.bookForm.value, visible: true});
    }
    this.dialogRef.close();
  }

  onClosePopup() {
    this.dialogRef.close();
  }
}
