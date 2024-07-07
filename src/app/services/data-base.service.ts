import {
  inject,
  Injectable,
} from '@angular/core';
import {
  child,
  Database,
  DataSnapshot,
  push,
  ref,
  remove,
  set,
  update,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  private db = inject(Database);

  constructor() {}

  getEntities(url: string) {
    return ref(this.db, url);
  }

  addEntity(data: any, url: string) {
    data.id = push(child(ref(this.db), url)).key;
    return set(
      ref(this.db, url + '/' + data.id),
      data
    );
  }

  updateEntity(data: any, url: string) {
    return update(
      ref(this.db, url + '/' + data.id),
      data
    );
  }

  deleteEntity(id: string, url: string) {
    return remove(ref(this.db, url + id));
  }

  snapshotToArray(snapshot: DataSnapshot) {
    const returnArr: any[] = [];
    snapshot.forEach((value: any) => {
      returnArr.push(value.val());
    });
    return returnArr;
  }
}
