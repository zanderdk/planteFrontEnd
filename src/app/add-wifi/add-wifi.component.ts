import { Component, OnInit, OnDestroy } from '@angular/core';
import { WifiSetting, wifiSelector } from '../state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WifiSettingActionTypes } from '../wifi.reducer';

@Component({
  selector: 'app-add-wifi',
  templateUrl: './add-wifi.component.html',
  styleUrls: ['./add-wifi.component.css']
})
export class AddWifiComponent implements OnInit, OnDestroy {

  constructor(private wifiStore: Store<WifiSetting>,
              private router: Router,
              private route: ActivatedRoute) {
    this.wifiSettingObs = this.wifiStore.select(wifiSelector);
  }

  wifiSetting: WifiSetting;
  wifiSettingObs: Observable<WifiSetting>;
  wifiSettingSub: Subscription;
  index: number;
  ssid: string;
  password: string;
  addString = 'add';

  ngOnInit() {
    this.wifiSettingSub = zip(this.wifiSettingObs, this.route.paramMap).subscribe(obj => {
      const wifi = obj[0];
      const param = obj[1];
      this.wifiSetting = wifi;
      const i: number = +obj[1].get('index');
      this.index = i;

      if (this.index !== -1) {
        this.addString = 'change';
        this.ssid = this.wifiSetting.wifis[i].ssid;
        this.password = this.wifiSetting.wifis[i].password;
      }
    });
  }

  ngOnDestroy() {
    this.wifiSettingSub.unsubscribe();
  }

  done() {
    if (this.index === -1) {
      this.wifiSetting.wifis.push( {'ssid': this.ssid, 'password': this.password} );
      this.wifiStore.dispatch( { type: WifiSettingActionTypes.CHANGE_WIFI, payload: this.wifiSetting } );
      this.router.navigate(['wifi']);
    } else {
      this.wifiSetting.wifis[this.index] = { 'ssid': this.ssid, 'password': this.password };
      this.wifiStore.dispatch( { type: WifiSettingActionTypes.CHANGE_WIFI, payload: this.wifiSetting } );
      this.router.navigate(['wifi']);
    }
  }

  back() {
    this.router.navigate(['wifi']);
  }

}
