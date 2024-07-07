import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatListItem,
  MatNavList,
} from '@angular/material/list';
import {
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-general-layout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbar,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    RouterLink,
    MatIcon,
    RouterOutlet,
  ],
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.sass',
})
export class GeneralLayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private userStore = inject(UserStore);
  loggedIn = this.userStore.userId;

  signIn() {
    this.auth.googleSignIn().then((_) => {
      this.router.navigate(['/my-books']);
    });
  }

  logout() {
    this.auth.signOut().then((_) => {
      this.router.navigate(['/books']);
    });
  }
}
