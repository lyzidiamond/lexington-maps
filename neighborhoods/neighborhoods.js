// initialize map
var map = L.mapbox.map('neighborhoods-map', 'codeforamerica.hek4o94g', {maxZoom: 8, minZoom: 4}).setView([38.042,-84.515], 8);

function onEachFeature(feature, layer) {
  var popupContent = "<strong>" + feature.properties.Assoc_Name + "</strong>" + "<br>Council District: District " + feature.properties.DISTRICT + "<br>Council Member: " + feature.properties.REP + "<br>Phone Number: " + feature.properties.TELEPHONE + "<br> Email: " + feature.properties.EMAIL;
  layer.bindPopup(popupContent);
  layer.on('click', function(e) {
    map.fitBounds(feature.getBounds(), {reset:true});
  });
};

function style(feature) {
  switch (feature.properties.DISTRICT) {
    case '1': return {color: "#8dd3c7"};
    case '2': return {color: "#ffffb3"};
    case '3': return {color: "#bebada"};
    case '4': return {color: "#fb8072"};
    case '5': return {color: "#80b1d3"};
    case '6': return {color: "#fdb462"};
    case '7': return {color: "#b3de69"};
    case '8': return {color: "#fccde5"};
    case '9': return {color: "#d9d9d9"};
    case '10': return {color: "#bc80bd"};
    case '11': return {color: "#ccebc5"};
    case '12': return {color: "#ffed6f"};
  };
};

$.getJSON('./neighborhoods_council.geojson', function(data) {
  var locations = L.geoJson(data, {
    onEachFeature: onEachFeature
  });
  locations.addTo(map);
//  map.fitBounds(locations.getBounds(), {reset: true});
});