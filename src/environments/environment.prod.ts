export const environment = {
  production: true,
  refreshInterval: 300000, // API free call limit of 1000 requests per day. 1 / 5m = 480 requests daily potentially from one user's auto refresh
  locationIq: {
    endpointURL: 'https://us1.locationiq.com/v1',
    key: 'pk.5d8de80cc656acc11d9f866852d7642f'
  },
  openWeatherMap: {
    endpointURL: 'https://api.openweathermap.org/data/2.5',
    key: '6b80ba80e350de60e41ab0ccf87ad068'
  },
  author: {
    webUrl: 'https://sirkoik.github.io'
  }
};
