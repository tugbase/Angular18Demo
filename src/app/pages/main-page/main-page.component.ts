import {
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { BookStore } from '../../store/book.store';
import { Book } from '../../models/book';
import {
  MatGridList,
  MatGridTile,
} from '@angular/material/grid-list';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { BookListItemComponent } from '../../components/book-list-item/book-list-item.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    BookListItemComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass',
})
export class MainPageComponent implements OnInit {
  readonly bookStore = inject(BookStore);
  topBooks: Signal<Book[]> = this.bookStore.getTopBooks;

  ngOnInit() {
    this.bookStore.getBooks();
  }
}
