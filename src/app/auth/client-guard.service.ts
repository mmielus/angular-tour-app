import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClientGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        const allowed = ['admin', 'client'];
        for (const role of allowed) {
          if (user.role[role]) {
            return true;
          }
        }

        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
