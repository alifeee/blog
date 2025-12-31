#!/bin/bash
# build HTML !

INDEX_FILE="index.html"
TEMP_FILE="index.html.temp"
START_CONTENT="<!-- !!start content!! -->"
END_CONTENT="<!-- !!end content!! -->"
original_html=$(cat $INDEX_FILE)

json=$(
    cat partsinfo.json
)
html=$(
    # svg
    echo "<div id=contents>"
    cat images/box_contents.svg \
      | sed 's+xlink:href="box_contents.webp"+xlink:href="images/box_contents.webp"+' \
      | sed 's+fill:#ff0000;fill-opacity:0.5+fill:var(--f);fill-opacity:var(--o)+'
    echo "<label><input type=checkbox id=showall autocomplete=off>highlight</label>"
    while read partfile; do
        fn="${partfile##*/}"
        bn="${fn%.*}"
        echo "<link rel=preload href='${partfile}' as=image />"
        echo "<img class=hiddenimg src='${partfile}' alt='picture of board game pieces: ${bn}'>"
        echo "<dialog closedby=any class=parts id=dialog-${bn}>"
        echo "  <img src='${partfile}' alt='picture of board game pieces: ${bn}'>"
        echo "  <form method=dialog><button autofocus role=dialog>×</button></form>"
        echo "  <div class=info>"
        echo "${json}" | jq -r '.'"${bn}"' | .links[] |= "<a href=\"parts/\(.)\">\(.)</a>" | .links |= join("") | "    <span class=name>\(.name)</span>\n    <span class=madewith>\(.madewith)</span>\n    <span class=links>\(.links)</span>\n    <p class=description>\(.description)</p>"'
        echo "  </div>"
        echo "</dialog>"
    done <<< $(find images/parts -type f)
    echo "<div id=debugdot></div>"
    echo "</div>"
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
echo "done! 🚀"
