import { User } from './interfaces/user';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User;
  constructor(public ds: DataService, private as: AuthService) {
    this.as.user$.subscribe((u: User) => {
      this.user = u;
    });
  }

  logOut(): void {
    this.as.signOut();
  }
}
