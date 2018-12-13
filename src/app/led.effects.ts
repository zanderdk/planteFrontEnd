import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { logging } from 'protractor';
import { LedActionTypes, ChangeToSolid, ChangeToSolidDone } from './led.reducer';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { WebsocketService } from './websocket.service';

@Injectable()
export class LedEffects {

  constructor(
    private actions: Actions,
    private websocketService: WebsocketService
  ) {}


  @Effect()
  ChangeSolid: Observable<any> = this.actions
    .ofType(LedActionTypes.CHANGE_TO_SOLID)
    .pipe(
      switchMap((actions: ChangeToSolid) => {
        return of(this.websocketService.sendSolid(actions.payload)).pipe(
          map(led => {
            return {type: LedActionTypes.CHANGE_TO_SOLID_DONE, payload: led} as ChangeToSolidDone;
          })
        );
      })
  );


}
