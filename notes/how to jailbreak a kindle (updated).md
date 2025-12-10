---
title: how to jailbreak a kindle (updated)
date: 2025-12-10
tags:
  - kindle
  - koreader
  - jailbreaking
---
Information wants to [be](https://en.wikipedia.org/wiki/A_Hacker_Manifesto) [free](https://en.wikipedia.org/wiki/Information_wants_to_be_free). Reading on a computer or phone sucks. Kobo e-readers are expensive.

Why not buy an old Kindle from eBay or CEX (the Kindle 4 seems around £15-20) – or even better: get your auntie's old one that she no longer uses – and jailbreak it.

See my [other post about kindles](/notes/how-to-jailbreak-a-kindle-updated/) for more

## Why ?

Mainly, it lets you detach from Amazon's ecosystem. Amazon doesn't have to know what you're doing with the device (what books you're reading), nor does it have any control via-the-Internet over the device, nor does Amazon get to decide what formats you are and aren't allowed to read.

Let me give you 4 points[^4] for the kindle experience pre/post jailbreak, and see for yourself what you think (imagine they're not biased…).

### What's it like not jailbroken?

A normal kindle 4 allows you to:

1. buy books from Amazon
2. sync books wirelessly via emailing Amazon
3. put files on the kindle using a USB cable. You can use a fair few formats, but mostly you'll be dealing with files that look like `.azw…` – and most importantly… `.epub` doesn't work ! Wah !
4. read your books with Amazon's kindle e-reader software

### What's it like jailbroken?

A jailbroken kindle 4 allows you to:

1. buy or acquire books from anywhere, in more formats (`.epub` is here!)
2. sync books using Calibre (which is local-only and never reaches the Internet)
3. put files on the kindle using a USB cable. This time, we can read `.epub`! Yay!
4. read your books with KOReader

## Steps to jailbreak

These are steps for a kindle 4 (2011). If you have a different kindle, you're reading this in the future, or you don't trust me, there are better instructions on the [mobileread wiki](https://wiki.mobileread.com/wiki/Kindle_4) (or the [Jailbreak page](https://wiki.mobileread.com/wiki/Kindle4NTHacking#Jailbreak)) or the highly interactive [kindlemodding.org](https://kindlemodding.org/).

I've done this about 5 times, so I have forgotten a lot of the things that are confusing to a newcomer, but the process consists of doing this a few times:

1. downloading files from the Internet
2. plugging in the kindle via USB
3. placing the files in the right place on the kindle
4. updating or restarting the kindle

Restarting takes a while (maybe a minute) and you'll be doing it a lot, so… find something else to do at the same time.

### Links

The links that I'll refer to below are:

1. Amazon's software updates page: <https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKMQC26VQQMM8XSW>
2. NiLuJe's hacks: <https://www.mobileread.com/forums/showthread.php?t=225030>
3. KOReader install instructions: <https://github.com/koreader/koreader/wiki/Installation-on-Kindle-devices>
4. 2025 KUAL key update: <https://www.mobileread.com/forums/showpost.php?p=4506164>
5. renameotabin KUAL extension: <https://www.mobileread.com/forums/showpost.php?p=4076733&postcount=25>
6. blockamazon KUAL extension: <https://www.mobileread.com/forums/showpost.php?p=4546972&postcount=5>

### Step 1: update to latest firmware

I have had several issues when I forgot to do this, but it wasn't obvious.

You can see the current firmware version in the settings. To update:

1. download and drag the relevant update file from [link 1](#links) to the kindle via USB
2. update the kindle via the software update button in the settings menu on the settings page
3. repeat this step until you are on the latest firmware

This will take you 1/2/3 restarts, depending on how many updates you need to do.

### Step 2: turn on aeroplane mode

I've had issues where the kindle has connected to Amazon's servers and disabled some of the jailbreak, so before you do it, turn on aeroplane mode (in the settings) and restart the kindle (sorry).

### Step 3: jailbreak the kindle

- download jailbreak files from [link 2](#links)
- read the README file
    - for the Kindle 4, it says to move the `data.tar.gz` and `ENABLE_DIAGS` file to the kindle
    - for other kindles, look on <https://kindlemodding.org/>
- follow the instructions in the README
    - for the Kindle 4, this is to restart the kindle and select some reboot setting from the diagnostics menu
- enjoy the jailbreak screen. those jailbreakers love making funny jailbreaking screens.

This involves 1 restart.

### Step 4: install kindle mkk certificates

KUAL (Kindle Unified Application Launcher) is software that looks like a book to the kindle,
but actually runs other programs. We're using it to run some scripts to disable any software
updates sent by Amazon, and to run KOReader. But first, the kindle has to trust it, so we install
certificates:

- download the certificate update files from [link 2](#links)
- follow the instructions in the README
    - for the kindle 4, this is to copy the file over via USB and run a software update
- do this again for the 2025 certificates ([link 4](#links))

This involves… 2 restarts. Hope you're not tired by now.

### Step 5: install KUAL

- download KUAL from [link 2](#links)
- read the README
    - for the kindle 4, you put the KUAL `.azw…` file in the `documents` folder in the kindle
- run KUAL once to generate files

You don't have to restart for this one! Rejoice!

### Step 6: install KUAL extensions

- download the extensions from [link 5](#links) and [link 6](#links)
- place the folders in the `extensions` folder that `KUAL` should have created
- run KUAL and run each extension once (to rename the update files, and to disable Amazon's servers)
    when I did this, it caused a crash when KUAL re-opened. Dunno why.

### Step 7: install KOReader

- read the KOReader instructions on [link 4](#links)
- download the relevant KOReader files
- move the files over to the kindle over USB
- launch KOReader with KUAL ("no framework" means kill the Kindle OS first – saves battery/memory/etc but to get back to Kindle you have to reboot)

### Done!

Hopefully you've now got kindle that can open KOReader just fine. If not, sorry… it's time for you to
do some hefty web searching for your specific problem…

## What now?

You can only configure WiFi and use the USB file transfer on Kindle's OS; you can't use KOReader for that.
But, you probably only have to do that once.

A few ideas (apart from the obvious "start reading books"). See [my other note](https://blog.alifeee.net/notes/jailbreaking-your-kindle-and-installing-ko-reader/#acquiring-books) for more information.

- get some books
- set some custom lockscreen backgrounds
- Play with KOReader
