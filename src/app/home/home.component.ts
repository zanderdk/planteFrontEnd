import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private webSocketService: WebsocketService) { }
  r = 0;
  g = 0;
  b = 0;

  change() {
    const json = {
      'type': 'solid',
      'r': this.r,
      'g' : this.g,
      'b': this.b
    };
    this.webSocketService.sendSolid(json);
  }

  ngOnInit() {

  }

}
