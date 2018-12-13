import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css']
})
export class LedComponent implements OnInit {

  constructor() { }

  intensity = 1.0;
  r = 0.0;
  g = 0.0;
  b = 0.0;

  ngOnInit() {
  }

}
