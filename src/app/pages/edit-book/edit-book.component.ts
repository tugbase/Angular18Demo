import {
  Component,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { BookFormComponent } from '../../components/book-form/book-form.component';
import { BookStore } from '../../store/book.store';
import { Book } from '../../models/book';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [BookFormComponent],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.sass',
})
export class EditBookComponent implements OnInit {
  bookStore = inject(BookStore);
  readonly userStore = inject(UserStore);
  bookId = input.required<string>();
  bookToUpdated: Signal<Book | undefined> =
    this.bookStore.selectedBook;

  ngOnInit() {

    if (
      !this.bookToUpdated() ||
      this.bookToUpdated()?.id !== this.bookId()
    ) {
      this.bookStore.setSelectedBook(this.bookId());
    }
    console.log();
  }

  updateBook(event: any) {
    const rateList = this.bookToUpdated()?.rateList!;
    const rate = rateList.find(
      (rate) => rate.userId === this.userStore.userId()
    );
    rate ? (rate.rate = event.rate) : null;
    delete event.rate;
    const book: Book = {
      ...event,
      rateList,
      id: this.bookToUpdated()?.id,
    };
    this.bookStore.updateBook(book);
  }
}
