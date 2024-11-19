---
title: turning my clipboard into a blockquote on Linux
date: 2024-11-19
tags:
  - scripting
  - linux
  - markdown
---
I like markdown. I use Obsidian a lot, and write a lot in GitHub issues. Something useful I usually do is quote other people's words, so in markdown it would look like:

```md
The Met office said

> it will definitely snow tonight
>
> like... 100%
```

I found that I can use a command `xclip` to get/set my clipboard on Linux, and I use a lot of `sed` to do word replacement, so I realised I could copy the text

```text
it will definitely snow tonight

like... 100%
```

and then run this command in my terminal (`xclip` gets/sets the clipboard, `sed` replaces `^` (the start of each line) with `> `)

```bash
xclip -selection c -o | sed "s/^/> /" | xclip -selection c
```

which would get my clipboard, replace the start of each line with a quote, and set the clipboard, setting the clipboard to:

```text
it will definitely snow tonight

like... 100%
```

I've set aliases for these commands so I can use them quickly in my terminal as:

```bash
alias getclip='xclip -selection c -o'
alias setclip='xclip -selection c'
alias quote='getclip | sed "s/^/> /" | setclip'
```

but also I created a keyboard shortcut in Gnome, `CTRL + SUPER + Q`, which will quote my clipboard. I had to set the shortcut to run `bash -c 'xclip -selection c -o | sed "s/^/> /" | xclip -selection c'` as I don't think pipes sit well in shortcuts.

But now I can really easily...

> quooooooooote
