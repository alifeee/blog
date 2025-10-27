#!/bin/bash
# generate HTML from data,
#  then replace all lines between START_CONTENT and END_CONTENT with this HTML
#  in the file INDEX_FILE
# usage:
#  ./build.sh

if [ -z $1 ]; then
  CONTENT_FILE="data.json"
  echo "transforming $CONTENT_FILE"
else
  CONTENT_FILE="$1"
fi

if [ ! -f "${CONTENT_FILE}" ]; then
  echo "${CONTENT_FILE} does not exist"
  exit 1
fi

INDEX_FILE="index.html"
TEMP_FILE="index.html.temp"
START_CONTENT="<!-- !!start content!! -->"
END_CONTENT="<!-- !!end content!! -->"

original_html=$(cat $INDEX_FILE)

html=$(
  cat "$CONTENT_FILE" | jq -r 'to_entries[] |
"    <dialog class=\"d\(.key + 1)\" closedby=\"closerequest\">
      <form class=\"header\" method=\"dialog\">
        <button>×</button>
      </form>
      <section class=\"information\">
        <img
          class=\"main\"
          height=\"300\"
          width=\"300\"
          src=\"./images/\(.value.mainimage)\"
        />"
+ if .value.subimage then "        <img class=\"sub\" height=\"150\" width=\"150\" src=\"./images/\(.value.subimage)\" />" else "" end
+ "        <div class=\"notes\">
          <span><span>NAME</span>: \(.value.name)</span>
          <span><span>FROM</span>: \(.value.from)</span>
          <span><span>TRADE AIM</span>: \(.value.tradeaim)</span>
        </div>
      </section>"
      +
"      <section class=\"buttons\">"
+ if (.key != 0) then "<button onclick=\"opend(\(.key))\">prev</button>" else "<div></div>" end
+ if (.key != 9) then "<button onclick=\"opend(\(.key + 2))\">next</button>" else "<div></div>" end
+ "</section>
    </dialog>"
  '
)

# get line numbers of START_CONTENT and END_CONTENT
start=$(echo "${original_html}" | grep -n "${START_CONTENT}" | cut -d : -f1)
end=$(echo "${original_html}" | grep -n "${END_CONTENT}" | cut -d : -f1)

if [ -z $start ] || [ -z $end ]; then
  echo "could not find start/end content tags"
  echo "start: <$start>, end: <$end>"
  exit 1
fi

rm -f $TEMP_FILE
echo "${original_html}" | awk 'NR <= '"${start}"'' >> $TEMP_FILE
echo "${html}" >> $TEMP_FILE
echo "${original_html}" | awk 'NR >= '"${end}"'' >> $TEMP_FILE

cat $TEMP_FILE > $INDEX_FILE
rm -f $TEMP_FILE

echo "done! 🚀"
