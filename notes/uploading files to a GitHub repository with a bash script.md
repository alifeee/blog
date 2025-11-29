---
title: uploading files to a GitHub repository with a bash script
date: 2025-02-02
tags:
- obsidian
- github
- scripting
---
I write these notes in Obsidian. To upload, them, I *could* visit <https://github.com/alifeee/blog/tree/main/notes>, click "add file", and copy and paste the file contents. I probably *should* do that.

But, instead, I wrote a shell script to upload them. Now, I can press "CTRL+P" to open the Obsidian command pallette, type "lint" (to [lint the note](https://blog.alifeee.net/notes/linting-markdown-from-inside-obsidian/)), then open it again and type "upload" and upload the note. At this point, I *could* walk away and assume everything went fine, but what I normally do is open the [GitHub Actions tab](https://github.com/alifeee/blog/actions) to check that it worked properly.

The process the script undertakes is:

1. check user inputs are good (all variables exist, file is declared)
2. check if file exists or not already in GitHub with a `curl` request
3. generate a JSON payload for the upload request, including:
    1. commit message
    2. commit author & email
    3. file contents as a base64 encoded string
    4. (if file exists already) sha1 hash of existing file
4. make a `curl` request to upload/update the file!

As I use it from inside Obsidian, I use an extension called [Obsidian shellcommands](https://github.com/Taitava/obsidian-shellcommands), which lets you specify several commands. For this, I specify:

```bash
export org="alifeee"
export repo="blog"
export fpath="notes/"
export git_name="alifeee"
export git_email="alifeee@alifeee.net"
export GITHUB_TOKEN="github_pat_3890qwug8f989wu89gu98w43ujg98j8wjgj4wjg9j83wjq9gfj38w90jg903wj"
{{vault_path}}/scripts/upload_to_github.sh {{file_path:absolute}}
```

…and when run with a file open, it will upload/update that file to my notes folder on GitHub.

This is maybe a strange way of doing it, as the "source of truth" is now "my Obsidian", and the GitHub is really just a place for the files to live. However, I enjoy it.

I've made the script quite generic as you have to supply most information via environment variables. You can use it to upload an arbitrary file to a specific folder in a specific GitHub repository. Or… you can modify it and do what you want with it!

It's here: <https://gist.github.com/alifeee/d711370698f18851f1927f284fb8eaa8>
