import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rate} from '../model/tour';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  @Input() rating: number;
  @Input() numberOfRates: number;
  @Input() isRatingEnabled = false;
  @Output() ratingUpdated = new EventEmitter();

  ratingArr = [];
  starCount = 5;

  constructor() {
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

  }

  onClick(rating: number) {
    if (!this.isRatingEnabled) {
      return;
    }
    this.rating = rating;
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    console.log(`${this.rating}`);
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
