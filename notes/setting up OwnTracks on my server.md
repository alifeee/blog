---
title: setting up OwnTracks on my server
date: 2025-03-28
tags:
- owntracks
- installation
---
[OwnTracks](https://owntracks.org/) is a self-hostable service for tracking locations.

It's like an open-source, self-hostable version of [Life360](https://www.life360.com/en-gb), [Apple's Find My Friends](https://apps.apple.com/gb/app/find-my-friends/id466122094), [Google's Find My Device](https://www.google.com/android/find/people) or many other apps which let you view the location history of yourself or others.

You can self-host it on a raspberry pi, a server, or otherwise a computer which is always-on and has access to the Internet (with a static IP).

I tried installing it on my server, and this is what I ran. Notably, it wiped my existing `nginx` configuration, so I [suggested a clarification of that in the documentation](https://github.com/owntracks/booklet/pull/93) and made sure to back my config up so I could restore it. Thankfully I was already doing that.

```bash
# install files
cd /usr/alifeee/
git clone --depth=1 https://github.com/owntracks/quicksetup
mv quicksetup owntracks
cd /usr/alifeee/owntracks/

# edit configuration
cp configuration.yaml.example configuration.yaml
nano configuration.yaml

# back up nginx.conf
(cd /media/alifeee; sudo ./back-up.sh)

# set up
sudo ./bootstrap.sh

# reset nginx conf (it blanks it)
sudo chmod u+w /etc/nginx/nginx.conf
sudo cp /media/alifeee/20250307T1749/nginx.conf /etc/nginx/nginx.conf
# put this into config
echo '# for owntracks
  map $cookie_otrauth $mysite_hascookie {
    "vhwNkyPGPCvnMCiQRkCs" "off";
    default "My OwnTracks";
  }'

# get passwords
sudo tail /usr/local/owntracks/userdata/*.pass
```

Files are stores in /usr/local/owntracks. I can then visit <https://owntracks.alifeee.net/>, login, and see a setup. I downloaded the [Android app](https://play.google.com/store/apps/details?id=org.owntracks.android&hl=en_GB) and set it up by opening the file from my website with the app, and it set up pretty well!

Then, I went for a walk, and looked at the "frontend", which puts out a view like this, of my location history:

```text
       ___
   ___/   \
  /      alifeee
  |
  /
 |
  \___
      \__
```

It's pretty neat! And self-hosted! Another service to join the [maybe-too-many](https://server.alifeee.net/) on my server…

I made an account on it for my friends and we plan to use it to keep track of each other in our hitchhiking adventure next week.
