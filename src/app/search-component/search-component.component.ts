import {Component, OnInit} from '@angular/core';

import {ToursService} from '../tours/tours.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {


  constructor(private toursService: ToursService) {

  }

  ngOnInit() {

  }

  search() {

  }
}
