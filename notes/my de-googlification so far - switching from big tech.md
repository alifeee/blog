---
title: my de-googlification so far - switching from big tech
date: 2025-02-22
tags:
- software
- ethical
- big-tech
- obsidian
- email
- syncthing
- openstreetmap
- linux
- github
- android
---
I think it's a great idea to use ethical alternatives to free software made by mega-corporations with profit-maximising motives.

To that end, I had a push to replace lots of things I used (most because they were the default, or because I'd used them a long time), mainly using the great website <https://switching.software/> (I also know of <https://european-alternatives.eu/alternatives-to> but haven't used it as much.)

I replaced some things. I didn't manage to replace everything. Change is, and should be, incremental.

Here is a list, mostly copied from my notes, of what I replaced, and what I didn't. The title of each item is verbatim copied from my notes, and I have added context underneath each.

## Google

Gmail -> see below
: see ["email"](#email) below

Drive -> Cryptpad/Nextcloud or Syncthing
: I replaced my Google Drive usage with a weird setup where I use [Syncthing](https://syncthing.net/) to sync several folders between [my devices](https://blog.alifeee.co.uk/notes/names-for-all-my-computing-devices/), and to share large files I either upload them to my server (bad advice, technical knowledge needed), or I upload them to [Wormhole](https://wormhole.app/) where they get deleted after 24 hours. I don't have much need to share files for a long time, but I'd consider Nextcloud.

Photos -> ???
: I thought about this a lot, but Google Photos is too good for me. Maybe another day.

Calendar -> ???
: I installed [Tasks](https://tasks.org/) and [Fossify Calendar](https://play.google.com/store/apps/details?id=org.fossify.calendar). I tried to use them, but in the end, Google Calendar won out, and I still use it.

Keep -> ???
: I didn't really replace keep, I just started using it less. I put most of my notes in Obsidian, but I still have it installed. Sometimes, when I want to take a really quick note, I'll put it in there.

Maps -> OpenStreetMap
: I still use Google Maps, but I've been using OpenStreetMap more recently, and while interrailing last month, I mainly used [OsmAnd](https://osmand.net/) because of its great offline maps. Day-to-day, I still use Google Maps, because it has most-or-every business, and websites, and opening times, which OSM tries but just doesn't (yet…) have the data for.

generic Android apps -> [Fossify](https://play.google.com/store/apps/dev?id=7297838378654322558)
: I found [Fossify](https://play.google.com/store/apps/dev?id=7297838378654322558) who make "generic apps" for Android like the gallery, file explorer, contacts, calendar, messages, notes, etc. I haven't used many of them, apart from the file explorer, which I like.

## Facebook

Facebook -> delete it
: my suggested replacement here was "delete it". I haven't. Sometimes I open it for "mindless phone downtime", but I have a 5 minute daily app timer on it, so not for long.

Instagram -> PixelFed
: I tried to import my Instagram export into Pixelfed, but it wouldn't work when I deleted my DMs from the files (as these are not needed to import only posts). I raised an issue, and left it at that. Since then, PixelFed has gotten quite a lot more popular. I haven't tried again recently, but I find the main developer of PixelFed a little weird on Mastodon. That means nothing, but… I just haven't tried again.

Messenger/WhatsApp -> Signal
: I am slowly convincing friends and group chats to move to Signal. It goes well.

## Microsoft

OneDrive -> Cryptpad/Nextcloud or Syncthing
: see [Google](#google) Drive above. I have also stopped using OneDrive.

Windows -> Linux <https://waldyrious.net/computefreely/>
: That site is good. This was probably the biggest switch in this list. I installed Linux in increments, first on my PC, then on my laptop, then on my Gaming PC, which ends up with Steam's Proton able to play anything I could have played on Windows! I'm loving it. I have [Pop!\_OS](https://github.com/alifeee/pop-os-backup), backed up in a [custom way](https://github.com/alifeee/pop-os-backup).

GitHub -> sourcehut, codeberg, gitlab, etc
: I haven't started on this one, even though I should. I have so many things on GitHub, and I feel as if I create a new repository every week. Combine that with all the GitHub actions I use, and I say rightfully that Microsoft has me. It's not what I want, but it's what I have.

## Android

Android -> [LineageOS](https://lineageos.org/) or [GrapheneOS](https://grapheneos.org/) or [CalyxOS](https://calyxos.org/) ([comparison](https://eylenburg.github.io/android_comparison.htm))
: I looked into this one a lot, and talked to a few people I knew on Mastodon for advice. Ultimately, I discovered people's opinions and experiences that it was neat, but there were enough compatibility problems to be annoying. Particularly, that banking apps would semi-regularly break on non-stock-Android OSes, and that the banking app companies would say "we don't care". I use a very digital banking app where I only keep between £0 and £50 on my card, and it would be very annoying for me to not shuffle money around easily. I already have boneless Wednesday. I did enjoy [installing LineageOS on an old phone](https://blog.alifeee.co.uk/notes/flashing-an-old-android-phone-with-lineage-os/) though.

## The rest

Notion -> Obsidian
: Notion is classic lock-in. It was also a place where I had a *lot* of notes. I made an export, downloaded Obsidian (which, sadly, is still not open source - but your notes are simply text files, so I hazard if it were to go weird, there would be many Open Source pop-ups, or I could use VSCodium, etc.), and imported my export. It worked pretty well. Most files had double spaces where I only had single in Notion, and the databases ended up pretty weird (as loads of flat files), which made my Notion spider diagram look super weird. Anyway, I love Obsidian now. I sync my vault between my devices with Syncthing, and when there are editing conflicts, I use a [great plugin](https://github.com/friebetill/obsidian-file-diff).

Spotify -> <https://codeberg.org/swiso/website/issues/26>
: Several months ago I was removed from a Spotify Family plan that I was on, so stopping my Spotify usage was pretty easy. I didn't resubscribe, and I mainly listen to the radio now (BBC Radio 6 Music ! the best station !). Sometimes, I miss being able to choose what I'm listening to. I tried to get SoundCloud, but it didn't have as much music on as I wanted (or it was restricted to a "super Pro" version). However, I do want it back. I might re-subscribe soon.

DNS Registrar -> <https://dnsimple.com/> <https://www.namecheap.com/> <https://domainr.com/> <https://www.namesilo.com/> (API) <https://www.name.com> <https://desec.io/>
: to be honest, mine wasn't an evil corporation, I just wanted a new one (I was using [123-reg](https://www.123-reg.co.uk/) and it's super annoying to configure my DNS settings). It was difficult to web-search for this, and I ended up using [Porkbun](https://porkbun.com/), which isn't even on the list above.

## email

Format-break. I spent a long time looking at options, and ended up finding a bunch. Here was a list I had:

- <https://proton.me/mail>
- <https://tuta.com/>
- <https://posteo.de/en>
- <https://www.fastmail.com/>
- <https://soverin.com/product/pricing>
- <https://mailbox.org/en/>
- <https://riseup.net/en/email>
- <https://cloud.disroot.org/login>

I wanted to use a custom domain (`alifeee.net`), I wanted to use wildcard domains (`anyone@alifeee.net`), I wanted to use maybe a few custom domains (`alfierenn.dev`), I wanted to use IMAP and SMTP (so I could view my emails with [Thunderbird](https://www.thunderbird.net/)). Turns out those requirements were restrictive to make a lot of the above list bad options, which left me Proton or Mailbox.org.

There was a problem with Proton which I can't remember, so I am using Mailbox.org. I like it. Free your email.

## The End

I started the push maybe six months ago. Maybe I did OK, maybe I didn't. But, I certainly made *some* changes, and I think that's good.

Why not take a look at <https://switching.software/> and think about whether you are fine with the number of tentacles that American Big-Tech companies have in your life.
