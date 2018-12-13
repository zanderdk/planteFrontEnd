import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export type Led = {type: string, r: number, g: number, b: number};

export const ledInitialState = {
    type: 'solid',
    r: 0,
    g: 0,
    b: 0
};

export const ledSelector = createFeatureSelector<Led>('led');
