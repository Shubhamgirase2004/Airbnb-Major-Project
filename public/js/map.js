
  mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });


    if (!coordinates || coordinates.length !== 2) {
  console.error("Invalid coordinates:", coordinates);
} else {
  const marker = new mapboxgl.Marker({ color : 'red' })
    .setLngLat(coordinates)
    .addTo(map);
}
    

// ✅ Add GeolocateControl
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  })
);