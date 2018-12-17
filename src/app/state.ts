import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export type Led = {type: string, r: number, g: number, b: number};
export type Color = {r: number, g: number, b: number};
export type FadeSetting = {type: string, fadetime: number, holdtime: number, colors: Color[]};
export type WifiSetting = { type: string, wifis: {ssid: string, password: string}[] };

export const wifiInitialState = {
    type: 'wifi',
    wifis: [{
        ssid: 'sukat83dybde46panda',
        password: '1631d93bb0abe9e5b34c06c45f'
    }]
};

export const ledInitialState = {
    type: 'solid',
    r: 0,
    g: 0,
    b: 0
};

export const fadeSettingInitialState = {
    type: 'fade',
    fadetime: 5000,
    holdtime: 5000,
    colors: [
        {r: 255, g: 0, b: 0},
        {r: 0, g: 255, b: 0},
        {r: 0, g: 0, b: 255}
    ]
};

export const ledSelector = createFeatureSelector<Led>('led');
export const fadeSettingSelector = createFeatureSelector<FadeSetting>('fade');
export const wifiSelector = createFeatureSelector<WifiSetting>('wifi');
