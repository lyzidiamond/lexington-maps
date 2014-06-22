import json

def get_id(neighborhood):
  id_number = neighborhood['properties']['GISID']
  neighborhood_name = neighborhood['properties']['Assoc_Name']
  council_district = neighborhood['properties']['DISTRICT']
  return { 'id': id_number, 'name': neighborhood_name, 'district': council_district }

def init():
  with open('./neighborhoods/neighborhoods_council.geojson') as a:
    neighborhood_fc = json.load(a)

  neighborhoods = neighborhood_fc['features']

  neighborhoods_json = []

  for neighborhood in neighborhoods:
    neighborhoods_json.append(get_id(neighborhood))

  with open('./neighborhoods/neighborhoods.json', 'w') as b:
    json.dump(neighborhoods_json, b)

init()
