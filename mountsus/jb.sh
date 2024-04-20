#!/bin/sh
#
# MountSus Jailbreak Script
# Based on the bridge script from the 1.16.N hotfix package
# Special thanks to Marek, Katadelos and NiLuJe
#
# $Id: jb.sh ????? 2023-11-19 08:12:38Z Bluebotlabs $
#
##



set +e # If boot is halted stuff seriously goes wrong


###
# Define logging function
###
POS=1
ms_log() {
  echo "${1}" >> /mnt/us/mountsus.log
  echo "${1}"
  #eips 0 $POS "${1}"
  POS=$POS+1
}

###
# Prevents potential bootloop
###
if [ -f "/mnt/us/mountsus.log" ] ; then
  exit 0 # The jailbreak has already been run before
fi
ms_log "MOUNTSUS PRELOAD"


###
# Helper functions
###
# Actually these mounting ones were stolen from /etc/upstart/init.sh
RW=
mount_ro() { [ -n "$RW" ] && mount -o ro,remount / ; }
mount_rw() { [ -z "$RW" ] && mount -o rw,remount / ; RW=yes ; }

make_mutable() {
        local my_path="${1}"
        # NOTE: Can't do that on symlinks, hence the hoop-jumping...
        if [ -d "${my_path}" ] ; then
                find "${my_path}" -type d -exec chattr -i '{}' \;
                find "${my_path}" -type f -exec chattr -i '{}' \;
        elif [ -f "${my_path}" ] ; then
                chattr -i "${my_path}"
        fi
}

make_immutable() {
        local my_path="${1}"
        if [ -d "${my_path}" ] ; then
                find "${my_path}" -type d -exec chattr +i '{}' \;
                find "${my_path}" -type f -exec chattr +i '{}' \;
        elif [ -f "${my_path}" ] ; then
                chattr +i "${my_path}"
        fi
}




###
# Actual JB from here
###
ms_log "MOUNTSUS JAILBREAK"
ms_log "Created by Bluebotlabs"
POS=$POS+1
ms_log "Thanks to Marek, Katadelos and NiLuJe for their help"
ms_log "creating this jailbreak"
POS=$POS+1
ms_log "After all, all devices have their dangers. The discovery of speech introduced communication - and lies." # IDK I'll think of something suitable


###
# Main key install functions
###
install_touch_update_key()
{
        mount_rw
        ms_log "install_touch_update_key - Copying the jailbreak updater key"
        make_mutable "/etc/uks/pubdevkey01.pem"
        rm -rf "/etc/uks/pubdevkey01.pem"
        cat > "/etc/uks/pubdevkey01.pem" << EOF
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJn1jWU+xxVv/eRKfCPR9e47lP
WN2rH33z9QbfnqmCxBRLP6mMjGy6APyycQXg3nPi5fcb75alZo+Oh012HpMe9Lnp
eEgloIdm1E4LOsyrz4kttQtGRlzCErmBGt6+cAVEV86y2phOJ3mLk0Ek9UQXbIUf
rvyJnS2MKLG2cczjlQIDAQAB
-----END PUBLIC KEY-----
EOF
        # Harmonize permissions
        chown root:root "/etc/uks/pubdevkey01.pem"
        chmod 0644 "/etc/uks/pubdevkey01.pem"
        make_immutable "/etc/uks/pubdevkey01.pem"
}

install_touch_update_key_squash()
{
    mount_rw
    ms_log "install_touch_update_key_squash - Copying the jailbreak updater keystore"
    make_mutable "/etc/uks.sqsh"
    local my_loop="$(grep ' /etc/uks ' /proc/mounts | cut -f1 -d' ')"
    umount "${my_loop}"
    losetup -d "${my_loop}"
    cp --verbose -f "/mnt/us/patchedUks.sqsh" "/etc/uks.sqsh"
    mount -o loop="${my_loop}",norelatime,nodiratime,noatime -t squashfs "/etc/uks.sqsh" "/etc/uks"
    chown root:root "/etc/uks.sqsh"
    chmod 0644 "/etc/uks.sqsh"
    make_immutable "/etc/uks.sqsh"
    mount_ro
}

# Check if we need to do something with the OTA pubkey
if [ ! -f "/etc/uks.sqsh" ] && [ ! -f "/etc/uks/pubdevkey01.pem" ] ; then
  install_touch_update_key

  # Verify key installation
  if [ -f "/etc/uks/pubdevkey01.pem" ] ; then
  ms_log "Developer keys installed successfully! (pubdevkey01.pem)"
  else
    ms_log "ERR - Could not install pubdevkey01.pem"
  fi
fi

# Check if we need to do something with the OTA keystore
if [ -f "/etc/uks.sqsh" ] && [ -f "/mnt/us/patchedUks.sqsh" ] ; then
  install_touch_update_key_squash

  # Verify key installation
  if [ "$(md5sum "${ROOT}/etc/uks.sqsh" | awk '{ print $1; }')" == "f62830065dd99921c42c90f6f8347bf5" ] ; then
    ms_log "Developer keys installed successfully! (uks.sqsh)"
    ms_log "$(ls /etc/uks)"
  else
    ms_log "ERR - Could not install uks.sqsh"
    ms_log "$(whoami)"
    ms_log "$(md5sum "/mnt/us/patchedUks.sqsh" | awk '{ print $1; }')"
    ms_log "$(md5sum "/etc/uks.sqsh" | awk '{ print $1; }')"
    ms_log "$(md5sum "${ROOT}/etc/uks.sqsh" | awk '{ print $1; }')"
  fi
fi

# Final steps
mount_rw

# Make sure we can use UYK for OTA packages on FW >= 5.12.x
make_mutable "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
rm -rf "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
touch "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
make_immutable "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
ms_log "Enabled developer flag"

touch "/MNTUS_EXEC"
make_immutable "/MNTUS_EXEC"
ms_log "Enabled mntus exec flag"

# Bye
mntroot ro

ms_log "Finished installing jailbreak!"