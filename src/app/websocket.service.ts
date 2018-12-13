import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  messages: Observable<string>;
  connectionStatus: Observable<number>;
  input: QueueingSubject<string>;

  constructor() {
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

    const messagesSubscription = this.messages.subscribe((message: string) => {
      console.log('received message:', message);
    });
  }

  public onMessage(): Observable<string> {
    return this.messages;
  }

  public sendSolid(x: any) {
    this.send(JSON.stringify(x));
  }

  private send(str: string) {
    console.log(str);
    this.input.next(str);
  }

}
