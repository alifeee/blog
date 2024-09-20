#!/bin/bash
# generate HTML from markdown,
#  then replace all lines between START_CONTENT and END_CONTENT with this HTML
#  in the file INDEX_FILE
# requires marked https://github.com/markedjs/marked
#  npm install -g marked
# usage:
#  ./build.sh content.md

# check marked is installed
if ! type "marked" 2> /dev/null > /dev/null; then
  echo "marked not installed. https://www.npmjs.com/package/marked. please run"
  echo "npm install -g marked"
  exit 1
fi

if [ -z $1 ]; then
  CONTENT_FILE="${PWD##*/}.md"
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

html=$(marked -i "$CONTENT_FILE")

has_template=$(echo "${original_html}" | grep '{{.*}}')
if [ ! -z "${has_template}" ]; then
  echo "{{template}}s found in file. They should be removed soon..."
fi

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
