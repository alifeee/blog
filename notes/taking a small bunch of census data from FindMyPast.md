---
title: taking a small bunch of census data from FindMyPast
date: 2025-04-29
tags:
- jq
- scripting
- web-scraping
- census
- data
---
The [1939 Register](https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/1939-register/) was an basically-census taken in 1939. On the [National Archives Page](https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/1939-register/), it says that it is entirely available online.

However, further down, it lists how to access it, which says:

> You can search for and view open records on our partner site Findmypast.co.uk (charges apply). A version of the 1939 Register is also available at Ancestry.co.uk (charges apply), and transcriptions without images are on MyHeritage.com (charges apply). It is free to search for these records, but there is a charge to view full transcriptions and download images of documents. Please note that you can view these records online free of charge in the reading rooms at The National Archives in Kew.

So… charges apply.

Anyway, for a while in April 2025 (until May 8th), FindMyPast is giving free access to the 1939 data.

Of course, family history is hard, and what's much easier is "who lived in my house in 1939". For that you can use:

- <https://www.findmypast.co.uk/search-address/>

I created an account with a bogus email address (you're not collecting *THIS* guy's data) and took a look around at some houses.

Then, I figured I could export my entire street, so I did.

The code and more context is in [a GitHub Repository](https://github.com/alifeee/census-data-parsing-1939), but in brief, I:

- searched a Street name, and stole the JSON request as Curl request
- parsed the JSON request for each entry and its corresponding ID
- searched the ID using another stolen Curl request, to JSON
- parsed the JSON which contained information about the house as well as its occupants
- spent far too long wrangling `jq` syntax to get the final data into a nice CSV format

Now it looks like:

```csv
AddressStreet,Address,Inhabited,LatLon,FirstName,LastName,BirthDate,ApproxAge,OccupationText,Gender,MaritalStatus,Relationship,Schedule,ScheduleSubNumber,Id
Khartoum Road,"1 Khartoum Road, Sheffield",Y,"53.3701,-1.4943",Constance A,Latch,31 Aug 1904,35,Manageress Restaurant & Canteen,Female,Married,Unknown,172,3,TNA/R39/3506/3506E/003/17
Khartoum Road,"4 Khartoum Road, Sheffield",Y,"53.3701,-1.4943",Catherine,Power,? Feb 1897,42,Music Hall Artists,Female,Married,Unknown,171,8,TNA/R39/3506/3506D/015/37
Khartoum Road,"4 Khartoum Road, Sheffield",Y,"53.3701,-1.4943",Charles F R,Kirby,? Nov 1886,53,Newsagent Canvasser,Male,Married,Head,172,1,TNA/R39/3506/3506D/015/39
Khartoum Road,"4 Khartoum Road, Sheffield",Y,"53.3701,-1.4943",Constance A,Latch,31 Aug 1912,27,Manageress Restairant & Cante,Female,Married,Unknown,172,3,TNA/R39/3506/3506D/015/41
```

Neat!

Some of my favourite jobs in the sheet of streets I collected are:

- Corporation Tram Driver
- Cutlery Works Manager
- Professional Musician (Orchestra)
- Piston Ring & Valve Fitter Marine Engineer
- Journeyman Window Cleaner
- Slaughter Man Butcher Heavy Worker
- Fish Salesman
- Incapacitated
