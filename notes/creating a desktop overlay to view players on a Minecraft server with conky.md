---
title: creating a desktop overlay to view players on a Minecraft server with conky
date: 2025-06-03
tags:
- conky
- minecraft
- scripting
- overlay
---
Currently, I'm hosting a Minecraft server weekly on Tuesdays. Sometimes I even play.

It's Vanilla with a [proximity voice chat mod](https://www.curseforge.com/minecraft/mc-mods/simple-voice-chat) (walk near people to hear them). Proximity voice chat is endlessly fun (see [Barotrauma](https://barotraumagame.com/), [Factorio](https://blog.alifeee.co.uk/factorio-proximity-chat/), et cetera…)

Today, I wanted to have an overlay (think Discord voice chat overlay, or when you pop-out a video in Firefox, or when you use chat heads on mobile) which showed me who was online on the server.

After seeing an "[enable status](https://minecraft.wiki/w/Server.properties#enable-status)" option in the server's `server.properties` file, and searching up what it meant (it allows services to "query the status of the server), I'd used <https://mcsrvstat.us/> before to check the status of the server, which shows you the player list in a browser.

But a local overlay would need a local way to query the server status. So I did some web searching, found a [Python script](https://github.com/vertecx/nagios-plugins/blob/master/check_minecraft.py) which wasn't great (and written for Python 2), then a [self-hostable server status API](https://github.com/chooper/minecraftstatus-api), which led me to [mcstatus](https://github.com/py-mine/mcstatus), a Python API (with command line tool) for fetching server status.

I installed and tested it with

```bash
$ cd ~/temp/minecraft/
$ python3 -m venv env
$ ./env/bin/python -m mcstatus $SERVER_IP json
{"online": true, "kind": "Java", "status": {"players": {"online": 7, "max": 69, "sample": [{"name": "Boldwolf5491", "id": "289qfhj8-a8f2-298g-19ga-897ahwf8uwa8"}, {"name": "……………
```

Neat!

Next, a way of having an overlay. Searching for "linux x simple text overlay" led me to `xmessage`, which can show simple windows, but they're more like confirmation windows, not like long-lasting status windows (i.e., it's hard to update the text).

I was also led to discover [conky](https://github.com/brndnmtthws/conky), which – if nothing else – has a great name. It's designed to be a "system monitor", i.e., a thing wot shows you your CPU temperature, uptime, RAM usage, et cetera. The configuration is also written in Lua, which is super neat! I still want to get more into Lua.

By modifying the default configuration (in `/etc/conky/conky.conf`) like so:

```diff
diff --git a/etc/conky/conky.conf b/.config/conky/conky.conf
index 44053d5..cc319e1 100644
--- a/etc/conky/conky.conf
+++ b/.config/conky/conky.conf
@@ -37,8 +37,9 @@ conky.config = {
     out_to_stderr = false,
     out_to_x = true,
     own_window = true,
+    own_window_title = 'Minecraft',
     own_window_class = 'Conky',
-    own_window_type = 'desktop',
+    own_window_type = 'normal', -- or desktop
     show_graph_range = false,
     show_graph_scale = false,
     stippled_borders = 0,
@@ -48,25 +49,9 @@ conky.config = {
     use_xft = true,
 }
 
 conky.text = [[
-${color grey}Info:$color ${scroll 32 Conky $conky_version - $sysname $nodename $kernel $machine}
-$hr
-${color grey}Uptime:$color $uptime
-${color grey}Frequency (in MHz):$color $freq
-${color grey}Frequency (in GHz):$color $freq_g
-${color grey}RAM Usage:$color $mem/$memmax - $memperc% ${membar 4}
-${color grey}Swap Usage:$color $swap/$swapmax - $swapperc% ${swapbar 4}
-${color grey}CPU Usage:$color $cpu% ${cpubar 4}
-${color grey}Processes:$color $processes  ${color grey}Running:$color $running_processes
-$hr
-${color grey}File systems:
- / $color${fs_used /}/${fs_size /} ${fs_bar 6 /}
-${color grey}Networking:
-Up:$color ${upspeed} ${color grey} - Down:$color ${downspeed}
-$hr
-${color grey}Name              PID     CPU%   MEM%
-${color lightgrey} ${top name 1} ${top pid 1} ${top cpu 1} ${top mem 1}
-${color lightgrey} ${top name 2} ${top pid 2} ${top cpu 2} ${top mem 2}
-${color lightgrey} ${top name 3} ${top pid 3} ${top cpu 3} ${top mem 3}
-${color lightgrey} ${top name 4} ${top pid 4} ${top cpu 4} ${top mem 4}
+${execpi 5 ~/temp/minecraft/check.sh}
 ]]
```

…when we run `conky` it opens a small window which contains the output of the script `~/temp/minecraft/check.sh` (the 5 after `execpi` means it runs every 5 seconds). If this script was just `echo "hi!"` then that `conky` window looks a bit like:

```text
 ———————+x
 |       |
 |  hi!  |
 |_______|
```

I use Pop!\_OS, which uses Gnome/X for all the windows. With that (by default), I can right click the top bar of a window and click "Always on Top", which effectively makes the little window into an overlay, as it always displays on top of other windows, with the added bonus that I can easily drag it around.

Now, I can change the script to use the above Minecraft server status JSON information to output something which `conky` can use as an input, like:

```bash
#!/bin/bash
#~/temp/minecraft/check.sh
json=$(~/temp/minecraft/env/bin/python -m mcstatus mc.alifeee.net json)
online=$(echo "${json}" | jq -r '.status.players.online')
players=$(echo "${json}" | jq -r '.status.players.sample[] | .name')

echo '${color aaaa99}'"${online} players online"'${color}'
echo "---"
echo "${players}" \
  | sort \
  | awk '
  BEGIN{
    for(n=0;n<256;n++)ord[sprintf("%c",n)]=n
  }{
    r=0; g=0; b=0;
    split($0, arr, "")
    for (i in arr) {c=arr[i]; n=ord[c]; r+=n*11; g+=n*15; b+=n*21}
    printf "${color %X%X%X}%s\n",
      r%128+128, g%128+128, b%128+128, $0
  }
'
```

The fancy `awk` is just to make each player be a different colour, and to randomly generate the colours from the ASCII values of the player's username.

The final output looks like:

<pre>
 ——————————————————+x
 | <span style="color:aaaa99">8 players online</span> |
 | ---              |
 | <span style="color:A5E1BB">Kick_Flip_Barry</span>  |
 | <span style="color:89F5D7">Blue_Outburst</span>    |
 | <span style="color:DEC6E2">Kboy8082</span>         |
 | <span style="color:AED692">lele2102</span>         |
 | <span style="color:ADC9B3">Compostmelon101</span>  |
 | <span style="color:CCDCB4">Nobody808</span>        |
 | <span style="color:87DB99">Kaithefrog</span>       |
 | <span style="color:DCACA4">BrinnanTheThird</span>  |
 |__________________|
</pre>

…which I can drag anywhere on my screen. When people join or leave the server, I can see a flash of change out of the corner of my eye.

Is this useful? Should I – instead – just have been playing the game? Do I use too many en-dashes? The world only knows.

Maybe I'll use `conky` for something else in future… I like to wonder what it could do…
