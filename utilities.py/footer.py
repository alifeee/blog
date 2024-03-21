# utilities for the <footer>
import os


def get_all_html_files():
    # get all html files recursively
    html_files = []
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith(".html") and file != "similar.html":
                html_files.append(os.path.join(root, file))
    return html_files


def main():
    html_files = get_all_html_files()

    links = [
        {
            "to": "https://twitter.com/alifeeeirenn",
            "text": "Twitter",
            "icon": "twitter",
        },
        {
            "to": "https://github.com/alifeee/blog",
            "text": "GitHub",
            "icon": "github",
        },
        {
            "to": "https://linktr.ee/alifeee",
            "text": "Linktree",
            "icon": "linktree-logo-icon",
        },
        {
            "to": "mailto:alifeee.web@outlook.com",
            "text": "Email",
            "icon": "envelope-solid",
        },
    ]

    for html_file in html_files:
        depth = html_file.count(os.sep)
        print(depth)
        with open(html_file, "r") as f:
            content = f.read()
            # find the <footer> tag
            footer_start = content.find("<footer>")
            if footer_start == -1:
                raise Exception("No <footer> tag found in " + html_file)
            # find <div class="links">
            links_start = content.find('<div class="links">', footer_start)
            links_end = content.find("</div>", links_start)
            if links_start == -1 or links_end == -1:
                raise Exception("No <div class='links'> found in " + html_file)
            # replace the content
            new_content = content[: links_start + len('<div class="links">')]
            for link in links:
                new_content += (
                    f'<a href="{link["to"]}">\n'
                    f'<img alt="_{link["text"]}_" src="{"." * depth}/icons/{link["icon"]}.svg">\n'
                    f'<span class="text">{link["text"]}</span>\n'
                    f"</a>\n"
                )
            new_content += content[links_end:]
            # write to file
            with open(html_file, "w") as f:
                f.write(new_content)


if __name__ == "__main__":
    main()
