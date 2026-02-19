export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error('Location permission denied. Please allow location access.'));
          return;
        }
        if (error.code === error.POSITION_UNAVAILABLE) {
          reject(new Error('Location unavailable. Turn on GPS/Wi-Fi and try again.'));
          return;
        }
        if (error.code === error.TIMEOUT) {
          reject(new Error('Location request timed out. Try again.'));
          return;
        }
        reject(new Error(error.message || 'Failed to get location.'));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }

    );
  });
};
