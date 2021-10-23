export type WeatherLocation = {
  coords: {
    latitude: number;
    longitude: number;
  };
  error: GeolocationPositionError | null;
  locationSuccess: boolean;
};
