---
title: getting my wifi name and password from the terminal
date: 2025-05-25
tags:
- scripting
- wifi
- aliases
---
I often want to get my current WiFi name (SSID) and password.

## How to get name/password manually

Sometimes, it's for a microcontroller. Sometimes, to share it. This time, it's for setting up an [info-beamer](https://info-beamer.com/) device [with WiFi](https://info-beamer.com/doc/device-configuration#wificonfiguration).

Before today, I would usually open my phone and go to "share" under the WiFi settings, and copy the password manually, and also copy the SSID manually.

It's finally time to write a way to do it with ***bash!***

## How to get name/password with bash

After some web-searching, these commands do what I want:

```bash
alias wifi=iwgetid -r
alias wifipw=sudo cat "/etc/NetworkManager/system-connections/$(wifi).nmconnection" | pcregrep -o1 "^psk=(.*)"
```

## How to use

…and I can use them like:

```bash
$ wifi
the wood raft (2.4G)
$ wifipw
[sudo] password for alifeee: 
**************
```

Neat!

## Using Atuin aliases

Finally, above I suggested I was using [Bash aliases](https://www.gnu.org/software/bash/manual/html_node/Aliases.html), but I actually created them using [Atuin](https://atuin.sh/), specifically [Atuin dotfile aliases](https://docs.atuin.sh/guide/dotfiles/#aliases), like:

```bash
atuin dotfiles alias set wifi 'iwgetid -r'
atuin dotfiles alias set wifipw 'sudo cat "/etc/NetworkManager/system-connections/$(wifi).nmconnection" | pcregrep -o1 "^psk=(.*)"'
```

Now, they will automatically be enabled on all my computers that use Atuin. This is actually not… amazingly helpful as my other computers all use ethernet, not WiFi, but… it's mainly about having the aliases all in the same place (and "backed up", if you will).
