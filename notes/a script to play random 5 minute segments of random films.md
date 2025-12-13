---
title: a script to play random 5 minute segments of random films
date: 2025-12-13
tags:
- scripting
- films
- vlc
---
For an under-the-sea themed party, I wanted to play parts of films on a projector, and switch between films every 5 minutes.

Here's the final script which plays films. It's pretty simple in the end, it: kills VLC; selects a random film and a random seek time; and launches VLC.

```bash
#!/bin/bash
# play_random.sh - select random film and play it

# kill vlc if it already exists
pkill -x vlc

# get random film
file=$(cat films.txt | shuf | head -n1)

# get random seek time
MAX_MINS=80
secs=$(( $RANDOM % ( $MAX_MINS * 60 ) ))

# start vlc in background
nohup vlc --video-title-timeout 0 --start-time "${secs}" --fullscreen "${file}" </dev/null &>/dev/null &
```

I played around a lot trying to trigger this script with cron, but cron doesn't live in the desktop environment and I couldn't figure out how to launch applications.

So… much simpler, I just made a wrapper script and ran it from a terminal.

```bash
#!/bin/bash
# ./run.sh - endless loop which runs play_random.sh every N minutes
MINS="${1:-5}"
SECS=$(( $MINS * 60 ))
while true; do
  ./play_random.sh
  echo "... sleep for ${SECS} seconds"
  sleep $SECS
done
```

Features that I didn't add were:

- seek through the entire film (it only seeks from 0 to 80 minutes as some of the films are short)
- presumably VLC has some way to send signals while it's running to change the media, but I just killed and restarted it
- I'm not sure how subtitles work, so I set a default preference for "English", and it seemed to work most of the time

It worked pretty great! Poor man's managed video service.
