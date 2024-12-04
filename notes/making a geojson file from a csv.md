---
title: making a geojson file from a csv
date: 2024-12-04
tags:
  - geojson
  - scripting
  - jq
---
I like maps. I make a lot of maps. See some on <https://alifeee.co.uk/maps/>.

I've gotten into a habit with map-making: my favourite format is `geojson`, and I've found some tools to help me screw around with it, namely <https://github.com/pvernier/csv2geojson> to create a `.geojson` file from a `.csv`, and <https://geojson.io/> to quickly and nicely view the geojson. `geojson.io` can also export as KML (used to import into Google Maps).

In attempting to turn a `.geojson` file from a list of `"Point"`s to a list of `"LineString"`s using [jq](https://jqlang.github.io/jq/), I figured I could also generate the `.geojson` file myself using `jq`, instead of using the `csv2geojson` Go program above. This is my (successful) attempt:

First, create a CSV file `places.csv` with coordinates (`latitude` and `longitude` columns) and other information. There are many ways to find coordinates; one is to use <https://www.openstreetmap.org/>, zoom into somewhere, and copy them from the URL. For example, some places I have lived:

```csv
latitude,longitude,description,best part
53.74402,-0.34753,Hull,smallest window in the UK
54.779764,-1.581559,Durham,great cathedral
52.47771,-1.89930,Birmingham,best board game café
53.37827,-1.46230,Sheffield,5 rivers!!!
```

Then, I spent a while (maybe an hour) crafting this `jq` script to turn that (or a similar CSV) into a `geojson` file. Perhaps you can vaguely see which parts of it do what.

```bash
# one line
cat places.csv | jq -Rn '(input|split(",")) as $headers | ($headers|[index("longitude"), index("latitude")]) as $indices | {"type": "FeatureCollection", "features": [inputs|split(",") | {"type": "Feature", "properties": ([($headers), .] | transpose | map( { "key": .[0], "value": .[1] } ) | from_entries | del(.latitude, .longitude)), "geometry": {"type": "Point", "coordinates": [(.[$indices[0]]|tonumber), (.[$indices[1]]|tonumber)]}}]}'

# over multiple lines
cat places.csv | jq -Rn '
(input|split(",")) as $headers
| ($headers|[index("longitude"), index("latitude")]) as $indices
| {
    "type": "FeatureCollection",
    "features": [
        inputs|split(",")
        | {
            "type": "Feature",
            "properties": ([($headers), .] | transpose | map( { "key": .[0], "value": .[1] } ) | from_entries | del(.latitude, .longitude)),
            "geometry": {"type": "Point", "coordinates": [(.[$indices[0]]|tonumber), (.[$indices[1]]|tonumber)]}
          }
    ]
  }
'
```

which makes a file like:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "description": "Hull",
        "best part": "smallest window in the UK"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.34753,
          53.74402
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "description": "Durham",
        "best part": "great cathedral"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -1.581559,
          54.779764
        ]
      }
    },
    ...
  ]
}
```

...which I can then export into <https://geojson.io/>, or turn into another format with [`gdal`](https://gdal.org/en/latest/programs/ogr2ogr.html) (e.g., with `ogr2ogr places.gpx places.geojson`).

It's very satisfying for me to use `jq`. I will definitely be re-using this script in the future to make `.geojson` files, but as well re-using some of the `jq` techniques I learnt while making it.

Mostly for help I used `man jq` in my terminal, the [`.geojson` proposal](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.4) for the `.geojson` structure, and a lot of searching the web for "how to do X using `jq`".
