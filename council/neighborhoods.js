// initialize map
var map = L.mapbox.map('neighborhoods-map', 'codeforamerica.hek4o94g', {maxZoom: 15, minZoom: 10}).setView([38.042,-84.515], 10);

var colors = {
  "1": "#c6dbef",
  "2": "#6baed6",
  "3": "#c6dbef",
  "4": "#6baed6",
  "5": "#c6dbef",
  "6": "#6baed6",
  "7": "#c6dbef",
  "8": "#2171b5",
  "9": "#c6dbef",
  "10": "#2171b5",
  "11": "#c6dbef",
  "12": "#2171b5"
};

function style(feature) {
  var shared = { strokeWidth: 0.1, color: 'black', fillOpacity: 0.6 };
  var ind = { fillColor: colors[feature.properties.DISTRICT] };
  return $.extend(shared, ind);
};

$.getJSON('./council.geojson', function(data) {
  var councilDistricts = L.geoJson(data, {
    style: style
  });
  councilDistricts.addTo(map);
//  map.fitBounds(locations.getBounds(), {reset: true});
});
