import { WifiSetting, wifiInitialState } from './state';

export enum WifiSettingActionTypes {
    CHANGE_WIFI = '[WifiSetting] changing wifi',
}

export type ChangeWifi = { type: WifiSettingActionTypes.CHANGE_WIFI, payload: WifiSetting };
type Action = ChangeWifi;

export function WifiSettingReducer(state: WifiSetting = wifiInitialState, action: Action): WifiSetting {
    switch (action.type) {
        case WifiSettingActionTypes.CHANGE_WIFI: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
