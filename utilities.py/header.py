"""ensure all headers have the same format"""

import os
import re

# test for two <a tags (for header and rss feed)
# <header>
#       <a href="./">
#         <h1>alifeee's blog</h1>
#       </a>
#       <a id="rss" href="./feed.xml">
#         <img alt="_RSS_" src="./icons/rss.svg" />
#       </a>
#     </header>

HEADER_REGEX = r"<header>[.\n\s\S]*<a[.\n\s\S]*<a[.\n\s\S]*<\/header>"


def get_all_html_files():
    """get all html files recursively"""
    html_files = []
    for root, _, files in os.walk("."):
        for foile in files:
            if foile.endswith(".html"):
                html_files.append(os.path.join(root, foile))
    return html_files


for file in get_all_html_files():
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
        if not re.search(HEADER_REGEX, content):
            raise AssertionError(f"Header not found in {file}")
