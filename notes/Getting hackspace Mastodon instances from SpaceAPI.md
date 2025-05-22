---
title: Getting hackspace Mastodon instances from SpaceAPI
date: 2025-05-22
tags:
- scripting
- spaceapi
- mastodon
- hackspaces
---
We're back on the [SpaceAPI](https://spaceapi.io/) grind.

This time, I wanted to see what Mastodon instances different hackspaces used.

## The "contact" field in SpaceAPI

SpaceAPI has a "contact" object, which is used for this kind of thing. For example, for Sheffield Hackspace, this is:

```bash
$ curl -s "https://www.sheffieldhackspace.org.uk/spaceapi.json" | jq '.contact'
{
  "email": "trustees@sheffieldhackspace.org.uk",
  "twitter": "@shhmakers",
  "facebook": "SHHMakers"
}
```

## Downloading all the SpaceAPI files

Once again, I start by downloading the JSON files, so that (in theory) I can make only one request to each SpaceAPI endpoint, and then work with the data locally (instead of requesting the JSON from the web every time I interact with it).

This script is modified from [last time I did it](/getting-hackspace-membership-prices-from-space-api/), adding some better feedback of why some endpoints fail.

```bash
# download spaces
tot=0; got=0
echo "code,url" > failed.txt
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'; NC='\033[0m'
while read double; do
  tot=$(($tot+1))
  name=$(echo "${double}" | awk -F';' '{print $1}');
  url=$(echo "${double}" | awk -F';' '{print $2}');
  fn=$(echo "${name}" | sed 's+/+-+g')
  echo "saving '${name}' - <${url}> to ./spaces/${fn}.json";

  # skip unless manually deleted  
  if [ -f "./spaces/${fn}.json" ]; then
    echo -e "  ${YELLOW}already saved${NC} this URL!" >> /dev/stderr
    got=$(($got+1))
    continue
  fi
  
  # get, skipping if HTTP status >= 400
  code=$(curl -L -s --fail --max-time 5 -o "./spaces/${fn}.json" --write-out "%{http_code}" "${url}")
  if [[ "${?}" -ne 0 ]] || [[ "${code}" -ne 200 ]]; then
    echo "${code},${url}" >> failed.txt
    echo -e "  ${RED}bad${NC} status code (${code}) for this url!"  >> /dev/stderr
    continue
  fi
  
  echo -e "  ${GREEN}fetched${NC}! maybe it's bad :S" >> /dev/stderr
  got=$(($got+1))
done <<<$(cat directory.json | jq -r 'to_entries | .[] | (.key + ";" + .value)')
echo "done, got ${got} of ${tot} files, $(($tot-$got)) failed with HTTP status >= 400"
echo "codes from failed.txt:"
cat failed.txt | awk -F',' 'NR>1{a[$1]+=1} END{printf "  "; for (i in a) {printf "%s (%i) ", i, a[i]}; printf "\n"}'

# some JSON files are malformed (i.e., not JSON) - just remove them
rem=0
for file in spaces/*.json; do
  cat "${file}" | jq > /dev/null
  if [[ "${?}" -ne 0 ]]; then
    echo "=== ${file} does not parse as JSON... removing it... ==="
    rm -v "${file}"
    rem=$(( $rem + 1 ))
  fi
done
echo "removed ${rem} malformed json files"
```

## Extracting contact information

This is basically copied from [last time I did it](/getting-hackspace-membership-prices-from-space-api/), changing `membership_plans?` to `contact?`, and changing the `jq` format afterwards.

```bash
# parse contact info
for file in spaces/*.json; do
  plans=$(cat "${file}" | jq '.contact?')
  [[ "${plans}" == "null" ]] && continue
  echo "${file}"
  echo "${plans}" | jq -r 'to_entries | .[] | (.key + ": " + (.value|tostring) )'
  echo ""
done > contact.txt
```

It outputs something like:

```bash
$ cat contact.txt | tail -n20 | head -n13
spaces/Westwoodlabs.json
twitter: @Westwoodlabs
irc: ircs://irc.hackint.org:6697/westwoodlabs
email: vorstand@westwoodlabs.de

spaces/xHain.json
phone: +493057714272
email: info@x-hain.de
matrix: #general:x-hain.de
mastodon: @xHain_hackspace@chaos.social

spaces/Zeus WPI.json
email: bestuur@zeus.ugent.be
```

## Calculating Mastodon averages

We can filter this file to only the "mastodon:" lines, and then extract the server with a funky regex, and get a list of which instances are most common.

```bash
$ cat contact.txt | grep '^[^:]*mastodon' | pcregrep -o1 '([^:\.@\/]*\.[^\/@]*).*' | sort | uniq -c | sort -n
      1 c3d2.social
      1 caos.social
      1 hachyderm.io
      1 hackerspace.pl
      1 mas.to
      1 social.bau-ha.us
      1 social.flipdot.org
      1 social.okoyono.de
      1 social.saarland
      1 social.schaffenburg.org
      1 telefant.net
      2 social.c3l.lu
      3 mastodon.social
      4 hsnl.social
     39 chaos.social
```

So… it's mostly [chaos.social](https://chaos.social/). Neat.
