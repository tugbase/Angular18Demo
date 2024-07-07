import {
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MatAnchor,
  MatButton,
} from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import {
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { Book } from '../../models/book';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-book-list-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatButton,
    MatFormField,
    MatSelect,
    MatOption,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatLabel,
    MatCardTitle,
    MatAnchor,
  ],
  templateUrl: './book-list-item.component.html',
  styleUrl: './book-list-item.component.sass',
})
export class BookListItemComponent implements OnInit {
  bookItem = input.required<Book>();
  selectedRate = signal<number | undefined>(undefined);
  rate = output<any | undefined>();
  rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  averageRate = computed(
    () =>
      +(
        this.bookItem()?.rateList!.reduce(
          (acc, prev) => acc + prev.rate,
          0
        ) / this.bookItem()?.rateList!.length
      ).toFixed(0)
  );
  protected readonly Number = Number;
  protected readonly isNaN = isNaN;

  ngOnInit() {
    this.selectedRate.set(this.averageRate());
  }

  rateBook() {
    this.rate.emit({
      rate: this.selectedRate(),
      bookId: this.bookItem()?.id,
    });
  }
}
