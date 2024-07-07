import {
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { Book } from '../../models/book';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    MatLabel,
    MatCheckbox,
    MatError,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.sass',
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  pointArray: number[] = [];
  newBook = output<Book>();
  bookToEdit = input<Book | undefined>();

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: [
        this.bookToEdit()?.title,
        Validators.required,
      ],
      imageUrl: [
        this.bookToEdit()?.imageUrl,
        [Validators.required],
      ],
      author: [
        this.bookToEdit()?.author,
        Validators.required,
      ],
      page: [
        this.bookToEdit()?.page,
        [Validators.required, Validators.min(1)],
      ],
      award: [this.bookToEdit()?.award],
      description: [this.bookToEdit()?.description],
      classic: [this.bookToEdit()?.classic],
      isRead: [this.bookToEdit()?.isRead],
      rate: [
        this.bookToEdit()?.rateList?.find(
          (rate) =>
            rate.userId === this.bookToEdit()?.userId
        )?.rate,
      ],
    });
    for (let i = 1; i <= 10; i++) {
      this.pointArray.push(i);
    }
  }

  submit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      this.newBook.emit(this.bookForm.value);
      // Handle form submission logic
    } else {
      this.toaster.error(
        'Please fill out the form fields.'
      );
    }
  }
}
