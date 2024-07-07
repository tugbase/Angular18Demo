import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },

  { path: 'my-books', component: MyBooksComponent },
  { path: 'books', component: AllBooksComponent },
  { path: 'add-book', component: AddBookComponent },
  {
    path: 'edit-book/:bookId',
    component: EditBookComponent,
  },
  { path: 'books/:bookId', component: BookDetailComponent },
  {
    path: 'my-books/:bookId',
    component: BookDetailComponent,
  },
  { path: '**', component: NotFoundComponent },
];
