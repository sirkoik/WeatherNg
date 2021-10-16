import { Action, createReducer, on } from '@ngrx/store';
import { ModeState } from '../types/ModeState';
import {
  setDay,
  setDayNightCalculationNotPossible,
  setDayNightCalculationPossible,
  setNight,
  setLoading,
  showAbout,
  hideAbout
} from './mode.actions';

export const initialState: ModeState = {
  dayNightCalculationIsPossible: false,
  isDaytime: true,
  isLoading: true,
  showAbout: false
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
  }),
  on(setLoading, (state, action) => {
    return { ...state, isLoading: action.isLoading };
  }),
  on(showAbout, (state, action) => {
    return { ...state, showAbout: true };
  }),
  on(hideAbout, (state, action) => {
    return { ...state, showAbout: false };
  })
);

export function modeReducer(state: any, action: Action) {
  return _modeReducer(state, action);
}
