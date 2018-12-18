import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { logging } from 'protractor';
import { WifiSettingActionTypes, ChangeWifi, ChangeWifiDone } from './wifi.reducer';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { WebsocketService } from './websocket.service';

@Injectable()
export class WifiEffects {

  constructor(
    private actions: Actions,
    private websocketService: WebsocketService
  ) {}


  @Effect()
  ChangeSolid: Observable<any> = this.actions
    .ofType(WifiSettingActionTypes.CHANGE_WIFI)
    .pipe(
      switchMap((actions: ChangeWifi) => {
        return of(this.websocketService.sendWifi(actions.payload)).pipe(
          map(wifi => {
            return {type: WifiSettingActionTypes.CHANGE_WIFI_DONE, payload: actions.payload} as ChangeWifiDone;
          })
        );
      })
  );



}
