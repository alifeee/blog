---
date: 2024-11-05
title: linting markdown from inside Obsidian
tags:
  - obsidian
  - scripting
  - markdown
---

I like Obsidian. I started using it recently instead of Notion. It is very nice.

The fact that it is static files is nice. The fact that those files are markdown is even nicer.

I sync it to all my devices with Syncthing. Sometimes there are sync conflicts, but <https://github.com/friebetill/obsidian-file-diff> makes solving that super easy.

Anyway, I've been writing these notes in Obsidian. I have then been copying and pasting the content into <https://dlaa.me/markdownlint/> to find problems with my Markdown formatting. It's mainly when I forget to wrap links in `<>` as this makes them not render as HTML links - I sort of like this as you (my automatic tool) shouldn't try and decide what is and isn't a link, but also maybe you should because you can probably recognise them pretty well with a very established regex by now.

Anyway, I found an Obsidian extension which lets you specify shell commands <https://github.com/Taitava/obsidian-shellcommands> that you can run via the command palette. This seems super neat - I can do ANYTHING now.

Anyway, I installed it and made a command to lint the current markdown file. I had to [install `npm` globally](https://blog.alifeee.net/notes/installing-nvm-globally-so-automated-scripts-can-use-node-and-npm/) because it wasn't working when being called from the Obsidian script, and then I made this command to run the lint.

First install the [`markdownlint`](https://github.com/DavidAnson/markdownlint) CLI:

```bash
npm install -g markdownlint-cli
```

The command is:

```bash
(cd {{folder_path:absolute}}; source /usr/alifeee/.nvm/nvm.sh && nvm use 20 && markdownlint {{file_name}} --disable MD013 && echo "no lint issues!")
```

I disabled MD013 which is the insane rule which wants you to have loads of line breaks per paragraph (I prefer my paragraph to be one really really long line please).

It's not perfect (the output is just in an ugly pop up window), but it is nice to run it locally.

Next... perhaps automatic uploading of notes from Obsidian, and I won't even have to open <https://github.com/alifeee/blog/tree/main/notes> to add a note to this site... dangerous...

(p.s., I managed to write this without any lint issues ;] )
