import { FadeSetting, fadeSettingInitialState, Color } from './state';

export enum FadeActionTypes {
    CHANGE_TO_FADE = '[Fade] changing to fading',
    CHANGE_TO_FADE_DONE = '[Fade] changed to fading'
}

export type ChangeToFade = { type: FadeActionTypes.CHANGE_TO_FADE, payload: FadeSetting };
export type ChangeToFadeDone = { type: FadeActionTypes.CHANGE_TO_FADE_DONE, payload: FadeSetting };
type Action = ChangeToFade | ChangeToFadeDone;

export function fadeReducer(state: FadeSetting = fadeSettingInitialState, action: Action): FadeSetting {
    switch (action.type) {
        case FadeActionTypes.CHANGE_TO_FADE_DONE: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
