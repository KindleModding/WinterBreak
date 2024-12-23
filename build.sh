#!/bin/bash

rm -rf build

###
# Check admin
##
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

chmod +x ./utils/kindletool # DONT ASK

echo "* extracting and mounting fw"
sh ./utils/extractAndMountFw.sh
echo "* extracting uks.sqsh from official firmware"
sh ./utils/extractUksFromFirmware.sh
echo "* patching uks.sqsh with the sexy pubdevkey01.pem"
sh ./utils/patchUksSqsh.sh
echo "* extracting hotfix"
sh ./utils/extractHotfix.sh
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
rm -rf originalHotfix

echo "* cloning Mesquito"
mkdir build
git clone https://github.com/KindleModding/Mesquito.git build
rm build/* # Remove loose files
rm -rf build/apps/* # Remove unneeded apps
rm -rf build/.git # Remove .git

echo "* building the new hotfix for the devices specified in the official firmware"
python ./utils/buildHotfix.py
sh ./utils/buildHotfix.sh universal
sh ./utils/unmountAndDeleteFw.sh
rm -rf newHotfix
echo "* Copying xmas"
cp -r xmasjb/* build/
echo "* copying README to build directory"
cp README.md build/
echo "* moving patched uks to build directory"
cp patchedUks.sqsh build/
rm -rf patchedUks.sqsh
echo "* done. XMAS generated for:"
cat build/DEVICES.txt

echo "* packing tar.gz file"
cd build
tar -czf ../XMAS_JB.tar.gz .
cd ..
#rm -rf build/*
#rm -rf build/.*
mv XMAS_JB.tar.gz build/
