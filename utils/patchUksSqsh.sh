#!/bin/sh

mkdir mnt
mkdir patchedUks
mkdir mntsqsh
sudo mount -o loop uks.sqsh mntsqsh
cp mntsqsh/* patchedUks
sudo umount mntsqsh
rm -rf mntsqsh
cat > "patchedUks/pubdevkey01.pem" << EOF
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJn1jWU+xxVv/eRKfCPR9e47lP
WN2rH33z9QbfnqmCxBRLP6mMjGy6APyycQXg3nPi5fcb75alZo+Oh012HpMe9Lnp
eEgloIdm1E4LOsyrz4kttQtGRlzCErmBGt6+cAVEV86y2phOJ3mLk0Ek9UQXbIUf
rvyJnS2MKLG2cczjlQIDAQAB
-----END PUBLIC KEY-----
EOF
mksquashfs patchedUks patchedUks.sqsh
rm -rf patchedUks
rm -rf uks.sqsh
