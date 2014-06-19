// initialize map
var map = L.mapbox.map('neighborhoods-map', 'codeforamerica.hek4o94g', {maxZoom: 15, minZoom: 10}).setView([38.042,-84.515], 10);

function onEachFeature(feature, layer) {
  var popupContent = "<strong>" + feature.properties.Assoc_Name + "</strong>" + "<br>Council District: District " + feature.properties.DISTRICT + "<br>Council Member: " + feature.properties.REP + "<br>Phone Number: " + feature.properties.TELEPHONE + "<br>Email: <a href='mailto: " + feature.properties.EMAIL + "''>" + feature.properties.EMAIL + "</a>";
  layer.bindPopup(popupContent);
  layer.on('click', function(e) {
    map.fitBounds(e.target.getBounds());
  });
  layer.on('mouseover', function(e) {
    e.target.setStyle({ fillOpacity: 0.9 });
  });
  layer.on('mouseout', function(e) {
    e.target.setStyle({ fillOpacity: 0.6 });
  });
};

var colors = {
  "1": "#a6cee3",
  "2": "#1f78b4",
  "3": "#b2df8a",
  "4": "#33a02c",
  "5": "#fb9a99",
  "6": "#e31a1c",
  "7": "#fdbf6f",
  "8": "#ff7f00",
  "9": "#cab2d6",
  "10": "#6a3d9a",
  "11": "#ffff99",
  "12": "#b15928"
};

function style(feature) {
  var shared = { color: 'black', weight: 1, fillOpacity: 0.6 };
  var ind = { fillColor: colors[feature.properties.DISTRICT] };
  return $.extend(shared, ind);
};

$.getJSON('./neighborhoods_council_sansboone.geojson', function(data) {
  var locations = L.geoJson(data, {
    onEachFeature: onEachFeature,
    style: style
  });
  locations.addTo(map);
//  map.fitBounds(locations.getBounds(), {reset: true});
});
