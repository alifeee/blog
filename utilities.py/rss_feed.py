"""generate RSS feed for all blog posts"""

from datetime import datetime
from zoneinfo import ZoneInfo
from bs4 import BeautifulSoup

SUMMARY_TITLE = "alifeee's blog"
SUMMARY_LINK = "https://blog.alifeee.co.uk"
SUMMARY_AUTHOR = "alifeee"
SUMMARY_ID = "https://blog.alifeee.co.uk/"
SUMMARY_ICON = "https://blog.alifeee.co.uk/og-image.png"

# get all li from <ul class="blog posts"> in root index.html
with open("index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")
posts_html = soup.find("ul", class_="blog posts").find_all("li", recursive=False)

posts = []
for post in posts_html:
    relative_url = post.find("a", class_="link")["href"]
    date_str = post.find("time")["datetime"]
    date = datetime.strptime(date_str, "%Y-%m-%d")
    date = date.replace(tzinfo=ZoneInfo("Etc/UTC"))
    posts.append(
        {
            "relative_url": relative_url,
            "date": date,
        }
    )

# for each post, open the index.html file in the post directory
#  and get the og fields
for post in posts:
    index_path = f"{post['relative_url']}/index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")
    post["title"] = soup.find("meta", property="og:title")["content"]
    post["description"] = soup.find("meta", property="og:description")["content"]

# sort posts by date
posts.sort(key=lambda x: x["date"], reverse=True)

# generate feed
feed = ""
feed += "<?xml version='1.0' encoding='UTF-8'?>\n"
feed += '<feed xmlns="http://www.w3.org/2005/Atom">\n\n'
feed += f"<title>{SUMMARY_TITLE}</title>\n"
feed += f"<link href='{SUMMARY_LINK}' rel='self' />\n"
feed += f"<updated>{posts[0]['date'].isoformat()}</updated>\n"
feed += "<author>\n"
feed += f"  <name>{SUMMARY_AUTHOR}</name>\n"
feed += "</author>\n"
feed += f"<id>{SUMMARY_ID}</id>\n"
feed += f"<icon>{SUMMARY_ICON}</icon>\n\n"
for post in posts:
    link = SUMMARY_LINK + "/" + post["relative_url"].lstrip("./")
    feed += "<entry>\n"
    feed += f"  <title>{post['title']}</title>\n"
    feed += f"  <link href='{link}' />\n"
    feed += f"  <id>{SUMMARY_ID}/{post['relative_url'].lstrip('./')}</id>\n"
    feed += f"  <updated>{post['date'].isoformat()}</updated>\n"
    feed += f"  <summary>{post['description']}</summary>\n"
    feed += "</entry>\n\n"
feed += "</feed>\n"

# write feed to file
with open("feed.xml", "w", encoding="utf-8") as f:
    f.write(feed)
