---
date: 2024-11-13
title: getting latlong coordinates from an address with geocode.xyz
tags:
- scripting
- maps
---
I like maps. I make maps. Mostly from worse maps or data that is not in map form. See some of mine on <https://alifeee.net/maps/>.

One thing I've been doing for a map recently is geocoding, which is turning an address (e.g., "Showroom Cinema, Paternoster Row, Sheffield") into latitude/longitude coordinates.

<https://geocode.xyz/> provides a free geocoding API on <https://geocode.xyz/api> which is rate limited to one request per second.

Here is a script to wrap that API for using it as a script. It's not amazing but it works.

```bash
#!/bin/bash

loc="${1}"
throttled=1

while [ $throttled = 1 ]; do
  resp=$(curl -s -X POST -d locate="${loc}" -d geoit="json" "https://geocode.xyz")
  if [[ "${resp}" =~ Throttled ]]; then
    echo "throttled... retrying..." >> /dev/stderr
    throttled=1
  else
    throttled=0
  fi
  sleep 1
done

echo "got response: ${resp}" >> /dev/stderr

json=$(echo "${resp}" | jq | sed 's/ {}/""/g')

basic=$(echo "${json}" | jq -r '
.latt + "\t" +
.longt + "\t" +
.standard.confidence + "\t"'
)

standard=$(echo "${json}" | jq -r '
.standard.addresst? + "\t" +
.standard.statename? + "\t" +
.standard.city? + "\t" +
.standard.prov? + "\t" +
.standard.countryname? + "\t" +
.standard.postal? + "\t"
')

alt=$(echo "${json}" | jq -r '
.alt?.loc?.addresst + "\t" +
.alt?.loc?.statename + "\t" +
.alt?.loc?.city + "\t" +
.alt?.loc?.prov + "\t" +
.alt?.loc?.countryname + "\t" +
.alt?.loc?.postal + "\t"
')
echo "${basic}${standard}${alt}" | sed '1s/^/latitude\tlongitude\tconfidence\taddress\tstate\tcity\tprovince\tcountry\tpost code\talt address\talt state\talt city\talt province\talt country\talt postal\n/'
```

and then you can use it like

```bash
$ ./geocode.sh "Showroom Cinema, Paternoster Row, Sheffield"
throttled... retrying...
throttled... retrying...
got response: {   "standard" : {      "stnumber" : "1",      "addresst" : "Paternoster Row",      "statename" : "England",      "postal" : "S1",      "region" : "England",      "prov" : "UK",      "city" : "Sheffield",      "countryname" : "United Kingdom",      "confidence" : "0.9"   },   "longt" : "-1.46544",   "alt" : {},   "elevation" : {},   "latt" : "53.37756"}
latitude	longitude	confidence	address	state	city	province	country	post code	alt address	alt state	alt city	alt province	alt country	alt postal
53.37756	-1.46544	0.9	Paternoster Row	England	Sheffield	UK	United Kingdom	S1
```

The results are "ok". They're pretty good for street addresses, but I can see a lot of wrong results. I might try and use another API like OpenStreetMap's or (shudders) Google's.
