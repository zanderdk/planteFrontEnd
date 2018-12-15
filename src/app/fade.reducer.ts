import { FadeSetting, fadeSettingInitialState } from './state';

export enum FadeActionTypes {
    CHANGE_TO_FADE = '[Fade] changing to fading',
    CHANGE_TO_SOLID_FADE = '[Fade] changed to fading'
}

export type ChangeToFade = { type: FadeActionTypes.CHANGE_TO_FADE, payload: FadeSetting };
export type ChangeToFadeDone = { type: FadeActionTypes.CHANGE_TO_SOLID_FADE, payload: FadeSetting };
type Action = ChangeToFade | ChangeToFadeDone;

export function fadeReducer(state: FadeSetting = fadeSettingInitialState, action: Action): FadeSetting {
    console.log(action.type);
    console.log(action);
    switch (action.type) {
        case FadeActionTypes.CHANGE_TO_SOLID_FADE: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
