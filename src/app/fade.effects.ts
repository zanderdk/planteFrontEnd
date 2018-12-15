import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { logging } from 'protractor';
import { FadeActionTypes, ChangeToFade, ChangeToFadeDone } from './fade.reducer';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { WebsocketService } from './websocket.service';

@Injectable()
export class FadeEffects {

  constructor(
    private actions: Actions,
    private websocketService: WebsocketService
  ) {}


  @Effect()
  ChangeSolid: Observable<any> = this.actions
    .ofType(FadeActionTypes.CHANGE_TO_FADE)
    .pipe(
      switchMap((actions: ChangeToFade) => {
        return of(actions.payload).pipe(
          map(fadeSetting => {
            return {type: FadeActionTypes.CHANGE_TO_SOLID_FADE, payload: fadeSetting} as ChangeToFadeDone;
          })
        );
      })
  );


}
