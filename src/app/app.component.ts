import { Component, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { SidebarJSService } from 'ng-sidebarjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planteFrontEnd';

  constructor(private router: Router,
              private websocketService: WebsocketService,
              public sidebarjsService: SidebarJSService) { }

  isNavOpen = false;

  navigate(loc: string) {
    this.router.navigate([loc]);
    this.isNavOpen = false;
    const active = document.activeElement as HTMLElement;
    active.blur();
  }

  openNav() {
    this.isNavOpen = true;
  }

  closeNav() {
    this.isNavOpen = false;
  }

}
