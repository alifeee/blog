---
title: comparing historical HMO licence data in Sheffield
date: 2025-05-14
tags:
  - scripting
  - hmos
  - open-data
---
## What is an HMO licence

Sheffield city council publishes a list of HMO (House in Multiple Occupation) licences on their [HMO page](https://www.sheffield.gov.uk/housing/houses-in-multiple-occupation), along with other information about HMOs (in brief, an HMO is a shared house/flat with more than 3 non-family members, and it must be licenced if this number is 5 or more).

## How accessible is the data on HMO licences

They provide a list of licences as an Excel spreadsheet (`.xlsx`). I've asked them before if they could (*also*) provide a CSV, but they told me that was technically impossible. I also asked if they had historical data (i.e., previous spreadsheets), but they said they deleted it every time they uploaded a new one.

Therefore, as I'm interested in private renting in Sheffield, I've been archiving the data in a [GitHub repository](https://github.com/alifeee/hmo-licences-in-sheffield), as CSVs. I also add additional data like lat/long coordinates (via [geocoding](https://en.wikipedia.org/wiki/Address_geocoding)), and parse the data into geographical formats like `.geojson`, `.gpx`, and `.kml` (which can be viewed [on a map!](https://alifeee.co.uk/maps/#sheffield-hmo-licences)).

## Calculating statistics from the data

What I hadn't done yet was any statistics on the data (I'd only been interested in visualising it on a map) so that's what I've done now.

I spent the afternoon writing some scripts to parse CSV data and calculate things like mean occupants, most common postcodes, number of expiring licences by date, et cetera.

## General Statisitcs

I find shell scripting interesting, but I'm not so sure everyone else does ([the script](https://github.com/alifeee/hmo-licences-in-sheffield/blob/main/stats.sh) for the interested). So I'm not going to put the scripts here, but I *will* say that I used these command line tools (CLI tools) this many times:

- `cat` 7 times, `tail` 8 times, `wc` 1 time, `csvtool` 7 times, `awk` 4 times, `sort` 7 times, `head` 3 times, `echo` 7 times, `uniq` 2 times, `sed` 3 times.

Anyway, here are the statistics from [the script](https://github.com/alifeee/hmo-licences-in-sheffield/blob/main/stats.sh) (in text form, as is most shareable):

```text
hmos_2024-09-09.csv
  total licences: 1745
  6.29 mean occupants (IQR 2 [5 - 7]) (median 6)
  amount by postcode:
    S1 (60), S2 (214), S3 (100), S4 (12), S5 (18), S6 (90), S7 (62), 
    S8 (10), S9 (5), S10 (742), S11 (425), S12 (1), S13 (2), S14 (1), S20 (1), S35 (1), S36 (1), 
  streets with most licences: Crookesmoor Road (78), Norfolk Park Road (72), Ecclesall Road (48), Harcourt Road (38), School Road (29), 
  
hmos_2025-01-28.csv
  total licences: 1459
  6.35 mean occupants (IQR 2 [5 - 7]) (median 6)
  amount by postcode:
    S1 (50), S2 (199), S3 (94), S4 (9), S5 (17), S6 (78), S7 (57), 
    S8 (10), S9 (4), S10 (614), S11 (321), S12 (1), S13 (2), S20 (1), S35 (1), S36 (1), 
  streets with most licences: Norfolk Park Road (73), Crookesmoor Road (57), Ecclesall Road (43), Harcourt Road (28), School Road (26), 
  
hmos_2025-03-03.csv
  total licences: 1315
  6.37 mean occupants (IQR 2 [5 - 7]) (median 6)
  amount by postcode:
    S1 (48), S2 (161), S3 (92), S4 (8), S5 (13), S6 (70), S7 (55), 
    S8 (9), S9 (3), S10 (560), S11 (290), S12 (1), S13 (2), S20 (1), S35 (1), S36 (1), 
  streets with most licences: Crookesmoor Road (54), Norfolk Park Road (41), Ecclesall Road (38), Harcourt Road (27), Whitham Road (24), 
```

### Potential Conclusions

Draw your own conclusions there, but some could be that:

- there are fewer licences in the newer lists (perhaps the ["there is extremely high demand" warning](https://web.archive.org/web/20250122234557/https://www.sheffield.gov.uk/housing/houses-in-multiple-occupation) on the HMO website is then no surprise)
- the mean number of occupants may be rising or it may be statistically insignificant
- there are either a lot of houses becoming "not HMOs" overall (and on roads like Crookesmoor Road) *or* there are becoming a lot of unlicenced HMOs

## Statistics on issuing and expiry dates

I also did some statistics on the licence issue and expiry dates with a [second stats script](https://github.com/alifeee/hmo-licences-in-sheffield/blob/main/stats_dates.sh), which – as it parses nearly 5,000 dates – takes longer than "almost instantly" to run. As above, this used:

- `date` 10 times, `while` 6 times, `cat` 3 times, `csvtool` 2 times, `tail` 5 times, `wc` 3 times, `echo` 23 times, `sort` 11 times, `uniq` 4 times, `sed` 4 times, `awk` 9 times, `head` 2 times

The script outputs:

```text
hmos_2024-09-09.csv
  1745 dates in 1745 lines (627 unique issuing dates)
    637 expired
    1108 active
  Licence Issue Dates:
    Sun 06 Jan 2019, Sun 06 Jan 2019, … … … Wed 12 Jun 2024, Tue 09 Jul 2024, 
    Monday (275), Tuesday (440), Wednesday (405), Thursday (352), Friday (256), Saturday (5), Sunday (12), 
    2019 (84), 2020 (311), 2021 (588), 2022 (422), 2023 (183), 2024 (157), 
  Licence Expiry Dates:
    Mon 09 Sep 2024, Mon 09 Sep 2024, … … … Mon 11 Jun 2029, Sun 08 Jul 2029, 
    2024 (159), 2025 (824), 2026 (263), 2027 (225), 2028 (185), 2029 (89), 
    
hmos_2025-01-28.csv
  1459 dates in 1459 lines (561 unique issuing dates)
    334 expired
    1125 active
  Licence Issue Dates:
    Mon 28 Oct 2019, Mon 04 Nov 2019, … … … Mon 06 Jan 2025, Tue 14 Jan 2025, 
    Monday (243), Tuesday (380), Wednesday (338), Thursday (272), Friday (211), Saturday (6), Sunday (9), 
    2019 (2), 2020 (130), 2021 (567), 2022 (406), 2023 (181), 2024 (170), 2025 (3), 
  Licence Expiry Dates:
    Thu 30 Jan 2025, Fri 31 Jan 2025, … … … Mon 22 Oct 2029, Wed 28 Nov 2029, 
    2025 (681), 2026 (264), 2027 (225), 2028 (184), 2029 (105), 
    
hmos_2025-03-03.csv
  1315 dates in 1315 lines (523 unique issuing dates)
    189 expired
    1126 active
  Licence Issue Dates:
    Mon 28 Oct 2019, Mon 04 Nov 2019, … … … Wed 05 Mar 2025, Wed 05 Mar 2025, 
    Monday (217), Tuesday (339), Wednesday (314), Thursday (244), Friday (189), Saturday (4), Sunday (8), 
    2019 (2), 2020 (64), 2021 (494), 2022 (399), 2023 (177), 2024 (170), 2025 (9), 
  Licence Expiry Dates:
    Fri 07 Mar 2025, Fri 07 Mar 2025, … … … Mon 22 Oct 2029, Wed 28 Nov 2029, 
    2025 (533), 2026 (262), 2027 (225), 2028 (184), 2029 (111),
```

### Potential conclusions on dates

Again, draw your own conclusions (homework!), but some could be:

- Sheffield council's most productive day of the week is Tuesday
- Something is slowing down the process *or* the data uploaded in March wasn't up to date *or* the distribution of licences isn't even across the year, as only 9 licences are marked as issued in 2025

## Why is this interesting

I started collecting HMO data originally because I wanted to visualise the licences [on a map](https://alifeee.co.uk/maps/#sheffield-hmo-licences). Over a short time, I have created my own archive of licence history (as the council do not provide such).

Since I had multiple months of data, I could make some comparison, so I made these statistics. I don't find them incredibly useful, but there could be people who do.

Perhaps as time goes on, the long-term comparison (over years) could be interesting. I think the above data might not be greatly useful as it seems that Sheffield council are experiencing delays over licensing at the moment, so the decline in licences probably doesn't reflect general housing trends.

Plus, I just wanted to do some shell-scripting ;]

## Some links

- Sheffield Council's HMO licences page: <https://www.sheffield.gov.uk/housing/houses-in-multiple-occupation>
- my GitHub repository with historical data and scripts: <https://github.com/alifeee/hmo-licences-in-sheffield>
- more about the mapping (including a custom Google maps map): <https://alifeee.co.uk/maps/#sheffield-hmo-licences>
