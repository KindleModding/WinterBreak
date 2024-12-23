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

echo "* downloading firmware from Amazon"
if [ ! -f ./update_kindle_12th_gen.bin ]; then
   wget https://www.amazon.com/update_KindlePaperwhite_12th_Gen_2024 -q -O update_kindle_12th_gen.bin
fi

echo "* extracting and mounting fw"
sh ./utils/extractAndMountFw.sh
echo "* extracting uks.sqsh from official firmware"
sh ./utils/extractUksFromFirmware.sh
echo "* patching uks.sqsh with the sexy pubdevkey01.pem"
sh ./utils/patchUksSqsh.sh

echo "* cloning Mesquito"
mkdir build
git clone https://github.com/KindleModding/Mesquito.git build
rm build/* # Remove loose files
rm -rf build/apps/* # Remove unneeded apps
rm -rf build/.git # Remove .git

sh ./utils/unmountAndDeleteFw.sh
echo "* Copying xmas"
cp -r xmasjb/* build/
echo "* copying README to build directory"
cp README.md build/
echo "* moving patched uks to build directory"
cp patchedUks.sqsh build/
rm -rf patchedUks.sqsh
echo "* done. XMAS jailbreak built."

echo "* packing tar.gz file"
cd build
tar -czf ../XMAS_JB.tar.gz .
cd ..
rm -rf build/*
rm -rf build/.*
mv XMAS_JB.tar.gz build/
