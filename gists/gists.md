# Why I like (GitHub) gists and a short tour through ones I have created

<word-count parent=".markdown-body"></word-count>

I like sharing code and instructions. Thus, I like gists.

1. [What are gists?](#what-are-gists)
2. [Why I like creating gists](#why-i-like-creating-gists)
   1. [I can share them with people](#i-can-share-them-with-people)
   2. [I can share them with myself in the future](#i-can-share-them-with-myself-in-the-future)
   3. [The ramblings of my existence can end up in the same place](#the-ramblings-of-my-existence-can-end-up-in-the-same-place)
3. [Why I like finding other people's gists](#why-i-like-finding-other-peoples-gists)
   1. [Someone else has probably done what I want to do before](#someone-else-has-probably-done-what-i-want-to-do-before)
4. [I could or should put things elsewhere (not on GitHub)](#i-could-or-should-put-things-elsewhere-not-on-github)
5. [My gists, or "the gist-list"](#my-gists-or-the-gist-list)
   1. [**BLOG POSTS**](#blog-posts)
      1. [1. how to start blogging](#1-how-to-start-blogging)
      2. [2. a hat blog](#2-a-hat-blog)
   2. [**JUST DATA**](#just-data)
      1. [**DATA I MANUALLY MADE**](#data-i-manually-made)
         1. [3. my spotify wrapped 2023](#3-my-spotify-wrapped-2023)
         2. [4. a toki pona word list](#4-a-toki-pona-word-list)
         3. [5. my vscode extension list](#5-my-vscode-extension-list)
      2. [**DATA THAT'S AUTOMATICALLY UPDATED**](#data-thats-automatically-updated)
         1. [6. my json resume](#6-my-json-resume)
         2. [7. my web bookmarks](#7-my-web-bookmarks)
   3. [**HOW-TOS**](#how-tos)
      1. [**THINGS I WANTED TO DO MULTIPLE TIMES**](#things-i-wanted-to-do-multiple-times)
         1. [8. how to generate and host a Factorio map](#8-how-to-generate-and-host-a-factorio-map)
         2. [9. how to download data from Toggl's api](#9-how-to-download-data-from-toggls-api)
         3. [10. reusable ffmpeg commands](#10-reusable-ffmpeg-commands)
         4. [11. how to make bar charts in bash](#11-how-to-make-bar-charts-in-bash)
         5. [12. how to make graphs in bash](#12-how-to-make-graphs-in-bash)
      2. [**THINGS THAT OTHER PEOPLE COULD WANT TO DO**](#things-that-other-people-could-want-to-do)
         1. [13. a script to remove all styles from an html file](#13-a-script-to-remove-all-styles-from-an-html-file)
         2. [14. common RSS extensions](#14-common-rss-extensions)
         3. [15. a script to combine Squarespace RSS feeeds](#15-a-script-to-combine-squarespace-rss-feeeds)
         4. [16. a script to convert font files to css styles](#16-a-script-to-convert-font-files-to-css-styles)
         5. [17. a script to convert gpl files to css styles](#17-a-script-to-convert-gpl-files-to-css-styles)
      3. [**HOW TO SET UP THINGS ON A LINUX SERVER**](#how-to-set-up-things-on-a-linux-server)
         1. [18. how to set up rsa encryption keys](#18-how-to-set-up-rsa-encryption-keys)
         2. [19. how to set up nginx](#19-how-to-set-up-nginx)
         3. [20. how to transfer folders over scp](#20-how-to-transfer-folders-over-scp)
         4. [21. how to run a program as a service with systemd](#21-how-to-run-a-program-as-a-service-with-systemd)
         5. [22. how to set up a mumble server](#22-how-to-set-up-a-mumble-server)
         6. [23. how to install ruby and jekyll on linux](#23-how-to-install-ruby-and-jekyll-on-linux)
         7. [24. how to set up ftp on linux](#24-how-to-set-up-ftp-on-linux)
6. [The end](#the-end)

## What are gists?

[GitHub Gists] are "some text on the Internet". Usually, people put code snippets or Markdown in them, and then can share a link to anyone. It's like [Pastebin] but without (explicit) ads. Here's [an example gist] and here's [the same on Pastebin].

Gists can be used for blog posts, or just to share copied text, or to host a single-branch version controlled script or code snippet. They are also often used to host data which is automatically updated from elsewhere, and can be referenced as the most up-to-date version of that data, for example by ideas like <https://jsonresume.org/>.

Anyone with a GitHub account can make a gist. It's a very easy way to share nicely formatted text (for example in Markdown), which is why it's the first - and most simple - thing I suggest in my ["how to blog" guide].

There are [good reasons][o kepeken ala GitHub] you may not want to support GitHub. There are other ways to share snippets, with [other gist tools], [Pastebin], and other options. However, a lot of other code- or text-sharing websites seem fleeting, have ads, and do not look as nice (honourable mention here to <https://wormhole.app/>, a website for sharing files that looks incredible.)

[GitHub Gists]: https://gist.github.com/
[Pastebin]: https://pastebin.com/
[an example gist]: https://gist.github.com/alifeee/586b92e21f912dde7f74cd498b7cbb56
[the same on Pastebin]: https://pastebin.com/i7U9KSEu
["how to blog" guide]: https://gist.github.com/alifeee/c857bfb45bfd260a9b9dd9c45e4f7478
[o kepeken ala GitHub]: https://liputenpo.org/toki/nanpa-tenpo/o-kepeken-ala-ilo-ike-ni/
[other gist tools]: https://github.com/thomiceli/opengist

## Why I like creating gists

I like creating gists because they make text easy to share with two groups of people. Those two groups are...

### I can share them with people

The first group of people is "other people", either specifically for someone, or just information or code I share a lot, so I like having a quick link to it. Gists I've made in this category include:

- [how to create a blog?](https://gist.github.com/alifeee/c857bfb45bfd260a9b9dd9c45e4f7478) - I share this one with people whenever they muse about blogging and talk about using some complicated- or expensive-sounding tool, to try and convince them that they need not take on such an undertaking, and can just "put text on the Internet".
- [Remove all CSS styles from HTML files with bash](https://gist.github.com/alifeee/75df204c2be3815806e1d4be47e54d08) - this is a bash script I wrote and shared for [CSS Naked Day 2024](https://css-naked-day.github.io/). There were lots of ways of removing styles for site-builders and site-backends, but none for pure HTML.
- [How to use Ruby and Jekyll on Linux](https://gist.github.com/alifeee/829344ed02efb0952e81fc35c445df18) - when I set up Jekyll to edit a website for the first time, it was really confusing, partly because I'd never used Ruby before.

### I can share them with myself in the future

The second group of people is really just one person, and they are "me in the future". Most of my usage of gists has been to remember how I did some specific thing with code or how I installed something. Writing it down in the first place help future me *a lot* to remember, because all I have to remember is in what context I did the thing, and then I can find out exactly how by reading the gist. Some examples of gists that have been very helpful to future- (well, now past-) me are:

- [How to setup RSA keys for automatic SSH login](https://gist.github.com/alifeee/2f4be232f6b9c4b384f4c020a5bc10a1) - I found cryptography and keys confusing for a long time. Writing down what I did helped me set it up and get more confident doing so in future.
- [Plot graphs using the terminal (bash)](https://gist.github.com/alifeee/2e1ea8ad5290a553316e715f658f1fd7) - I often `cat` data out to the terminal. It's nice to graph it. This is a way of doing so *in* the terminal, so doesn't require a UI library.
- [Common RSS URL extensions](https://gist.github.com/alifeee/8342d9677c436e2353233f68f34cfe19) - is what it says on the tin

### The ramblings of my existence can end up in the same place

I make a lot of random scripts. In another world, they would end up either buried in random repositories on GitHub, or buried in random folders on my computer or laptop. They would get lost.

Gists make it easy to paste a script somewhere, and then find it later, as they are all (I'm sure much to GitHub's enjoyment) in the same place.

## Why I like finding other people's gists

More than just being able to share my own code, I like gists because other people have the same ideas as me!

### Someone else has probably done what I want to do before

If I'd like to accomplish a small scripting task, understand something self-contained, or find a code snippet for a specific task, I often search for it on the web. Unfortunately, in our Lord's year 2024, pages and pages of whatever search I make are mostly AI garbage ([here][verge-ai] is an article I have not read to pretend to verify my point). One help here is independent search engines like [Marginalia Search] or [Wiby]. While they are fun for exploring a more indie version of the web, I also find adding `"site:gist.github.com"` to my web search often results in finding exactly what I want to do.

[verge-ai]: https://www.theverge.com/2023/6/26/23773914/ai-large-language-models-data-scraping-generation-remaking-web
[Marginalia Search]: https://search.marginalia.nu/
[Wiby]: https://wiby.me/about/

For example, here is a small list of gists from my Internet history that I've found to be useful recently (and as a by-product, an eye into my life and desires for the past several months).

- [Simple XSL boilerplate for styling Atom feeds](https://gist.github.com/andrewstiefel/57a0a400aa2deb6c9fe18c6da4e16e0f)
- [Git's Merge vs. Rebase vs. Squash](https://gist.github.com/mitchellh/319019b1b8aac9110fcfb1862e0c97fb)
- [CSS Train Departure board](https://gist.github.com/veltman/f2b2a06d4ffa62f4d39d5ebac5ceeef0)
- [Change End of Line Sequence from CRLF to LF to all files in a project](https://gist.github.com/tjsudarsan/f2bfe4c4d567243e302cf8ba40e1c7e5)
- [How to copy, read and write Paxton fobs and cards with an RFIDler](https://gist.github.com/natmchugh/18e82761dbce52fa284c87c190dc926f)
- [Simple Morse en- & decoding for Arduino](https://gist.github.com/madc/4474559)
- [Getting started with the D1 mini (ESP8266)](https://gist.github.com/carljdp/e6a3f5a11edea63c2c14312b534f4e53)
- [Globally install FFmpeg and convert video to GIF](https://gist.github.com/JaimeStill/8adb695ee46425f1ee9830357cd9c6bb)
- [RevealJS cheat sheet](https://gist.github.com/peeweek/55d6c2eb006d11c7da01fde974325f33)
- [Decoding Morse Code With JavaScript](https://gist.github.com/bennadel/9760604)
- [Make an issue on GitHub using API V3 and Python](https://gist.github.com/JeffPaine/3145490)
- [how to print Avery labels with only a .csv and a web browser](https://gist.github.com/kgodard/5072573)
- [how to make a Google Form → GitHub issue Google Apps Script](https://gist.github.com/bmcbride/62600e48274961819084)

## I could or should put things elsewhere (not on GitHub)

The existence of GitHub in the above has mainly been a sidenote. The main thing that excites me about gists is the collaborative nature of them. This is not something that GitHub must have control over, and indeed something that they probably *shouldn't* have control over.

I've been reading recently a lot about self- or community-hosted alternatives to different things like Git servers (like [sourcehut](https://sourcehut.org/)) and, I use [Mastodon](https://joinmastodon.org/) (talking of self-hosting, I'd like to find an instance that's not [mastodon.social](https://mastodon.social/)) a lot.

I could put my snippets on my website, or something more free. But, I haven't. Yet.

## My gists, or "the gist-list"

The list is long. I keep comments brief. I have categorised them as to my whims. The code blocks show either the full gist, or - if you see "`...`" - a snippet or section of it.

### **BLOG POSTS**

#### 1. [how to start blogging]

```md
# How to start blogging

You might not think you should blog. I think you should.

I like your thoughts! I want to be able to read them!

Here are some other reasons:

- [todepond's thoughts](https://www.todepond.com/wikiblogarden/art/blog/)
- [Max Böck's thoughts](https://mxb.dev/blog/seven-reasons-why-i-dont-write/)

At its simplest, a blog is "text on the Internet". With this in mind, my immediate reccomendation is [bear.blog](#using-bearblog), as it is super simple to set up, and you have text on the Internet, with no ads, and no nonsense.

Otherwise, here are some ways I know to share text on the Internet (listed in vague order of effort involved to set up/technical knowledge required to be learned).

## create text on the internet and link to it from elsewhere

for example on <https://gist.github.com>

...
```

<figcaption>

I created this for one person who asked me "how do I start a blog". Since I made it a gist, I have shared it with many people.

</figcaption>

#### 2. [a hat blog]

```md
I love hats

...
```

<figcaption>

This is a blog about hats.

</figcaption>

### **JUST DATA**

#### **DATA I MANUALLY MADE**

##### 3. [my spotify wrapped 2023]

```toml
# ...
[totals]
minutes = 60_724
songs = 7_309
genres = 151
artists = 4_391
[totals.longest_day]
date = "2023-7-08"
minutes = 861
# ...
```

<figcaption>

I started using [TOML](https://toml.io/en/) for lots of things around the same time Spotify Wrapped came out last year. It was fun to think of a way of putting it into TOML format. TOML is fun.

</figcaption>

##### 4. [a toki pona word list]

```bash
#...
cat words.txt | awk -F'[^a-zA-Z]' 'BEGIN {delete wds} { if (length($0) > 0 && length($0) < 10) { if (!($1 in wds)) {print $1; wds[$1]}  } }' > nimi-ale-pi-toki-pona.txt
#...
```

<figcaption>

I wanted a [toki pona](https://tokipona.org/) word list for something. I can't remember what, but it was probably [lipu tenpo](https://liputenpo.org/) related. I put the command and generated list into a gist because I spent some time tinkering with `awk` to create the command, and I was proud of it. You may spot that theme continuing on.

</figcaption>

##### 5. [my vscode extension list]

```json
{
  "name": "newprofile1",
  "extensions": "[{\"identifier\":{\"id\":\"bbenoist.doxygen\",\"uuid\":\"aab644b7-f446-4774-87fc-2cce8f0d5a4f\"}},{\"identifier\":{\"id\":\"cschlosser.doxdocgen\",\"uuid\":\"da7e26d5-d57c-4742-ab47-d77fb189e195\"},\"displayName\":\"Doxygen Documentation Generator\"},{\"identifier\":{\"id\":\"davidanson.vscode-markdownlint\",\"uuid\":\"daf8b44d-8aae-4da2-80c5-1f770219f643\"},\"displayName\":\"markdownlint\"},{\"identifier\":{\"id\":\"eamodio.gitlens\",\"uuid\":\"4de763bd-505d-4978-9575-2b7696ecf94e\"},\"displayName\":\"GitLens — Git supercharged\"},{\"identifier\":{\"id\":\"esbenp.prettier-vscode\",\"uuid\":\"96fa4707-6983-4489-b7c5-d5ffdfdcce90\"},\"displayName\":\"Prettier - Code formatter\"},{\"identifier\":{\"id\":\"formulahendry.auto-rename-tag\",\"uuid\":\"6e440e71-8ed9-4f25-bb78-4b13096b8a03\"},\"displayName\":\"Auto Rename Tag\"},{\"identifier\":{\"id\":\"github.copilot\",\"uuid\":\"23c4aeee-f844-43cd-b53e-1113e483f1a6\"},\"displayName\":\"GitHub Copilot\"},{\"identifier\":{\"id\":\"github.vscode-github-actions\",\"uuid\":\"04f49bfc-8330-4eee-8237-ea938fb755ef\"},\"displayName\":\"GitHub Actions\"},{\"identifier\":{\"id\":\"github.vscode-pull-request-github\",\"uuid\":\"69ddd764-339a-4ecc-97c1-9c4ece58e36d\"},\"displayName\":\"GitHub Pull Requests and Issues\"},{\"identifier\":{\"id\":\"jock.svg\",\"uuid\":\"4ae6dc82-7981-4f10-bd81-2d72aec37f39\"},\"displayName\":\"SVG\"},{\"identifier\":{\"id\":\"leonhard-s.python-sphinx-highlight\",\"uuid\":\"a0f17d96-c9f3-4ce4-92b7-27b8c936835b\"},\"displayName\":\"Python Sphinx Highlighter\"},{\"identifier\":{\"id\":\"mhutchie.git-graph\",\"uuid\":\"438221f8-1107-4ccd-a6fe-f3b7fe0856b7\"},\"displayName\":\"Git Graph\"},{\"identifier\":{\"id\":\"ms-python.black-formatter\",\"uuid\":\"859e640c-c157-47da-8699-9080b81c8371\"},\"displayName\":\"Black Formatter\"},{\"identifier\":{\"id\":\"ms-python.pylint\",\"uuid\":\"8dc47276-5882-4c5f-903d-7eef7b9d1584\"},\"displayName\":\"Pylint\"},{\"identifier\":{\"id\":\"ms-python.python\",\"uuid\":\"f1f59ae4-9318-4f3c-a9b5-81b2eaa5f8a5\"},\"displayName\":\"Python\"},{\"identifier\":{\"id\":\"ms-python.vscode-pylance\",\"uuid\":\"364d2426-116a-433a-a5d8-a5098dc3afbd\"},\"displayName\":\"Pylance\"},{\"identifier\":{\"id\":\"ms-toolsai.jupyter\",\"uuid\":\"6c2f1801-1e7f-45b2-9b5c-7782f1e076e8\"},\"displayName\":\"Jupyter\"},{\"identifier\":{\"id\":\"ms-toolsai.jupyter-keymap\",\"uuid\":\"9f6dc8db-620c-4844-b8c5-e74914f1be27\"},\"displayName\":\"Jupyter Keymap\"},{\"identifier\":{\"id\":\"ms-toolsai.jupyter-renderers\",\"uuid\":\"b15c72f8-d5fe-421a-a4f7-27ed9f6addbf\"},\"displayName\":\"Jupyter Notebook Renderers\"},{\"identifier\":{\"id\":\"ms-toolsai.vscode-jupyter-cell-tags\",\"uuid\":\"ab4fb32a-befb-4102-adf9-1652d0cd6a5e\"},\"displayName\":\"Jupyter Cell Tags\"},{\"identifier\":{\"id\":\"ms-toolsai.vscode-jupyter-slideshow\",\"uuid\":\"e153ca70-b543-4865-b4c5-b31d34185948\"},\"displayName\":\"Jupyter Slide Show\"},{\"identifier\":{\"id\":\"ms-vscode.cpptools\",\"uuid\":\"690b692e-e8a9-493f-b802-8089d50ac1b2\"},\"displayName\":\"C/C++\"},{\"identifier\":{\"id\":\"ms-vscode.cpptools-extension-pack\",\"uuid\":\"3957b2f6-f086-49b5-a7b4-5da772123130\"},\"displayName\":\"C/C++ Extension Pack\"},{\"identifier\":{\"id\":\"ms-vscode.cpptools-themes\",\"uuid\":\"99b17261-8f6e-45f0-9ad5-a69c6f509a4f\"},\"displayName\":\"C/C++ Themes\"},{\"identifier\":{\"id\":\"ms-vscode.powershell\",\"uuid\":\"40d39ce9-c381-47a0-80c8-a6661f731eab\"},\"displayName\":\"PowerShell\"},{\"identifier\":{\"id\":\"ms-vscode.vscode-typescript-next\",\"uuid\":\"15305aca-2588-4ca0-8147-ab2c64730b82\"},\"displayName\":\"JavaScript and TypeScript Nightly\"},{\"identifier\":{\"id\":\"mushan.vscode-paste-image\",\"uuid\":\"ffaf4ec8-f001-4f02-b671-705ecf079cde\"},\"displayName\":\"Paste Image\"},{\"identifier\":{\"id\":\"naumovs.color-highlight\",\"uuid\":\"121396ad-85a1-45ec-9fd1-d95028a847f5\"},\"displayName\":\"Color Highlight\"},{\"identifier\":{\"id\":\"njpwerner.autodocstring\",\"uuid\":\"2d6fea35-f68e-461d-9b7b-5cd05be99451\"},\"displayName\":\"autoDocstring - Python Docstring Generator\"},{\"identifier\":{\"id\":\"rangav.vscode-thunder-client\",\"uuid\":\"2fd56207-78ef-49d4-95d2-9b801eee4dbf\"},\"displayName\":\"Thunder Client\"},{\"identifier\":{\"id\":\"ritwickdey.liveserver\",\"uuid\":\"b63c44fd-0457-4696-99e9-dbfdf70d77de\"},\"displayName\":\"Live Server\"},{\"identifier\":{\"id\":\"tumido.cron-explained\",\"uuid\":\"6ee451cb-7b81-4520-9eb4-059db43a1431\"},\"displayName\":\"Cron Explained\"},{\"identifier\":{\"id\":\"usernamehw.errorlens\",\"uuid\":\"9d8c32ab-354c-4daf-a9bf-20b633734435\"},\"displayName\":\"Error Lens\"},{\"identifier\":{\"id\":\"valentjn.vscode-ltex\",\"uuid\":\"840e9c85-0e99-42ce-aa62-81088245e699\"},\"displayName\":\"LTeX – LanguageTool grammar/spell checking\"},{\"identifier\":{\"id\":\"yzhang.markdown-all-in-one\",\"uuid\":\"98790d67-10fa-497c-9113-f6c7489207b2\"},\"displayName\":\"Markdown All in One\"}]"
}
```

<figcaption>

When I originally made this, it was human-readable: you could see a nice, multi-line list of my VSCode extensions. They have since changed how the export/import works, so now it looks very ugly. I no longer find this useful.

</figcaption>

#### **DATA THAT'S AUTOMATICALLY UPDATED**

##### 6. [my json resume]

```json
#...
"references": [
  {
    "reference": "\"This is very neat thank you for this contribution.\"",
    "name": " Alexandre Lavigne, open-source pull request.",
    "url": "https://github.com/burnash/gspread/pull/1187#pullrequestreview-1451621771"
  },
  {
    "reference": "\"Thanks @strib and. @alifeee - very good team work!!!!\"",
    "name": "Romano Silva, open-source pull request.",
    "url": "https://github.com/keyteki/keyteki/pull/3222#issuecomment-1589734669"
  },
#...
```

<figcaption>

This is auto-updated by my [CV repository](https://github.com/alifeee/json-resume). I used to use [json-resume](https://jsonresume.org/) a bit more, but I stopped doing the themes how they did it and made it myself. I still use the schema, though, and still update this gist, so I can view my CV in [many](https://registry.jsonresume.org/alifeee?theme=elegant) [different](https://registry.jsonresume.org/alifeee?theme=macchiato) [styles](https://registry.jsonresume.org/alifeee?theme=rickosborne). Neat!

</figcaption>

##### 7. [my web bookmarks]

```json
{
    "last_modified": "2024-03-25T00:44:15.551843Z",
    "bookmarks": {
        "TOP 10 personal websites/blogs": [
            {
                "title": "Tom Forth's Homepage",
                "url": "https://www.tomforth.co.uk/",
                "date_added": "2023-05-29T18:23:46.689000Z",
                "last_modified": "2023-11-12T22:19:05.160000Z"
            },
            {
                "title": "nonnullish",
                "url": "https://nonnullish.pages.dev/",
                "date_added": "2023-09-12T15:53:49.290000Z",
                "last_modified": "2023-11-12T22:19:28.376000Z"
            },
...
```

<figcaption>

After making my CV automatically push to a gist, it was easy to do similar when I was making my [Firefox bookmark exporter](https://github.com/alifeee/firefox-bookmarks). I don't really use this gist, but I guess having the data in machine-readable format is nice. Although [alifeee.co.uk/bookmarks](https://alifeee.co.uk/bookmarks/) probably already fills that role.

</figcaption>

### **HOW-TOS**

#### **THINGS I WANTED TO DO MULTIPLE TIMES**

Most of these gists exist because I spent a while figuring out how to do a process, and I thought that I would want to repeat the process in the future.

##### 8. [how to generate and host a Factorio map]

```md
...
## To create maps

With:

1. saves from Steam version of Factorio in `C:\Users\alifeee\AppData\Roaming\Factorio\saves`
2. saves moved from here to standalone Factorio install in `D:\Factorio\Factorio_1.1.100\saves`
3. `FactorioMaps` mod installed in `D:\Factorio\Factorio_1.1.100\mods\L0laapk3_FactorioMaps_4.4.0`

Assuming the saves are named `"multplayer 1"`, `"multplayer 2"`, etc...

Run the following to generate the map frontend

```bash
find . -regex '.*mult.*' | awk '{printf "\"%s\" ", substr($0, 3, length-6)} END {print ""}'
  # copy output
# paste from above
py auto.py --dayonly multplayer "multplayer start" "multplayer 1" "multplayer 2" ...
​```
...
```

<figcaption>

*why did I make it?*

I played a big multiplayer Factorio world once a week for ten weeks, and I used [`FactorioMaps`] to create an interactive map of the save after every week. You can (maybe) see the final map on <https://server.alifeee.net/factorio/>.

[`FactorioMaps`]: https://github.com/L0laapk3/FactorioMaps

*who is it for?*

Myself. It took a few hours to set this up the first time, and I was doing it every week, so making a gist helped me do it repeatedly and more mindlessly.

*have I come back to it?*

Every week for ten weeks when I was generating the maps often.

</figcaption>

##### 9. [how to download data from Toggl's api]

```bash
...
KEYS="${TOGGL_KEYS:-.id, .workspace_id, .project_id, .task_id, .billable, .start, .stop, .duration, .description, .duronly, .at, .server_deleted_at, .user_id, .uid, .wid, .pid}"

# print CSV headers
echo $KEYS | awk -F', ' '{for (i=1; i<NF; i++) {printf "%s,", substr($i, 2)}} END {printf "\n"}'

# print CSV content (parse JSON with jq)
cat $1 | jq -r '.[] | ['"${KEYS}"'] | @csv'
```

<figcaption>

I track time using <https://toggl.com/>. I do not pay for it, so they do not keep my data past 3 months. So, every month I download the month's data. Rather than remembering which buttons to press on the UI, I wrote a script that I can run. I thought it might be nice to accidentally come across it if you were a netizen.

</figcaption>

##### 10. [reusable ffmpeg commands]

```md
# FFmpeg Commands

## Turn mp4 into gif

Used [here](https://github.com/sheffieldhackspace/train-signs). From [here](https://superuser.com/a/1695537).

```bash
ffmpeg -y -i input.mp4 -filter_complex "fps=5,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=32[p];[s1][p]paletteuse=dither=bayer" output.gif
​```
```

<figcaption>

I thought I'd use this one more, but I haven't. I made it because I love writing an FFmpeg command for a repeatable task, as it's so easy to do something again the same way later on. But, I haven't really been doing much video/audio stuff recently.

</figcaption>

##### 11. [how to make bar charts in bash]

```bash
...
# > ./bar.sh 25 100 12
# ███░░░░░░░░░
awk -v prog=$1 -v TOTAL=$2 -v TOTSEG=$3 'BEGIN {
    frac = prog / TOTAL;
    segs = frac * TOTSEG;
    segs_int = int(sprintf("%.0f", segs));
    for (s=0; s<segs_int; s++) {
        printf "%s", "█";
    }
    for (s=0; s<(TOTSEG - segs_int); s++) {
        printf "%s", "░";
    }
}'
```

<figcaption>

I love bash, I love awk, and I love statistics. This combines them wonderfully. I use this vaguely regularly when I want to visually compare numbers, such as for [my Advent of Code statistics](https://github.com/alifeee/advent-of-code-2023), or [comparing magazine release date differences](https://github.com/lipu-tenpo/liputenpo.org/blob/main/scripts/release_differences.py).

</figcaption>

##### 12. [how to make graphs in bash]

```md
...
Plot graphs using the terminal. E.g.,
> cat sensor.txt | awk -F ':| *' '{print $2}' | eplot -d -t CO2 2> /dev/null

  4000 +-------------------------------------------------------------------+
       |         +      +.+.+       +         +         +        +         |
       |                :    .+                                CO2 +.....+ |
       |               +       .+                                          |
  3500 |-+            :          .+                                      +-|
       |              :            .+                                      |
       |             +               .+                                    |
       |             :                 +                                   |
  3000 |-+          :                   +                                +-|
       |            :                    .+                                |
       |            :                      .+.+                            |
       |            :                          .+                          |
  2500 |-+         :                             .+                      +-|
       |           +                               .+.+                    |
       |          +                                    .+.+                |
       |         +                                         +.+.+           |
  2000 |-+      +                                               .+.+.+.+ +-|
       |       +                                                           |
       |      +                                                            |
       |.+.+.+   +        +         +         +         +        +         |
  1500 +-------------------------------------------------------------------+
       0         5        10        15        20        25       30        35
...
> cat sensor.txt | awk -F ':| *' '{print $2}' | eplot -d -t CO2 2> /dev/null
...
```

<figcaption>

As I said already, I love statistics. I made this when I was setting up a [CO2 monitor](https://github.com/alifeee/CO2-monitoring), to sanity check the results I was getting. I had it set up to just send numbers through serial, so I found out how to graph it to be able to better compare those numbers to one another.

I wanted to do it in bash, so I could do it interactively, and watch the graph change in real time. If I wanted a pretty graph, I'd use Matplotlib.

</figcaption>

#### **THINGS THAT OTHER PEOPLE COULD WANT TO DO**

These are things that I did once, or do repeatedly and remember how to do. But, I put them into gists so that I could share with people how I do common things, or so people with very specific google searches might stumble across something useful.

##### 13. [a script to remove all styles from an html file]

```bash
...
# to change lots of files, use `find` and `xargs`
#  e.g., find all files ending with ".html" and replace them with the output of this script
#   find . -name "*.html" -print0 | xargs -0 -i bash -c './scripts/naked.sh "{}" > "{}.temp" && mv "{}.temp" "{}"'

cat "$1" | perl -0777pe 's|<link[^>]*rel="stylesheet"[^>]*/>||gms' | perl -0777pe 's|<style>.*?</style>||gms' | perl -0777pe 's|style="[^"]*"||gms'
```

<figcaption>

I made this to make it easy for me to participate in [CSS Naked Day 2024](https://css-naked-day.github.io/). I shared it so that anyone else could do the same. There were many ways of removing styles on the [homepage](https://css-naked-day.github.io/), but they were all for PHP, or Django, or Perl, or ... etc. Nothing for "just HTML", so I added it.

</figcaption>

##### 14. [common RSS extensions]

```md
# Common RSS URL extensions

I like blogs. I like RSS feeds. Often, blogs don't have an RSS feed link. Often, these blogs *do* have an RSS feed, thanks to whatever site generator they use.

Thus, I like to try and find the hidden feed. These are the URLs I usually put on the URL to try and find the feed.

For example, [`blog.alifeee.co.uk`](https://blog.alifeee.co.uk/) -> [`blog.alifeee.co.uk/feed.xml`](https://blog.alifeee.co.uk/feed.xml)

```text
/feed
/feed.xml
/rss
/rss.xml
/atom
/atom.xml
/index.xml
./feed
./feed.xml
./rss
./rss.xml
./atom
./atom.xml
./index.xml
​```
```

<figcaption>

As the gist says, I like RSS. You should [use it](https://blog.alifeee.co.uk/feed.xml) to keep up with your [favourite blogs](https://blog.alifeee.co.uk/). Whenever I was on a blog and I couldn't find a link to an RSS feed, I would find myself trying a random combination of the above. I wrote it down so that now I can be more systematic about it, and so that now I can keep up to date with my favourite random personal websites!

</figcaption>

##### 15. [a script to combine Squarespace RSS feeeds]

```bash
...
# fetch the file
    rss=$(curl -s "${baseurl}&${querystring}" | tr -d '\n') 
    # remove header with "<\?xml.*?<\/description>"
    if [ $i -ne 1 ]; then
        rss=$(echo $rss | perl -pe 's/<\?xml.*?<\/description>//g')
    fi
    # remove footer
    if [ $i -ne $months_ahead ]; then
        rss=$(echo $rss | sed 's/<\/channel><\/rss>//g')
    fi
    all_rss="$all_rss$rss"
...
```

<figcaption>

More RSS love. This was made in frustration at Squarespace only offering an RSS feed for each month of the calendar, and no "all" option I could see. Thus, I made a script to combine RSS feeds of the next few months so that I could stay up to date. I thought it might be useful if someone encountered the same issue with a different Squarespace site.

</figcaption>

##### 16. [a script to convert font files to css styles]

```bash
...
name_without_spaces=$(echo $name | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

echo '@font-face {
  font-family: "'$name'";
  src: url("'$1'") format('woff');
}
.font--'$name_without_spaces' {
  font-family: "'$name'" !important;
}
'
```

<figcaption>

For my [font-workshop](https://blog.alifeee.co.uk/font-workshop/) and [font-talk](https://alifeee.co.uk/talks-and-workshops/), I wanted to make a couple of CSS rules for around 100 or more fonts. This was a fun challenge to do using bash, and I ended up with a nice script. It's another one that I only put online because it was easy to do so, and again so that if someone came at Google with a very niche ask, they might find help here.

</figcaption>

##### 17. [a script to convert gpl files to css styles]

```bash
...
cat $1 | awk -F ' ' '
BEGIN {
  printf ":root {\n"
} /^([0-9]{1,3})\s+([0-9]{1,3})\s+([0-9]{1,3})\s+(.*)$/ {
  colourname = ""
  for (i=4;i<=NF;i++) {
    colourname = colourname "-" $i
  }
  printf "  --colour%s: #%02x%02x%02x;\n", colourname, $1, $2, $3
} END {
  printf "}\n"
}'
```

<figcaption>

Similar to the above, this is a script for converting a gimp colour palette to CSS styles. I used it for turning a [colour palette for typesetting lipu tenpo](https://github.com/lipu-tenpo/selo/blob/main/lipu-tenpo.gpl) into [CSS](https://github.com/lipu-tenpo/liputenpo.org/blob/main/public/stylesheet.css) for the [lipu tenpo website](https://liputenpo.org/). Again, who's to say, but it's nice to imagine that someone could be attempting this specific thing in future and stumble across this gist.

</figcaption>

#### **HOW TO SET UP THINGS ON A LINUX SERVER**

Having and doing things on a Linux server is an entire world in itself. When I started doing it, lots was confusing. Lots is still confusing. Whenever I do something describable, I try and write it down so that I can build upon my knowledge, rather than having to re-find-out how to do it every time I do something.

I have come back to most of these quite a lot because they contain a lot of POSIX/bash/shell commands that I remember using, but have forgotten how to use, or what they were called.

##### 18. [how to set up rsa encryption keys]

```md
...
### Add key to `~/.ssh/authorised_keys`

```bash
cat .ssh/alifeeePC.pub >> .ssh/authorized_keys
​```

### Add host and key to SSH config file

Doing this means I can type `ssh server` and it basically runs the [above command](#connect-using-key-vanilla)

Add the following to `~/.ssh/config`

```text
Host server
  HostName server.alifeee.net
  User root
  IdentityFile ~/.ssh/alifeeePC
​```
...
```

<figcaption>

I made this gist because I really didn't understand what RSA keys or SSH keys were, or how they worked, so I spent a while figuring out my understanding of it, and I wrote it down. I came back to it a lot over time to remind myself how to generate keys, where to put them for SSH, and how to edit my SSH config.

</figcaption>

##### 19. [how to set up nginx]

```md
...
## Config examples

### subdomain redirect

This redirects `webring.alifeee.co.uk` to `localhost:8080`. Without this, you would have to access the endpoint with `webring.alifeee.co.uk:8080`, which looks ugly :(

```nginx
server {
  listen 80;
  server_name webring.alifeee.co.uk;
  location / {
    proxy_pass http://localhost:8080;
  }
}
​```

### (default) static site

This serves static files from `/var/www/server_homepage`

```nginx
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  root /var/www/server_homepage;
  server_name _;
  location / {
    try_files $uri $uri/ =404;
  }
}
​```

### Folder alias

This redirects requests to `https://server.alifeee.net/factorio` to `/var/www/factorio` instead of `/var/www/server_homepage/factorio`

```nginx
  location /factorio {
    alias /var/www/factorio_map/;
    try_files $uri $uri/ =404;
  }
​```
...
```

<figcaption>

I've come back to this one a lot. Installing nginx was one of the first services I installed on my server, so it was useful whenever I installed new services to remind myself of the commands for running them. It was also useful for some more basic concepts like `scp`.

Sharing files as a web server is one of the more exciting things to do on a server, and there are many ways to do it, which are each subtly different. For example, the quote above shows three different ways of setting up a server and location for slightly different use cases.

The gist also serves as a backup for my nginx config, in case I lose access to my server. I have spent a lot of time in that file editing it to do exactly what I want. It should probably be multiple "sites-enabled" files, as people usually do web server setups, but this works for me at the moment, so that's how it will be. ;)

</figcaption>

##### 20. [how to transfer folders over scp]

```md
# Transfer Folders over SCP

With tar + zip

## Commands

### zip + tar
```bash
tar -cvzf <nameoftar>.tar.gz <nameoffolder>
​```

### Transfer over scp

```bash
scp ./<nameoftar>.tar.gz <user>@<server>:<filelocation>
​```

### untar + unzip (on remote)

```bash
tar -xvzf <nameoftar>.tar.gz
​```
```

<figcaption>

I made this because I was struggling with using FTP or other ways of moving files around. Once I worked it out, `scp` was useful. I have since found out that you can use `scp` recursively, so there's no real need to use `tar` to tar zip the folder before sending it, you can just use `scp *`. But, learning `scp` and writing this gist means that I got an appreciation for the syntax of both `scp` and `tar`, which I've used a few times since then.

</figcaption>

##### 21. [how to run a program as a service with systemd]

```md
...
## An example service file

For an application stored in `/root/go/webring-go/serve` that serves files over HTTP, an example service file is

```service
[Unit]
Description=Webring using Go and TOML
After=network.target

[Service]
ExecStart=/root/go/webring-go/serve
WorkingDirectory=/root/go/webring-go

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
​```

## How to enable

If the service is named `webring.service`

```bash
cp webring.service /etc/systemd/system/webring.service
sudo systemctl enable webring.service
sudo systemctl start webring.service
sudo systemctl status webring.service
​```
...
```

<figcaption>

This was a very useful gist for me to write. As it says in [the gist preamble][how to run a program as a service with systemd], I was running bots and programs (daemons) on my server in a very volatile way, so that I couldn't restart the server, or I would have to go and manually start [4 or 5 different programs](https://server.alifeee.net/).

Working out how to use `systemd` with very simple use cases felt very handy, so I wrote it up because it was difficult for me to find good information on how to do it.

</figcaption>

##### 22. [how to set up a mumble server]

```md
# Mumble Server setup

## Setup

This describes commands to set up Mumble's server (Murmur) on Ubuntu Linux.

### Install

```bash
sudo apt-get install mumble-server
​```

### Configure
```bash
sudo dpkg-reconfigure mumble-server
sudo nano /etc/mumble-server.ini
​```

Edit `welcometext`, `serverpassword`, `registerName`.

```bash
sudo service mumble-server restart
​```
...
```

<figcaption>

I mainly wrote this one because it seemed like a lot of configuration when I was setting up the Mumble Server, so I wanted to be able to do it again with the same configuration.

I was also a little worried that when I first used Mumble (to play the [Factorio game](https://blog.alifeee.co.uk/factorio-proximity-chat/)), I might have to do some "live" restarting or checking of the server if it broke, and writing down how to do that would make it a lot easier and less stressful.

</figcaption>

##### 23. [how to install ruby and jekyll on linux]

```md
### Using Ruby on Linux

#### Install Ruby + Gems

```bash
sudo apt-get install ruby-full
gem install bundler
bundle config set --local path 'vendor/bundle'
bundle install
​```

#### Serve hot-reloading website

```bash
bundle exec jekyll serve --watch
​```
```

<figcaption>

For whatever reason, I struggled to install Ruby & Jekyll locally on my computer. I imagine the struggle is similar to installing Python and pip, and not really understanding how to use them "properly". I also wrote it down because I wanted to install it both on my PC and my laptop.

</figcaption>

##### 24. [how to set up ftp on linux]

```md
# How to set up FTP on Ubuntu

Mainly following <https://gist.github.com/CloudLinuxDeveloper/ec801e51c0a3917555c01d8b064e7f9a>

```bash
sudo apt update && sudo apt install vsftpd
sudo service vsftpd status
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 40000:50000/tcp
sudo ufw allow 990/tcp
sudo adduser weeknotes
sudo nano /etc/ssh/sshd_config
  > DenyUsers weeknotes
sudo service sshd restart
sudo mkdir /home/weeknotes/ftp
sudo chown nobody:nogroup /home/weeknotes/ftp
sudo chmod a-w /home/weeknotes/ftp
sudo mkdir /home/weeknotes/ftp/files
sudo chown weeknotes:weeknotes /home/weeknotes/ftp/files
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.original
sudo nano /etc/vsftpd.conf
> write_enable=YES
> chroot_local_user=YES
> chroot_local_user=YES
> force_dot_files=YES
> pasv_min_port=40000
> pasv_max_port=50000
> user_sub_token=$USER
> local_root=/home/$USER/ftp
sudo service vsftpd restart
​```
```

<figcaption>

This is not really a gist I have come back to, nor one that I used properly. After I set up FTP, I decided I didn't want to use it, so I un-set it up. But, if I ever want it again, I can follow my own instructions, which maybe contain parts of my own personality as commands.

</figcaption>

[how to start blogging]: https://gist.github.com/alifeee/c857bfb45bfd260a9b9dd9c45e4f7478
[a hat blog]: https://gist.github.com/alifeee/48f83a302205772e1a911ac889ae6212
[my spotify wrapped 2023]: https://gist.github.com/alifeee/075086b13fe5cec4c86d0f051973a960
[a toki pona word list]: https://gist.github.com/alifeee/7afeac3587624d66d7b370fe23882252
[my vscode extension list]: https://gist.github.com/alifeee/d46f1f41189b13bb44c2c32f84f69edc
[my web bookmarks]: https://gist.github.com/alifeee/5d84396d0404a879bb41329ec5afa9d3
[my json resume]: https://gist.github.com/alifeee/97f9ac1642b1c46cf66942c3f079a42f
[how to generate and host a Factorio map]: https://gist.github.com/alifeee/fb16acc9b4cc8b6d52e4f3226cc10197
[how to download data from Toggl's api]: https://gist.github.com/alifeee/5ccfdff391f1bfc894f6e21beb78996d
[reusable ffmpeg commands]: https://gist.github.com/alifeee/9e968dbf9f380ab4b15cda8d05d2a89e
[how to make bar charts in bash]: https://gist.github.com/alifeee/a6f14aad9caed6b8a861df0e2850aa10
[how to make graphs in bash]: https://gist.github.com/alifeee/2e1ea8ad5290a553316e715f658f1fd7
[a script to remove all styles from an html file]: https://gist.github.com/alifeee/75df204c2be3815806e1d4be47e54d08
[common RSS extensions]: https://gist.github.com/alifeee/8342d9677c436e2353233f68f34cfe19
[a script to combine Squarespace RSS feeeds]: https://gist.github.com/alifeee/2eb9ac2296a698dc8a05d4ed531d8d36
[a script to convert font files to css styles]: https://gist.github.com/alifeee/8607c787a0c60684827b5f07bbb95a5d
[a script to convert gpl files to css styles]: https://gist.github.com/alifeee/586b92e21f912dde7f74cd498b7cbb56
[how to set up rsa encryption keys]: https://gist.github.com/alifeee/2f4be232f6b9c4b384f4c020a5bc10a1
[how to set up nginx]: https://gist.github.com/alifeee/92defe5a02a2e1dd17cb517135e80ffe
[how to transfer folders over scp]: https://gist.github.com/alifeee/4a6cead6cd3e79a6620100ea00de5e42
[how to run a program as a service with systemd]: https://gist.github.com/alifeee/606ffd2cefaceeeff92a037e797e5458
[how to set up a mumble server]: https://gist.github.com/alifeee/2b8831d503438ff147fb8df6c01858c4
[how to install ruby and jekyll on linux]: https://gist.github.com/alifeee/829344ed02efb0952e81fc35c445df18
[how to set up ftp on linux]: https://gist.github.com/alifeee/f11e7295659576c236869079a3105025

## The end

I hope you enjoyed a skim through the gist-list. Some are boring, but that's because I didn't hold out, and included every gist, so you could have a fair judgement of how many are actually useful and how many end up not being.

Maybe next time you write a small script, or spend a couple of hours figuring out how to do something, you'd consider writing it down and putting it somewhere?...
