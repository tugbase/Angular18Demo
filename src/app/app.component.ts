import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GeneralLayoutComponent } from './pages/general-layout/general-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GeneralLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',

})
export class AppComponent {
  title = 'Library';

}
