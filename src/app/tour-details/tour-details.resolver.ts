import {Injectable} from '@angular/core';
import {ToursService} from '../tours/tours.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable()
export class TourDetailsResolver implements Resolve<any> {

  constructor(public toursService: ToursService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      const tourId = route.paramMap.get('id');
      this.toursService.getTour(tourId)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    });
  }
}

