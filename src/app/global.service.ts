import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  subject: BehaviorSubject<{name: string, func: () => void, icon: string}[]> = new BehaviorSubject<{name: string, func: () => void, icon: string}[]>([]);

  menuItems(): Observable<{name: string, func: () => void, icon: string}[]> {
    return this.subject;
  }

  newMenu(menu: {name: string, func: () => void, icon: string}[]) {
    this.subject.next(menu);
  }

}
