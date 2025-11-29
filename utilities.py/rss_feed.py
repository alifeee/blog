"""generate RSS feed for all blog posts"""

from post_parser import get_all_posts, Post

SUMMARY_TITLE = "alifeee's blog"
SUMMARY_LINK = "https://blog.alifeee.net"
SUMMARY_AUTHOR = "alifeee"
SUMMARY_ID = "https://blog.alifeee.net/"
SUMMARY_ICON = "https://blog.alifeee.net/og-image.png"

posts = get_all_posts()

# sort posts by date
posts.sort(key=lambda post: post.date, reverse=True)

# list of posts to jank ID for
jank_ids = [
    "https://blog.alifeee.net/2024/12/hitchhiking/",
    "https://blog.alifeee.net/2024/09/sellotape-dispenser/",
    "https://blog.alifeee.net/2024/09/fold-an-envelope/",
    "https://blog.alifeee.net/railcards",
    "https://blog.alifeee.net/gists",
    "https://blog.alifeee.net/font-workshop",
    "https://blog.alifeee.net/making-bogface",
    "https://blog.alifeee.net/what-is-a-third-space",
    "https://blog.alifeee.net/hackspace-adventures",
    "https://blog.alifeee.net/factorio-proximity-chat",
    "https://blog.alifeee.net/hull-bus-sign",
    "https://blog.alifeee.net/steam-collage-api",
    "https://blog.alifeee.net/snippets-of-a-degree",
    "https://blog.alifeee.net/sketch-your-society",
    "https://blog.alifeee.net/ring-populations",
    "https://blog.alifeee.net/bike-to-cambridge",
]

# generate feed
feed = ""
feed += "<?xml version='1.0' encoding='UTF-8'?>\n"
feed += '<?xml-stylesheet href="/feed.xsl" type="text/xsl"?>\n'
feed += '<feed xmlns="http://www.w3.org/2005/Atom">\n\n'
feed += f"<title>{SUMMARY_TITLE}</title>\n"
feed += f"<link href='{SUMMARY_LINK}/feed.xml' rel='self' />\n"
feed += f"<updated>{posts[0].date.isoformat()}</updated>\n"
feed += "<author>\n"
feed += f"  <name>{SUMMARY_AUTHOR}</name>\n"
feed += "</author>\n"
feed += f"<id>{SUMMARY_ID}</id>\n"
feed += f"<icon>{SUMMARY_ICON}</icon>\n\n"
for post in posts:
    if post.relative_url.startswith("http"):
        link = post.relative_url
    else:
        link = SUMMARY_LINK + "/" + post.relative_url.lstrip("./")

    # fix old IDs having erroneous double slash
    id_ = link
    if link in jank_ids:
        id_ = id_.replace(".uk/", ".uk//")

    feed += "<entry>\n"
    feed += f"  <title>{post.title}</title>\n"
    feed += f"  <link href='{link}' />\n"
    feed += f"  <id>{id_}</id>\n"
    feed += f"  <updated>{post.date.isoformat()}</updated>\n"
    feed += f"  <summary>{post.description}</summary>\n"
    feed += "</entry>\n\n"
feed += "</feed>\n"

# write feed to file
with open("feed.xml", "w", encoding="utf-8") as f:
    f.write(feed)

print("feed written to feed.xml")
