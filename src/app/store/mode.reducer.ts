import { Action, createReducer, on } from '@ngrx/store';
import { ModeState } from '../types/ModeState';
import {
  setDay,
  setDayNightCalculationNotPossible,
  setDayNightCalculationPossible,
  setNight
} from './mode.actions';

export const initialState: ModeState = {
  dayNightCalculationIsPossible: false,
  isDaytime: true
};

const _modeReducer = createReducer(
  initialState,
  on(setDay, state => {
    return { ...state, isDaytime: true };
  }),
  on(setNight, state => {
    return { ...state, isDaytime: false };
  }),
  on(setDayNightCalculationPossible, state => {
    return { ...state, dayNightCalculationIsPossible: true };
  }),
  on(setDayNightCalculationNotPossible, state => {
    return { ...state, dayNightCalculationIsPossible: false };
  })
);

export function modeReducer(state: any, action: Action) {
  return _modeReducer(state, action);
}
