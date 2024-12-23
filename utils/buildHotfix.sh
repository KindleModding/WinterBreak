#!/bin/sh

# Fall back to the bundled KindleTool if there aren't any in PATH
KINDLETOOL="$(command -v kindletool)"
KINDLETOOL="${KINDLETOOL:-${PWD}/utils/kindletool}"

# Build for unknown devices in create, and print raw device codes in convert
export KT_WITH_UNKNOWN_DEVCODES="1"

if [ "$1" = "universal" ] ; then
    DEVICE_LIST="kindle5"
    echo "All the things!" > build/DEVICES.txt
else
    DEVICE_LIST="$(${KINDLETOOL} convert -i update_kindle*.bin 2>&1 | grep -o "^Device .*" | grep -o "0x[[:xdigit:]]*" | tr "\n" " ")"
    ${KINDLETOOL} convert -i update_kindle*.bin 2>&1 | grep -o "^Device .*" | sed "s/^Device[[:blank:]]*//" > build/DEVICES.txt
fi
echo "* Building for ${DEVICE_LIST}"
DEVICES=""
for dev in ${DEVICE_LIST} ; do
    DEVICES="${DEVICES}-d ${dev} "
done

cd newHotfix
${KINDLETOOL} create ota2 ${DEVICES} -b FC04 -s min -t max -O -C . "../build/Update_hotfix_XMAS.bin"
