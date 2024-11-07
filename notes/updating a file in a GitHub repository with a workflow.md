---
date: 2024-11-07
title: updating a file in a GitHub repository with a workflow
tags:
  - github-actions
  - github
  - scripting
---

often, I want to keep a file in a repository up to date using a script.

here is the most simple example of a workflow that does that, which could be placed in, e.g., `.github/workflows/update.yml`

```github actions
name: update stock.txt

on:
  push:
    branches: ["main"]

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: update stock.txt
        run: ./scripts/compute_stock.sh stocktaking.csv > stock.txt

      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: updated stock.txt with latest numbers
```

This workflow was created for <https://github.com/lipu-tenpo/print-and-post> to keep a file listing stock up to date with the "logs" of when I acquired and un-acquired stuff.

I initially thought about doing this using Git Hooks, but I want to be able to edit the "logs" from my phone or via a browser, where I wouldn't be able to trigger the git hook.

So, I'm doing it in a proprietary "GitHubby" way, which would be annoying to change if I changed to, say, GitLab. But, here we are. Technology lock-in is real.
