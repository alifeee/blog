---
title: turning a list of geojson points into a list of lines between the points
date: 2024-12-05
tags:
  - geojson
  - scripting
  - jq
---
I often turn lists of coordinates into a geojson file, so they can be easily shared and viewed on a map. See several examples on <https://alifeee.net/maps/>.

One thing I wanted to do recently was turn a list of points ("places I've been") into a list of straight lines connecting them, to show routes on a map. I made a script using [`jq`](https://jqlang.github.io/jq/) to do this, using the same data from [my note about making a geojson file from a CSV](https://blog.alifeee.net/notes/making-a-geojson-file-from-a-csv/).

Effectively, I want to turn these coordinates...

```csv
latitude,longitude,description,best part
53.74402,-0.34753,Hull,smallest window in the UK
54.779764,-1.581559,Durham,great cathedral
52.47771,-1.89930,Birmingham,best board game café
53.37827,-1.46230,Sheffield,5 rivers!!!
```

...into...

```csv
from latitude,from longitude,to latitude,to longitude,route
53.74402,-0.34753,54.779764,-1.581559,Hull --> Durham
54.779764,-1.581559,52.47771,-1.89930,Durham --> Birmingham
52.47771,-1.89930,53.37827,-1.46230,Birmingham --> Sheffield
```

...but in a `.geojson` format, so I can view them on a map. Since this turns `N` items into `N - 1` items, it sounds like it's time for a `reduce` (I like using `map`, `filter`, and `reduce` a lot. They're very satisfying. Some would say I should get [more] into Functional Programming).

So, the `jq` script to "combine" coordinates is: (hopefully you can vaguely see which bits of it do what)

```bash
# one-liner
cat places.geojson | jq '.features |= ( reduce .[] as $item ([]; .[-1] as $last | ( if $last == null then [$item | .geometry.coordinates |= [[], .]] else [.[], ($item | (.geometry.coordinates |= [($last | .geometry.coordinates[1]), .]) | (.properties.route=(($last | .properties.description) + " --> " + .properties.description)) | .geometry.type="LineString")] end)) | .[1:])'

# expanded
cat places.geojson | jq '
.features |= (
  reduce .[] as $item (
    [];
    .[-1] as $last
    | (
      if $last == null then
        [$item | .geometry.coordinates |= [[], .]]
      else
        [
          .[],
          (
            $item
            | (.geometry.coordinates |=[
                  ($last | .geometry.coordinates[1]),
                  .
                ]
              )
            | (.properties.route=(
                  ($last | .properties.description)
                  + " --> "
                  + .properties.description
                )
              )
            | .geometry.type="LineString"
          )
        ]
      end
      )
    )
  | .[1:]
)
'
```

This turns a `.geojson` file like...

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

...into a file like...

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "description": "Durham",
        "best part": "great cathedral",
        "route": "Hull --> Durham"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -0.34753,
            53.74402
          ],
          [
            -1.581559,
            54.779764
          ]
        ]
      }
    },
    ...
  ]
}
```

As with the previous post, making this script took a lot of reading `man jq` (very well-written) in my terminal, and a lot of searching "how to do X in `jq`".
