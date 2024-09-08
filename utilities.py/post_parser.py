"""Parses all "current" blog posts and returns them as a Python object
"""

from dataclasses import dataclass
from datetime import datetime
import os
from typing import List
import pprint

# pip install tzdata, beautifulsoup4
from zoneinfo import ZoneInfo  # timezone
from bs4 import BeautifulSoup

INDEX_FILE = "index.html"


@dataclass
class Post:
    """A dataclass to hold a blog post"""

    html: str
    title: str
    description: str
    relative_url: str
    md_url: str
    date: datetime

    def html_with_links_level(self, link_depth: int) -> str:
        """returns html but with links at a certain level
        (only edits <a> href and <img> src)
        e.g.,
          link_depth=0: <a href="./page">go here!</a>
          link_depth=1: <a href="../page">go here!</a>
        """
        soup = BeautifulSoup(self.html, "html.parser")
        links = soup.find_all("a")
        for link in links:
            href = link["href"]
            href = "../" * link_depth + href
            link["href"] = href
        images = soup.find_all("img")
        for image in images:
            src = image["src"]
            src = "../" * link_depth + src
            image["src"] = src
        return str(soup)


def get_all_posts() -> List[Post]:
    with open(INDEX_FILE, "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
    posts_html = soup.find("ul", class_="blog posts").find_all("li", recursive=False)

    posts = []
    for post in posts_html:
        html = str(post)
        relative_url = post.find("a", class_="link")["href"]
        relative_url_stripped = relative_url.strip("/")
        # md url is f"{relative_url}/{relative_url}.md"
        #  with "./\" stripped from relative_url
        md_url = os.path.join(
            relative_url, os.path.basename(relative_url_stripped) + ".md"
        )

        date_str = post.find("time")["datetime"]
        date = datetime.strptime(date_str, "%Y-%m-%d")
        date = date.replace(tzinfo=ZoneInfo("Etc/UTC"))

        index_path = f"{relative_url}/index.html"
        with open(index_path, "r", encoding="utf-8") as file:
            post_soup = BeautifulSoup(file, "html.parser")
        title = post_soup.find("meta", property="og:title")["content"]
        description = post_soup.find("meta", property="og:description")["content"]

        posts.append(
            Post(
                html=html,
                title=title,
                description=description,
                relative_url=relative_url,
                md_url=md_url,
                date=date,
            )
        )

    # make sure all relative_url's exist
    for post in posts:
        assert os.path.exists(
            post.relative_url
        ), f"post {post.relative_url} does not exist"
    # make sure all md_url's exist
    for post in posts:
        assert os.path.exists(post.md_url), f"post {post.md_url} does not exist"

    posts.sort(key=lambda x: x.date, reverse=True)
    return posts


if __name__ == "__main__":
    print("getting posts...")
    ps = get_all_posts()
    print("posts:")
    for p in ps:
        pprint.pprint(p)
        print()
