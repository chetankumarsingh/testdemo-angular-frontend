import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-form',
//   template: `<router-outlet></router-outlet>`
// })

@Component({
  selector: 'app-icon',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }


  default_data: Array<any>;

  constructor() { }

  ngOnInit() {
  this.loadData();
  }

  loadData() {
    this.default_data = [
      { first_name: 'Steve', last_name: 'Jobs', user_name: '@steve' },
      { first_name: 'Simon', last_name: 'Philips', user_name: '@simon' },
      { first_name: 'Jane', last_name: 'Doe', user_name: '@jane' },
      { first_name: 'Larry', last_name: 'Thornton', user_name: '@larry' },
      { first_name: 'Hiver', last_name: 'Choe', user_name: '@hiver' },
    ];
  }


}
