---
title: "finding the account information of a Mastodon account manually via curl requests"
date: 2025-01-12
tags:
  - activitypub
---
[Then Try This](https://thentrythis.org/), a non-profit research group, recently changed their mastodon handle from

```text
@thentrythis@mastodon.thentrythis.org
```

to

```text
@thentrythis@thentrythis.org
```

to understand how this works (because [I like understanding the ActivityPub protocol](https://blog.alifeee.net/notes/tagged/ActivityPub/)), I tried to find how my Mastodon client would find the new account.

When you open the original account profile, it opens on `social.thentrythis.org`, so there must be some path from `thentrythis.org` to there.

First, I tried accessing several URLs off the top of my head that I thought were used.

```text
https://thentrythis.org/.well-known/webfinger
https://social.thentrythis.org/.well-known/webfinger
```

They all were blank.

Then, I was [pointed in the right direction](https://post.lurk.org/@yaxu/113810961437047380), and now I could manually make the same requests that my Mastodon client would do using [Mastodon's documentation](https://github.com/felx/mastodon-documentation/blob/master/Running-Mastodon/Serving_a_different_domain.md).

The process is:

Given a username, i.e., `@thentrythis@thentrythis.org`, find the format of the "webfinger request" (which allows you to request data about a user), which should be on `/.well-known/host-meta`. The key here is that the original site (`thentrythis.org`) redirects to the "social site" (`social.thentrythis.org`).

```bash
$ curl -i "https://thentrythis.org/.well-known/host-meta" | head -n4
HTTP/1.1 301 Moved Permanently
Date: Sun, 12 Jan 2025 18:56:53 GMT
Server: Apache/2.4.62 (Debian)
Location: https://social.thentrythis.org/.well-known/host-meta

$ curl "https://social.thentrythis.org/.well-known/host-meta"
<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" template="https://social.thentrythis.org/.well-known/webfinger?resource={uri}"/>
</XRD>
```

Then, we can use the template returned to query a user by placing `acct:<user>@<server>` into the template, replacing `{uri}`, i.e.,

```bash
curl -s "https://social.thentrythis.org/.well-known/webfinger?resource=acct:thentrythis@thentrythis.org" | jq
{
  "subject": "acct:thentrythis@thentrythis.org",
  "aliases": [
    "https://social.thentrythis.org/@thentrythis",
    "https://social.thentrythis.org/users/thentrythis"
  ],
  "links": [
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://social.thentrythis.org/@thentrythis"
    },
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://social.thentrythis.org/users/thentrythis"
    },
    {
      "rel": "http://ostatus.org/schema/1.0/subscribe",
      "template": "https://social.thentrythis.org/authorize_interaction?uri={uri}"
    },
    {
      "rel": "http://webfinger.net/rel/avatar",
      "type": "image/png",
      "href": "https://social.thentrythis.org/system/accounts/avatars/113/755/294/674/928/838/original/640741180e302572.png"
    }
  ]
}
```

neat :]

It's always nice to know that I could use Mastodon by *reaaaallllyyy* slowly issuing my own curl requests (or, what this really means, build my own client).
