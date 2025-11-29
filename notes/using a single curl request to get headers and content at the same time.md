---
title: using a single curl request to get headers and content at the same time
date: 2025-07-15
tags:
- scripting
- curl
---
I often make `curl` requests. I often want to see the HTTP headers and also the content.

Most of the time, you can just add `-i` or `--include` to include the headers in the printout

```bash
curl -i https://alifeee.net/
```

In writing this (and looking at `man curl`), you can also use `-v` or `--verbose` to *view* the headers.

But, if you want to *download* **both** the headers and the content in one request (e.g., for a particularly large file or a server you don't want to hammer), you can use a script like this:

```bash
# customisation
url="https://alifeee.net/"
file="alifeee.html"
filenom="${file%.*}"
fileext="${file#*.}"

# request
curl -i -o "${filepath}" "${url}"

# get index of first blank line
blank=$(cat "${filepath}" | awk '/^\r?$/ {print NR; exit}')
# cut file up to first blank line
head -n "$(($blank - 1))" "${filepath}" > "${filenom}_HEADERS.txt"
# cut file after first blank line
tail -n "+$(($blank + 1))" "${filepath}" > "${filenom}_RESPONSE.${fileext}"
```

…and view the results like this…

```bash
$ ll
total 108K
-rw-rw-r--  1 alifeee alifeee  620 Jul 15 16:27 alifeee_HEADERS.txt
-rw-rw-r--  1 alifeee alifeee  27K Jul 15 16:27 alifeee.html
-rw-rw-r--  1 alifeee alifeee  26K Jul 15 16:27 alifeee_RESPONSE.html

$ cat "${filenom}_HEADERS.txt"
HTTP/2 200
server: GitHub.com
content-type: text/html; charset=utf-8
last-modified: Wed, 25 Jun 2025 11:17:22 GMT
access-control-allow-origin: *
etag: "685bdac2-66b0"
expires: Tue, 15 Jul 2025 13:26:55 GMT
cache-control: max-age=600
age: 96
date: Tue, 15 Jul 2025 15:27:43 GMT

$ file "${filenom}_RESPONSE.${fileext}"
alifeee_RESPONSE.html: HTML document, Unicode text, UTF-8 text
```
