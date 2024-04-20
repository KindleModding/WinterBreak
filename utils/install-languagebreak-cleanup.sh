#!/bin/sh

# Pull libOTAUtils for logging & progress handling
[ -f ./libotautils5 ] && source ./libotautils5

otautils_update_progressbar
logmsg "I" "install" "" "Removing JB files"
rm -rf /mnt/us/jb
rm -rf /mnt/us/DONT_CHECK_BATTERY
rm -rf /mnt/us/documents/dictionaries
rm -rf /mnt/us/uksPatched.sqsh

otautils_update_progressbar
logmsg "I" "install" "" "Disabling Demo Mode"   
rm -rf /var/local/system/DEMO_MODE
rm -rf /var/local/system/no_transitions

if [ -d /mnt/us/.demo ]; then
    rm -rf /mnt/us/.demo
fi
otautils_update_progressbar

logmsg "I" "install" "" "Changing language to {lang_code}"
lipc-send-event com.lab126.blanket.langpicker changeLocale -s "{lang_code}"

otautils_update_progressbar

return 0

