import { Book, Review } from '../models/book';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  endAt,
  equalTo,
  onValue,
  orderByChild,
  query,
  startAt,
} from '@angular/fire/database';
import { avrRate } from '../../assets/helper';

export interface BookState {
  bookList: Book[];
  topBooks: Book[];
  selectedBook: Book | undefined;
  reviews: Review[];
  isLoading: boolean;
  addBookSuccess: boolean;
}

const initialState: BookState = {
  bookList: [],
  topBooks: [],
  reviews: [],
  selectedBook: undefined,
  isLoading: false,
  addBookSuccess: false,
};

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(
    (store, activatedRoute = inject(ActivatedRoute)) => ({
      getTopBooks: computed(() => {
        return store
          .bookList()
          .sort(
            (a, b) =>
              avrRate(b.rateList) - avrRate(a.rateList)
          )
          .slice(0, 10);
      }),
    })
  ),
  withMethods(
    (
      store,
      databaseService = inject(DataBaseService),
      router = inject(Router)
    ) => ({
      addBook: (book: Book) => {
        databaseService
          .addEntity(book, 'books')
          .then((val) => {
            router.navigate(['/my-books']);
          });

        patchState(store, { addBookSuccess: true });
      },
      getBooks: () => {
        onValue(
          databaseService.getEntities('books'),
          (snapshot) => {
            patchState(store, {
              bookList:
                databaseService.snapshotToArray(snapshot),
            });
          }
        );
      },
      getFilteredBooks: (filter: string | undefined) => {
        onValue(
          query(
            databaseService.getEntities('books'),
            orderByChild('title'),
            startAt(filter),
            endAt(filter + '\uf8ff')
          ),
          (snapshot) => {
            patchState(store, {
              bookList:
                databaseService.snapshotToArray(snapshot),
            });
          }
        );
      },
      getUserBooks: (userId: string | undefined) => {
        onValue(
          query(
            databaseService.getEntities('books'),
            orderByChild('userId'),
            equalTo(userId ? userId : '')
          ),
          (snapshot) => {
            patchState(store, {
              bookList:
                databaseService.snapshotToArray(snapshot),
            });
          }
        );
      },

      getBookReviews: (bookId: string) => {
        onValue(
          query(
            databaseService.getEntities('reviews'),
            orderByChild('bookId'),
            equalTo(bookId ? bookId : '')
          ),
          (snapshot) => {
            patchState(store, {
              reviews:
                databaseService.snapshotToArray(snapshot),
            });
          }
        );
      },

      setSelectedBook: (bookId: string) => {
        onValue(
          databaseService.getEntities(`books/${bookId}`),
          (snapshot) => {
            patchState(store, {
              selectedBook: snapshot.val(),
            });
          }
        );
        patchState(store, {
          selectedBook: store
            .bookList()
            .find((book) => book.id === bookId),
        });
      },
      updateBook: (book: Book) => {
        databaseService
          .updateEntity(book, 'books')
          .then((val) => {
            router.navigate(['/books']);
          });
      },
      addReview: (review: Review) => {
        databaseService.addEntity(review, 'reviews');
      },
      deleteBook: (bookId: string) => {
        databaseService
          .deleteEntity(bookId, 'books/')
          .then((val) => {
            const updatedBooks = store
              .bookList()
              .filter((book) => book.id !== bookId);
            patchState(store, { bookList: updatedBooks });
            router.navigate(['/my-books']);
          });
      },
      deleteReview: (reviewId: string) => {
        databaseService
          .deleteEntity(reviewId, 'reviews')
          .then((_) =>
            patchState(store, {
              reviews: store
                .reviews()
                .filter((review) => review.id !== reviewId),
            })
          );
      },
    })
  )
);
