import { inject, Injectable, Signal } from '@angular/core';
import { BookStore } from '../store/book.store';
import { UserStore } from '../store/user.store';
import { DataBaseService } from './data-base.service';
import { Review } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  readonly bookStore = inject(BookStore);
  readonly userStore = inject(UserStore);
  readonly dbService = inject(DataBaseService);

  getBooks() {
    this.bookStore.getBooks();
  }

  getUserBooks(userId: string) {
    this.bookStore.getUserBooks(userId);
  }

  getFilteredBooks(filter: string) {
    this.bookStore.getFilteredBooks(filter);
  }

  updateRate(rate: number, bookId: string) {
    const book = this.bookStore
      .bookList()
      .find((book) => book.id === bookId);
    const myRate = book?.rateList?.find(
      (rate) => rate.userId === this.userStore.userId()
    );
    myRate
      ? (myRate.rate = rate)
      : book?.rateList!.push({
          rate: rate,
          userId: this.userStore.userId()!,
        });
    this.bookStore.updateBook(book!);
  }

  deleteBook(bookId: string) {
    this.bookStore.deleteBook(bookId);
    this.deleteReviews(bookId);
  }

  deleteReviews(bookId: string) {
    const bookReviews: Signal<Review[]> =
      this.bookStore.reviews;
    bookReviews().forEach((review) => {
      this.bookStore.deleteReview(review.id);
    });
  }
}
