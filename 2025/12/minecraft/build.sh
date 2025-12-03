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
<h1>Minecraft</h1>
<p>
Comparison type:
<button id="btn-cover" onclick='show("cover")'>sliders (1)</button>
<button id="btn-opacity" onclick='show("opacity")'>sliders (2)</button>
<button id="btn-blinkers" onclick='show("blinkers")'>blinking</button>
<button id="btn-hover" onclick='show("hover")'>hover</button>
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
