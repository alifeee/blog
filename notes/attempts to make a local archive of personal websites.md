---
title: attempts to make a local archive of personal websites
date: 2024-12-11
tags: personal-websites, scripting
---
I wanted to make a local archive of personal websites. This is because in the past I have searched my bookmarks for things like [fonts](https://alifeee.co.uk/font-talk/#/18) to see how many of them mention, talk about, or link to things about fonts. When I did this, I only looked at the homepages, so I've been wondering about a way to search a list of entire sites since.

I came up with the idea of downloading the HTML files for my bookmarked sites, and using `grep` and...

<details><summary>...other tools...</summary>

from <https://merveilles.town/@akkartik>

> Here are 2 scripts that search under the current directory. I've been using `search` for several years, and just cooked up `lua_search`.
>
> `search` is a shell script. Doesn't support regular expressions; it can't pass in quoted args to nested commands.
>
> `lua_search` should support Lua patterns. It probably still has some bugs.
>
> E.g. `lua_search '%f[%w]a%f[%W]'` is like `grep '\<a\>'`.
>
> I think I'll make another version in Perl or something, to support more familiar regular expressions.
>
> Oh, forgot attachments:
>
> <https://paste.sr.ht/~akkartik/9136bfabd0143733a040a8fe6f909c1e5d3b9db6>
>
> Also, `lua_search` doesn't support case-insensitivity yet. `search` tries to be smart: if you pass in a pattern with any uppercase letters it's treated as case-sensitive, but if it's all lowercase it's treated as case-insensitive. `lua_search` doesn't have these smarts yet,
> Also, `lua_search` doesn't support case-insensitivity yet. search` tries to be smart: if you pass in a pattern with any uppercase letters it's treated as case-sensitive, but if it's all lowercase it's treated as case-insensitive. `lua_search` doesn't have these smarts yet, and all patterns are currently case-sensitive.and all patterns are currently case-sensitive.

## search

```zsh
#!/usr/bin/zsh
# Search a directory for files containing all of the given keywords.

DIR=`mktemp -d`

ROOT=${ROOT:-.}
# generate a list of files on stdout
echo find `eval echo $ROOT` -type f -print0  \> $DIR/1    >&2
find `eval echo $ROOT` -type f -print0  > $DIR/1

INFILE=1
for term in $*
do
  # filter file list for one term
  OUTFILE=$(($INFILE+1))
  if echo $term |grep -q '[A-Z]'
  then
    echo cat $DIR/$INFILE  \|xargs -0 grep -lZ "$term"  \> $DIR/$OUTFILE    >&2
    cat $DIR/$INFILE  |xargs -0 grep -lZ "$term"  > $DIR/$OUTFILE
  else
    echo cat $DIR/$INFILE  \|xargs -0 grep -ilZ "$term"  \> $DIR/$OUTFILE    >&2
    cat $DIR/$INFILE  |xargs -0 grep -ilZ "$term"  > $DIR/$OUTFILE
  fi
  INFILE=$OUTFILE
done

# get rid of nulls in the outermost call, and sort for consistency
cat $DIR/$INFILE  |xargs -n 1 -0 echo  |sort
```

```lua
#!/usr/bin/lua

local input = io.popen('find . -type f')

-- will scan each file to the end at most once
function match(filename, patterns)
  local file = io.open(filename)
  for _, pattern in ipairs(patterns) do
    if not search(file, pattern) then
      return false
    end
  end
  file:close()
  return true
end

function search(file, pattern)
  if file:seek('set') == nil then error('seek') end
  for line in file:lines() do
    if line:match(pattern) then
      return true
    end
  end
  return false
end

for filename in input:lines() do
  filename = filename:sub(3)  -- drop the './'
  if match(filename, arg) then
    print(filename)
  end
end
```

</details>

...to search the sites.

## initial attempt

I found you can use `wget` to do exactly this (download an entire site), using a cacophony of arguments. I put them into a script that looks a bit like:

```bash
#!/bin/bash
domain=$(
  echo "${1}" \
    | sed -E 's/https?:\/\///g' \
    | sed 's/\/.*//'
)
wget \
     --recursive \
     --level 0 \
     -e --robots=off \
     --page-requisites \
     --adjust-extension \
     --span-hosts \
     --convert-links \
     --domains "${domain}" \
     --no-parent \
     "${1}"
```

## modifications/tweaks

...and set it off. I found several things, which made me modify the script in several ways (mainly I saw these by watching one specific URL take a lot of time to scrape):

- some sites had a lot of media, so I searched the web and added a file exclude
- some sites just had *so many* pages, like thousands of fonts, or daily puzzles, or just a very detailed personal wiki, so I added a site disable so I could skip specific URLs
- as I was re-running the script a lot, and didn't want to provide excess traffic (it's worth noting that `wget` respects `robots.txt`) I added `-N` to `wget` so it didn't download things that hadn't been modified (with the `Last-Modified: ...` header)
- a lot of sites didn't have a `Last-Modified: ...` header, so I made the script skip sites that had a directory already created for them (which I then had to manually delete if the site had only half-downloaded)
- some sites had very slow connections (not <https://blinry.org/> (and others), which was blazingly fast) which made the crawl seem like it would take ages

At this point (after not much effort, to be honest), I gave up. My final script was:

```diff
#!/bin/bash
domain=$(
  echo "${1}" \
    | sed -E 's/https?:\/\///g' \
    | sed 's/\/.*//'
)

+ skip="clofont.free.fr, erich-friedman.github.io, kenru.net, docmeek.com, brisray.com, ihor4x4.com"
+ if [[ "${skip}" =~ ${domain} ]]; then
+   echo "skipping ${domain}"
+   exit 1
+ fi

+ if [ -d "${domain}" ]; then
+   echo "skipping... folder ${domain} already exists"
+   exit 1
+ fi

+ echo "wget ${1} with domain ${domain}"

wget \
+    -N \
     --recursive \
     --level 0 \
     -e --robots=off \
     --page-requisites \
     --adjust-extension \
     --span-hosts \
     --convert-links \
     --domains "${domain}" \
     --no-parent \
+    --reject '*.js,*.css,*.ico,*.txt,*.gif,*.jpg,*.jpeg,*.png,*.mp3,*.pdf,*.tgz,*.flv,*.avi,*.mpeg,*.iso,*.ppt,*.zip,*.tar,*.gz,*.mpg,*.mp4' \
+    --ignore-tags=img,link,script \
+    --header="Accept: text/html" \
     "${1}"
```

If I want to continue in future (searching a personal list of sites), I may find another way to do it, perhaps something similar to Google's search syntax `potato site:http://site1.org site:http://site2.org`, or perhaps I can create a custom search engine filter with DuckDuckGo/Kagi/etc that lets me put a custom list of URLs in. Who's to say. Otherwise, I'll also just continue sticking search queries in the various alternative/indie search engines like those on <https://proto.garden/blog/search_engines.html>.
