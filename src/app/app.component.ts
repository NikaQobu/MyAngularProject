import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$ = this.authservice.user;
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.authservice.init();
  }

  onLogout() {
    this.authservice.logOut();
  }
}
