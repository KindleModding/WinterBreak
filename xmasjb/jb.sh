#!/bin/sh
#
# XMAS Jailbreak Script
# Based on the bridge script from the 1.16.N hotfix package
# Special thanks to Marek, Katadelos and NiLuJe
#
# $Id: jb.sh ????? 2023-11-19 08:12:38Z HackerDude $
#
##



set +e # If boot is halted stuff seriously goes wrong (actually we don't need this anymore but I'm keeping it)


###
# Define logging function
###
POS=1
xm_log() {
  echo "${1}" >> /mnt/us/xmas_jb.log
  eips 0 $POS "${1}"
  echo "${1}"
  POS=$((POS+1))
}

###
# Prevents potential bootloop (XMAS auto-reboots on completion)
###
if [ -f "/mnt/us/xmas_jb.log" ] ; then
  exit 0 # The jailbreak has already been run before
fi
if [ -d "/mnt/us/xmas_jb.log" ] ; then # Just in case!
  exit 0 # The jailbreak has already been run before
fi


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
xm_log "**** XMAS  JAILBREAK ****"
xm_log "* Created by HackerDude *"
xm_log "**************** v1.0.0 *"
xm_log ""
xm_log "Like what you see? Donate to my Ko-Fi"
xm_log "to help support these projects: https://ko-fi.com/hackerdude"
xm_log ""
xm_log "Thanks to Marek, Katadelos and NiLuJe for their help"
xm_log "creating this jailbreak"
xm_log ""
xm_log "After all, all devices have their dangers."
xm_log " The discovery of speech introduced communication - and lies."
xm_log "- Isaac Asimov"
xm_log ""
xm_log ""


###
# Main key install functions
###
install_touch_update_key()
{
        mount_rw
        xm_log "install_touch_update_key - Copying the jailbreak updater key"
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
    xm_log "install_touch_update_key_squash - Copying the jailbreak updater keystore"
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
  xm_log "Developer keys installed successfully! (pubdevkey01.pem)"
  else
    xm_log "ERR - Could not install pubdevkey01.pem"
  fi
fi

# Check if we need to do something with the OTA keystore
if [ -f "/etc/uks.sqsh" ] && [ -f "/mnt/us/patchedUks.sqsh" ] ; then
  install_touch_update_key_squash

  # Verify key installation
  if [ "$(md5sum "${ROOT}/etc/uks.sqsh" | awk '{ print $1; }')" ==  "$(md5sum "${ROOT}/mnt/us/patchedUks.sqsh" | awk '{ print $1; }')" ] ; then
    xm_log "Developer keys installed successfully! (uks.sqsh)"
    xm_log "$(ls /etc/uks)"
  else
    xm_log "ERR - Could not install uks.sqsh"
    xm_log "$(whoami)"
    xm_log "$(md5sum "/mnt/us/patchedUks.sqsh" | awk '{ print $1; }')"
    xm_log "$(md5sum "/etc/uks.sqsh" | awk '{ print $1; }')"
    xm_log "$(md5sum "${ROOT}/etc/uks.sqsh" | awk '{ print $1; }')"
  fi
fi

# Final steps
mount_rw

# Make sure we can use UYK for OTA packages on FW >= 5.12.x
make_mutable "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
rm -rf "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
touch "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
make_immutable "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
xm_log "Enabled developer flag"

touch "/MNTUS_EXEC"
make_immutable "/MNTUS_EXEC"
xm_log "Enabled mntus exec flag"

# Bye
mntroot ro

xm_log "Finished installing jailbreak!"

xm_log "Waiting 3 seconds to reboot..."
sleep 3
reboot