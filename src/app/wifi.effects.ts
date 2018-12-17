import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { logging } from 'protractor';
import { WifiSettingActionTypes, ChangeWifi } from './wifi.reducer';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { WebsocketService } from './websocket.service';

@Injectable()
export class WifiEffects {

  constructor(
    private actions: Actions,
    private websocketService: WebsocketService
  ) {}


 @Effect({ dispatch: false })
  changeWifi: Observable<any> = this.actions.pipe(
    ofType(WifiSettingActionTypes.CHANGE_WIFI),
    tap((action: ChangeWifi) => {
        this.websocketService.sendWifi(action.payload);
    })
  );



}
