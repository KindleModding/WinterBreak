#!/bin/bash

rm -rf build

###
# Check admin
##
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

echo "* extracting and mounting fw"
./utils/extractAndMountFw.sh
echo "* extracting uks.sqsh from official firmware"
./utils/extractUksFromFirmware.sh
echo "* patching uks.sqsh with the sexy pubdevkey01.pem"
./utils/patchUksSqsh.sh
echo "* extracting hotfix"
./utils/extractHotfix.sh
rm -rf newHotfix
mkdir newHotfix
mv originalHotfix/* newHotfix
# echo "moving patched uks to the new hotfix"
# cp patchedUks.sqsh newHotfix
# echo "patching bridge in the new hotfix" # we don't need to patch it anymore
# patch newHotfix/bridge < utils/patches/bridge.patch
# patch newHotfix/install-bridge.sh < utils/patches/install-bridge.sh.patch
echo "* patching bridge"
patch newHotfix/bridge < utils/patches/bridge_dispatch.patch
mkdir build
rm -rf originalHotfix
echo "* building the new hotfix for the devices specified in the official firmware"
python ./utils/buildHotfix.py
./utils/buildHotfix.sh universal
./utils/unmountAndDeleteFw.sh
rm -rf newHotfix
echo "* obfuscating MountSus"
cd "./utils/obfuscator/"
npm i
tsc
node "build/obfuscate.js"
cd ../../
cp -r mountsus-obs build/MountSus
echo "* copying README to build directory"
cp README.MD build/
echo "* moving patched uks to MountSus directory"
cp patchedUks.sqsh build/MountSus
rm -rf patchedUks.sqsh
echo "* done. MountSus generated for:"
cat build/DEVICES.txt
cd build
tar -czf ../MountSus.tar.gz .
cd ..
rm -rf build/*
mv MountSus.tar.gz build/
