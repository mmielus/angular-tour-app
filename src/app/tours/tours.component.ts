import {Component, OnInit} from '@angular/core';
import {ToursService} from './tours.service';
import {Router} from '@angular/router';
import {Tour} from '../model/tour';


@Component({
  selector: 'app-tours-component',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
  tours: Tour[];
  searchText: string;
  priceLowerBound: number;
  priceHigherBound: number;
  selectedMonth: string;
  selectedCountry: string;
  query: string;
  months: string[];
  countries: string[];
  showSpinner = true;

  constructor(private toursService: ToursService, private router: Router
  ) {
    this.months = [];
    this.countries = [];
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.toursService.getTours().subscribe(tours => {
      this.tours = tours;
      this.prepareDateFilters(tours);
      this.prepareCountryFilter(tours);
      this.showSpinner = false;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  private prepareCountryFilter(tours: Tour[]) {
    for (const tour of tours) {
      if (!this.countries.includes(tour.destination)) {
        this.countries.push(tour.destination);
      }
    }
  }

  private prepareDateFilters(tours: Tour[]) {
    const uniqeMonths: number[] = [];
    const terms = tours.map(tour => tour.terms).reduce((a, b) => {
      return a.concat(b);
    });
    for (const term of terms) {
      const currentMonth = new Date((term.startDate as any).seconds * 1000);
      if (!uniqeMonths.includes(currentMonth.getMonth())) {
        uniqeMonths.push(currentMonth.getMonth());
        this.months.push(Constants.monthNames[currentMonth.getMonth()]);
      }
    }
  }
}

export class Constants {
  public static monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
}
