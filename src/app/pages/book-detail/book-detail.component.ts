import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
  viewChild,
} from '@angular/core';
import { BookStore } from '../../store/book.store';
import { Book, Review } from '../../models/book';
import { MatButtonToggle } from '@angular/material/button-toggle';
import {
  MatAnchor,
  MatButton,
} from '@angular/material/button';
import { ReviewDialogComponent } from '../../components/review-dialog/review-dialog.component';
import { DataBaseService } from '../../services/data-base.service';
import { UserStore } from '../../store/user.store';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
} from '@angular/material/card';
import { BookService } from '../../services/book.service';
import { avrRate } from '../../../assets/helper';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatButton,
    ReviewDialogComponent,
    MatAnchor,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardContent,
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.sass',
})
export class BookDetailComponent implements OnInit {
  readonly bookStore = inject(BookStore);
  readonly userStore = inject(UserStore);
  userId: Signal<string | undefined> =
    this.userStore.userId;
  bookId = input.required<string>();
  selectedBook: Signal<Book | undefined> =
    this.bookStore.selectedBook;
  reviewDialog = viewChild.required(ReviewDialogComponent);
  reviews: Signal<Review[] | undefined> =
    this.bookStore.reviews;
  isMyBook = computed(
    () => this.selectedBook()?.userId === this.userId()
  );
  bookRate = computed(() =>
    avrRate(this.selectedBook()?.rateList)
  );
  private bookService = inject(BookService);
  private dbService = inject(DataBaseService);

  ngOnInit() {
    console.log('detail', this.bookId());
    console.log(this.selectedBook());
    if (
      !this.selectedBook() ||
      this.selectedBook()?.id !== this.bookId()
    ) {
      this.bookStore.setSelectedBook(this.bookId());
      this.bookStore.getBookReviews(this.bookId());
    }
  }

  openReview() {
    this.reviewDialog().openDialog(this.selectedBook());
  }

  addBookReview(review: Review) {
    review.bookId = this.selectedBook()?.id!;
    review.userId = this.userId()!;
    this.dbService.addEntity(review, 'reviews');
  }

  deleteBook() {
    this.bookService.deleteBook(this.bookId());
  }
}
