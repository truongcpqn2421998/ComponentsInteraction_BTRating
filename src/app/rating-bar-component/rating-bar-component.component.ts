import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IRatingUnit} from '../irating-unit';

@Component({
  selector: 'app-rating-bar-component',
  templateUrl: './rating-bar-component.component.html',
  styleUrls: ['./rating-bar-component.component.css']
})
export class RatingBarComponentComponent implements OnInit {
  max = 10;

  rating = 5;

  showRatingValue = true;

  rateChange = 0;

  ratingUnit: Array<IRatingUnit> = [];


  constructor() {
  }

  ngOnChange(changes: SimpleChanges) {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.rating);
    }
  }
  calculate(max, ratingValue) {
    this.ratingUnit = Array.from({length: max},
      (_, index) => ({
        value: index + 1,
        active: index < ratingValue
      }));
  }
  ngOnInit() {
    this.calculate(this.max, this.rating);

  }

  select(index) {
    this.rating = index + 1;
    this.ratingUnit.forEach((item, idx) => item.active = idx < this.rating);
    // this.rateChange = this.rating;
  }
  enter(index) {
    this.ratingUnit.forEach((item, idx) => item.active = idx <= index);
  }
  reset() {
    this.ratingUnit.forEach((item, idx) => item.active = idx < this.rating);
  }

}
