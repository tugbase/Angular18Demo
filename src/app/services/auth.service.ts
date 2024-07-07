import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);


  // Sign in with Google
  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    return credential.user;

  }

  // Sign out
  async signOut() {
    await signOut(this.auth);
  }
}
