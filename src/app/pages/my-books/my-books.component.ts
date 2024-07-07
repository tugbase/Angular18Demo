import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { BookListItemComponent } from '../../components/book-list-item/book-list-item.component';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import {
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { sortBooks } from '../../../assets/helper';
import {
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [
    BookListItemComponent,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    FormsModule,
    MatPaginator,
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.sass',
})
export class MyBooksComponent implements OnInit {
  searchInput = signal('');
  searchInput$ = toObservable(this.searchInput);
  sortInput = signal('rate');
  pageIndex = signal(0);
  pageSize = signal(10);
  shownBooks = computed(() =>
    this.myBooks()
      .sort((a, b) => sortBooks(a, b, this.sortInput()))
      .slice(
        this.pageIndex() * this.pageSize(),
        this.pageIndex() * this.pageSize() + this.pageSize()
      )
  );
  private bookService = inject(BookService);
  myBooks: Signal<Book[]> =
    this.bookService.bookStore.bookList;
  private afAuth = inject(Auth);

  constructor() {
    effect(() => {
      console.log(this.searchInput());
      this.searchInput$
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((search) => {
          if (search === '') {
            return this.bookService.getBooks();
          }
          this.bookService.getFilteredBooks(search);
        });
    });
  }

  ngOnInit() {
    this.afAuth.onAuthStateChanged((user) => {
      console.log('my-books');
      this.bookService.getUserBooks(user?.uid!);
    });
  }

  updateRate(event: any) {
    this.bookService.updateRate(event.rate, event.bookId);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
