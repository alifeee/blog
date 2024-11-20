---
title: how I organise my notes (project-active-resource-archive)
date: 2024-11-20T01:00:00
tags:
  - obsidian
  - note-taking
---
I make a lot of notes¹. Currently, I use [Obsidian](https://obsidian.md/) on my computer, laptop, and phone, and I use [Syncthing](https://syncthing.net/) to synchronise all the notes between my devices. I like making notes because if I write something down, I don't have to worry about forgetting it, and (maybe backwardsly) I can forget it with ease... because I know where I can go to remember it. It frees up my brain a lot. No thoughts. Head empty.

¹ At time of writing I have 1018 notes (result of `find . -type f -name "*.md" | wc -l`) (the Notion -> Obsidian export makes all database items into notes, so this is quite inflated by a bunch of empty "database" notes).

I used to use [Notion](https://www.notion.so/) but I realised: I would prefer to be making plaintext notes; I didn't like what they were doing with AI; the app was quite slow to use; and I had to be online (a lot of the time) to use it. With Obsidian, I can write notes offline, and they are only ever stored on my own devices, and synced between them.

I have four folders in the root folder of my obsidian, these are

```text
1-Project
2-Active
3-Resource
4-Archive
```

This layout is called "PARA" (Project Active Resource Archive). I found out about it several years ago; I don't remember where.

The theory (or how I use it) is that you organise notes like:

- project: things you are doing that can be completed
- active: things that you are doing that are ongoing
- resource: notes with information
- archive: put anything from the above three categories here when completed

So, as an example, my current:

- project notes are: `BarCamp 13`, `bereal video`, `blummit`, `Chaos Computer Congress`, `clubcards`, `De-Googlification`, `Discourse Forum`, `Incomings & outgoings on website`, `lipu tenpo issue sending`, `local archive of websites`, `Mum's watch`, `personal website edits`, `polarising lens`, `RSS random picker`, `sublet`, `welcome to sheffield events`, `xmas gifts`, each of which I will either complete or abandon and move it to the archive
- active notes are: `Active` (a special note I use to keep daily to-do lists), `Backup Day`, `Craft Night`, `freelancing`, `hackspace month notes`, `linux problems`, `lipu tenpo zine printing`, `news servers`, `OpenTechCalendar`, `Weeknotes`, which are all things I do semi-regularly (e.g., monthly)
- resource notes are: `Copy about myself`, `Hitchhiking`, `Keys`, `My Bike`, `places I have a profile picture`, `random things to fill a few hours or day`, `Raspberry Pi`, `Things wot I done`, `To Attend`, `To Borrow`, `To Celebrate`, `To Consume`, `To Create`, `To Purchase`, `To Treasure`, `What's the best country`, which are mostly where I put stuff so that I can forget it from my brain and have no thoughts
- archive notes are (a subset because this contains a lot of notes, mostly old project notes): `air quality monitor`, `repair cafe`, `gspread`, `tiny games`, `RingGram`, `To Eat`, `Github random repo picker`, `Layout with LaTeX`, `CSS Naked Day`, `website night`, `river walk`, `GMTK gamejam 2`, `Fireside housing cooperative`, `Volunteering at BHF`, `hackspace font workshop`, and many more...

There are many ways to organise notes, but I like this way because I can always pretty obviously fit a note into one of the three categories, so I don't have to constantly move notes around, or think too much about where they belong. Also, every few years it feels pretty great to empty out the `project` notes folder (an impossible task).
