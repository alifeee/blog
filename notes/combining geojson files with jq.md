---
title: combining geojson files with jq
date: 2024-12-13
tags:
- geojson
- jq
- scripting
---
I'm writing a blog about hitchhiking, which involves a load os [`.geojson`](https://geojson.org/) files, which look a bit like this:

The `.geojson` files are generated from `.gpx` traces that I exported from OSRM's (Open Source Routing Machine) demo (which, at time of writing, seems to be offline, but I believe it's on <https://map.project-osrm.org/>), one of the routing engines on OpenStreetMap.

I put in a start and end point, exported the `.gpx` trace, and then converted it to `.geojson` with, e.g., `ogr2ogr "2.1 Tamworth -> Tibshelf Northbound.geojson" "2.1 Tamworth -> Tibshelf Northbound.gpx" tracks`, where `ogr2ogr` is a command-line tool from `sudo apt install gdal-bin` which converts geographic data between many formats (I like it a lot, it feels nicer than searching the web for "errr, kml to gpx converter?"). I also then semi-manually added some properties ([see how](https://github.com/alifeee/blog/blob/b5bdc6311c29be972fd0162fd54e9a8106337642/2024/12/hitchhiking/README.md#L18-L24)).

```geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "label": "2.1 Tamworth -> Tibshelf Northbound",
        "trip": "2"
      },
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [
            [-1.64045, 52.60606]
            [-1.64067, 52.6058],
            [-1.64069, 52.60579],
            ...
          ]
        ]
      }
    }
  ]
}
```

I then had a load of files that looked a bit like

```bash
$ tree -f geojson/
geojson
├── geojson/1.1 Tamworth -> Woodall Northbound.geojson
├── geojson/1.2 Woodall Northbound -> Hull.geojson
├── geojson/2.1 Tamworth -> Tibshelf Northbound.geojson
├── geojson/2.2 Tibshelf Northbound -> Leeds.geojson
├── geojson/3.1 Frankley Northbound -> Hilton Northbound.geojson
├── geojson/3.2 Hilton Northbound -> Keele Northbound.geojson
└── geojson/3.3 Keele Northbound -> Liverpool.geojson
```

Originally, I was combining them into one `.geojson` file using <https://github.com/mapbox/geojson-merge>, which as a binary to merge `.geojson` files, but I decided to use `jq` because I wanted to do something a bit more complex, which was to create a structure like

```text
FeatureCollection
  Features:
    FeatureCollection
      Features (1.1 Tamworth -> Woodall Northbound, 1.2 Woodall Northbound -> Hull)
    FeatureCollection
      Features (2.1 Tamworth -> Tibshelf Northbound, 2.2 Tibshelf Northbound -> Leeds)
    FeatureCollection
      Features (3.1 Frankley Northbound -> Hilton Northbound, 3.2 Hilton Northbound -> Keele Northbound, 3.3 Keele Northbound -> Liverpool)
```

I spent a while making a quite-complicated `jq` query, using variables (an "advanced feature"!) and a reduce statement, but when I completed it, I found out that the above structure is not valid `.geojson`, so I went back to just having:

```text
FeatureCollection
  Features (1.1 Tamworth -> Woodall Northbound, 1.2 Woodall Northbound -> Hull, 2.1 Tamworth -> Tibshelf Northbound, 2.2 Tibshelf Northbound -> Leeds, 3.1 Frankley Northbound -> Hilton Northbound, 3.2 Hilton Northbound -> Keele Northbound, 3.3 Keele Northbound -> Liverpool)
```

...which is... a lot simpler to make.

A query which combines the files above is (the sort exists to sort the files so they are in numerical order downwards in the resulting `.geojson`):

```bash
while read file; do cat "${file}"; done <<< $(find geojson/ -type f | sort -t / -k 2 -n) | jq --slurp '{
    "type": "FeatureCollection",
    "name": "hitchhikes",
    "features": ([.[] | .features[0]])
}' > hitching.geojson
```

While `geojson-merge` was cool, it feels nice to have a more "raw" command to do what I want.
