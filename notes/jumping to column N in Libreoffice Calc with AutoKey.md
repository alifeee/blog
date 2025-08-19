---
title: jumping to column N in Libreoffice Calc with AutoKey
date: 2025-08-19
tags:
  - libreoffice
  - calc
  - shortcuts
  - hotkeys
  - scripting
---
I am a director of [Sheffield Hackspace](https://www.sheffieldhackspace.org.uk/) and part of my role is to keep track of the membership.

It's currently via a spreadsheet where the membership payments come via bank transactions, and I match them up to the sheet. This involves a lot of finding names with "CTRL+F", and then changing a specific column.

I'd like to be able to "jump to column N", but I couldn't find an appropriate shortcut (I would love something like "Alt" then press "N", but alas).

After some web-searching, I found [AutoKey](https://github.com/autokey/autokey), a Linux program that sounds like a colder version of [AutoHotKey](https://www.autohotkey.com/). I installed it, and it worked great. I'd tried to use `xdotool` to send key commands before, but it didn't work when set as a keyboard shortcut.

What I wanted to do using the keyboard was:

- open the cell "Name Box" (the bit that says "A59" or "H14")
- change the first letter to an "N" (i.e., turn "A57" into "N57")
- press Enter to go to that cell

After reading the the [documentation](https://autokey.github.io/api.html), I figured a script to do this:

```bash
import time
keyboard.send_keys("<ctrl>+<shift>+T")
time.sleep(0.25)
keyboard.send_keys("<left>")
keyboard.send_keys("<shift>+N")
keyboard.send_key("<delete>")
keyboard.send_key("<enter>")
```

(the 0.25 second wait is to let LibreOffice Calc recognise the shortcut and move the cursor to the Name Box)

…and used the GUI to set the script to run whenever I typed "Ctrl+F8".

It worked great :]

I see myself using this program more into the future.
