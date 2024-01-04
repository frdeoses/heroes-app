import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent {
  publishers = [
    {
      id: 'DC Commincs',

      des: 'DC - Commics',
    },
    {
      id: 'Marvel Commincs',

      des: 'Marvel - Commics',
    },
  ];
}
