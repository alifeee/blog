---
title: how to get a GPS trace of train and boat journeys
date: 2025-03-10
tags:
- travel
- geojson
- gpx
- maps
---
I like sustainable travel. I also like [interrailing](https://www.interrail.eu/). I *also* like [maps](https://alifeee.co.uk/maps/).

Let's combine all three! This winter I went via train from Sheffield to Hamburg (for [Chaos Computer Club](https://events.ccc.de/congress/2024/)), and then on to Lapland, and back.

## The map

To skip to the chase, I made a coordinates file of the trip, and you can see it here on a map:

<https://geojson.io/#data=data:text/x-url,https%3A%2F%2Fraw.githubusercontent.com%2Falifeee%2Feurope-trips%2Frefs%2Fheads%2Fmain%2F2024-12%2520CCC%2Fall.geojson>

It's combined from train journeys, ferry journeys, and bus journeys.

## Train data

I got the train routing data in `.gpx` format from <https://brouter.damsy.net/>, selecting the "Rail" profile in the dropdown. Then, I clicked close to the stations I went to/from/past, got a nice map that looked alright, and exported it.

## Bus data

I also used <https://brouter.damsy.net/> for this, after I'd found it was good for trains. I just selected one of the "Car" profiles, and set my waypoints, and exported it in the same way.

## Ferry data

This was different, as ferries don't use roads or train tracks [citation needed]. But! They are documented well on mapping services. So, I found the route I wanted on <https://www.openstreetmap.org/> (OSM) (e.g., [the Liepãja to Travemünde Ferry](https://www.openstreetmap.org/way/128069455)) by using the little questionmark "query feature" button, then opened it on <https://overpass-turbo.eu/> (a website for querying OSM data) by writing the query (with the correct feature ID):

```osm
way(128069455); out geom;
```

Then, I can click "Export" to get the `.gpx` (or other format) data out.

## Combining

I spent a long time trying to figure out how to combine `.gpx` files with [`ogrmerge`](https://gdal.org/en/stable/programs/ogrmerge.html).

However, I couldn't figure it out. `.gpx` is confusing, and everyone who uses it seems to use GUI tools like [arcgis](https://www.arcgis.com/index.html) or [qgis](https://qgis.org/), while I prefer to be able to do things with a command, which I can then repeat in future.

In the end, I converted the files to `.geojson` (my one true love) with `ogr2ogr file111.geojson file111.gpx tracks` for each file, and then combined them. Handily, I'd already written [a note about combining `.geojson` files](https://blog.alifeee.co.uk/notes/combining-geojson-files-with-jq/)! I wish I stuck in `.geojson` the whole time. `.gpx` gives me headaches.

## The End

That's it!

I could then load the combined file into <https://geojson.io/> to check all was well (it was, I expected I might have to "reverse" some paths to be "forwards"), and I uploaded it to a new GitHub repository, <https://github.com/alifeee/europe-trips/>.

I also laser cut a mini Europe with a line for the trip on the map, as a gift for my lover :]
