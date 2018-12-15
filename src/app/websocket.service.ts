import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import { Led, ledSelector, FadeSetting } from './state';
import { Store } from '@ngrx/store';
import { LedActionTypes } from './led.reducer';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  messages: Observable<string>;
  connectionStatus: Observable<number>;
  input: QueueingSubject<string>;
  led: Observable<Led>;
  messagesSubscription: Subscription;

  constructor(private ledStore: Store<Led>) {
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
    const connection = websocketConnect(new_uri, this.input);
    this.connectionStatus = connection.connectionStatus;
    this.messages = connection.messages;

    this.messagesSubscription = this.messages.subscribe((message: string) => {
      const json = JSON.parse(message);
      const command: Led = {
        type: 'solid',
        r: json.r,
        g: json.g,
        b: json.b
      };
      this.ledStore.dispatch( {type: LedActionTypes.CHANGE_TO_SOLID_DONE, payload: command} );
    });
  }

  public onMessage(): Observable<string> {
    return this.messages;
  }

  public sendSolid(led: Led): Led {
    this.send(JSON.stringify(led));
    return led;
  }

  public sendFade(fade: FadeSetting) {
    this.send(JSON.stringify(fade));
  }

  private send(str: string) {
    console.log(str);
    this.input.next(str);
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }
}
