import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { GlobalService } from '../global.service';
import { FadeSetting, fadeSettingSelector } from '../state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { FadeActionTypes } from '../fade.reducer';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-fade',
  templateUrl: './fade.component.html',
  styleUrls: ['./fade.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FadeComponent implements OnInit, OnDestroy {

  constructor(private globalService: GlobalService,
              private fadeStore: Store<FadeSetting>,
              private router: Router,
              private route: ActivatedRoute) {
                this.fadeSettingObs = this.fadeStore.select(fadeSettingSelector);
  }
  fadeSettingObs: Observable<FadeSetting>;
  fadeSettingSub: Subscription;
  fadeSetting: FadeSetting;

  ngOnInit() {
    this.globalService.newMenu([
      {name: 'Fade settings', icon: 'settings', func: () => {
        this.router.navigate(['fadeSettings']);
      }}
    ]);
    this.fadeSettingSub = this.fadeSettingObs.subscribe((fade) => { this.fadeSetting = fade; });
  }

  ngOnDestroy() {
    this.fadeSettingSub.unsubscribe();
  }

  add() {
    this.router.navigate(['addFadeColor', -1]);
  }

  remove(i: number) {
    this.fadeSetting.colors.splice(i, 1);
    this.fadeStore.dispatch( { type: FadeActionTypes.CHANGE_TO_FADE, payload: this.fadeSetting } );
  }

  change(i: number) {
    this.router.navigate(['addFadeColor', i]);
  }

}
