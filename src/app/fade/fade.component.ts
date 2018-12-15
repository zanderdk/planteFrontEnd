import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../global.service';
import { FadeSetting, fadeSettingSelector } from '../state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { FadeActionTypes } from '../fade.reducer';

@Component({
  selector: 'app-fade',
  templateUrl: './fade.component.html',
  styleUrls: ['./fade.component.css']
})
export class FadeComponent implements OnInit, OnDestroy {

  constructor(private globalService: GlobalService,
              private fadeStore: Store<FadeSetting>,
              private router: Router,
              private websocketService: WebsocketService) {
                this.fadeSettingObs = this.fadeStore.select(fadeSettingSelector);
  }
  fadeSettingObs: Observable<FadeSetting>;
  fadeSettingSub: Subscription;
  fadeSetting: FadeSetting;

  ngOnInit() {
    this.globalService.newMenu([]);
    this.fadeSettingSub = this.fadeSettingObs.subscribe((fade) => { this.fadeSetting = fade; });
  }

  ngOnDestroy() {
    this.fadeSettingSub.unsubscribe();
  }

  add() {
    this.router.navigate(['addFadeColor']);
  }

  remove(i: number) {
    this.fadeSetting.colors.splice(i, 1);
    this.fadeStore.dispatch( { type: FadeActionTypes.CHANGE_TO_FADE, payload: this.fadeSetting } );
  }

}
