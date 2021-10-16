import { createAction } from '@ngrx/store';

export const setDay = createAction('Set theme to daytime');
export const setNight = createAction('Set theme to nighttime');
export const setDayNightCalculationPossible = createAction(
  'Inform the app that it is possible to make day/night calculations'
);
export const setDayNightCalculationNotPossible = createAction(
  'Inform the app that it is not possible to make day/night calculations'
);
