// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  refreshInterval: 60000,
  locationIq: {
    endpointURL: 'https://us1.locationiq.com',
    key: 'pk.5d8de80cc656acc11d9f866852d7642f'
  },
  openWeatherMap: {
    endpointURL: 'https://api.openweathermap.org/data/2.5',
    key: '6b80ba80e350de60e41ab0ccf87ad068'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
