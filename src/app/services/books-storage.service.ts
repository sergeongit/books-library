import {Injectable} from '@angular/core';
import {BookInterface} from "../interfaces/book.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksStorageService {
  private booksListMockData: BookInterface[] = [
    {
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year_of_publication": 1960,
      "visible": true
    },
    {
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "year_of_publication": 1813,
      "visible": true
    },
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year_of_publication": 1925,
      "visible": true,
      "cover": "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1"
    },
    {
      "title": "Moby Dick",
      "author": "Herman Melville",
      "year_of_publication": 1851,
      "visible": true,
      "cover": "https://images.booksense.com/images/007/839/9781954839007.jpg"
    }
  ];

  private booksListSubject: BehaviorSubject<BookInterface[]> = new BehaviorSubject<BookInterface[]>(this.booksListMockData);

  // CRUD methods for booksList manipulation

  addBook(newBook: BookInterface): void {
    const currentBooks = this.booksListSubject.getValue();
    this.booksListSubject.next([...currentBooks, newBook]);
  }

  getBooksList(): Observable<BookInterface[]> {
    return this.booksListSubject.asObservable()
  }

  editBook(updatedBook: BookInterface, index: number): void {
    const currentBooks = this.booksListSubject.getValue();
    currentBooks[index] = updatedBook;
    this.booksListSubject.next([...currentBooks]);
  }

  deleteBook(deletedBook: BookInterface): void {
    const currentBooks = this.booksListSubject.getValue();
      const updatedBooks = currentBooks.filter((book) => book.title !== deletedBook.title);
      this.booksListSubject.next(updatedBooks);
  }

  // Books search
  findBooks(param: string): void {
    const searchingParameter = (param || '').trim().toLowerCase();
    const currentBooks = this.booksListSubject.getValue().map(book => ({
      ...book,
      visible: !searchingParameter || book.title.toLowerCase().includes(searchingParameter) || book.author.toLowerCase().includes(searchingParameter)
    }));
    this.booksListSubject.next(currentBooks);
  }
}
