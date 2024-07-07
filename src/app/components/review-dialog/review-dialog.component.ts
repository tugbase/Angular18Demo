import {
  Component,
  OnInit,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { Book, Review } from '../../models/book';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatButton,
    MatInput,
    MatDialogTitle,
    MatLabel,
  ],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.sass',
})
export class ReviewDialogComponent implements OnInit {
  dialogTemplate = viewChild.required<TemplateRef<any>>(
    'dialogTemplate'
  );
  reviewForm!: FormGroup;

  title = signal<string>('Review');
  review = output<Review>();

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      review: [''],
    });
  }

  openDialog(book: Book | undefined): void {
    if (book) {
      this.title.set(book.title);
      this.dialog.open(this.dialogTemplate(), {
        width: '400px',
      });
    }
  }

  close(): void {
    this.dialog.closeAll();
  }

  submitReview(): void {
    if (this.reviewForm.controls['review'].value !== '') {
      this.review.emit(this.reviewForm.value);
    }
    this.close();
  }
}
