import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {BooksStorageService} from "../../services/books-storage.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, AsyncPipe, MatIconButton],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookSearchComponent implements OnInit {
  private booksService = inject(BooksStorageService);
  searchControl: FormControl = new FormControl<string>('')

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
      )
      .subscribe(
        param => this.booksService.findBooks(param)
      )
  }

  clearSearchField(): void {
    this.searchControl.reset();
    this.booksService.findBooks(' ');
  }
}
