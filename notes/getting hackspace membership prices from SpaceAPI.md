---
title: getting hackspace membership prices from SpaceAPI
date: 2025-02-21
tags:
- spaceapi
- scripting
- hackspaces
- json
---
[SpaceAPI](https://spaceapi.io/) is a project to convince hackspaces to maintain a simple JSON file self-describing themselves.

For example, see Sheffield Hackspace's on <https://www.sheffieldhackspace.org.uk/spaceapi.json>. It's currently a static file.

I wanted to know which hackspaces published their membership prices using SpaceAPI, and what those rates were. Here are a few bash scripts to do just that:

```bash
# get the directory of SpaceAPIs
mkdir -p ~/temp/spaceapi/spaces
cd ~/temp/spaceapi
curl "https://directory.spaceapi.io/" | jq > directory.json

# save (as many as possible of) SpaceAPIs to local computer
tot=0; got=0
while read double; do
  tot=$(($tot+1))
  name=$(echo "${double}" | awk -F';' '{print $1}');
  url=$(echo "${double}" | awk -F';' '{print $2}');
  fn=$(echo "${name}" | sed 's+/+-+g')
  echo "saving '${name}' - <${url}> to ./spaces/${fn}.json";

  # skip unless manually deleted  
  if [ -f "./spaces/${fn}.json" ]; then
    echo "already saved!"
    got=$(($got+1))
    continue
  fi
  
  # get, skipping if HTTP status >= 400
  curl -L -s --fail --max-time 5 "${url}" -o "./spaces/${fn}.json" || continue
  echo "fetched! maybe it's bad :S"
  got=$(($got+1))
done <<<$(cat directory.json | jq -r 'to_entries | .[] | (.key + ";" + .value)')
echo "done, got ${got} of ${tot} files, $(($tot-$got)) failed with HTTP status >= 400"

# some JSON files are malformed (i.e., not JSON) - just remove them
for file in spaces/*.json; do
  cat "${file}" | jq > /dev/null
  if [[ "${?}" -ne 0 ]]; then
    echo "${file} does not parse as JSON... removing it..."
    rm "${file}"
  fi
done

# loop every JSON file, and nicely output any that have a .membership_plans object
for file in spaces/*.json; do
  plans=$(cat "${file}" | jq '.membership_plans?')
  [[ "${plans}" == "null" ]] && continue
  echo "${file}"
#  echo "${plans}" | jq -c
  echo "${plans}" | jq -r '.[] | (.currency_symbol + (.value|tostring) + " " + .currency + " " + .billing_interval + " for " + .name + " (" + .description + ")")'
  echo ""
done
```

The output of this final loop looks like:

```text
...

spaces/CCC Basel.json
20 CHF monthly for Minimal ()
40 CHF monthly for Recommended ()
60 CHF monthly for Root ()

...

spaces/RevSpace.json
32 EUR monthly for regular ()
20 EUR monthly for junior ()
19.84 EUR monthly for multi2 ()
13.37 EUR monthly for multi3 ()

...

spaces/Sheffield Hackspace.json
£6 GBP monthly for normal membership (regularly attend any of the several open evenings a week)
£21 GBP monthly for keyholder membership (come and go as you please)

...
```

<details><summary>see full output</summary>

```text
spaces/CCC Basel.json
20 CHF monthly for Minimal ()
40 CHF monthly for Recommended ()
60 CHF monthly for Root ()

spaces/ChaosStuff.json
120 EUR yearly for Regular Membership (For people with a regular income)
40 EUR yearly for Student Membership (For pupils and students)
40 EUR yearly for Supporting Membership (For people who want to use the space to work on projects, but don't want to have voting rights an a general assembly.)
1 EUR yearly for Starving Hacker (For people, who cannot afford the membership. Please get in touch with us, before applying.)

spaces/dezentrale.json
16 EUR monthly for Reduced membership ()
32 EUR monthly for Regular membership ()
42 EUR monthly for Nerd membership ()
64 EUR monthly for Nerd membership ()
128 EUR monthly for Nerd membership ()

spaces/Entropia.json
25 EUR yearly for Regular Members (Normale Mitglieder gem. https://entropia.de/Satzung_des_Vereins_Entropia_e.V.#Beitragsordnung)
19 EUR yearly for Members of CCC e.V. (Mitglieder des CCC e.V. gem. https://entropia.de/Satzung_des_Vereins_Entropia_e.V.#Beitragsordnung)
15 EUR yearly for Reduced Fee Members (Schüler, Studenten, Auszubildende und Menschen mit geringem Einkommen gem. https://entropia.de/Satzung_des_Vereins_Entropia_e.V.#Beitragsordnung)
6 EUR yearly for Sustaining Membership (Fördermitglieder gem. https://entropia.de/Satzung_des_Vereins_Entropia_e.V.#Beitragsordnung)

spaces/Hacker Embassy.json
100 USD monthly for Membership ()

spaces/Hackerspace.Gent.json
25 EUR monthly for regular (discount rates and yearly invoice also available)

spaces/Hack Manhattan.json
110 USD monthly for Normal Membership (Membership dues go directly to rent, utilities, and the occasional equipment purchase.)
55 USD monthly for Starving Hacker Membership (Membership dues go directly to rent, utilities, and the occasional equipment purchase. This plan is intended for student/unemployed hackers.)

spaces/Hal9k.json
450 DKK other for Normal membership (Billing is once per quarter)
225 DKK other for Student membership (Billing is once per quarter)

spaces/Leigh Hackspace.json
24 GBP monthly for Member (Our standard membership that allows usage of the hackspace facilities.)
30 GBP monthly for Member+ (Standard membership with an additional donation.)
18 GBP monthly for Concession (A subsidised membership for pensioners, students, and low income earners.)
40 GBP monthly for Family (A discounted family membership for two adults and two children.)
5 GBP daily for Day Pass (Access to the hackspace's facilities for a day.)
5 GBP monthly for Patron (Support the hackspace without being a member.)

spaces/LeineLab.json
120 EUR yearly for Ordentliche Mitgliedschaft ()
30 EUR yearly for Ermäßigte Mitgliedschaft ()
336 EUR yearly for Ordentliche Mitgliedschaft + Werkstatt ()
120 EUR yearly for Ermäßigte Mitgliedschaft + Werkstatt ()

spaces/<name>space Gera.json

spaces/Nerdberg.json
35 EUR monthly for Vollmitgliedschaft (Normal fee, if it is to much for you, contact the leading board, we'll find a solution.)
15 EUR monthly for Fördermitgliedschaft ()

spaces/NYC Resistor.json
115 USD monthly for standard ()
75 USD monthly for teaching ()

spaces/Odenwilusenz.json
0 CHF yearly for Besucher ()
120 CHF yearly for Mitglied ()
480 CHF yearly for Superuser ()
1200 CHF yearly for Co-Worker ()

spaces/RevSpace.json
32 EUR monthly for regular ()
20 EUR monthly for junior ()
19.84 EUR monthly for multi2 ()
13.37 EUR monthly for multi3 ()

spaces/Sheffield Hackspace.json
£6 GBP monthly for normal membership (regularly attend any of the several open evenings a week)
£21 GBP monthly for keyholder membership (come and go as you please)

spaces/TkkrLab.json
30 EUR monthly for Normal member (Member of TkkrLab (https://tkkrlab.nl/deelnemer-worden/))
15 EUR monthly for Student member (Member of TkkrLab, discount for students (https://tkkrlab.nl/deelnemer-worden/))
15 EUR monthly for Student member (Junior member of TkkrLab, discount for people aged 16 or 17 (https://tkkrlab.nl/deelnemer-worden/))

spaces/-usr-space.json
```

</details>

I think a couple have weird names like `<name>space` or `/dev/tal` which screw with my script. Oh well, it's for you to improve.

Overall, not that many spaces have published their prices to SpaceAPI. Also, the ones in the US look really expensive. As ever, a good price probably depends on context (size/city/location/etc).

Perhaps I can convince some other spaces to put their membership prices in their SpaceAPI...
