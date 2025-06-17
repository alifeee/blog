---
title: automating the turning on and off of my Minecraft server
date: 2025-06-10
tags:
- minecraft
- scripting
- tmux
- cron
- nginx
---
I run a Minecraft server weekly on Tuesdays. [Sometimes, I even play on it](https://blog.alifeee.co.uk/notes/creating-a-desktop-overlay-to-view-players-on-a-minecraft-server-with-conky/).

This describes automating the process for turning it on and off. Won't somebody at <https://ggservers.com/> please hire me /jk.

## The process

### Turning it on

My process every Tuesday to turn on the server has been:

- log on to <https://console.kamatera.com/> (requiring a One-Time-Password so I need my phone)
- go to "servers" and click "power on" for the server titled "Minecraft server" (minecraft box)
- wait a bit for it to power up, and connect via `ssh` (sometimes I just run `while true; do ssh minecraft; sleep 2; done)
- start a `tmux` session and run `./run` to turn on the Minecraft server
- disconnect from the `tmux` session and from the minecraft box
- connect to my web server and change `map.mc.alifeee.net` to 301 redirect to `livemap.mc.alifeee.net`

### Turning it off

Then, on Wednesday mornings (if I remember), I:

- `ssh` onto the minecraft box
- connect to the `tmux` session and stop the Minecraft server with `CTRL+C`
- connect to my web server and use `rsync` to copy the `world` and `dynmap` files as backups (this takes about 3 minutes)
- (still on the web server) switch off the 301 redirect
- run `sudo shutdown` on the minecraft box to turn it off

### The problems

Each of these steps can take a few seconds to run, so I am often multitasking, and I often forget things (like forgetting the backup, forgetting to actually run `shutdown` after all is done).

So, I've tried to automate it.

## Doing it automatically

I found out that Kamatera (the server host) has an API that you can use to remotely turn on/off servers, which is the only thing that I was really missing.

### cron tasks - web server

Here are the cron tasks on my *web server*:

```crontab
# turn Minecraft server server on/off
45 16 * * 2 /home/alifeee/minecraft/togglepower.sh on >> /home/alifeee/minecraft/cron.log 2>&1
5 4 * * 3 /home/alifeee/minecraft/rsync_backup.sh on >> /home/alifeee/minecraft/cron.log 2>&1
15 4 * * 3 /home/alifeee/minecraft/togglepower.sh off >> /home/alifeee/minecraft/cron.log 2>&1
```

### cron tasks - minecraft box

…and the cron tasks on the *minecraft box*:

```crontab
55 16 * * 2 /home/alifeee/minecraft/tmux_make.sh >> /home/alifeee/minecraft/cron.log 2>&1
0 4 * * 2 /home/alifeee/minecraft/tmux_kill.sh >> /home/alifeee/minecraft/cron.log 2>&1
```

### human description of cron jobs

Hopefully you can see the similarities to the process I described above, i.e.,

- 16:45 turn minecraft box on
- 16:55 (10 minutes later) turn minecraft server on
- 04:00 (11 hours and 5 minutes later) turn minecraft server off
- 04:05 (5 minutes later) fetch backup
- 04:15 (10 minutes later) turn minecraft box on

## The scripts

These scripts are pretty simple, they are:

### togglepower.sh - turn on/off the minecraft box

```bash
$ cat togglepower.sh
#!/bin/bash
# power on server
date
onoroff="${1}"
echo "got instruction: turn server <${onoroff}>"
if [[ ! "${onoroff}" == "on" ]] && [[ ! "${onoroff}" == "off" ]]; then
  echo "usage: ./togglepower.sh [on|off]"
  exit 1
fi
serverid="${serverid}"
auth=$(curl -s --request POST 'https://console.kamatera.com/service/authenticate' \
--header 'Content-Type: application/json' \
--data '{
    "clientId": "${clientId}",
    "secret": "${secret}"
}')
authentication=$(echo "${auth}" | jq -r '.authentication')
status=$(curl -s --request \
  GET "https://console.kamatera.com/service/server/${serverid}" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${authentication}"
)
power=$(echo "${status}" | jq -r '.power')
echo "current power: ${power}"
if [[ "${power}" == "${onoroff}" ]]; then
  echo "power is already ${onoroff}… quitting…"
  exit 1
fi
result=$(curl -s --request PUT \
  "https://console.kamatera.com/service/server/${serverid}/power" \
  --header 'Content-Type: application/json' \
  -H "Authorization: Bearer ${authentication}" \
  --data '{"power": "'"${onoroff}"'"}'
)
echo "complete! got ${result} from API call"
```

### run - run the Minecraft server

```bash
$ cat ./run 
#!/bin/bash
java \
  -Xmx1G \
  -jar fabric-server-mc.1.21.4-loader.0.16.10-launcher.1.0.1.jar \
  nogui
```

### tmux_make.sh - make a tmux session and run the Minecraft server in it

```bash
$ cat tmux_make.sh 
#!/bin/bash
date
session="minecraft"
echo "making tmux session ${session}"
tmux new-session -d -s "${session}" -c "/home/alifeee/minecraft"
echo "sending run"
tmux send-keys -t "${session}" './run' 'C-m'
echo "created !"
```

### tmux_kill.sh - stop the Minecraft server and stop the tmux session

```bash
$ cat tmux_kill.sh 
#!/bin/bash
date
session="minecraft"
echo "sending CTRL+C to ${session}"
tmux send-keys -t "${session}" 'C-c'
echo "sent CTRL+C… sleeping 30s…"
sleep 30
echo "killing session ${session}"
tmux kill-session -t "${session}"
echo "killed session"
```

### rsync_backup.sh - get backups using rsync

```bash
$ cat rsync_backup.sh 
#!/bin/bash
date
echo "saving cron log"
rsync minecraft:/usr/alifeee/minecraft/cron.log cron_minecraft.log
date
echo "saving world"
rsync -r minecraft:/usr/alifeee/minecraft/world/ world/
date
echo "saving dynmap"
rsync -r minecraft:/usr/alifeee/minecraft/dynmap/web/ dynmap/web/
date
echo "done!"
```

## What about the map?

Well, I figured this was too annoying to automate, so I just wrote a front page to pick whether you wanted the "dead map" or the "live map" (on <https://map.mc.alifeee.net/> – link probably dead).

The HTML for this simple picker makes quite a nice page:

<details><summary>see HTML</summary>

```html
<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<head>
<style>
html, body {
  background: black;
  color: white;
  height: 100%;
  font-family: sans-serif;
}
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
img {
  margin-bottom: 1rem;
}
.options {
  display: flex;
}
.option {
  background: orange;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0.5rem;
  color: black;
  text-decoration: none;
  max-width: 10rem;
  text-align: center;
}
.option.two {
  background: purple;
  color: white;
}
.option span {
  opacity: 0.75;
}
</style>
</head>

<body>

<h1>minecraft dynmap</h1>

<img src="/map/tiles/world/flat/0_0/zz_16_4.webp" />

<section class="options">
  <a class="option one" href="/map/">
    <h2>dead map</h2>
    <span>viewable all week, updates on server shutdown</span>
  </a>
  <a class="option two" href="https://livemap.mc.alifeee.net/">
    <h2>live map</h2>
    <span>viewable only when the server is live, shows players</span>
  </a>
</section>
</body>
</html>
```

</details>

This is served with a special `nginx` configuration which just serves a static file, and otherwise serves content via `alias` (not `root`):

```nginx
server {
    server_name map.mc.alifeee.net;
location / {
        root /var/www/dynmap/;
        try_files /whichmap.html =404;
    }
    location /map/ {
        alias /var/www/dynmap/;
        try_files $uri $uri/ =404;
    }
}
```

## Does it work

I think it works. I'll see if I have to make any edits tomorrow or next week.

I love scripting !
