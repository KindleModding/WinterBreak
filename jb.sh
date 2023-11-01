#!/bin/sh
#
# Quick'n dirty JB key install script STOLEN from WatchThis.
# (Don't give me that look I asked if I could steal it)
# 
# Based on the "emergency" script from the Hotfix/Bridge restoration package.
#
# $Id: jb.sh 18327 2021-03-24 18:08:54Z NiLuJe $
#
##


# Helper functions, in case the bridge was still kicking.
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

# We actually do need that one
make_immutable() {
	local my_path="${1}"
	if [ -d "${my_path}" ] ; then
		find "${my_path}" -type d -exec chattr +i '{}' \;
		find "${my_path}" -type f -exec chattr +i '{}' \;
	elif [ -f "${my_path}" ] ; then
		chattr +i "${my_path}"
	fi
}

POS=1

ms_log() {
	f_log "I" "mountsus" "${2}" "" "${1}"
	echo "${1}" >> "${MOUNTSUS_LOG}"
	eips 1 "${POS}" "${1}"
	POS=$((POS+1))
	sleep 0.2
}

# For logging
[ -f "/etc/upstart/functions" ] && source "/etc/upstart/functions"
MOUNTSUS_LOG="/mnt/us/mountsus_log.txt"
rm -f "${MOUNTSUS_LOG}"

ms_log "MountSus jailbreak by Bluebotlabs" "info"
ms_log "stolen script from the watchthis jailbreak by katadelos" "info"
POS=$((POS+1))
ms_log "big thanks to niluje and katadelos for" "info"
ms_log "the original scripts" "info"
POS=$((POS+1))
ms_log "Big thanks to bulltricks for discovering" "info"
ms_log "this exploit" "info"
POS=$((POS+1))
ms_log '"Im in"' "info"
POS=$((POS+1))

ms_log "Loaded logging functions" "main"

# Duh'
mntroot rw

# JB first
if [ -f "/etc/uks/pubdevkey01.pem" ] ; then
	make_mutable "/etc/uks/pubdevkey01.pem"
	rm -f "/etc/uks/pubdevkey01.pem"
	ms_log "Removed existing developer key" "jb"
else
	ms_log "Didn't find existing developer key" "jb"
fi

cat > "/etc/uks/pubdevkey01.pem" << EOF
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJn1jWU+xxVv/eRKfCPR9e47lP
WN2rH33z9QbfnqmCxBRLP6mMjGy6APyycQXg3nPi5fcb75alZo+Oh012HpMe9Lnp
eEgloIdm1E4LOsyrz4kttQtGRlzCErmBGt6+cAVEV86y2phOJ3mLk0Ek9UQXbIUf
rvyJnS2MKLG2cczjlQIDAQAB
-----END PUBLIC KEY-----
EOF
RET="$?"

if [ -f "/etc/uks/pubdevkey01.pem" ] ; then
	ms_log "Created developer key (${RET})" "jb"
else
	ms_log "Unable to create developer key (${RET})" "jb"
fi

chown root:root "/etc/uks/pubdevkey01.pem"
chmod 0644 "/etc/uks/pubdevkey01.pem"
make_immutable "/etc/uks/pubdevkey01.pem"

ms_log "Updated permissions for developer key" "jb"

# Make sure we can use UYK for OTA packages on FW >= 5.12.x
make_mutable "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
rm -rf "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
touch "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
make_immutable "/PRE_GM_DEBUGGING_FEATURES_ENABLED__REMOVE_AT_GMC"
ms_log "Enabled developer flag" "br"

touch "/MNTUS_EXEC"
make_immutable "/MNTUS_EXEC"
ms_log "Enabled mntus exec flag" "br"


# Clean up the mntus.params file
if [ -f "/var/local/root/mntus.params" ] ; then
	sed '1d' /var/local/root/mntus.params
else
	sed '1d' /var/local/system/mntus.params
fi

# Bye
sync
mntroot ro

ms_log "Finished installing jailbreak!" "main"

# Make sure we reboot so that we don't end up with weird demo stuff in ram
reboot