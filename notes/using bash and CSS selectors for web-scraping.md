---
date: 2024-11-08
title: using bash and CSS selectors for web-scraping
tags:
  - bash
  - web-scraping
---
I do a lot of web scraping.

I also love bash.

I have used things like Python's [BeautifulSoup](https://beautiful-soup-4.readthedocs.io/en/latest/) before, but it feels like overkill when most of the time I only want to "get the value of a specific item on a webpage".

I've been trying to find some nice tools for querying HTML on the terminal, and I've found some nice tools from `html-xml-utils`, that let you pipe HTML into `hxselect` and use CSS selectors to find content.

Here are some annotated examples with this website:

## setup

```bash
# install packages
sudo apt install html-xml-utils jq
# set URL
url="https://blog.alifeee.co.uk/notes/"
# save site to variable, normalised, otherwise hxselect complains about invalid HTML
#   might have to manually change the HTML so it normalises nicely
site=$(curl -s "${url}" | hxnormalize -x -l 240)
```

## `hxselect`

`hxselect` is the main tool here. Run `man hxselect` or visit <https://manpages.org/hxselect> to read about it. You provide a CSS selector like `main > p .class`, and you can provide `-c` to output only the content of the match, and `-s <sep>` to put `<sep>` in between each match if there are multiple matches (usually a newline `\n`).

## Getting a single thing

```bash
# get the site header
$ echo "${site}" | hxselect -c 'header h1'
 notes by alifeee <img alt="profile picture" src="/notes/og-image.png"></img> <a class="source" href="/notes/feed.xml">rss</a>

# get the links of all images on the page
$ echo "${site}" | hxselect -s '\n' -c 'img::attr(src)'
/notes/og-image.png

# get a list of all URLs on the page
$ echo "${site}" | hxselect -s '\n' -c 'a::attr(href)' | head
/notes/feed.xml
/notes/
https://blog.alifeee.co.uk
https://alifeee.co.uk
https://weeknotes.alifeee.co.uk
https://linktr.ee/alifeee
https://github.com/alifeee/blog/tree/main/notes
/notes/
/notes/tagged/bash
/notes/tagged/scripting

# get a specific element, here the site description
$ echo "${site}" | hxselect -c 'header p:nth-child(3)'
 here I may post some short, text-only notes, mostly about programming. <a href="https://github.com/alifeee/blog/tree/main/notes">source code</a>.
```

## Getting multiple things

```bash
# save all matches to a variable results
#   first with sed we replace all @ (choose any character)
#   then we match our selector, separated by @
#   we remove "@" first so we know they are definitely our separators
results=$(
  curl -s "${url}" \
    | hxnormalize -x -l 240 \
    | sed 's/@/(at)/g' \
    | hxselect -s '@' 'main article'
  )
# this separtes the variable results into an array "a", using the separator @
mapfile -d@ a <<< "${results}"; unset 'a[-1]'
# to test, run `item="${a[1]}"` and copy the commands inside the loop
for item in "${a[@]}"; do
  # select all h2 elements, remove spaces before and links afterwards
  title=$(
    echo "${item}" \
      | hxselect -c 'h2' \
      | sed 's/^ *//' \
      | sed 's/ *<a.*//g'
  )
  # select all "a" elements inside ".tags" and separate with a comma, then remove final comma
  tags=$(
    echo "${item}" \
      | hxselect -s ', ' -c '.tags a' \
      | sed 's/, $//'
  )
  # separate the tags by ",", and print them in between square brackets so it looks like json
  tags_json=$(
    echo "${tags}" \
      | awk -F', ' '{printf "["; fs=""; for (i=1; i<=NF; i++) {printf "%s\"%s\"", fs, $i; fs=", "}; printf "]"}'
  )
  # select the href of the 3rd "a" element inside the "h2" element
  url=$(
    echo "${item}" \
      | hxselect -c 'h2 a.source:nth-of-type(3)::attr(href)'
  )
  # put it all together so it looks like JSON
  #   must be very wary of all the quotes - pretty horrible tbh
  echo '{"title": "'"${title}"'", "tags": '"${tags_json}"', "url": "'"${url}"'"}' | jq
done
```

The output of the above looks like

```bash
{"title":"converting HTML entities to &#x27;normal&#x27; UTF-8 in bash","tags":["bash","html"],"url":"#updating-a-file-in-a-github-repository-with-a-workflow"}
{"title":"updating a file in a GitHub repository with a workflow","tags":["github-actions","github","scripting"],"url":"/notes/updating-a-file-in-a-git-hub-repository-with-a-workflow/#note"}
{"title":"you should do Advent of Code using bash","tags":["advent-of-code","bash"],"url":"/notes/you-should-do-advent-of-code-using-bash/#note"}
{"title":"linting markdown from inside Obsidian","tags":["obsidian","scripting","markdown"],"url":"/notes/linting-markdown-from-inside-obsidian/#note"}
{"title":"installing nvm globally so automated scripts can use node and npm","tags":["node","scripting"],"url":"/notes/installing-nvm-globally-so-automated-scripts-can-use-node-and-npm/#note"}
{"title":"copying all the files that are ignored by .gitignore in multiple projects","tags":["bash","git"],"url":"/notes/copying-all-the-files-that-are-ignored-by-gitignore-in-multiple-projects/#note"}
{"title":"cron jobs are hard to make","tags":["cron"],"url":"/notes/cron-jobs-are-hard-to-make/#note"}
{"title":"ActivityPub posts and the ACCEPT header","tags":["ActivityPub"],"url":"/notes/activity-pub-posts-and-the-accept-header/#note"}
```

## Other useful commands

A couple of things that come up a lot when you do this kind of web scraping are:

- removing leading/trailing spaces - pipe into `| sed 's/^ *//' | sed 's/ *$//'`
- removing new lines - pipe into `| tr -d '\n'`
- replacing new lines with spaces - pipe into `| tr ' ' '\n'`
- decoding HTML entities - pipe into `php -r 'while ($f = fgets(STDIN)){ echo html_entity_decode($f); }'` or replace manually with `sed` (see <https://blog.alifeee.co.uk/notes/converting-html-entities-to-normal-utf-8-in-bash/#note>)
