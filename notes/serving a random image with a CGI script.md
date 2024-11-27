---
date: 2024-11-12
title: serving a random image with a CGI script
tags: cgi
---
I made this because I have hundreds of images of myself and what I have been doing from BeReal.

I stopped using it because the company got big and evil (booo), so I requested all my data (images) and I (will soon) request them to remove that data.

But, for the meanwhile, I've been screwing around with it. I made a timelapse, but also fun is a random image picker.

I put all the images on my server, and made a very simple CGI script:

```bash
#!/bin/bash

file=$( (cd /var/www/; find images/ -type f -not -name "*index.html" \
  | sort --random-sort | head -n1) )

echo "HTTP/1.1 302 Found"
echo "Location: /${file}"
echo ""
```

now I can access `/.../random.cgi` and it redirects me to an image, served by nginx. Sweet.

I would like to write a bigger blog about CGI scripts in future.
