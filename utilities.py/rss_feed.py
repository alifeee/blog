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
    link = SUMMARY_LINK + "/" + post.relative_url.lstrip("./")
    feed += "<entry>\n"
    feed += f"  <title>{post.title}</title>\n"
    feed += f"  <link href='{link}' />\n"
    feed += f"  <id>{SUMMARY_ID}/{post.relative_url.lstrip('./')}</id>\n"
    feed += f"  <updated>{post.date.isoformat()}</updated>\n"
    feed += f"  <summary>{post.description}</summary>\n"

    # content (link + summary + image)
    feed += "  <content type='html'>\n"
    feed += f"    <a href='{link}'>{link}</a>\n"
    feed += f"    <p>{post.description}</p>\n"
    feed += "    <![CDATA[\n"
    feed += f"     <a href='{link}'>\n"
    OG_IMAGE = link + "/og-image.png"
    feed += f"        <img alt='{post.title}' src='{OG_IMAGE}' />\n"
    feed += "      </a>\n"
    feed += "    ]]>\n"
    feed += "  </content>\n"

    feed += "</entry>\n\n"
feed += "</feed>\n"

# write feed to file
with open("feed.xml", "w", encoding="utf-8") as f:
    f.write(feed)

print("feed written to feed.xml")
