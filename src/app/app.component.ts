import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planteFrontEnd';

  constructor(private router: Router) { }

  isNavOpen = false;

  navigate(loc: string) {
    this.router.navigate([loc]);
    this.isNavOpen = false;
  }
}
