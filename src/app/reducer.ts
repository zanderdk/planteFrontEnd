import { ActionReducerMap } from '@ngrx/store';
import { ledReducer } from './led.reducer';
import { fadeReducer } from './fade.reducer';
import { WifiSettingReducer } from './wifi.reducer';

export const reducers: ActionReducerMap<any> = {
    led: ledReducer,
    fade: fadeReducer,
    wifi: WifiSettingReducer
};
