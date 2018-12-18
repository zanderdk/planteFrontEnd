import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FadeSetting, fadeSettingSelector } from '../state';
import { Store } from '@ngrx/store';
import { Observable, Subscription, zip, VirtualTimeScheduler } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FadeActionTypes } from '../fade.reducer';

@Component({
  selector: 'app-add-fade-color',
  templateUrl: './add-fade-color.component.html',
  styleUrls: ['./add-fade-color.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFadeColorComponent implements OnInit, OnDestroy {

  constructor(private fadeStore: Store<FadeSetting>,
              private router: Router,
              private route: ActivatedRoute) {
    this.fadeSettingObs = this.fadeStore.select(fadeSettingSelector);
  }

  r = 0;
  g = 0;
  b = 0;
  fadeSettingObs: Observable<FadeSetting>;
  fadeSetting: FadeSetting;
  fadeSettingSub: Subscription;
  index: number;
  addString = 'add';

  ngOnInit() {
    this.fadeSettingSub = zip(this.fadeSettingObs, this.route.paramMap)
      .subscribe((fade) => {
        this.fadeSetting = fade[0];
        const i: number = +fade[1].get('index');
        if (i !== -1) {
          this.r = this.fadeSetting.colors[i].r;
          this.g = this.fadeSetting.colors[i].g;
          this.b = this.fadeSetting.colors[i].b;
        }
        this.index = i;
      });
   }

  ngOnDestroy() {
    this.fadeSettingSub.unsubscribe();
  }

  change() { }

  done() {
    if (this.index === -1) {
      this.fadeSetting.colors.push({ r: this.r, g: this.g, b: this.b });
      this.fadeStore.dispatch( { type: FadeActionTypes.CHANGE_TO_FADE, payload: this.fadeSetting } );
      this.router.navigate(['fade']);
    } else {
      this.fadeSetting.colors[this.index] = { r: this.r, g: this.g, b: this.b };
      this.fadeStore.dispatch( { type: FadeActionTypes.CHANGE_TO_FADE, payload: this.fadeSetting } );
      this.router.navigate(['fade']);
    }
  }

  back() {
    this.router.navigate(['fade']);
  }

}
