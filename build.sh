#!/bin/bash
# build various parts of the blog
# some are skipped as they are really one-time build scripts that won't ever change

# RSS feed
python3 utilities.py/rss_feed.py 

# notes
./build_notes.sh
