import { User } from '@firebase/auth';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const UserStore =
  signalStore({ providedIn: 'root' }, withState(initialState),
    withComputed((store) =>
      ({ userId: computed(() => store.user()?.uid) })),
    withMethods((store) => ({
      updateUser(user: User | null) {

        patchState(store, {
          user,
        });
      },
    })),
    withHooks({
      onInit(store, afAuth = inject(Auth)) {
        afAuth.onAuthStateChanged(user => {
       
          store.updateUser(user);
        });
      },
    }));
