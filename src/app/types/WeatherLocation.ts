export type WeatherLocation = {
  coords: {
    latitude: number;
    longitude: number;
  };
  error: GeolocationPositionError | null;
  warning: Error | null;
  locationSuccess: boolean;
  city: string;
};
