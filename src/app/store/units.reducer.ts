import { Action, createReducer, on, State } from '@ngrx/store';
import { UnitsState } from '../types/UnitsState';
import { toggle } from './units.actions';

export const initialState: UnitsState = {
  units: 'metric',
  temp: 'c',
  speed: 'km/h'
};

const _unitsReducer = createReducer(
  initialState,
  on(toggle, state => {
    let stateNew: UnitsState = state;
    if (state.units == 'metric') {
      stateNew = {
        units: 'imperial',
        temp: 'f',
        speed: 'mph'
      };
    }
    if (state.units == 'imperial') {
      stateNew = {
        units: 'metric',
        temp: 'c',
        speed: 'km/h'
      };
    }

    console.log(stateNew.units);

    return stateNew;
  })
);

export function unitsReducer(state: any, action: Action) {
  return _unitsReducer(state, action);
}
