import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BookListItemComponent } from '../../components/book-list-item/book-list-item.component';
import { BookService } from '../../services/book.service';
import {
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import {
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { sortBooks } from '../../../assets/helper';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [
    BookListItemComponent,
    MatPaginator,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    MatLabel,
    FormsModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.sass',
})
export class AllBooksComponent implements OnInit {
  searchInput = signal('');
  searchInput$ = toObservable(this.searchInput);
  pageIndex = signal(0);
  pageSize = signal(10);
  sortInput = signal('rate');
  shownBooks = computed(() =>
    this.allBooks()
      .sort((a, b) => sortBooks(a, b, this.sortInput()))
      .slice(
        this.pageIndex() * this.pageSize(),
        this.pageIndex() * this.pageSize() + this.pageSize()
      )
  );
  private bookService = inject(BookService);
  allBooks = this.bookService.bookStore.bookList;

  constructor() {
    effect(() => {
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
    if(!this.allBooks()) {
      this.bookService.getBooks();
    }

  }

  updateRate(event: any) {
    this.bookService.updateRate(event.rate, event.bookId);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
