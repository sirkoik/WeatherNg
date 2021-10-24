import { Action, createReducer, on } from '@ngrx/store';
import { WeatherLocation } from '../types/WeatherLocation';
import {
  detailedLocationRetrievalFailure,
  detailedLocationRetrievalSuccess,
  getUserLocation,
  locationRetrievalFailure,
  locationRetrievalSuccess,
  retrieveWeatherData,
  retriveDetailedLocation
} from './location.actions';

export const initialState: WeatherLocation = {
  locationSuccess: false,
  coords: {
    latitude: 0,
    longitude: 0
  },
  error: null,
  warning: null,
  city: ''
};

const _locationReducer = createReducer(
  initialState,
  on(getUserLocation, (state, action) => {
    return { ...state };
  }),
  on(locationRetrievalSuccess, (state, action) => {
    console.log(
      '[LocationReducer] location retrieval success.',
      action.payload
    );
    return { ...state, locationSuccess: true, coords: action.payload.coords };
  }),
  on(locationRetrievalFailure, (state, action) => {
    console.log(
      '[LocationReducer] location retrieval failure.',
      action.payload
    );
    return { ...state, locationSuccess: false, error: action.payload };
  }),
  on(retriveDetailedLocation, state => {
    console.log('[LocationReducer] retrieving detailed location.');
    return { ...state, locationSuccess: true };
  }),
  on(detailedLocationRetrievalSuccess, (state, action) => {
    console.log(
      '[LocationReducer] Detailed location retrieval success',
      action
    );
    return {
      ...state,
      city: action.payload.address.city,
      locationSuccess: true
    };
  }),
  // detailed location retrieval is not necessary for the functioning of the app;
  // therefore, failure populates the warning prop in the state.
  on(detailedLocationRetrievalFailure, (state, action) => {
    return { ...state, locationSuccess: true, warning: action.payload.error };
  }),
  on(retrieveWeatherData, (state, action) => {
    return { ...state };
  })
);

export function locationReducer(state: any, action: Action) {
  return _locationReducer(state, action);
}
