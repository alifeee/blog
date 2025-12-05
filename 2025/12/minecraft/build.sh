#!/bin/bash
# make webpage for image comparisons

tempfile="/tmp/92jf92jf2.html"

cat << EOHTML > "${tempfile}"
<!DOCTYPE html>
<html>
<head>
<title>alifeee - Pictures from a proximity voice chat Minecraft server</title>
<!-- browser metas -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta
  name="description"
  content="Side-by-side comparison pictures of a developed Minecraft world with the initial empty world"
/>

<!-- embed metas - https://ogp.me/ -->
<meta property="og:title" content="Pictures from a proximity voice chat Minecraft server" />
<meta property="og:type" content="website" />
<meta property="og:site" content="alifeee's blog" />
<meta
  property="og:url"
  content="https://blog.alifeee.net/2025/12/minecraft/"
/>
<meta
  property="og:image"
  content="https://blog.alifeee.net/2025/12/minecraft/og-image.webp"
/>
<meta
  property="og:description"
  content="Side-by-side comparison pictures of a developed Minecraft world with the initial empty world"
/>
<meta property="og:locale" content="en_GB" />

<!-- RSS link -->
<link
  rel="alternate"
  type="application/rss+xml"
  title="RSS Feed for blog.alifeee.net"
  href="/feed.xml"
/>

<!-- link to mastodon -->
<meta property="fediverse:creator" content="@alifeee@mastodon.social" />

<!-- favicon -->
<link rel="icon" type="image/png" href="/favicon.png" />

<meta name="viewport" content="width=device-width, initial-scale=1" />
<script defer src="slide.js"></script>
<script>
EOHTML

cat script.js >> "${tempfile}"

cat << EOHTML >> "${tempfile}"
</script>
<link rel="stylesheet" href="slide.css"/>
<style>
EOHTML

cat style.css >> "${tempfile}"

cat << EOHTML >> "${tempfile}"
</style>
</head>
<body>
<header>
<h1 id="top">Pictures from a proximity voice chat Minecraft server</h1>
<p><a href="/">back to main page</a></p>
<p>Table of Contents</p>
<ul>
<li><a href="#top">Introduction</a></li>
<li><a href="#qr-code">Pictures</a></li>
<li><a href="#custompic">Custom pictures</a></li>
</ul>

<p>I have fallen into a pattern of organising my group of friends to play a different video game each year with proximity chat. Sometimes proximity chat exists as a feature in the game. Sometimes <a href="/factorio-proximity-chat/">I have to mod it in</a>.</p>
<p>This year, I hosted Minecraft; once a week for a few hours every Tuesday evening. Most people (including me) stopped playing after a few months, and a few people still log on every week.</p>
<p>As well as providing an online <a href="https://github.com/webbukkit/dynmap">DynMap</a> on <a href="https://map.mc.alifeee.net/">map.mc.alifeee.net</a>, I took some time this week to take screenshots of a few areas in the world which have been built in, as well as taking the exact same screenshot of the fresh world.</p>
<p>To do this, I loaded two worlds: the world as-is, and a fresh world generated with the same seed. I then made sure the time of day would be the same by running the Minecraft commands:</p>
<p><code><pre>
/gamerule DoDaylightCycle false
/time set 2000</pre></code></p>
<p>I then found some screenshot locations, and used a command shortcut that I knew existed, but couldn't find on the Internet: pressing <code>F3 and C</code> to copy the "teleport command" for that location — which also holds the current viewing angle. This results in a command like:</p>
<p><code>
/execute in minecraft:overworld run tp @s 484.55 134.00 96.61 -154.35 17.55</code></p>
<p>…which teleports you to an exact location – but more importantly – looking at an exact angle. The numbers in the command are are x-, y-, z-coordinates, and two parameters which encode viewing angle ("theta" and "phi").</p>
<p>I've overlayed the images below, I think it looks nice! Take a look at the different ways of comparing the images and let me know your favourite :] (press the buttons at the bottom)</p>

</header>
<hr>
<main>
<section id="buttons">
<button id="btn-cover" onclick='show("cover")'>sliders 1</button>
<button id="btn-opacity" onclick='show("opacity")'>sliders 2</button>
<button id="btn-blinkers" onclick='show("blinkers")'>blinking</button>
<button id="btn-hover" onclick='show("hover")'>hover</button>
</section>
<form autocomplete="off">
<section class="comparisons">
EOHTML

for n in template qr-code volkswagen-mountain pier clarices cathedral-back railway-bridge anguses pagoda sakura-garden icy-raceways; do
  echo "<div class='comparison ${n}"
  [[ $n == "template" ]] && echo "hidden"
  echo "'>"
  echo -e "doing ${n} \t(${n})" >&2
  echo "<h2 id='${n}'>${n} <a href='#${n}'>#</a></h2>"

  echo '<article class="cover">'
  echo "<img-comparison-slider>"
  echo '<img slot="first" src="images/'"${n}"'.png" />'
  echo '<img slot="second" src="images/'"${n}"'2.png" />'
  echo "</img-comparison-slider>"
  echo "</article>"

  echo '<article class="opacity hidden">'
  echo "<img-opacity-slider>"
  echo '<img slot="first" src="images/'"${n}"'.png" />'
  echo '<img slot="second" src="images/'"${n}"'2.png" />'
  echo '<input data-id="'"${n}"'" class="opacity-slider" type="range" min="0" max="1" step="0.001" value="0.25"/>'
  echo "</img-opacity-slider>"
  echo "</article>"

  echo '<article class="blinkers hidden">'
  echo "<img-blinker>"
  echo '<img slot="first" src="images/'"${n}"'.png" />'
  echo '<img slot="second" src="images/'"${n}"'2.png" />'
  echo "</img-blinker>"
  echo "</article>"

  echo '<article class="hover hidden">'
  echo "<img-hover>"
  echo '<img slot="first" src="images/'"${n}"'.png" />'
  echo '<img slot="second" src="images/'"${n}"'2.png" />'
  echo "</img-hover>"
  echo "</article>"

  echo "</div>"
done \
  >> "${tempfile}"

cat << EOHTML >> "${tempfile}"
</form>
</section>
<hr>
<h2>Custom Comparison Pictures</h2>
<p>If that's not enough for you (or if you think my FOV is wacky), you can follow my instructions above and take your own screenshots. Upload them below to make a custom side-by-side comparison. Any custom comparisons will disappear when you refresh the page.</p>
<section class="manualpics">
<form id="custompic">
<label for="custompic1">Custom picture 1:</label>
<input type="file" id="custompic1" name="custompic1" accept="image/png, image/jpeg" required />
<br>
<label for="custompic2">Custom picture 2:</label>
<input type="file" id="custompic2" name="custompic2" accept="image/png, image/jpeg" required />
<br>
<button type="submit">Add custom image comparison</button>
</form>
</section>
<form autocomplete="off">
<section class="custom-comparisons">
</section>
</form>
</main>
<footer>
<p><a href="/">back to main page</a></p>
</footer>
</body>
EOHTML

cat "${tempfile}" > index.html

echo "done!"
