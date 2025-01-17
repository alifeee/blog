"""generate RSS feed for all blog posts"""

from post_parser import get_all_posts, Post

SUMMARY_TITLE = "alifeee's blog"
SUMMARY_LINK = "https://blog.alifeee.co.uk"
SUMMARY_AUTHOR = "alifeee"
SUMMARY_ID = "https://blog.alifeee.co.uk/"
SUMMARY_ICON = "https://blog.alifeee.co.uk/og-image.png"

posts = get_all_posts()

# sort posts by date
posts.sort(key=lambda post: post.date, reverse=True)

# list of posts to jank ID for
jank_ids = [
    "https://blog.alifeee.co.uk/2024/12/hitchhiking/",
    "https://blog.alifeee.co.uk/2024/09/sellotape-dispenser/",
    "https://blog.alifeee.co.uk/2024/09/fold-an-envelope/",
    "https://blog.alifeee.co.uk/railcards",
    "https://blog.alifeee.co.uk/gists",
    "https://blog.alifeee.co.uk/font-workshop",
    "https://blog.alifeee.co.uk/making-bogface",
    "https://blog.alifeee.co.uk/what-is-a-third-space",
    "https://blog.alifeee.co.uk/hackspace-adventures",
    "https://blog.alifeee.co.uk/factorio-proximity-chat",
    "https://blog.alifeee.co.uk/hull-bus-sign",
    "https://blog.alifeee.co.uk/steam-collage-api",
    "https://blog.alifeee.co.uk/snippets-of-a-degree",
    "https://blog.alifeee.co.uk/sketch-your-society",
    "https://blog.alifeee.co.uk/ring-populations",
    "https://blog.alifeee.co.uk/bike-to-cambridge",
]

# generate feed
feed = ""
feed += "<?xml version='1.0' encoding='UTF-8'?>\n"
feed += '<?xml-stylesheet href="/feed.xsl" type="text/xsl"?>\n'
feed += '<feed xmlns="http://www.w3.org/2005/Atom">\n\n'
feed += f"<title>{SUMMARY_TITLE}</title>\n"
feed += f"<link href='{SUMMARY_LINK}' rel='self' />\n"
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
