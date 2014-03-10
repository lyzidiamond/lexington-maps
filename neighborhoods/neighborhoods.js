// initialize map
var map = L.mapbox.map('neighborhoods-map', 'codeforamerica.hek4o94g', {maxZoom: 15, minZoom: 10}).setView([38.042,-84.515], 10);

function onEachFeature(feature, layer) {
  var popupContent = "<strong>" + feature.properties.Assoc_Name + "</strong>" + "<br>Council District: District " + feature.properties.DISTRICT + "<br>Council Member: " + feature.properties.REP + "<br>Phone Number: " + feature.properties.TELEPHONE + "<br>Email: " + feature.properties.EMAIL;
  layer.bindPopup(popupContent);
  layer.on('hover', function(e) {
    var layer = e.target;
    layer.setStyle({ fillOpacity: 0.9 });
  });
  layer.on('click', function(e) {
    map.fitBounds(feature.getBounds(), {reset:true});
  });
};

function style(feature) {
  var shared = { stroke: "#111", strokeWidth: 0.1, fillOpacity: 0.6 };
  var ind;
  switch (feature.properties.DISTRICT) {
    case 1:
      ind = { color: "#a6cee3" };
      break;
    case 2:
      ind = { color: "#1f78b4" };
      break;
    case 3:
      ind = { color: "#b2df8a" };
      break;
    case 4:
      ind = { color: "#33a02c" };
      break;
    case 5:
      ind = { color: "#fb9a99" };
      break;
    case 6:
      ind = { color: "#e31a1c" };
      break;
    case 7:
      ind = { color: "#fdbf6f" };
      break;
    case 8:
      ind = { color: "#ff7f00" };
      break;
    case 9:
      ind = { color: "#cab2d6" };
      break;
    case 10:
      ind = { color: "#6a3d9a" };
      break;
    case 11:
      ind = { color: "#ffff99" };
      break;
    case 12:
      ind = { color: "#b15928" };
      break;
  };
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