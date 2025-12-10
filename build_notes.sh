#!/bin/bash
# remove notes files and rebuild

echo "remove files"
find notes -type f -not -path "*node_modules*" -exec rm -rf {} \;

echo "re-add files from git"
git checkout HEAD notes

echo "build"
(cd notes/_build; npm run build)
