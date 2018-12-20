import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LedComponent implements OnInit, AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) {}

    _intensity = 0;
    _r = 0.0;
    _g = 0.0;
    _b = 0.0;

    shadow = '';
    color =  '';
    background = '';
    style = {};

    ngAfterViewInit() {
      this.cdr.detach();
    }

    @Input()
    set intensity(i: number) {
      this._intensity = i / 100;
      this.changeShadow();
    }

    @Input()
    set r(i: number) {
      this._r = 0.75 + i / 400;
      this.changeShadow();
    }

    @Input()
    set g(i: number) {
      this._g = 0.75 + i / 400;
      this.changeShadow();
    }

    @Input()
    set b(i: number) {
      this._b = 0.75 + i / 400;
      this.changeShadow();
    }

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

    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.changeShadow();
  }

}
