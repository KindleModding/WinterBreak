#!/bin/sh

# Fall back to the bundled KindleTool if there aren't any in PATH
KINDLETOOL="$(command -v kindletool)"
KINDLETOOL="${KINDLETOOL:-${PWD}/utils/kindletool}"

rm -rf officialFirmware
${KINDLETOOL} extract update_kindle*.bin officialFirmware
gunzip officialFirmware/*rootfs*.img.gz
mkdir mnt
sudo mount -o loop officialFirmware/*rootfs*.img mnt
