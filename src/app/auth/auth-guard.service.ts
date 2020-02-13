import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        if (user.role['admin']) {
          return true;
        }

        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
