import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planteFrontEnd';

  constructor(private router: Router,
              private websocketService: WebsocketService) { }

  isNavOpen = false;

  navigate(loc: string) {
    this.router.navigate([loc]);
    this.isNavOpen = false;
  }

  disconnect() {
    this.websocketService.send('{"type": "stop"}');
  }
}
