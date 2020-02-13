import {Component, OnInit} from '@angular/core';
import {Booking} from '../auth/user';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  bookings: Booking[];
  empty = true;

  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.bookings = [];
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.bookings = user.bookings;
      this.empty = (user.bookings.length === 0);
    });
  }
}
