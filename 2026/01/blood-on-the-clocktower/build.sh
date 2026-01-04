#!/bin/bash
# build HTML !

startts=`date +%s.%N`

# check markdown is installed
# check markdown is installed
python3 -c "import markdown" || (echo "markdown not installed, ru
n: pip3 install --user markdown" && exit 1)

INDEX_FILE="index.html"
TEMP_FILE="index.html.temp"
CONTENT_FILE="index.md"
START_CONTENT="<!-- !!start content!! -->"
END_CONTENT="<!-- !!end content!! -->"
original_html=$(cat $INDEX_FILE)

json=$(
    cat partsinfo.json
)

cat << EOHTML > info.html
<!DOCTYPE html>
<html><head><style>
body {max-width:40rem;}
</style></head>
<body><a href=".">back</a>
EOHTML
echo "${json}" | jq -r \
  '.[] | .links[] |= "<li><a href=\"parts/\(.)\">\(.)</a></li>" | .links |= if length > 0 then join("") else "" end | to_entries | ("<hr>", (.[] | if .value != "" then ("<dl><dt>\(.key)</dt><dd>\(.value)</dd></dl>") else "" end))' \
  >> info.html
echo "</body></html>" >> info.html


html=$(
    # svg
    echo "<div id=contents>"
    cat images/box_contents.svg \
      | sed 's+xlink:href="box_contents.webp"+xlink:href="images/box_contents.webp"+' \
      | sed 's+fill:#ff0000;fill-opacity:0.5+fill:var(--f);fill-opacity:var(--o)+'
    echo "<span id=clickme>←click me!</span>"
    echo "<label><input type=checkbox id=showall autocomplete=off>highlight all</label>"
    while read partfile; do
      fn="${partfile##*/}"
      bn="${fn%.*}"
      echo "<link rel=preload href='${partfile}' as=image />"
      echo "<img class=hiddenimg src='${partfile}' alt='picture of board game pieces: ${bn}'>"
      echo "<dialog closedby=any class=parts id=dialog-${bn}>"
      echo "  <img src='${partfile}' alt='picture of board game pieces: ${bn}'>"
      echo "  <form method=dialog><button autofocus role=dialog>×</button></form>"
      echo "  <div class=info>"
      echo "${json}" | jq -r '.'"${bn}"' | .links[] |= "<li><a href=\"parts/\(.)\">\(.)</a></li>" | .links |= if length > 0 then join("") else "" end | "    <span class=name>\(.name)</span>\n    <span class=madewith>\(.madewith)</span>\n    <ul class=links>\(.links)</ul>\n    <p class=description>\(.description)</p>"'
      echo "  </div>"
      echo "</dialog>"
    done <<< $(find images/parts -type f)
    echo "</div>"
    echo "<details class=deepcontents><summary>the above might not work (on Safari/etc), expand for all information and pictures at once</summary>"
    echo "<p>see <a href='info.html'>all this information on one page</a>, "
    echo "the underlying <a href='partsinfo.json'>JSON file</a>, "
    echo "or <a href=parts.zip>a zip of all the files</a>.</p>"
    while read partfile; do
      fn="${partfile##*/}"
      bn="${fn%.*}"
      echo "<hr>"
      echo "<div class=parts>"
      echo "  <img src='${partfile}' alt='picture of board game pieces: ${bn}'>"
      echo "  <div class=info>"
      echo "${json}" | jq -r '.'"${bn}"' | .links[] |= "<li><a href=\"parts/\(.)\">\(.)</a></li>" | .links |= if length > 0 then join("") else "" end | "    <span class=name>\(.name)</span>\n    <span class=madewith>\(.madewith)</span>\n    <ul class=links>\(.links)</ul>\n    <p class=description>\(.description)</p>"'
      echo "  </div>"
      echo "</div>"
    done <<< $(find images/parts -type f)
    echo "</details>"
    echo "<section id=markdown>"
    cat "$CONTENT_FILE" | python3 -m markdown -x toc
    echo "</section>"
)

# get line numbers of START_CONTENT and END_CONTENT
start=$(echo "${original_html}" | grep -n "${START_CONTENT}" | cut -d : -f1)
end=$(echo "${original_html}" | grep -n "${END_CONTENT}" | cut -d : -f1)
if [ -z $start ] || [ -z $end ]; then
  echo "could not find start/end content tags" >&2 && exit 1
fi

rm -f $TEMP_FILE
echo "${original_html}" | awk 'NR <= '"${start}"'' >> $TEMP_FILE
echo "${html}" >> $TEMP_FILE
echo "${original_html}" | awk 'NR >= '"${end}"'' >> $TEMP_FILE
cat $TEMP_FILE > $INDEX_FILE
rm -f $TEMP_FILE

endts=`date +%s.%N`
totaltime=$(echo "($endts - $startts)*1000" | bc -l)

echo "done in ${totaltime%.*} ms! 🚀"
