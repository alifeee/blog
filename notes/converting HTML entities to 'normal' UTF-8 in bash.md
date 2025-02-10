---
date: 2024-11-08
title: converting HTML entities to 'normal' UTF-8 in bash
tags:
  - bash
  - html
---
I do a fair amount of web scraping, and you come across a lot of HTML entities. They're the things that look like `&gt;`, `&nbsp;`, `&amp;`.

See <https://developer.mozilla.org/en-US/docs/Glossary/Character_reference>

Naturally, you usually want to turn them back into characters, usually UTF-8. I came across a particularly gnarly site that had some normal HTML entities, some rare (Unicode) ones, and also some special characters that weren't encoded at all. From it, I made file to test HTML entity decoders on. Here it is, as `file.txt`:

```text
Children&#39;s event,
Wildlife &amp; Nature,
peddler-market-n&#186;-88,
Artists’ Circle,
surface – Breaking
woodland walk. (nbsp)
Justin Adams & Mauro Durante
```

I wanted to find a way to convert the entities (i.e., decode `&#39;` `&amp;` `&#186;`, but NOT decode `’` `–` ` ` (nbsp) `&`) with a single command I could put in a bash pipe. I tried several contenders:

## perl

I'd used this one before in a script scraping an RSS feed: <https://github.com/alifeee/openbenches-train-sign/blob/a29cc24df919c67809f84586f9e0a90aed6ea3cf/transformer/full.cgi#L49>, but on this input, it fails as it doesn't decode the symbol `º` (`U+00BA : MASCULINE ORDINAL INDICATOR` from <https://babelstone.co.uk/Unicode/whatisit.html>).

```bash
$ cat file.txt | perl -MHTML::Entities -pe 'decode_entities($_);'
Children's event,
Wildlife & Nature,
peddler-market-n�-88,
Artists’ Circle,
surface – Breaking
woodland walk. (nbsp)
Justin Adams & Mauro Durante
```

## recode

I found recode after some searching, but it failed as it tried to unencode things that were already unencoded.

```bash
$ sudo apt install recode
$ cat file.txt | recode html
Children's event,
Wildlife & Nature,
peddler-market-nº-88,
Artistsâ Circle,
surface â Breaking
woodland walk. (nbsp)
Justin Adams  Mauro Durante
```

## php

At first I used `html_specialchars_decode` which didn't work, but then I found `html_entity_decode`, which does the job perfectly. Thanks PHP.

```bash
$ cat file.txt | php -r 'while ($f = fgets(STDIN)){ echo html_entity_decode($f); }'
Children's event,
Wildlife & Nature,
peddler-market-nº-88,
Artists’ Circle,
surface – Breaking
woodland walk. (nbsp)
Justin Adams & Mauro Durante
```

The only thing I don't know how to do now is to make a bash function or alias so that I could write

```bash
cat file.txt | decodeHTML
```

instead of the massive `php -r 'while ($f = fgets(STDIN)){ echo html_entity_decode($f); }'`.

## Python

(2025-02-10 edit) I have also found a nice way to do this using the Python html library's `escape` and `unescape` (because that's what I had installed in [my workflow](https://github.com/alifeee/alifeee.github.io/tree/main/.github/workflows) and I couldn't be bothered to install PHP)

```bash
$ cat file.txt | python3 -c 'import sys;from html import unescape;print(unescape(sys.stdin.read()),end="")'
Children's event,
Wildlife & Nature,
peddler-market-nº-88,
Artists’ Circle,
surface – Breaking
woodland walk. (nbsp)
Justin Adams & Mauro Durante
```
