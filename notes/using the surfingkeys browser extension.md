---
title: using the surfingkeys browser extension
date: 2025-03-05
tags:
- browser-extension
- surfingkeys
- websites
---
[Surfingkeys](https://github.com/brookhong/Surfingkeys) is a cool browser extension.

It does many, many things, but I mainly use it to click links and browser between webpages without using a mouse.

With it installed, I can visit a webpage like:

```text
Celeste is a 2018 platform game https://en.wikipedia.org/wiki/Platform_game…

…developed and published by Indie studio Maddy Makes Games https://en.wikipedia.org/wiki/Maddy_Makes_Games.

The player controls Madeline, a young woman with anxiety and depression who endeavors to…

…climb Celeste Mountain https://en.wikipedia.org/wiki/Mount_Celeste.

During her climb, she encounters several characters, including a personification of her self-doubt named Badeline, who attempts to stop her from reaching the mountain's summit.
```

…press `f`, and all the clickable links are highlighted with letters (here "a", "s", and "d"). I can then press these letters to "click" the corresponding links.

```text
Celeste is a 2018 platform game https://en.wikipedia.org/wiki/Platform_game…
                                                       a
…developed and published by Indie studio Maddy Makes Games https://en.wikipedia.org/wiki/Maddy_Makes_Games.
                                                                                    s
The player controls Madeline, a young woman with anxiety and depression who endeavors to…

…climb Celeste Mountain https://en.wikipedia.org/wiki/Mount_Celeste.
                                                 d
During her climb, she encounters several characters, including a personification of her self-doubt named Badeline, who attempts to stop her from reaching the mountain's summit.
```

It is super neat.

It has a lot of other features that I don't use; lots of them are based on [Vim](https://www.vim.org/) keybindings (which I don't use). But, the things I do use are:

- `f` to highlight all clickable elements and links, then the corresponding highlights to click them
- `i` which is the same as `f` but only for `input`s like text forms
- `gu` (go up one subdirectory) or `gs` (go to page source) or `g#` (go to page without hashlink) to modify the URL
- `ya` to highlight all links on the page, and the shown keys copy the links
- `zv` to select an element, to copy it with `CTRL+V` (this enters `Vim` cursor/select mode, which I've not used, so mainly just confuses me)

Sometimes Surfingkeys interferes with the keybindings or JavaScript of a website, and makes it weird. These times, I turn it off with `Alt + s`.

Overall, I find it pretty neat.
