import { Component, inject } from '@angular/core';
import { BookFormComponent } from '../../components/book-form/book-form.component';
import { DataBaseService } from '../../services/data-base.service';
import { UserStore } from '../../store/user.store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookStore } from '../../store/book.store';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [BookFormComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.sass',
})
export class AddBookComponent {
  readonly userStore = inject(UserStore);
  readonly bookStore = inject(BookStore);

  constructor(
    private dbService: DataBaseService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  addBook(event: any) {
    event.userId = this.userStore.userId();
    const book = event;
    book.rateList = [];
    book.rateList.push({
      rate: event.rate,
      userId: this.userStore.userId()!,
    });
    delete book.rate;
    this.bookStore.addBook(event);
  }

  getBooks(): void {
    this.dbService.getEntities('books');
  }
}
