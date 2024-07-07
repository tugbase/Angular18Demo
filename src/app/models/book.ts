export class Review {
  id: string = '';
  userId: string = '';
  review: string = '';
  bookId: string = '';

}

export class IsRead {
  userId: string = '';
  isRead: boolean = false;
}

export class Rate {
  userId: string = '';
  rate: number = 0;
}


export class Book {
  userId: string | undefined = '';
  id: string | null = '';
  title: string = '';
  imageUrl: string = '';
  author: string = '';
  description: string = '';
  page: number = 0;
  award?: string = '';
  rateList: Rate[] | null = null;

  classic: boolean = false;
  isRead: IsRead[] | null = null;
}
