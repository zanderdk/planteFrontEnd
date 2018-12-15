import { Component, OnInit, OnDestroy } from '@angular/core';
import { FadeSetting, fadeSettingSelector } from '../state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FadeActionTypes } from '../fade.reducer';

@Component({
  selector: 'app-add-fade-color',
  templateUrl: './add-fade-color.component.html',
  styleUrls: ['./add-fade-color.component.css']
})
export class AddFadeColorComponent implements OnInit, OnDestroy {

  constructor(private fadeStore: Store<FadeSetting>,
              private router: Router) {
    this.fadeSettingObs = this.fadeStore.select(fadeSettingSelector);
  }

  r = 0;
  g = 0;
  b = 0;
  fadeSettingObs: Observable<FadeSetting>;
  fadeSetting: FadeSetting;
  fadeSettingSub: Subscription;

  ngOnInit() {
    this.fadeSettingSub = this.fadeSettingObs.subscribe((fade) => {this.fadeSetting = fade; });
   }

  ngOnDestroy() {
    this.fadeSettingSub.unsubscribe();
  }

  change() { }

  done() {
    this.fadeSetting.colors.push({ r: this.r, g: this.g, b: this.b });
    this.fadeStore.dispatch( { type: FadeActionTypes.CHANGE_TO_FADE, payload: this.fadeSetting } );
    this.router.navigate(['fade']);
  }

  back() {
    this.router.navigate(['fade']);
  }

}
