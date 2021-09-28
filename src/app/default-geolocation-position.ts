// DefaultGeolocationPosition: A primitive GeolocationPosition-like object.
// Doesn't have most of the props, just a lat and long so that the Observable
// can continue with a default value if the user declines to share their location.

export type DefaultGeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
  };
};
