# Hitchhiking

Leaflet:

- <https://leafletjs.com/examples/geojson/>
- <https://leafletjs.com/examples/layers-control/>

How to generate files:

```bash
## install required tools
# for ogr2ogr (convert between gpx and geojson)
sudo apt install gdal-bin

# single conversion
ogr2ogr 1-london-ferrybridge.geojson 1-london-ferrybridge.gpx tracks

# make gpx tracks using https://map.project-osrm.org/
# multiple GPX files in a `gpx` folder (towards a `geojson` folder)
while read file; do bn=$(basename "${file}"); filegj=$(echo "${bn}" | sed 's/\.gpx/.geojson/g'); ogr2ogr "geojson/${filegj}" "${file}" tracks; done <<< $(find gpx/ -type f)
# add file to geojson files as a property of the first feature
while read file; do fname=$(basename "${file}"); cat "${file}" | jq '.features[0].properties.label = "'"${fname%.*}"'"' | sponge "${file}"; done <<< $(find geojson/ -type f)
# add trip number as a property
while read file; do fname=$(basename "${file}"); cat "${file}" | jq '.features[0].properties.trip = "'"$(echo "${fname}" | sed -E 's/(^[0-9]*)\..*/\1/')"'"' | sponge "${file}"; done <<< $(find geojson/ -type f)
# combine geojson files

while read file; do cat "${file}"; done <<< $(find geojson/ -type f | sort -t / -k 2 -n) | jq --slurp '{
    "type": "FeatureCollection",
    "name": "hitchhikes",
    "features": ([.[] | .features[0]])
}' > hitching.geojson
```

turn some text into a json-compatible string:

```bash
getclip | tr '\n' '~' | sed 's/~/<br>/g' | sed 's/"/\\"/g' | setclip
```
