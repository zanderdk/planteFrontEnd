import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FadeSetting, fadeSettingSelector } from '../state';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FadeActionTypes } from '../fade.reducer';

@Component({
  selector: 'app-fade-setting',
  templateUrl: './fade-setting.component.html',
  styleUrls: ['./fade-setting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FadeSettingComponent implements OnInit, OnDestroy {

  constructor(private fadeSettingStore: Store<FadeSetting>, private router: Router) {
    this.fadeSettingObs = this.fadeSettingStore.select(fadeSettingSelector);
  }

  fadeSetting: FadeSetting;
  fadeSettingSub: Subscription;
  fadeSettingObs: Observable<FadeSetting>;

  ngOnInit() {
    this.fadeSettingSub = this.fadeSettingObs.subscribe((setting) => {
      this.fadeSetting = setting;
    });
  }

  ngOnDestroy() {
    this.fadeSettingSub.unsubscribe();
  }

  done() {
    this.fadeSettingStore.dispatch( { type: FadeActionTypes.CHANGE_TO_FADE, payload: this.fadeSetting } );
    this.router.navigate(['fade']);
  }

  back() {
    this.router.navigate(['fade']);
  }
}
