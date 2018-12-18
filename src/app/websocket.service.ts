import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import { Led, ledSelector, FadeSetting, WifiSetting } from './state';
import { Store } from '@ngrx/store';
import { LedActionTypes } from './led.reducer';
import { FadeActionTypes } from './fade.reducer';
import { WifiSettingActionTypes } from './wifi.reducer';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  messages: Observable<string>;
  connectionStatus: Observable<number>;
  input: QueueingSubject<string>;
  led: Observable<Led>;
  messagesSubscription: Subscription;

  constructor(private ledStore: Store<Led>,
              private wifiStore: Store<WifiSetting>,
              private fadeStore: Store<FadeSetting>) {
    this.led = ledStore.select(ledSelector);
    this.input = new QueueingSubject<string>();
    const loc = window.location;
    let new_uri = '';
    if (loc.protocol === 'https:') {
        new_uri = 'wss:';
    } else {
        new_uri = 'ws:';
    }
    new_uri += '//' + loc.host.split(':')[0];
    new_uri += '/websocket';
    const connection = websocketConnect('ws://localhost:8080', this.input);
    this.connectionStatus = connection.connectionStatus;
    this.messages = connection.messages;

    this.messagesSubscription = this.messages.subscribe((message: string) => {
      const json = JSON.parse(message);
      if (json['wifi'] !== undefined) {
        const wifi = json['wifi'] as WifiSetting;
        const fadeSet = json['fade'] as FadeSetting;
        this.fadeStore.dispatch({type: FadeActionTypes.CHANGE_TO_FADE_DONE, payload: fadeSet });
        this.wifiStore.dispatch({type: WifiSettingActionTypes.CHANGE_WIFI_DONE, payload: wifi});
        return;
      }
      const command: Led = {
        type: 'solid',
        r: json.r,
        g: json.g,
        b: json.b
      };
      this.ledStore.dispatch( {type: LedActionTypes.CHANGE_TO_SOLID_DONE, payload: command} );
    });

    this.send('{ "type": "settings" }');
  }

  public onMessage(): Observable<string> {
    return this.messages;
  }

  public sendSolid(led: Led): Led {
    this.send(JSON.stringify(led));
    return led;
  }

  public sendFade(fade: FadeSetting): FadeSetting {
    this.send(JSON.stringify(fade));
    return fade;
  }

  public sendWifi(wifi: WifiSetting): WifiSetting {
      this.send(JSON.stringify(wifi));
      return wifi;
  }

  public send(str: string) {
    console.log(str);
    this.input.next(str);
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }
}
