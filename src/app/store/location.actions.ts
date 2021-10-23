import { createAction, props } from '@ngrx/store';

export const getUserLocation = createAction('[Location] Get user location');

export const locationRetrievalSuccess = createAction(
  '[Location] Location retrieval success',
  props<{ payload: GeolocationPosition }>()
);

export const locationRetrievalFailure = createAction(
  '[Location] Location retrieval failure',
  props<{ payload: GeolocationPositionError }>()
);
