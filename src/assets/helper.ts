import { Book, Rate } from '../app/models/book';

export function avrRate(
  rateList: Rate[] | null | undefined
) {
  if (rateList !== null && rateList !== undefined) {
    return (
      rateList.reduce(
        (acc, prev) => (acc + prev.rate ? prev.rate : 0),
        0
      ) / rateList.length
    );
  }
  return 0;
}

export function sortBooks(
  book1: Book,
  book2: Book,
  sortKey: string
) {
  if (sortKey === 'rate') {
    return (
      book2.rateList!.reduce(
        (acc, prev) => (acc + prev.rate ? prev.rate : 0),
        0
      ) /
        book2.rateList!.length -
      book1.rateList!.reduce(
        (acc, prev) => (acc + prev.rate ? prev.rate : 0),
        0
      ) /
        book1.rateList!.length
    );
  }
  if (sortKey === 'title') {
    return book1.title > book2.title ? 1 : -1;
  }
  if (sortKey === 'author') {
    return book1.author > book2.author ? 1 : -1;
  }
  return 0;
}
