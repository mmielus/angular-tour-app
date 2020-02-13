import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../auth/user.service';
import {MyUser} from '../auth/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: MyUser = null;
  isUserAdmin: boolean;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isUserAdmin = this.authService.isAdmin(this.user);
    });
  }

  logout() {
    this.authService.logout()
      .then(val => this.router.navigate(['/login']));
  }

  isLogged() {
    return this.user !== null;
  }
}
