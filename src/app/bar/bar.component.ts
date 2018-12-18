import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { GlobalService } from '../global.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnInit, OnDestroy {

  constructor(private globalService: GlobalService) { }

  _isNavOpen = false;
  menuItems: {name: string, func: () => void, icon: string}[] = [];
  menuSubscription: Subscription;

  @Input()
  get isNavOpen() {
    return this._isNavOpen;
  }

  set isNavOpen(b: boolean) {
    this._isNavOpen = b;
    this.isNavOpenChange.emit(this._isNavOpen);
  }

   @Output()
   isNavOpenChange = new EventEmitter();


  ngOnInit() {
    this.menuSubscription = this.globalService.menuItems().subscribe((men) => {
      this.menuItems = men;
    });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  togleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

}
