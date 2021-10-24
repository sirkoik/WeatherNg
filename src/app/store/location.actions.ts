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

export const retriveDetailedLocation = createAction(
  '[Location] Retrieve detailed location'
);

export const detailedLocationRetrievalSuccess = createAction(
  '[Location] Detailed location retrieval success',
  props<{ payload: any }>()
);

export const detailedLocationRetrievalFailure = createAction(
  '[Location] Detailed location retrieval failure',
  props<{ payload: any }>()
);

export const retrieveWeatherData = createAction(
  '[Location] Retrieve weather data'
);
