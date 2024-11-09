---
date: 2024-11-09
title: basic HTML template with all the gubbins
tags: html
---

I create a lot of websites. I'm also a big fan of very performant, very accessible websites. I'm also a big fan of the phrase "the important thing first is for a webpage to exist, then after that to look nice".

With that in mind, this is the HTML template I usually start with to make a new webpage. It's made to manually replace the things in curly brackets, but also has the bonus that you could use it with a templating language like <https://handlebarsjs.com/> (my favourite).

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- browser metas -->
    <title>{{title}}</title>
    <meta name="description" content="{{description}}" />
    <!-- allow unicode characters -->
    <meta charset="utf-8" />
    <!-- 'zoom' on mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- embed metas - https://ogp.me/ - visible when sharing on social media -->
    <meta property="og:title" content="{{title}}" />
    <meta property="og:type" content="website" />
    <meta property="og:site" content="{{title}}" />
    <meta property="og:url" content="{{base_url}}/{{page}}" />
    <meta property="og:image" content="{{base_url}}/{{image}}" />
    <meta property="og:description" content="{{description}}" />
    <meta property="og:locale" content="en_GB" />

    <!-- styling -->
    <!-- favicon - can be any image (.png, .jpg, .ico) -->
    <link rel="icon" type="image/png" href="/og-image.png" />
</head>

<body>
    <header></header>
    <main>
        {{{content}}}
    </main>
    <footer></footer>
</body>

</html>
```

Put it somewhere, and put something in there! Make a personal website! Make a blog! I will love you forever.
