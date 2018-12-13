import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Store } from '@ngrx/store';
import { Led, ledSelector } from '../state';
import { Observable, Subscription } from 'rxjs';
import { LedActionTypes } from '../led.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private webSocketService: WebsocketService,
              private ledStore: Store<Led>) {
                this.led = ledStore.select(ledSelector);
              }
  r = 0;
  g = 0;
  b = 0;
  led: Observable<Led>;
  ledSubscribtion: Subscription;

  change() {
    const json = {
      'type': 'solid',
      'r': this.r,
      'g' : this.g,
      'b': this.b
    };
    this.ledStore.dispatch( {type: LedActionTypes.CHANGE_TO_SOLID, payload: json} );
  }

  ngOnInit() {
    this.ledSubscribtion = this.led.subscribe(led => {
      this.r = led.r;
      this.g = led.g;
      this.b = led.b;
    });
  }

  ngOnDestroy(): void {
    this.ledSubscribtion.unsubscribe();
  }

}
