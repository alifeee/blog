---
title: a Nautilus script to create blank files in a folder
date: 2024-12-13
tags:
- nautilus
- scripting
---
I moved to Linux [time ago]. One thing I miss from the Windows file explorer is how easy it was to create text files.

With Nautilus (Pop!\_OS' default file browser), you can create templates which appear when you right click in an empty folder (I don't remember where the templates file is and I can't find an obvious way to find out, so... search it yourself), but this doesn't work if you're using nested folders.

i.e., I use this view a lot in Nautilus the file explorer, which is a tree-view that lets you expand folders instead of open them (similar to most code editors).

```bash
.
├── ./5.3.2
│   └── ./5.3.2/new_file
├── ./6.1.4
├── ./get_5.3.2.py
└── ./get_6.1.4.py
```

But in this view, you can't "right click on empty space inside a folder" to create a new template file, you can only "right click the folder" (or if it's empty, "right click a strange fake-file called (Empty)").

So, I created a script in `/home/alifeee/.local/share/nautilus/scripts` called `new file (folder script)` with this content:

```bash
#!/bin/bash
# create new file within folder (only works if used on folder)
# notify-send requires libnotify-bin -> `sudo apt install libnotify-bin`

if [ -z "${1}" ]; then
  notify-send "did not get folder name. use script on folder!"
  exit 1
fi

file="${1}/new_file"

i=0
while [ -f "${file}" ]; do
  i=$(($i+1))
  file="${1}/new_file${i}"
done

touch "${file}"

if [ ! -f "${file}" ]; then
  notify-send "tried to create a new file but it doesn't seem to exist"
else
  notify-send "I think I created file all well! it's ${file}"
fi
```

Now I can right click on a folder, click "scripts > new file" and have a new file that I can subsequently rename. Sweet.

I sure hope that in future I don't want anything slightly more complicated like creating multiple new files at once...
