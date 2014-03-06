// initialize map
var map = L.mapbox.map('neighborhoods-map', 'codeforamerica.hek4o94g', {maxZoom: 12, minZoom: 10}).setView([38.042,-84.515], 10);

function onEachFeature(feature, layer) {
  var popupContent = "<strong>" + feature.properties.Assoc_Name + "</strong>" + "<br>Council District: District " + feature.properties.DISTRICT + "<br>Council Member: " + feature.properties.REP + "<br>Phone Number: " + feature.properties.TELEPHONE + "<br>Email: " + feature.properties.EMAIL;
  layer.bindPopup(popupContent);
  /* layer.on('click', function(e) {
    map.fitBounds(feature.getBounds(), {reset:true});
  });*/
};

function style(feature) {
  var shared = { stroke: false, fillOpacity: 0.6 };
  var ind;
  switch (feature.properties.DISTRICT) {
    case 1: ind = { color: "#8dd3c7" };
    case 2: ind = { color: "#ffffb3" };
    case 3: ind = { color: "#bebada" };
    case 4: ind = { color: "#fb8072" };
    case 5: ind = { color: "#80b1d3" };
    case 6: ind = { color: "#fdb462" };
    case 7: ind = { color: "#b3de69" };
    case 8: ind = { color: "#fccde5" };
    case 9: ind = { color: "#d9d9d9" };
    case 10: ind = { color: "#bc80bd" };
    case 11: ind = { color: "#ccebc5" };
    case 12: ind = { color: "#ffed6f" };
  };
  return $.extend(shared, ind);
};

$.getJSON('./neighborhoods_council.geojson', function(data) {
  var locations = L.geoJson(data, {
    onEachFeature: onEachFeature,
    style: style
  });
  locations.addTo(map);
//  map.fitBounds(locations.getBounds(), {reset: true});
});