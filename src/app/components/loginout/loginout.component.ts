import { Router } from '@angular/router';
import { User } from './../../interfaces/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginout',
  templateUrl: './loginout.component.html',
  styleUrls: ['./loginout.component.css']
})
export class LoginoutComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
    this.auth.user$.subscribe( (u: User) => {
      if (u) {
        this.router.navigate(['/edit']);
      }
    });
   }

  ngOnInit(): void {
  }

}
