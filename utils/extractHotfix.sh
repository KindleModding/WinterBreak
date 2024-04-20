#!/bin/sh

# Fall back to the bundled KindleTool if there aren't any in PATH
KINDLETOOL="$(command -v kindletool)"
KINDLETOOL="${KINDLETOOL:-${PWD}/utils/kindletool}"

rm -rf originalHotfix
${KINDLETOOL} extract [Uu]pdate_*hotfix*.bin originalHotfix
rm -rfv originalHotfix/*.sig originalHotfix/update-filelist.dat*
