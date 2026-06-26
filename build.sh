#!/usr/bin/env bash

rm -rf build

###
# Check admin
##
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root"
  exit 1
fi

echo "* cloning Mesquito"
mkdir build
git clone https://github.com/KindleModding/Mesquito.git build
rm build/*              # Remove loose files
rm -rf build/apps/*     # Remove unneeded apps
rm -rf build/.git       # Remove .git
rm -rf build/.gitignore # Remove .gitignore

echo "* Copying WinterBreak"
cp -r winterbreak/* build/
echo "* copying README to build directory"
cp README.md build/
echo "* moving patched uks to build directory"
echo "* done. WinterBreak jailbreak built."
rm -rf build/.git       # Remove .git
rm -rf build/.gitignore # Remove .gitignore
rm -rf build/.github    # Remove .github
rm -rf build/README.md  # Remove README.md

echo "* packing tar.gz file"
tar -czf WinterBreak.tar.gz -C build .
rm -rf build/*
rm -rf build/.*
mv WinterBreak.tar.gz build/
