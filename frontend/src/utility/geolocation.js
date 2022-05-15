const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 120000,
};

const res = (pos) => {
  return { lat: pos.coords.latitude, lon: pos.coords.longitude };
};

const rej = (err) => {};

function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}
function getWatchPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.watchPosition(res, rej, { enableHighAccuracy: true });
  });
}

export { getPosition, getWatchPosition };
