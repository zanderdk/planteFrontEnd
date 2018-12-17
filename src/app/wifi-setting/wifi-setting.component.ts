import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { WifiSetting, wifiSelector } from '../state';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { WifiSettingActionTypes } from '../wifi.reducer';

@Component({
  selector: 'app-wifi-setting',
  templateUrl: './wifi-setting.component.html',
  styleUrls: ['./wifi-setting.component.css']
})
export class WifiSettingComponent implements OnInit, OnDestroy {

  constructor(private wifiStore: Store<WifiSetting>,
              private router: Router) {
    this.wifiSettingObs = this.wifiStore.select(wifiSelector);
  }

  wifiSetting: WifiSetting;
  wifiSettingObs: Observable<WifiSetting>;
  wifiSettingSub: Subscription;

  ngOnInit() {
    this.wifiSettingSub = this.wifiSettingObs.subscribe((wifi) => {this.wifiSetting = wifi; });
  }

  ngOnDestroy() {
    this.wifiSettingSub.unsubscribe();
  }

  add() {
    this.router.navigate(['addWifi', -1]);
  }

  change(i: number) {
    this.router.navigate(['addWifi', i]);
  }

  delete(i: number) {
    this.wifiSetting.wifis.splice(i, 1);
    this.wifiStore.dispatch( { type: WifiSettingActionTypes.CHANGE_WIFI, payload: this.wifiSetting } );
  }
}
