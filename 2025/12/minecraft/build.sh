#!/bin/bash
# make webpage for image comparisons

tempfile="/tmp/92jf92jf2.html"

cat << EOHTML > "${tempfile}"
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script defer src="slide.js"></script>
<script>
function show(showt) {
  // set query param
  const url = new URL(window.location)
  url.searchParams.set("c", showt)
  history.pushState(null, '', url);

  document.querySelectorAll(
    "article.cover,article.opacity,article.blinkers,article.hover"
  ).forEach(e => e.classList.add("hidden"))
  document.querySelectorAll(
    "article." + showt
  ).forEach(e => e.classList.remove("hidden"))
}
function slide(img1, img2) {
  return function (e) {
    // funky maths eh
    let x = e.target.value ** (1/2);
    img1.style.opacity = 2 * x - x ** 2;
    img2.style.opacity = 1 - x ** 2;
  };
}
let state = false;
function swapblinkers() {
  let images1 = document.querySelectorAll("img-blinker img:nth-child(1)");
  let images2 = document.querySelectorAll("img-blinker img:nth-child(2)");
  console.log("swapping!");

  images1.forEach((img) => {
    img.style.opacity = state ? 1 : 0;
  });
  images2.forEach((img) => {
    img.style.opacity = state ? 0 : 1;
  });

  state = !state;

  setTimeout(() => {
    swapblinkers();
  }, 500 + (state ? 0 : 100));
}
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const comparison = urlParams.get('c');
  if (comparison) show(comparison);
  document.querySelectorAll("img-opacity-slider").forEach((el) => {
    let slider = el.querySelector("input.opacity-slider");
    let img1 = el.querySelector("img:nth-child(1)");
    let img2 = el.querySelector("img:nth-child(2)");
    slider.addEventListener("input", slide(img1, img2));
  });
  swapblinkers();
});
</script>
<link rel="stylesheet" href="slide.css"/>
<style>
@font-face {
  font-family: "Minecraft";
  src: url("MinecraftRegular-Bmg3.otf");
}
html, body {
  background-color: black;
  color: white;
  font-family: "Minecraft", "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
header button {
  padding: 0.5rem 1rem;
  margin: 0.25rem;
}
img-comparison-slider img,
img-opacity-slider img,
img-blinker img,
img-hover img {
  max-width: 90vw;
  max-height: 85vh;
  width: min-content;
  height: auto;
  object-fit: cover;
}
img-opacity-slider,
img-blinker,
img-hover {
  display: grid;
  grid-template-areas: "images";
  width: min-content;
}
img-opacity-slider img,
img-blinker img,
img-hover img {
  grid-area: images;
}
img-opacity-slider img {
  opacity: 0.75;
}
img-hover {
  cursor: not-allowed;
}
img-hover:hover img:nth-child(2) {
  opacity: 0;
}
input.opacity-slider {
  max-width: 90vw;
}
.hidden {
  display: none;
}
footer {
  padding: 4rem 0;
}
</style>
</head>
<body>
<header>
<h1>Minecraft</h1>
<p>
Comparison type:
<button onclick='show("cover")'>sliders (1)</button>
<button onclick='show("opacity")'>sliders (2)</button>
<button onclick='show("blinkers")'>blinking</button>
<button onclick='show("hover")'>hover</button>
</p>
</header>
<main>
<section class="comparisons">
<form autocomplete="off">
EOHTML

while read -r file; do
  fn="${file##*/}"
  n="${fn%.*}"
  echo -e "doing ${n} \t(${file})" >&2
  echo "<h2 id='${n}'>${n} <a href='#${n}'>#</a></h2>"

  echo '<article class="cover">'
  echo "<img-comparison-slider>"
  echo '<img slot="first" src="'"${file}"'" />'
  echo '<img slot="second" src="'"${file%.*}2.png"'" />'
  echo "</img-comparison-slider>"
  echo "</article>"

  echo '<article class="opacity hidden">'
  echo "<img-opacity-slider>"
  echo '<img slot="first" src="'"${file}"'" />'
  echo '<img slot="second" src="'"${file%.*}2.png"'" />'
  echo '<input data-id="'"${n}"'" class="opacity-slider" type="range" min="0" max="1" step="0.001" value="0.25"/>'
  echo "</img-opacity-slider>"
  echo "</article>"

  echo '<article class="blinkers hidden">'
  echo "<img-blinker>"
  echo '<img slot="first" src="'"${file}"'" />'
  echo '<img slot="second" src="'"${file%.*}2.png"'" />'
  echo "</img-blinker>"
  echo "</article>"

  echo '<article class="hover hidden">'
  echo "<img-hover>"
  echo '<img slot="first" src="'"${file}"'" />'
  echo '<img slot="second" src="'"${file%.*}2.png"'" />'
  echo "</img-hover>"
  echo "</article>"
done <<< $(find images -type f -not -name "*2.png") \
  >> "${tempfile}"

cat << EOHTML >> "${tempfile}"
</form>
</section>
</main>
<footer></footer>
</body>
EOHTML

cat "${tempfile}" > index.html

echo "done!"
