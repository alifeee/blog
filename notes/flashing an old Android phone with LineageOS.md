---
title: flashing an old Android phone with LineageOS
date: 2025-02-22
tags:
- LineageOS
- android
- hacking
---
## Why

I had an old Android phone I didn't use, and a lover who wanted to use Ankidecks without paying [£30](https://apps.apple.com/us/app/ankimobile-flashcards/id373493387) for the Apple version. The [Android version](https://play.google.com/store/apps/details?id=com.ichi2.anki) is an open source app.

## What I'd looked at before

A while ago I looked into installing [GrapheneOS](https://grapheneos.org/) or [CalyxOS](https://calyxos.org/) on my Android phone, which is a Google Pixel something, but after researching, found there could be problems with banking apps and other "secure apps", and I decided it wasn't worth the pain.

But, I still wanted to see what it was like, so I looked into installing something that wasn't Android onto my old phone, a Samsung A70. Neither GrapheneOS, nor CalyxOS, nor [LineageOS](https://lineageos.org/) supported the device, which was a bit annoying. One of the greatest uses for me for open source, freeing OSes, seems to be installing them on old software to give it more life (see: Linux), but I suppose these are for different audiences (people who already have a really expensive phone and can afford to now also have privacy).

## What guides to follow

After a bit more searching the web, I found an [unofficial build for the A70](https://xdaforums.com/t/rom-14-unofficial-stable-lineageos-21.4653217/), so I started installing! The process took a while, and I mainly:

- vaguely followed the process from a [LineageOS install guide](https://www.androidauthority.com/lineageos-install-guide-893303/)
- following the [unofficial build guide](https://xdaforums.com/t/rom-14-unofficial-stable-lineageos-21.4653217/)
- sort of following the [official LineageOS guide for the A71](https://wiki.lineageos.org/devices/a71/install/#pre-install-instructions) (the next generation after)

## What steps to take

From the first one, the process was somewhat:

1. Install necessary computer software (ADB, drivers, etc.)
2. Download packages (ROM, recovery, apps, etc.)
3. Prepare device & Unlock bootloader
4. Flash custom recovery
5. Flash custom ROM
6. Install Google apps
7. Reboot and personalize

...which is a lot of steps, including a lot of strange words. But, probably doable. From here, I describe all the "annoying little specific things I had to do":

## Specific things I did

### download files

- OS files from <https://xdaforums.com/t/rom-14-unofficial-stable-lineageos-21.4653217/>
- Odin (for flashing a "recovery image") from <https://technastic.com/download-samsung-odin-linux/>
- MindTheGapps for installing Google Apps from <https://github.com/MindTheGapps/14.0.0-arm64/releases>

…resulting in

```bash
$ cp  lineage-21.0-20241031-recovery-a70q.tar recovery.img.tar
$ ls
lineage-21.0-20241031-recovery-a70q.tar
lineage-21.0-20241031-UNOFFICIAL-a70q.zip
MindTheGapps-14.0.0-arm64-20250203_200051.zip
odin4
recovery.img.tar
```

### fuck around with Linux permissions

I do a lot of this with thermal printers and web servers and... yeah. Here, I make "Samsung phones" (USB devices that have a vendor ID of `04e8`) writable by anyone (`0666`) and owned by the `plugdev` group (and also add myself to that group).

```bash
$ echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="0666", GROUP="plugdev"' \
  | sudo tee -a /etc/udev/rules.d/51-android.rules 
$ sudo usermod -a -G plugdev alifeee
```

One thing I find every time with groups is that if you add yourself to one, you aren't in it until you restart the device. Not wanting to restart my PC with all my tabs open, I usually run `sudo su alifeee` in a terminal and then the "new" user has the group.

### install "recovery image"

I'm still not sure what a recovery image is, but I now describe it as "a thing that lets you install other things (OSes)". I had to enable "OEM Unlocking" in the Android developer settings, reboot the device holding all the buttons, then choose "unlock device".

It didn't work (`odin` said there was an error), and after some advice from the web, I booted to Android, turned on WiFi, and tried again, and it worked. Strange. Then I ran:

```bash
$ ./odin4 -a recovery.img.tar -d /dev/bus/usb/001/017
Check file : recovery.img.tar
/dev/bus/usb/001/017
Setup Connection
initializeConnection
Receive PIT Info
success getpit
Upload Binaries
recovery.img
vbmeta.img
Close Connection
```

### install LineageOS

At this point, when I restarted the phone, I had a neat recovery thing with some buttons, that reminded me of [SpaceTeam](https://play.google.com/store/apps/details?id=com.sleepingbeastgames.spaceteam) or [Space Trader](https://play.google.com/store/apps/details?id=com.brucelet.spacetrader). I clicked `apply update > apply from ADB` and then uploaded LineageOS and Google Apps with:

```bash
$ adb -d sideload lineage-21.0-20241031-UNOFFICIAL-a70q.zip
Total xfer: 1.00x
$ adb -d sideload MindTheGapps-14.0.0-arm64-20250203_200051.zip
Total xfer: 1.00x
```

…then "reboot system now", and I'm in!

I installed [F-Droid](https://f-droid.org/), a FLOSS app store, and then [AuroraStore](https://auroraoss.com/), which is a mirror (or something) of the Google Play Store, so you can install Google Apps with it.

## the end

I skipped about 3 hours of screwing around, trying to run things, running the wrong things, finding advice on the Internet, discarding advice from the Internet, and otherwise encountering unexpected things. Computing.

But, it was an OK process. Not as fun as when I cracked a Wii. But a (much more usable) neat LineageOS phone as a result.
