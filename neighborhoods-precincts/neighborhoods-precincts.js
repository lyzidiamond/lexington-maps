// initialize map
var map = L.map('neighborhoods-precincts', {maxZoom: 15, minZoom: 10}).setView([38.042,-84.515], 11);

var basemap = L.tileLayer('http://{s}.tiles.mapbox.com/v3/codeforamerica.hek4o94g/{z}/{x}/{y}.png').addTo(map);

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

var precinctsPath = './precincts.geojson';
var neighborhoodsPath = './neighborhoods_council.geojson';

function onEachNeighborhoodFeature(feature, layer) {
  var popupContent = "<strong>" + feature.properties.Assoc_Name + "</strong>" + "<br>Council District: District " + feature.properties.DISTRICT + "<br>Council Member: " + feature.properties.REP + "<br>Phone Number: " + feature.properties.TELEPHONE + "<br>Email: <a href='mailto: " + feature.properties.EMAIL + "''>" + feature.properties.EMAIL + "</a>";
  layer.bindPopup(popupContent);
/*  layer.on('click', function(e) {
    map.fitBounds(e.target.getBounds());
  }); */
  layer.on('mouseover', function(e) {
    e.target.setStyle({ fillOpacity: 0.9 });
  });
  layer.on('mouseout', function(e) {
    e.target.setStyle({ fillOpacity: 0.6 });
  });
};

function onEachPrecinctFeature(feature, layer) {
  layer.bindPopup(feature.properties.NAME);
  layer.on('mouseover', function(e) {
    e.target.setStyle({ fillOpacity: 0.5 });
  });
  layer.on('mouseout', function(e) {
    e.target.setStyle({ fillOpacity: 0 });
  });
}

function neighborhoodStyle(feature) {
  var shared = { color: 'black', weight: 1.5, fillOpacity: 0.6 };
  var ind = { fillColor: colors['1'] };
  return $.extend(shared, ind);
};

function precinctStyle(feature) {
  return {
    color: 'magenta',
    fillColor: 'black',
    fillOpacity: 0,
    weight: 0.8
  };
}

function neighborhoodsCallback(data) {
  locations = L.geoJson(data, {
    onEachFeature: onEachNeighborhoodFeature,
    style: neighborhoodStyle
  });
  locations.addTo(map);
  $.getJSON(precinctsPath, precinctsCallback);
};

function precinctsCallback(data) {
  precincts = L.geoJson(data, {
    onEachFeature: onEachPrecinctFeature,
    style: precinctStyle
  });
  addOverlay(locations, precincts);
  map.fitBounds(precincts.getBounds(), {reset: true});
};

function addOverlay(neighborhoods, precincts) {
  overlayMaps = {
    'Neighborhood Associations': neighborhoods,
    'Voting Precincts': precincts
  };
  layerControl = L.control.layers({}, overlayMaps, { collapsed: false }).addTo(map);
};

$.getJSON(neighborhoodsPath, neighborhoodsCallback);
