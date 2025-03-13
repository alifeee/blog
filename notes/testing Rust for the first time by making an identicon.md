---
title: testing Rust for the first time by making an identicon
date: 2025-03-13
tags:
- rust
- identicons
---
I was screwing around on YouTube, and ended up watching a few videos about Rust. Actually, these ones: [the first](https://youtu.be/3e-nauaCkgo), leading to [the second](https://www.youtube.com/watch?v=MWRPYBoCEaY), leading to [the third](https://youtu.be/2hXNd6x9sZs).

These videos are all by [noboilerplate](https://github.com/0atman/noboilerplate), and I got only 1:08 minutes into the third video before I decided to try out Rust myself.

For a long time I've been meaning to make an `identicon` (think: default pixelated profile picture for GitHub/etc) using Lua, after seeing a friend's [identicon implementations in several language](https://github.com/jedevc/Identicon/). I think, as they do, that making an identicon generator is a very fun and contained way to start experimenting with a new language - you get involved with random numbers, arrays, string formatting, loops, and maybe more.

Anyway, I still haven't made one in Lua, but I did make these three in Rust.

<svg version='1.1'
     viewbox='0 0 750 750'
     xmlns='http://www.w3.org/2000/svg'>
<rect width='750' height='750' fill='black' />
<rect width='50' height='50' fill='none' x='0' y='0' />
<rect width='50' height='50' fill='none' x='700' y='0' />
<rect width='50' height='50' fill='none' x='50' y='0' />
<rect width='50' height='50' fill='none' x='650' y='0' />
<rect width='50' height='50' fill='none' x='100' y='0' />
<rect width='50' height='50' fill='none' x='600' y='0' />
<rect width='50' height='50' fill='red' x='150' y='0' />
<rect width='50' height='50' fill='red' x='550' y='0' />
<rect width='50' height='50' fill='red' x='200' y='0' />
<rect width='50' height='50' fill='red' x='500' y='0' />
<rect width='50' height='50' fill='none' x='250' y='0' />
<rect width='50' height='50' fill='none' x='450' y='0' />
<rect width='50' height='50' fill='red' x='300' y='0' />
<rect width='50' height='50' fill='red' x='400' y='0' />
<rect width='50' height='50' fill='red' x='350' y='0' />
<rect width='50' height='50' fill='red' x='350' y='0' />
<rect width='50' height='50' fill='red' x='0' y='50' />
<rect width='50' height='50' fill='red' x='700' y='50' />
<rect width='50' height='50' fill='red' x='50' y='50' />
<rect width='50' height='50' fill='red' x='650' y='50' />
<rect width='50' height='50' fill='none' x='100' y='50' />
<rect width='50' height='50' fill='none' x='600' y='50' />
<rect width='50' height='50' fill='none' x='150' y='50' />
<rect width='50' height='50' fill='none' x='550' y='50' />
<rect width='50' height='50' fill='red' x='200' y='50' />
<rect width='50' height='50' fill='red' x='500' y='50' />
<rect width='50' height='50' fill='red' x='250' y='50' />
<rect width='50' height='50' fill='red' x='450' y='50' />
<rect width='50' height='50' fill='none' x='300' y='50' />
<rect width='50' height='50' fill='none' x='400' y='50' />
<rect width='50' height='50' fill='red' x='350' y='50' />
<rect width='50' height='50' fill='red' x='350' y='50' />
<rect width='50' height='50' fill='none' x='0' y='100' />
<rect width='50' height='50' fill='none' x='700' y='100' />
<rect width='50' height='50' fill='none' x='50' y='100' />
<rect width='50' height='50' fill='none' x='650' y='100' />
<rect width='50' height='50' fill='none' x='100' y='100' />
<rect width='50' height='50' fill='none' x='600' y='100' />
<rect width='50' height='50' fill='none' x='150' y='100' />
<rect width='50' height='50' fill='none' x='550' y='100' />
<rect width='50' height='50' fill='none' x='200' y='100' />
<rect width='50' height='50' fill='none' x='500' y='100' />
<rect width='50' height='50' fill='red' x='250' y='100' />
<rect width='50' height='50' fill='red' x='450' y='100' />
<rect width='50' height='50' fill='red' x='300' y='100' />
<rect width='50' height='50' fill='red' x='400' y='100' />
<rect width='50' height='50' fill='none' x='350' y='100' />
<rect width='50' height='50' fill='none' x='350' y='100' />
<rect width='50' height='50' fill='red' x='0' y='150' />
<rect width='50' height='50' fill='red' x='700' y='150' />
<rect width='50' height='50' fill='red' x='50' y='150' />
<rect width='50' height='50' fill='red' x='650' y='150' />
<rect width='50' height='50' fill='red' x='100' y='150' />
<rect width='50' height='50' fill='red' x='600' y='150' />
<rect width='50' height='50' fill='none' x='150' y='150' />
<rect width='50' height='50' fill='none' x='550' y='150' />
<rect width='50' height='50' fill='none' x='200' y='150' />
<rect width='50' height='50' fill='none' x='500' y='150' />
<rect width='50' height='50' fill='red' x='250' y='150' />
<rect width='50' height='50' fill='red' x='450' y='150' />
<rect width='50' height='50' fill='none' x='300' y='150' />
<rect width='50' height='50' fill='none' x='400' y='150' />
<rect width='50' height='50' fill='red' x='350' y='150' />
<rect width='50' height='50' fill='red' x='350' y='150' />
<rect width='50' height='50' fill='none' x='0' y='200' />
<rect width='50' height='50' fill='none' x='700' y='200' />
<rect width='50' height='50' fill='none' x='50' y='200' />
<rect width='50' height='50' fill='none' x='650' y='200' />
<rect width='50' height='50' fill='none' x='100' y='200' />
<rect width='50' height='50' fill='none' x='600' y='200' />
<rect width='50' height='50' fill='none' x='150' y='200' />
<rect width='50' height='50' fill='none' x='550' y='200' />
<rect width='50' height='50' fill='red' x='200' y='200' />
<rect width='50' height='50' fill='red' x='500' y='200' />
<rect width='50' height='50' fill='none' x='250' y='200' />
<rect width='50' height='50' fill='none' x='450' y='200' />
<rect width='50' height='50' fill='red' x='300' y='200' />
<rect width='50' height='50' fill='red' x='400' y='200' />
<rect width='50' height='50' fill='none' x='350' y='200' />
<rect width='50' height='50' fill='none' x='350' y='200' />
<rect width='50' height='50' fill='none' x='0' y='250' />
<rect width='50' height='50' fill='none' x='700' y='250' />
<rect width='50' height='50' fill='none' x='50' y='250' />
<rect width='50' height='50' fill='none' x='650' y='250' />
<rect width='50' height='50' fill='none' x='100' y='250' />
<rect width='50' height='50' fill='none' x='600' y='250' />
<rect width='50' height='50' fill='none' x='150' y='250' />
<rect width='50' height='50' fill='none' x='550' y='250' />
<rect width='50' height='50' fill='red' x='200' y='250' />
<rect width='50' height='50' fill='red' x='500' y='250' />
<rect width='50' height='50' fill='red' x='250' y='250' />
<rect width='50' height='50' fill='red' x='450' y='250' />
<rect width='50' height='50' fill='red' x='300' y='250' />
<rect width='50' height='50' fill='red' x='400' y='250' />
<rect width='50' height='50' fill='none' x='350' y='250' />
<rect width='50' height='50' fill='none' x='350' y='250' />
<rect width='50' height='50' fill='red' x='0' y='300' />
<rect width='50' height='50' fill='red' x='700' y='300' />
<rect width='50' height='50' fill='red' x='50' y='300' />
<rect width='50' height='50' fill='red' x='650' y='300' />
<rect width='50' height='50' fill='none' x='100' y='300' />
<rect width='50' height='50' fill='none' x='600' y='300' />
<rect width='50' height='50' fill='none' x='150' y='300' />
<rect width='50' height='50' fill='none' x='550' y='300' />
<rect width='50' height='50' fill='red' x='200' y='300' />
<rect width='50' height='50' fill='red' x='500' y='300' />
<rect width='50' height='50' fill='red' x='250' y='300' />
<rect width='50' height='50' fill='red' x='450' y='300' />
<rect width='50' height='50' fill='none' x='300' y='300' />
<rect width='50' height='50' fill='none' x='400' y='300' />
<rect width='50' height='50' fill='none' x='350' y='300' />
<rect width='50' height='50' fill='none' x='350' y='300' />
<rect width='50' height='50' fill='red' x='0' y='350' />
<rect width='50' height='50' fill='red' x='700' y='350' />
<rect width='50' height='50' fill='red' x='50' y='350' />
<rect width='50' height='50' fill='red' x='650' y='350' />
<rect width='50' height='50' fill='none' x='100' y='350' />
<rect width='50' height='50' fill='none' x='600' y='350' />
<rect width='50' height='50' fill='none' x='150' y='350' />
<rect width='50' height='50' fill='none' x='550' y='350' />
<rect width='50' height='50' fill='none' x='200' y='350' />
<rect width='50' height='50' fill='none' x='500' y='350' />
<rect width='50' height='50' fill='red' x='250' y='350' />
<rect width='50' height='50' fill='red' x='450' y='350' />
<rect width='50' height='50' fill='none' x='300' y='350' />
<rect width='50' height='50' fill='none' x='400' y='350' />
<rect width='50' height='50' fill='red' x='350' y='350' />
<rect width='50' height='50' fill='red' x='350' y='350' />
<rect width='50' height='50' fill='red' x='0' y='400' />
<rect width='50' height='50' fill='red' x='700' y='400' />
<rect width='50' height='50' fill='none' x='50' y='400' />
<rect width='50' height='50' fill='none' x='650' y='400' />
<rect width='50' height='50' fill='red' x='100' y='400' />
<rect width='50' height='50' fill='red' x='600' y='400' />
<rect width='50' height='50' fill='none' x='150' y='400' />
<rect width='50' height='50' fill='none' x='550' y='400' />
<rect width='50' height='50' fill='none' x='200' y='400' />
<rect width='50' height='50' fill='none' x='500' y='400' />
<rect width='50' height='50' fill='none' x='250' y='400' />
<rect width='50' height='50' fill='none' x='450' y='400' />
<rect width='50' height='50' fill='none' x='300' y='400' />
<rect width='50' height='50' fill='none' x='400' y='400' />
<rect width='50' height='50' fill='none' x='350' y='400' />
<rect width='50' height='50' fill='none' x='350' y='400' />
<rect width='50' height='50' fill='none' x='0' y='450' />
<rect width='50' height='50' fill='none' x='700' y='450' />
<rect width='50' height='50' fill='red' x='50' y='450' />
<rect width='50' height='50' fill='red' x='650' y='450' />
<rect width='50' height='50' fill='red' x='100' y='450' />
<rect width='50' height='50' fill='red' x='600' y='450' />
<rect width='50' height='50' fill='none' x='150' y='450' />
<rect width='50' height='50' fill='none' x='550' y='450' />
<rect width='50' height='50' fill='red' x='200' y='450' />
<rect width='50' height='50' fill='red' x='500' y='450' />
<rect width='50' height='50' fill='red' x='250' y='450' />
<rect width='50' height='50' fill='red' x='450' y='450' />
<rect width='50' height='50' fill='red' x='300' y='450' />
<rect width='50' height='50' fill='red' x='400' y='450' />
<rect width='50' height='50' fill='none' x='350' y='450' />
<rect width='50' height='50' fill='none' x='350' y='450' />
<rect width='50' height='50' fill='red' x='0' y='500' />
<rect width='50' height='50' fill='red' x='700' y='500' />
<rect width='50' height='50' fill='red' x='50' y='500' />
<rect width='50' height='50' fill='red' x='650' y='500' />
<rect width='50' height='50' fill='red' x='100' y='500' />
<rect width='50' height='50' fill='red' x='600' y='500' />
<rect width='50' height='50' fill='none' x='150' y='500' />
<rect width='50' height='50' fill='none' x='550' y='500' />
<rect width='50' height='50' fill='red' x='200' y='500' />
<rect width='50' height='50' fill='red' x='500' y='500' />
<rect width='50' height='50' fill='red' x='250' y='500' />
<rect width='50' height='50' fill='red' x='450' y='500' />
<rect width='50' height='50' fill='red' x='300' y='500' />
<rect width='50' height='50' fill='red' x='400' y='500' />
<rect width='50' height='50' fill='red' x='350' y='500' />
<rect width='50' height='50' fill='red' x='350' y='500' />
<rect width='50' height='50' fill='red' x='0' y='550' />
<rect width='50' height='50' fill='red' x='700' y='550' />
<rect width='50' height='50' fill='none' x='50' y='550' />
<rect width='50' height='50' fill='none' x='650' y='550' />
<rect width='50' height='50' fill='none' x='100' y='550' />
<rect width='50' height='50' fill='none' x='600' y='550' />
<rect width='50' height='50' fill='red' x='150' y='550' />
<rect width='50' height='50' fill='red' x='550' y='550' />
<rect width='50' height='50' fill='red' x='200' y='550' />
<rect width='50' height='50' fill='red' x='500' y='550' />
<rect width='50' height='50' fill='none' x='250' y='550' />
<rect width='50' height='50' fill='none' x='450' y='550' />
<rect width='50' height='50' fill='none' x='300' y='550' />
<rect width='50' height='50' fill='none' x='400' y='550' />
<rect width='50' height='50' fill='none' x='350' y='550' />
<rect width='50' height='50' fill='none' x='350' y='550' />
<rect width='50' height='50' fill='red' x='0' y='600' />
<rect width='50' height='50' fill='red' x='700' y='600' />
<rect width='50' height='50' fill='none' x='50' y='600' />
<rect width='50' height='50' fill='none' x='650' y='600' />
<rect width='50' height='50' fill='none' x='100' y='600' />
<rect width='50' height='50' fill='none' x='600' y='600' />
<rect width='50' height='50' fill='red' x='150' y='600' />
<rect width='50' height='50' fill='red' x='550' y='600' />
<rect width='50' height='50' fill='red' x='200' y='600' />
<rect width='50' height='50' fill='red' x='500' y='600' />
<rect width='50' height='50' fill='none' x='250' y='600' />
<rect width='50' height='50' fill='none' x='450' y='600' />
<rect width='50' height='50' fill='none' x='300' y='600' />
<rect width='50' height='50' fill='none' x='400' y='600' />
<rect width='50' height='50' fill='red' x='350' y='600' />
<rect width='50' height='50' fill='red' x='350' y='600' />
<rect width='50' height='50' fill='none' x='0' y='650' />
<rect width='50' height='50' fill='none' x='700' y='650' />
<rect width='50' height='50' fill='red' x='50' y='650' />
<rect width='50' height='50' fill='red' x='650' y='650' />
<rect width='50' height='50' fill='red' x='100' y='650' />
<rect width='50' height='50' fill='red' x='600' y='650' />
<rect width='50' height='50' fill='none' x='150' y='650' />
<rect width='50' height='50' fill='none' x='550' y='650' />
<rect width='50' height='50' fill='none' x='200' y='650' />
<rect width='50' height='50' fill='none' x='500' y='650' />
<rect width='50' height='50' fill='none' x='250' y='650' />
<rect width='50' height='50' fill='none' x='450' y='650' />
<rect width='50' height='50' fill='none' x='300' y='650' />
<rect width='50' height='50' fill='none' x='400' y='650' />
<rect width='50' height='50' fill='red' x='350' y='650' />
<rect width='50' height='50' fill='red' x='350' y='650' />
<rect width='50' height='50' fill='red' x='0' y='700' />
<rect width='50' height='50' fill='red' x='700' y='700' />
<rect width='50' height='50' fill='red' x='50' y='700' />
<rect width='50' height='50' fill='red' x='650' y='700' />
<rect width='50' height='50' fill='none' x='100' y='700' />
<rect width='50' height='50' fill='none' x='600' y='700' />
<rect width='50' height='50' fill='red' x='150' y='700' />
<rect width='50' height='50' fill='red' x='550' y='700' />
<rect width='50' height='50' fill='none' x='200' y='700' />
<rect width='50' height='50' fill='none' x='500' y='700' />
<rect width='50' height='50' fill='none' x='250' y='700' />
<rect width='50' height='50' fill='none' x='450' y='700' />
<rect width='50' height='50' fill='red' x='300' y='700' />
<rect width='50' height='50' fill='red' x='400' y='700' />
<rect width='50' height='50' fill='none' x='350' y='700' />
<rect width='50' height='50' fill='none' x='350' y='700' />
</svg>

<svg version='1.1'
     viewbox='0 0 750 750'
     xmlns='http://www.w3.org/2000/svg'>
<rect width='750' height='750' fill='black' />
<rect width='50' height='50' fill='red' x='0' y='0' />
<rect width='50' height='50' fill='red' x='700' y='0' />
<rect width='50' height='50' fill='red' x='50' y='0' />
<rect width='50' height='50' fill='red' x='650' y='0' />
<rect width='50' height='50' fill='none' x='100' y='0' />
<rect width='50' height='50' fill='none' x='600' y='0' />
<rect width='50' height='50' fill='none' x='150' y='0' />
<rect width='50' height='50' fill='none' x='550' y='0' />
<rect width='50' height='50' fill='red' x='200' y='0' />
<rect width='50' height='50' fill='red' x='500' y='0' />
<rect width='50' height='50' fill='red' x='250' y='0' />
<rect width='50' height='50' fill='red' x='450' y='0' />
<rect width='50' height='50' fill='red' x='300' y='0' />
<rect width='50' height='50' fill='red' x='400' y='0' />
<rect width='50' height='50' fill='none' x='350' y='0' />
<rect width='50' height='50' fill='none' x='350' y='0' />
<rect width='50' height='50' fill='red' x='0' y='50' />
<rect width='50' height='50' fill='red' x='700' y='50' />
<rect width='50' height='50' fill='none' x='50' y='50' />
<rect width='50' height='50' fill='none' x='650' y='50' />
<rect width='50' height='50' fill='none' x='100' y='50' />
<rect width='50' height='50' fill='none' x='600' y='50' />
<rect width='50' height='50' fill='none' x='150' y='50' />
<rect width='50' height='50' fill='none' x='550' y='50' />
<rect width='50' height='50' fill='none' x='200' y='50' />
<rect width='50' height='50' fill='none' x='500' y='50' />
<rect width='50' height='50' fill='none' x='250' y='50' />
<rect width='50' height='50' fill='none' x='450' y='50' />
<rect width='50' height='50' fill='red' x='300' y='50' />
<rect width='50' height='50' fill='red' x='400' y='50' />
<rect width='50' height='50' fill='none' x='350' y='50' />
<rect width='50' height='50' fill='none' x='350' y='50' />
<rect width='50' height='50' fill='none' x='0' y='100' />
<rect width='50' height='50' fill='none' x='700' y='100' />
<rect width='50' height='50' fill='none' x='50' y='100' />
<rect width='50' height='50' fill='none' x='650' y='100' />
<rect width='50' height='50' fill='red' x='100' y='100' />
<rect width='50' height='50' fill='red' x='600' y='100' />
<rect width='50' height='50' fill='none' x='150' y='100' />
<rect width='50' height='50' fill='none' x='550' y='100' />
<rect width='50' height='50' fill='none' x='200' y='100' />
<rect width='50' height='50' fill='none' x='500' y='100' />
<rect width='50' height='50' fill='none' x='250' y='100' />
<rect width='50' height='50' fill='none' x='450' y='100' />
<rect width='50' height='50' fill='red' x='300' y='100' />
<rect width='50' height='50' fill='red' x='400' y='100' />
<rect width='50' height='50' fill='none' x='350' y='100' />
<rect width='50' height='50' fill='none' x='350' y='100' />
<rect width='50' height='50' fill='red' x='0' y='150' />
<rect width='50' height='50' fill='red' x='700' y='150' />
<rect width='50' height='50' fill='red' x='50' y='150' />
<rect width='50' height='50' fill='red' x='650' y='150' />
<rect width='50' height='50' fill='red' x='100' y='150' />
<rect width='50' height='50' fill='red' x='600' y='150' />
<rect width='50' height='50' fill='red' x='150' y='150' />
<rect width='50' height='50' fill='red' x='550' y='150' />
<rect width='50' height='50' fill='none' x='200' y='150' />
<rect width='50' height='50' fill='none' x='500' y='150' />
<rect width='50' height='50' fill='none' x='250' y='150' />
<rect width='50' height='50' fill='none' x='450' y='150' />
<rect width='50' height='50' fill='none' x='300' y='150' />
<rect width='50' height='50' fill='none' x='400' y='150' />
<rect width='50' height='50' fill='none' x='350' y='150' />
<rect width='50' height='50' fill='none' x='350' y='150' />
<rect width='50' height='50' fill='red' x='0' y='200' />
<rect width='50' height='50' fill='red' x='700' y='200' />
<rect width='50' height='50' fill='red' x='50' y='200' />
<rect width='50' height='50' fill='red' x='650' y='200' />
<rect width='50' height='50' fill='none' x='100' y='200' />
<rect width='50' height='50' fill='none' x='600' y='200' />
<rect width='50' height='50' fill='none' x='150' y='200' />
<rect width='50' height='50' fill='none' x='550' y='200' />
<rect width='50' height='50' fill='none' x='200' y='200' />
<rect width='50' height='50' fill='none' x='500' y='200' />
<rect width='50' height='50' fill='red' x='250' y='200' />
<rect width='50' height='50' fill='red' x='450' y='200' />
<rect width='50' height='50' fill='none' x='300' y='200' />
<rect width='50' height='50' fill='none' x='400' y='200' />
<rect width='50' height='50' fill='red' x='350' y='200' />
<rect width='50' height='50' fill='red' x='350' y='200' />
<rect width='50' height='50' fill='none' x='0' y='250' />
<rect width='50' height='50' fill='none' x='700' y='250' />
<rect width='50' height='50' fill='none' x='50' y='250' />
<rect width='50' height='50' fill='none' x='650' y='250' />
<rect width='50' height='50' fill='none' x='100' y='250' />
<rect width='50' height='50' fill='none' x='600' y='250' />
<rect width='50' height='50' fill='none' x='150' y='250' />
<rect width='50' height='50' fill='none' x='550' y='250' />
<rect width='50' height='50' fill='red' x='200' y='250' />
<rect width='50' height='50' fill='red' x='500' y='250' />
<rect width='50' height='50' fill='none' x='250' y='250' />
<rect width='50' height='50' fill='none' x='450' y='250' />
<rect width='50' height='50' fill='red' x='300' y='250' />
<rect width='50' height='50' fill='red' x='400' y='250' />
<rect width='50' height='50' fill='red' x='350' y='250' />
<rect width='50' height='50' fill='red' x='350' y='250' />
<rect width='50' height='50' fill='none' x='0' y='300' />
<rect width='50' height='50' fill='none' x='700' y='300' />
<rect width='50' height='50' fill='red' x='50' y='300' />
<rect width='50' height='50' fill='red' x='650' y='300' />
<rect width='50' height='50' fill='none' x='100' y='300' />
<rect width='50' height='50' fill='none' x='600' y='300' />
<rect width='50' height='50' fill='none' x='150' y='300' />
<rect width='50' height='50' fill='none' x='550' y='300' />
<rect width='50' height='50' fill='red' x='200' y='300' />
<rect width='50' height='50' fill='red' x='500' y='300' />
<rect width='50' height='50' fill='red' x='250' y='300' />
<rect width='50' height='50' fill='red' x='450' y='300' />
<rect width='50' height='50' fill='red' x='300' y='300' />
<rect width='50' height='50' fill='red' x='400' y='300' />
<rect width='50' height='50' fill='none' x='350' y='300' />
<rect width='50' height='50' fill='none' x='350' y='300' />
<rect width='50' height='50' fill='red' x='0' y='350' />
<rect width='50' height='50' fill='red' x='700' y='350' />
<rect width='50' height='50' fill='none' x='50' y='350' />
<rect width='50' height='50' fill='none' x='650' y='350' />
<rect width='50' height='50' fill='red' x='100' y='350' />
<rect width='50' height='50' fill='red' x='600' y='350' />
<rect width='50' height='50' fill='none' x='150' y='350' />
<rect width='50' height='50' fill='none' x='550' y='350' />
<rect width='50' height='50' fill='red' x='200' y='350' />
<rect width='50' height='50' fill='red' x='500' y='350' />
<rect width='50' height='50' fill='red' x='250' y='350' />
<rect width='50' height='50' fill='red' x='450' y='350' />
<rect width='50' height='50' fill='red' x='300' y='350' />
<rect width='50' height='50' fill='red' x='400' y='350' />
<rect width='50' height='50' fill='red' x='350' y='350' />
<rect width='50' height='50' fill='red' x='350' y='350' />
<rect width='50' height='50' fill='red' x='0' y='400' />
<rect width='50' height='50' fill='red' x='700' y='400' />
<rect width='50' height='50' fill='red' x='50' y='400' />
<rect width='50' height='50' fill='red' x='650' y='400' />
<rect width='50' height='50' fill='none' x='100' y='400' />
<rect width='50' height='50' fill='none' x='600' y='400' />
<rect width='50' height='50' fill='red' x='150' y='400' />
<rect width='50' height='50' fill='red' x='550' y='400' />
<rect width='50' height='50' fill='red' x='200' y='400' />
<rect width='50' height='50' fill='red' x='500' y='400' />
<rect width='50' height='50' fill='red' x='250' y='400' />
<rect width='50' height='50' fill='red' x='450' y='400' />
<rect width='50' height='50' fill='red' x='300' y='400' />
<rect width='50' height='50' fill='red' x='400' y='400' />
<rect width='50' height='50' fill='none' x='350' y='400' />
<rect width='50' height='50' fill='none' x='350' y='400' />
<rect width='50' height='50' fill='red' x='0' y='450' />
<rect width='50' height='50' fill='red' x='700' y='450' />
<rect width='50' height='50' fill='red' x='50' y='450' />
<rect width='50' height='50' fill='red' x='650' y='450' />
<rect width='50' height='50' fill='red' x='100' y='450' />
<rect width='50' height='50' fill='red' x='600' y='450' />
<rect width='50' height='50' fill='red' x='150' y='450' />
<rect width='50' height='50' fill='red' x='550' y='450' />
<rect width='50' height='50' fill='red' x='200' y='450' />
<rect width='50' height='50' fill='red' x='500' y='450' />
<rect width='50' height='50' fill='red' x='250' y='450' />
<rect width='50' height='50' fill='red' x='450' y='450' />
<rect width='50' height='50' fill='none' x='300' y='450' />
<rect width='50' height='50' fill='none' x='400' y='450' />
<rect width='50' height='50' fill='none' x='350' y='450' />
<rect width='50' height='50' fill='none' x='350' y='450' />
<rect width='50' height='50' fill='red' x='0' y='500' />
<rect width='50' height='50' fill='red' x='700' y='500' />
<rect width='50' height='50' fill='none' x='50' y='500' />
<rect width='50' height='50' fill='none' x='650' y='500' />
<rect width='50' height='50' fill='red' x='100' y='500' />
<rect width='50' height='50' fill='red' x='600' y='500' />
<rect width='50' height='50' fill='red' x='150' y='500' />
<rect width='50' height='50' fill='red' x='550' y='500' />
<rect width='50' height='50' fill='red' x='200' y='500' />
<rect width='50' height='50' fill='red' x='500' y='500' />
<rect width='50' height='50' fill='red' x='250' y='500' />
<rect width='50' height='50' fill='red' x='450' y='500' />
<rect width='50' height='50' fill='red' x='300' y='500' />
<rect width='50' height='50' fill='red' x='400' y='500' />
<rect width='50' height='50' fill='red' x='350' y='500' />
<rect width='50' height='50' fill='red' x='350' y='500' />
<rect width='50' height='50' fill='red' x='0' y='550' />
<rect width='50' height='50' fill='red' x='700' y='550' />
<rect width='50' height='50' fill='none' x='50' y='550' />
<rect width='50' height='50' fill='none' x='650' y='550' />
<rect width='50' height='50' fill='red' x='100' y='550' />
<rect width='50' height='50' fill='red' x='600' y='550' />
<rect width='50' height='50' fill='red' x='150' y='550' />
<rect width='50' height='50' fill='red' x='550' y='550' />
<rect width='50' height='50' fill='red' x='200' y='550' />
<rect width='50' height='50' fill='red' x='500' y='550' />
<rect width='50' height='50' fill='none' x='250' y='550' />
<rect width='50' height='50' fill='none' x='450' y='550' />
<rect width='50' height='50' fill='red' x='300' y='550' />
<rect width='50' height='50' fill='red' x='400' y='550' />
<rect width='50' height='50' fill='none' x='350' y='550' />
<rect width='50' height='50' fill='none' x='350' y='550' />
<rect width='50' height='50' fill='red' x='0' y='600' />
<rect width='50' height='50' fill='red' x='700' y='600' />
<rect width='50' height='50' fill='red' x='50' y='600' />
<rect width='50' height='50' fill='red' x='650' y='600' />
<rect width='50' height='50' fill='none' x='100' y='600' />
<rect width='50' height='50' fill='none' x='600' y='600' />
<rect width='50' height='50' fill='red' x='150' y='600' />
<rect width='50' height='50' fill='red' x='550' y='600' />
<rect width='50' height='50' fill='none' x='200' y='600' />
<rect width='50' height='50' fill='none' x='500' y='600' />
<rect width='50' height='50' fill='none' x='250' y='600' />
<rect width='50' height='50' fill='none' x='450' y='600' />
<rect width='50' height='50' fill='none' x='300' y='600' />
<rect width='50' height='50' fill='none' x='400' y='600' />
<rect width='50' height='50' fill='none' x='350' y='600' />
<rect width='50' height='50' fill='none' x='350' y='600' />
<rect width='50' height='50' fill='none' x='0' y='650' />
<rect width='50' height='50' fill='none' x='700' y='650' />
<rect width='50' height='50' fill='red' x='50' y='650' />
<rect width='50' height='50' fill='red' x='650' y='650' />
<rect width='50' height='50' fill='none' x='100' y='650' />
<rect width='50' height='50' fill='none' x='600' y='650' />
<rect width='50' height='50' fill='none' x='150' y='650' />
<rect width='50' height='50' fill='none' x='550' y='650' />
<rect width='50' height='50' fill='none' x='200' y='650' />
<rect width='50' height='50' fill='none' x='500' y='650' />
<rect width='50' height='50' fill='none' x='250' y='650' />
<rect width='50' height='50' fill='none' x='450' y='650' />
<rect width='50' height='50' fill='none' x='300' y='650' />
<rect width='50' height='50' fill='none' x='400' y='650' />
<rect width='50' height='50' fill='red' x='350' y='650' />
<rect width='50' height='50' fill='red' x='350' y='650' />
<rect width='50' height='50' fill='red' x='0' y='700' />
<rect width='50' height='50' fill='red' x='700' y='700' />
<rect width='50' height='50' fill='red' x='50' y='700' />
<rect width='50' height='50' fill='red' x='650' y='700' />
<rect width='50' height='50' fill='none' x='100' y='700' />
<rect width='50' height='50' fill='none' x='600' y='700' />
<rect width='50' height='50' fill='none' x='150' y='700' />
<rect width='50' height='50' fill='none' x='550' y='700' />
<rect width='50' height='50' fill='red' x='200' y='700' />
<rect width='50' height='50' fill='red' x='500' y='700' />
<rect width='50' height='50' fill='none' x='250' y='700' />
<rect width='50' height='50' fill='none' x='450' y='700' />
<rect width='50' height='50' fill='red' x='300' y='700' />
<rect width='50' height='50' fill='red' x='400' y='700' />
<rect width='50' height='50' fill='none' x='350' y='700' />
<rect width='50' height='50' fill='none' x='350' y='700' />
</svg>

<svg version='1.1'
     viewbox='0 0 750 750'
     xmlns='http://www.w3.org/2000/svg'>
<rect width='750' height='750' fill='black' />
<rect width='50' height='50' fill='none' x='0' y='0' />
<rect width='50' height='50' fill='none' x='700' y='0' />
<rect width='50' height='50' fill='none' x='50' y='0' />
<rect width='50' height='50' fill='none' x='650' y='0' />
<rect width='50' height='50' fill='red' x='100' y='0' />
<rect width='50' height='50' fill='red' x='600' y='0' />
<rect width='50' height='50' fill='none' x='150' y='0' />
<rect width='50' height='50' fill='none' x='550' y='0' />
<rect width='50' height='50' fill='red' x='200' y='0' />
<rect width='50' height='50' fill='red' x='500' y='0' />
<rect width='50' height='50' fill='red' x='250' y='0' />
<rect width='50' height='50' fill='red' x='450' y='0' />
<rect width='50' height='50' fill='red' x='300' y='0' />
<rect width='50' height='50' fill='red' x='400' y='0' />
<rect width='50' height='50' fill='red' x='350' y='0' />
<rect width='50' height='50' fill='red' x='350' y='0' />
<rect width='50' height='50' fill='red' x='0' y='50' />
<rect width='50' height='50' fill='red' x='700' y='50' />
<rect width='50' height='50' fill='none' x='50' y='50' />
<rect width='50' height='50' fill='none' x='650' y='50' />
<rect width='50' height='50' fill='red' x='100' y='50' />
<rect width='50' height='50' fill='red' x='600' y='50' />
<rect width='50' height='50' fill='none' x='150' y='50' />
<rect width='50' height='50' fill='none' x='550' y='50' />
<rect width='50' height='50' fill='none' x='200' y='50' />
<rect width='50' height='50' fill='none' x='500' y='50' />
<rect width='50' height='50' fill='none' x='250' y='50' />
<rect width='50' height='50' fill='none' x='450' y='50' />
<rect width='50' height='50' fill='red' x='300' y='50' />
<rect width='50' height='50' fill='red' x='400' y='50' />
<rect width='50' height='50' fill='none' x='350' y='50' />
<rect width='50' height='50' fill='none' x='350' y='50' />
<rect width='50' height='50' fill='red' x='0' y='100' />
<rect width='50' height='50' fill='red' x='700' y='100' />
<rect width='50' height='50' fill='none' x='50' y='100' />
<rect width='50' height='50' fill='none' x='650' y='100' />
<rect width='50' height='50' fill='none' x='100' y='100' />
<rect width='50' height='50' fill='none' x='600' y='100' />
<rect width='50' height='50' fill='red' x='150' y='100' />
<rect width='50' height='50' fill='red' x='550' y='100' />
<rect width='50' height='50' fill='none' x='200' y='100' />
<rect width='50' height='50' fill='none' x='500' y='100' />
<rect width='50' height='50' fill='none' x='250' y='100' />
<rect width='50' height='50' fill='none' x='450' y='100' />
<rect width='50' height='50' fill='red' x='300' y='100' />
<rect width='50' height='50' fill='red' x='400' y='100' />
<rect width='50' height='50' fill='red' x='350' y='100' />
<rect width='50' height='50' fill='red' x='350' y='100' />
<rect width='50' height='50' fill='none' x='0' y='150' />
<rect width='50' height='50' fill='none' x='700' y='150' />
<rect width='50' height='50' fill='none' x='50' y='150' />
<rect width='50' height='50' fill='none' x='650' y='150' />
<rect width='50' height='50' fill='none' x='100' y='150' />
<rect width='50' height='50' fill='none' x='600' y='150' />
<rect width='50' height='50' fill='none' x='150' y='150' />
<rect width='50' height='50' fill='none' x='550' y='150' />
<rect width='50' height='50' fill='none' x='200' y='150' />
<rect width='50' height='50' fill='none' x='500' y='150' />
<rect width='50' height='50' fill='none' x='250' y='150' />
<rect width='50' height='50' fill='none' x='450' y='150' />
<rect width='50' height='50' fill='none' x='300' y='150' />
<rect width='50' height='50' fill='none' x='400' y='150' />
<rect width='50' height='50' fill='none' x='350' y='150' />
<rect width='50' height='50' fill='none' x='350' y='150' />
<rect width='50' height='50' fill='red' x='0' y='200' />
<rect width='50' height='50' fill='red' x='700' y='200' />
<rect width='50' height='50' fill='none' x='50' y='200' />
<rect width='50' height='50' fill='none' x='650' y='200' />
<rect width='50' height='50' fill='red' x='100' y='200' />
<rect width='50' height='50' fill='red' x='600' y='200' />
<rect width='50' height='50' fill='red' x='150' y='200' />
<rect width='50' height='50' fill='red' x='550' y='200' />
<rect width='50' height='50' fill='none' x='200' y='200' />
<rect width='50' height='50' fill='none' x='500' y='200' />
<rect width='50' height='50' fill='red' x='250' y='200' />
<rect width='50' height='50' fill='red' x='450' y='200' />
<rect width='50' height='50' fill='red' x='300' y='200' />
<rect width='50' height='50' fill='red' x='400' y='200' />
<rect width='50' height='50' fill='red' x='350' y='200' />
<rect width='50' height='50' fill='red' x='350' y='200' />
<rect width='50' height='50' fill='none' x='0' y='250' />
<rect width='50' height='50' fill='none' x='700' y='250' />
<rect width='50' height='50' fill='red' x='50' y='250' />
<rect width='50' height='50' fill='red' x='650' y='250' />
<rect width='50' height='50' fill='none' x='100' y='250' />
<rect width='50' height='50' fill='none' x='600' y='250' />
<rect width='50' height='50' fill='none' x='150' y='250' />
<rect width='50' height='50' fill='none' x='550' y='250' />
<rect width='50' height='50' fill='none' x='200' y='250' />
<rect width='50' height='50' fill='none' x='500' y='250' />
<rect width='50' height='50' fill='none' x='250' y='250' />
<rect width='50' height='50' fill='none' x='450' y='250' />
<rect width='50' height='50' fill='red' x='300' y='250' />
<rect width='50' height='50' fill='red' x='400' y='250' />
<rect width='50' height='50' fill='red' x='350' y='250' />
<rect width='50' height='50' fill='red' x='350' y='250' />
<rect width='50' height='50' fill='red' x='0' y='300' />
<rect width='50' height='50' fill='red' x='700' y='300' />
<rect width='50' height='50' fill='none' x='50' y='300' />
<rect width='50' height='50' fill='none' x='650' y='300' />
<rect width='50' height='50' fill='none' x='100' y='300' />
<rect width='50' height='50' fill='none' x='600' y='300' />
<rect width='50' height='50' fill='red' x='150' y='300' />
<rect width='50' height='50' fill='red' x='550' y='300' />
<rect width='50' height='50' fill='none' x='200' y='300' />
<rect width='50' height='50' fill='none' x='500' y='300' />
<rect width='50' height='50' fill='none' x='250' y='300' />
<rect width='50' height='50' fill='none' x='450' y='300' />
<rect width='50' height='50' fill='red' x='300' y='300' />
<rect width='50' height='50' fill='red' x='400' y='300' />
<rect width='50' height='50' fill='red' x='350' y='300' />
<rect width='50' height='50' fill='red' x='350' y='300' />
<rect width='50' height='50' fill='none' x='0' y='350' />
<rect width='50' height='50' fill='none' x='700' y='350' />
<rect width='50' height='50' fill='red' x='50' y='350' />
<rect width='50' height='50' fill='red' x='650' y='350' />
<rect width='50' height='50' fill='none' x='100' y='350' />
<rect width='50' height='50' fill='none' x='600' y='350' />
<rect width='50' height='50' fill='none' x='150' y='350' />
<rect width='50' height='50' fill='none' x='550' y='350' />
<rect width='50' height='50' fill='red' x='200' y='350' />
<rect width='50' height='50' fill='red' x='500' y='350' />
<rect width='50' height='50' fill='none' x='250' y='350' />
<rect width='50' height='50' fill='none' x='450' y='350' />
<rect width='50' height='50' fill='red' x='300' y='350' />
<rect width='50' height='50' fill='red' x='400' y='350' />
<rect width='50' height='50' fill='red' x='350' y='350' />
<rect width='50' height='50' fill='red' x='350' y='350' />
<rect width='50' height='50' fill='red' x='0' y='400' />
<rect width='50' height='50' fill='red' x='700' y='400' />
<rect width='50' height='50' fill='none' x='50' y='400' />
<rect width='50' height='50' fill='none' x='650' y='400' />
<rect width='50' height='50' fill='none' x='100' y='400' />
<rect width='50' height='50' fill='none' x='600' y='400' />
<rect width='50' height='50' fill='none' x='150' y='400' />
<rect width='50' height='50' fill='none' x='550' y='400' />
<rect width='50' height='50' fill='none' x='200' y='400' />
<rect width='50' height='50' fill='none' x='500' y='400' />
<rect width='50' height='50' fill='none' x='250' y='400' />
<rect width='50' height='50' fill='none' x='450' y='400' />
<rect width='50' height='50' fill='none' x='300' y='400' />
<rect width='50' height='50' fill='none' x='400' y='400' />
<rect width='50' height='50' fill='red' x='350' y='400' />
<rect width='50' height='50' fill='red' x='350' y='400' />
<rect width='50' height='50' fill='red' x='0' y='450' />
<rect width='50' height='50' fill='red' x='700' y='450' />
<rect width='50' height='50' fill='none' x='50' y='450' />
<rect width='50' height='50' fill='none' x='650' y='450' />
<rect width='50' height='50' fill='red' x='100' y='450' />
<rect width='50' height='50' fill='red' x='600' y='450' />
<rect width='50' height='50' fill='none' x='150' y='450' />
<rect width='50' height='50' fill='none' x='550' y='450' />
<rect width='50' height='50' fill='red' x='200' y='450' />
<rect width='50' height='50' fill='red' x='500' y='450' />
<rect width='50' height='50' fill='red' x='250' y='450' />
<rect width='50' height='50' fill='red' x='450' y='450' />
<rect width='50' height='50' fill='none' x='300' y='450' />
<rect width='50' height='50' fill='none' x='400' y='450' />
<rect width='50' height='50' fill='none' x='350' y='450' />
<rect width='50' height='50' fill='none' x='350' y='450' />
<rect width='50' height='50' fill='red' x='0' y='500' />
<rect width='50' height='50' fill='red' x='700' y='500' />
<rect width='50' height='50' fill='red' x='50' y='500' />
<rect width='50' height='50' fill='red' x='650' y='500' />
<rect width='50' height='50' fill='none' x='100' y='500' />
<rect width='50' height='50' fill='none' x='600' y='500' />
<rect width='50' height='50' fill='red' x='150' y='500' />
<rect width='50' height='50' fill='red' x='550' y='500' />
<rect width='50' height='50' fill='none' x='200' y='500' />
<rect width='50' height='50' fill='none' x='500' y='500' />
<rect width='50' height='50' fill='red' x='250' y='500' />
<rect width='50' height='50' fill='red' x='450' y='500' />
<rect width='50' height='50' fill='red' x='300' y='500' />
<rect width='50' height='50' fill='red' x='400' y='500' />
<rect width='50' height='50' fill='none' x='350' y='500' />
<rect width='50' height='50' fill='none' x='350' y='500' />
<rect width='50' height='50' fill='none' x='0' y='550' />
<rect width='50' height='50' fill='none' x='700' y='550' />
<rect width='50' height='50' fill='red' x='50' y='550' />
<rect width='50' height='50' fill='red' x='650' y='550' />
<rect width='50' height='50' fill='none' x='100' y='550' />
<rect width='50' height='50' fill='none' x='600' y='550' />
<rect width='50' height='50' fill='none' x='150' y='550' />
<rect width='50' height='50' fill='none' x='550' y='550' />
<rect width='50' height='50' fill='red' x='200' y='550' />
<rect width='50' height='50' fill='red' x='500' y='550' />
<rect width='50' height='50' fill='none' x='250' y='550' />
<rect width='50' height='50' fill='none' x='450' y='550' />
<rect width='50' height='50' fill='red' x='300' y='550' />
<rect width='50' height='50' fill='red' x='400' y='550' />
<rect width='50' height='50' fill='none' x='350' y='550' />
<rect width='50' height='50' fill='none' x='350' y='550' />
<rect width='50' height='50' fill='none' x='0' y='600' />
<rect width='50' height='50' fill='none' x='700' y='600' />
<rect width='50' height='50' fill='none' x='50' y='600' />
<rect width='50' height='50' fill='none' x='650' y='600' />
<rect width='50' height='50' fill='none' x='100' y='600' />
<rect width='50' height='50' fill='none' x='600' y='600' />
<rect width='50' height='50' fill='none' x='150' y='600' />
<rect width='50' height='50' fill='none' x='550' y='600' />
<rect width='50' height='50' fill='red' x='200' y='600' />
<rect width='50' height='50' fill='red' x='500' y='600' />
<rect width='50' height='50' fill='red' x='250' y='600' />
<rect width='50' height='50' fill='red' x='450' y='600' />
<rect width='50' height='50' fill='none' x='300' y='600' />
<rect width='50' height='50' fill='none' x='400' y='600' />
<rect width='50' height='50' fill='red' x='350' y='600' />
<rect width='50' height='50' fill='red' x='350' y='600' />
<rect width='50' height='50' fill='none' x='0' y='650' />
<rect width='50' height='50' fill='none' x='700' y='650' />
<rect width='50' height='50' fill='red' x='50' y='650' />
<rect width='50' height='50' fill='red' x='650' y='650' />
<rect width='50' height='50' fill='red' x='100' y='650' />
<rect width='50' height='50' fill='red' x='600' y='650' />
<rect width='50' height='50' fill='none' x='150' y='650' />
<rect width='50' height='50' fill='none' x='550' y='650' />
<rect width='50' height='50' fill='red' x='200' y='650' />
<rect width='50' height='50' fill='red' x='500' y='650' />
<rect width='50' height='50' fill='red' x='250' y='650' />
<rect width='50' height='50' fill='red' x='450' y='650' />
<rect width='50' height='50' fill='red' x='300' y='650' />
<rect width='50' height='50' fill='red' x='400' y='650' />
<rect width='50' height='50' fill='red' x='350' y='650' />
<rect width='50' height='50' fill='red' x='350' y='650' />
<rect width='50' height='50' fill='none' x='0' y='700' />
<rect width='50' height='50' fill='none' x='700' y='700' />
<rect width='50' height='50' fill='red' x='50' y='700' />
<rect width='50' height='50' fill='red' x='650' y='700' />
<rect width='50' height='50' fill='red' x='100' y='700' />
<rect width='50' height='50' fill='red' x='600' y='700' />
<rect width='50' height='50' fill='red' x='150' y='700' />
<rect width='50' height='50' fill='red' x='550' y='700' />
<rect width='50' height='50' fill='none' x='200' y='700' />
<rect width='50' height='50' fill='none' x='500' y='700' />
<rect width='50' height='50' fill='none' x='250' y='700' />
<rect width='50' height='50' fill='none' x='450' y='700' />
<rect width='50' height='50' fill='none' x='300' y='700' />
<rect width='50' height='50' fill='none' x='400' y='700' />
<rect width='50' height='50' fill='none' x='350' y='700' />
<rect width='50' height='50' fill='none' x='350' y='700' />
</svg>

<style>
    svg {
        max-width: 15rem;
    }
</style>

## Installing Rust

Installing Rust was super easy, I just used the command from <https://rustup.rs/>.

## Installing VSCodium extensions

Well, first I installed using `sudo apt install cargo`, but then the VSCodium extension I installed ([Rust](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)) suggested I should use `rustup`, so I uninstalled `cargo` and used `rustup`.

Then, I also found out that the VSCodium extension was deprecated in favour of the [`rust-analyzer`](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) extension, so I installed that one instead. I also installed [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) to allow debugging.

## Running Rust

After installing Cargo, I ran `cargo` and it complained about a missing `Cargo.toml`, so I guessed I could run…

```bash
cargo init
```

…to create this, and it worked! Neat. It also showed a nice link to the documentation for `Cargo.toml`. I still haven't opened the `Cargo.toml` file. Anyway, `cargo init` also created a "hello world" script:

```rust
fn main() {
    println!("Hello, world!");
}
```

…which I could run with `cargo run`…

```bash
$ cargo run
Hello, world!
```

At this point, I got stuck in trying to make the above identicons. I (naturally) came across a few stumbling blocks, but the errors that the compiler provides were quite nice, so I got along OK.

Here's the final code I ended up with (feel free to tell me that several sections are "bad" or "not Rust-y")

```rust
use rand::prelude::*;

const WIDTH: usize = 15;
const HEIGHT: usize = 15;
const SQUARE_SIZE: usize = 50;
const SVG_WIDTH: usize = WIDTH * SQUARE_SIZE;
const SVG_HEIGHT: usize = HEIGHT * SQUARE_SIZE;

fn main() {
    let mut rng = rand::rng();

    // generate one half of the identicon
    // let mut arr: [[bool; 0]; 0] = [];
    let mut arr: Vec<Vec<bool>> = vec![];
    for r in 0..HEIGHT {
        let empty_arr: Vec<bool> = vec![];
        arr.push(empty_arr);
        for _c in 0..((WIDTH + 1) / 2) {
            let random_val = rng.random_bool(0.5);
            arr[r].push(random_val);
        }
    }

    // print the SVG
    println!(
        "<svg version='1.1'
     viewbox='0 0 {} {}'
     xmlns='http://www.w3.org/2000/svg'>",
        SVG_WIDTH, SVG_HEIGHT
    );
    println!(
        "<rect width='{}' height='{}' fill='black' />",
        SVG_WIDTH, SVG_HEIGHT
    );
    for r in 0..arr.len() {
        let arr_first = arr.first();
        let mut cols = 0;
        if let Some(arr_first) = arr_first {
            cols = arr_first.len();
        }
        for c in 0..cols {
            let xleft = c * SQUARE_SIZE;
            let xright = SVG_WIDTH - xleft - SQUARE_SIZE;
            let y = r * SQUARE_SIZE;

            let filled = arr[r][c];
            let mut colour = "none";
            if filled {
                colour = "red";
            }

            println!(
                "<rect width='50' height='50' fill='{}' x='{}' y='{}' />",
                colour, xleft, y
            );
            println!(
                "<rect width='50' height='50' fill='{}' x='{}' y='{}' />",
                colour, xright, y
            );
        }
    }
    println!(r#"</svg>"#);
}
```

## Sticking points

Two things that I got a bit stuck with were:

### Not declaring loads of variables

I wasn't sure how to do a lot of things "in-line", and ended up declaring lots of variables, making the code quite verbose. For example, to push an empty vector to another vector I ended up doing (above) this…

```rust
let empty_arr: Vec<bool> = vec![];
arr.push(empty_arr);
```

…which I'm sure could be done in one line somehow. I don't know how.

### Finding the length of an `Option`

To get the length of an embedded `Vec` (vector), I wanted to run `arr.first().len()` in some way, but `arr.first()` is either a vector or `None` (i.e., an optional/`Option`). I wanted to do something like:

```rust
if arr.first().is_none() {
  let cols = 0;
} else {
  let cols = arr.first().len();
}
```

…assuming that the compiler would realise that in the `else` section, `arr.first()` was not `None`, but it didn't. I don't know enough to figure out a way of doing this.

## The End

It was quite fun using Rust for the first time.

Identicons are a lovely first project.

Perhaps I'll touch Rust again. Perhaps I won't.
