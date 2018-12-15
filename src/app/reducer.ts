import { ActionReducerMap } from '@ngrx/store';
import { ledReducer } from './led.reducer';
import { fadeReducer } from './fade.reducer';

export const reducers: ActionReducerMap<any> = {
    led: ledReducer,
    fade: fadeReducer
};
