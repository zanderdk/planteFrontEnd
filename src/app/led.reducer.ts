import { Led, ledInitialState } from './state';

export enum LedActionTypes {
    CHANGE_TO_SOLID = '[Led] changing to solid',
    CHANGE_TO_SOLID_DONE = '[Led] changed to solid'
}

export type ChangeToSolid = { type: LedActionTypes.CHANGE_TO_SOLID, payload: Led };
export type ChangeToSolidDone = { type: LedActionTypes.CHANGE_TO_SOLID_DONE, payload: Led };
type Action = ChangeToSolid | ChangeToSolidDone;

export function ledReducer(state: Led = ledInitialState, action: Action): Led {
    console.log(action.type);
    console.log(action);
    switch (action.type) {
        case LedActionTypes.CHANGE_TO_SOLID_DONE: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
