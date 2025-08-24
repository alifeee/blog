---
title: parsing ical files using awk
date: 2025-08-24
tags:
- ics
- awk
- jq
- scripting
---
I've been interested in "doing something" with the [ical format](https://en.wikipedia.org/wiki/ICalendar) for a while, as it's quite a simple format, but can be shared easily to create events in other people's calendars.

Here is an example of an ical event, from the [wikipedia page](https://en.wikipedia.org/wiki/ICalendar)

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:uid1@example.com
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTAMP:19970701T100000Z
DTSTART:19970714T170000Z
DTEND:19970715T040000Z
SUMMARY:Bastille Day Party
GEO:48.85299;2.36885
END:VEVENT
END:VCALENDAR
```

As you can see, it's *fairly* human-readable. You can see a description of the event as `SUMMARY`, and a start/end date-time as `DTSTART`/`DTEND`. You can imagine writing a file like this manually (though probably don't start doing that).

As for parsing them, you can use awk pretty well. Create a file called `parse_ics.awk` a bit like this:

```bash
# run with:
#   awk -F':' -f parse_ics.awk
{sub("\r$", "")} # remove terrible line endings
$1=="UID"{UID=$2}
$1=="DTSTART"{DTSTART=$2}
$1=="DTEND"{DTEND=$2}
$1=="SUMMARY"{SUMMARY=$2}
$1=="GEO"{GEO=$2}
$1=="END" && $2=="VEVENT"{
  # parsing date format to timestamp
  datespec_fmt = "\\1 \\2 \\3 \\4 \\5 \\6"
  start_ts = mktime(gensub(/(....)(..)(..)T(..)(..)(..)Z/, datespec_fmt, 1, DTSTART))
  end_ts = mktime(gensub(/(....)(..)(..)T(..)(..)(..)Z/, datespec_fmt, 1, DTEND))
  # output
  printf "%s\n", SUMMARY
  printf "  %s – %s\n", strftime("%a %b %d %Y @ %H:%M", start_ts), strftime("%a %b %d %Y @ %H:%M", end_ts)
}
```

Save the example event above as `event.ics` and you can parse it with:

```bash
$ cat event.ics | awk -F':' -f parse_ics.awk
Bastille Day Party
  Mon Jul 14 1997 @ 17:00 – Tue Jul 15 1997 @ 04:00
```

If you want to do something more… machiney… you could change the output to be more machine-readable (i.e., JSON) by changing the printing section in awk, e.g., to…

```awk
printf "{"
printf "\"SUMMARY\": \"%s\",", SUMMARY
printf "\"START_TS\": %i,", start_ts
printf "\"END_TS\": %s", end_ts
printf "}"
```

…which you can then use in `jq` or elsewhere that uses json:

```bash
$ cat event.ics | awk -F':' -f parse_ics.awk | jq
{
  "SUMMARY": "Bastille Day Party",
  "START_TS": 868896000,
  "END_TS": 868935600
}
```

So… if someone publishes their event as an `.ics` file… you can do some nice scripting with it!

For example, I created a script which parses the Sheffield United [football fixtures](https://fixtur.es/en/team/sheffield-united-fc/home) and sends a message on Discord whenver there is one coming up later in the day (as [Sheffield Hackspace](https://www.sheffieldhackspace.org.uk/) is near the football ground so it affects parking for car-brains).
