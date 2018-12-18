import { WifiSetting, wifiInitialState } from './state';

export enum WifiSettingActionTypes {
    CHANGE_WIFI = '[WifiSetting] changing wifi',
    CHANGE_WIFI_DONE = '[WifiSetting] changing wifi done'
}

export type ChangeWifi = { type: WifiSettingActionTypes.CHANGE_WIFI, payload: WifiSetting };
export type ChangeWifiDone = { type: WifiSettingActionTypes.CHANGE_WIFI_DONE, payload: WifiSetting };
type Action = ChangeWifi | ChangeWifiDone;

export function WifiSettingReducer(state: WifiSetting = wifiInitialState, action: Action): WifiSetting {
    switch (action.type) {
        case WifiSettingActionTypes.CHANGE_WIFI_DONE: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
