import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Store } from '@ngrx/store';
import { Led, ledSelector } from '../state';
import { Observable, Subscription } from 'rxjs';
import { LedActionTypes } from '../led.reducer';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private webSocketService: WebsocketService,
              private ledStore: Store<Led>,
              private globalService: GlobalService) {
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
    this.globalService.newMenu([]);
  }

  ngOnDestroy(): void {
    this.ledSubscribtion.unsubscribe();
  }

}
