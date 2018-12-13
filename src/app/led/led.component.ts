import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css']
})
export class LedComponent implements OnInit {

  constructor() {}

    _intensity = 0;
    _r = 0.0;
    _g = 0.0;
    _b = 0.0;

    @Input()
    set intensity(i: number) {
      this._intensity = i;
      this.changeShadow();
    }

    @Input()
    set r(i: number) {
      this._r = i;
      this.changeShadow();
    }

    @Input()
    set g(i: number) {
      this._g = i;
      this.changeShadow();
    }

    @Input()
    set b(i: number) {
      this._b = i;
      this.changeShadow();
    }

    shadow = '';
    color =  '';
    background = '';
    style = {};

  changeShadow() {
    const i1 = this._intensity;
    const i2 = 0.5 - this._intensity * 0.25;
    const i3 = 0.25;
    const i4 = 0.1 - this._intensity * 0.1;
    const i5 = 0.1 - this._intensity * 0.25;
    const i6 = 0.1 - this._intensity * 0.5;

    this.shadow = 'inset -0.05em -0.05em 0.5em 0.1em rgba(0, 0, 0, ' + i2 +
                  '), inset 0 0 1em 0.1em rgba(255, 255, 255, ' + i3 +
                  '), inset 0.2em 0.2em 0.3em rgba(255, 255, 255, ' + i4 +
                  '), inset -0.1em -0.1em 0.3em 0.1em rgba(0, 0, 0, ' + i5 +
                  '), inset 1em 0.5em 0.3em rgba(0, 0, 0, ' + i6 +
                   '), 0 0 1em 0.2em';
    this.color = 'rgba(' + this._r * 255 + ', ' + this._g * 255 + ', ' + this._b * 255 + ', ' + i1 + ')';
    this.background = 'rgba(' + this._r * 255 + ', ' + this._g * 255 + ', ' + this._b * 255 + ', 1)';


  }

  ngOnInit() {
    this.changeShadow();
  }

}
