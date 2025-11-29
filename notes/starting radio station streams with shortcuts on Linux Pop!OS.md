---
title: starting radio station streams with shortcuts on Linux Pop!OS
date: 2024-11-20
tags:
  - shortcuts
  - linux
  - radio
---
I enjoy listening to the radio. I enjoy listening to music. I don't enjoy listening to adverts. BBC Radio 6 Music fits these requirements well. So do two of my local Sheffield radio stations: [Forge radio](https://onlineradiobox.com/uk/forge/) and [mondo.radio](https://www.mondo.radio/).

I have a physical radio in my kitchen, but on my laptop or computer I enjoy using HTTP audio streams. For the latter two radio stations, I opened the network tab in my web browser, and clicked play, and then saw a request pop up. I copied this and I can use it either in a new tab in my browser, or as a "Network stream" in VLC Media Player. For BBC Radio 6 Music, I can't remember how I found the stream. I just tried to find a copy in the network requests tab, but I couldn't. I did find two articles about it: <https://garfnet.org.uk/cms/2023/10/29/latest-bbc-hls-radio-streams/> and <https://minimradio.com/>. Anyway, I still have the URL, so I can launch it (and the others) in VLC by using:

```bash
# forge radio
vlc "http://solid41.streamupsolutions.com:10062/;stream.nsv"
# mondo radio
vlc "https://streamer.radio.co/s1afcca186/listen"
# bbc radio 6 music
vlc "https://as-hls-ww-live.akamaized.net/pool_904/live/ww/bbc_6music/bbc_6music.isml/bbc_6music-audio%3d96000.norewind.m3u8"
```

I'm enjoying [creating shortcuts on my computer](https://blog.alifeee.net/notes/copy-my-most-recent-screenshot-on-pop-os-gnome-linux/), so I turned the above three commands into shortcuts. Now I can launch the radios in VLC with the push of a (well, four) button.

```text
SUPER + CTRL + SHIFT + 4 --- "Four"-ge radio
SUPER + CTRL + SHIFT + 5 --- mondo radio (no pun for this one)
SUPER + CTRL + SHIFT + 6 --- BBC Radio "6" music
```
