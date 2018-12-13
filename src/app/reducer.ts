import { ActionReducerMap } from '@ngrx/store';
import { ledReducer } from './led.reducer';

export const reducers: ActionReducerMap<any> = {
    led: ledReducer,
};
