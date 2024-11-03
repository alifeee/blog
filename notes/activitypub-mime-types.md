---
title: ActivityPub posts and the ACCEPT header
date: 2024-11-02
tags:
- ActivityPub
---
This note was made to investigate how ActivityPub worked for getting information about posts, as a small investigation into <https://gitlab.com/edent/activity-bot/-/issues/2>.

We consider two posts:

1. a post by myself: <https://mastodon.social/@alifeee/113410809105877544>
2. a post by @edent's bot "@bot@bot.viii.fi":
  a. the post on Mastodon: <https://mastodon.social/@bot@bot.viii.fi/113402721781767728>
  b. the post on the original server: <https://bot.viii.fi/posts/6723a0f2-d5c4-9276-916d-546aa5f831fd.json>

Questions:

1. how come 2.a displays as nice HTML and 2.b displays as JSON?
2. I know activity pub requires JSON in some way, so how does a client get the JSON for post 1?

the answer to both questions (spoilers for below) is: it depends if the ACCEPT header is "Accept: text/html" (default in a browser) or "Accept: application/json" (I assume the default for things that interact with ActivityPub)

## what you see in a browser

if you are logged in and you visit 2.a., you see a nice preview of the post

if you are not logged in, (open the status in a private browser window), you are redirected to <https://mastodon.social/redirect/statuses/113402721781767728> which is a page saying "you are leaving Mastodon", which links to the post on the original instance.

## Get post 2.a as HTML

get page (HTML)

```bash
curl -i 'https://mastodon.social/@bot@bot.viii.fi/113402721781767728' -H 'Accept: text/html'
# > HTTP 302 to "you are leaving Mastodon" page
curl -i https://mastodon.social/redirect/statuses/113402721781767728 -H 'Accept: text/html'
# > HTTP 200 - but this page is designed for a browser, so it has a link embedded to https://bot.viii.fi/posts/6723a0f2-d5c4-9276-916d-546aa5f831fd.json
curl -i "https://bot.viii.fi/posts/6723a0f2-d5c4-9276-916d-546aa5f831fd.json" -H 'Accept: text/html'
# JSON is returned, as this is simply a file access on the server (does not use PHP file)
```

## Get post 2.a. as JSON

```bash
curl -i "https://mastodon.social/@bot@bot.viii.fi/113402721781767728" -H "Accept: application/json"
# sidenote: "/statuses/..." works too (also a 302 redirect)
# curl -i "https://mastodon.social/statuses/113402721781767728" -H "Accept: application/json"
# > HTTP 302 redirect to https://bot.viii.fi/posts/6723a0f2-d5c4-9276-916d-546aa5f831fd.json
curl -i "https://bot.viii.fi/posts/6723a0f2-d5c4-9276-916d-546aa5f831fd.json" -H "Accept: application/json"
# you get JSON as expected
```

## What determines the URL of a post?

it's the ID in the JSON

```bash
# (or https://mastodon.social/@alifeee/113410809105877544 is a "nice" url that you get a redirect to if you ask for HTML (i.e., are using a browser))
$ curl -s "https://mastodon.social/users/alifeee/statuses/113410809105877544" -H "Accept: application/json" | jq | grep '"id"'
  "id": "https://mastodon.social/users/alifeee/statuses/113410809105877544",
```

This knowledge is building on a blog post I read a while ago: <https://seb.jambor.dev/posts/understanding-activitypub/>.
