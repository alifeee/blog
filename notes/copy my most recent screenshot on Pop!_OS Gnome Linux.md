---
date: 2024-11-11
title: copy my most recent screenshot on Pop!_OS Gnome Linux
tags:
  - linux
  - shortcuts
---
I recently started using Pop!\_OS, which uses Gnome as a desktop environment.

## What's the problem? my clipboard history doesn't do images

Apparently there are a few different "clipboards" in desktop Linux, but I like to ignore this fact and pretend there is only one.

I like clipboard history, so that I can copy several things, switch application, and then paste several things (like copying both username and password). As such, I installed a Gnome extension "clipboard indicator" to have a clipboard history: <https://extensions.gnome.org/extension/779/clipboard-indicator/>.

However, it doesn't have images on there, only text. So, if you copy an image (or take a screenshot), then copy some text, you can't use the clipboard history to get back to the image - you have to re-copy it or re-take the screenshot. I find this a bit annoying.

## my clipboard history does have support but not for my version of Gnome

A note: image support [was added](https://github.com/Tudmotu/gnome-shell-extension-clipboard-indicator/pull/286), but only in Gnome 45 (which is [not](https://github.com/Tudmotu/gnome-shell-extension-clipboard-indicator/issues/403) [very](https://github.com/Tudmotu/gnome-shell-extension-clipboard-indicator/issues/403) [obvious](https://github.com/Tudmotu/gnome-shell-extension-clipboard-indicator/issues/487)). I am on Gnome 42.9, and I don't understand enough about Linux distributions to know if I can upgrade that version myself, or it is built into Pop!\_OS. It seems like Pop!\_OS is [creating a whole new Desktop environment anyway](https://system76.com/cosmic/), for some reason, so they may never reach Gnome 45.

## changing where screenshots are stored

Let's work around the problem. But first, Screenshots are saved to `~/Pictures/Screenshots`, which can't be changed (easily). However, an aside: I want to change it because I sync my `~/Pictures/` folder to my phone with Syncthing, and I don't want ephemeral screenshots clouding my phone.

First, I tried changing `dconf` settings by installing `dconf-editor` with `sudo apt install dconf-editor`, and I found a setting called `org.gnome.totem > screenshot-save-uri`. I changed this from `""` to `.cache`, but it did nothing. It turned out it was entirely unrelated, as "gnome totem" is some sort of video player. So, instead, I moved the `Screenshots` directory manually and created a symbolic link with

```bash
mv /home/alifeee/Pictures/Screenshots /home/alifeee/.cache/Screenshots
ln -s /home/alifeee/.cache/Screenshots /home/alifeee/Pictures/Screenshots
```

## copying the latest screenshot to the clipboard

with some searching, I found a way to use `xclip` to copy an image to the clipboard, like this:

```bash
xclip -selection clipboard -target image/png -i "Screenshot from 2024-11-11 10-28-31.png" 
```

## creating a keyboard shortcut to copy the latest screenshot

with Gnome you can create keyboard shortcuts, so I wanted to map `CONTROL + SUPER + C` to "copy latest screenshot". I struggled getting the command to output anything, and eventually wrapped the whole command (that I got working in my terminal) in quotes and slapped `bash` before it, and it works great now. After installing `libnotify-bin`, I created the keybind with this command:

```bash
bash -c 'dir=~/Pictures/Screenshots/; img=$(ls -t "${dir}" | head -n1); xclip -selection clipboard -target image/png -i "${dir}${img}"; notify-send "copied image" "${img}"'
```

Now I press `CTRL+SUPER+C` and I get a notification on the top of my screen telling me I copied an image, and I can paste the image anywhere I can usually paste images!

Sweet.
