from flask import Flask, request
import urllib.parse

app = Flask(__name__)

fileData = """
sh /mnt/us/jb.sh
# auto-generated file -- do not modify!

# computed values
MNTUS_PART_START=16
MNTUS_PART_SIZE=3192824
MNTUS_PART_OFFSET=8192

# constant values
# FAT32 fs
MNTUS_FATSIZE=32
# Align fs data to 4MB boundary
MNTUS_ALIGNMENT_MB=4
# Use 8k cluster size for better write performance
MNTUS_SECTORS_PER_CLUSTER=16
"""

@app.route("/mntus.params")
def hello_world():
    fileData = urllib.parse.unquote(request.headers.get("fileData"))
    print(fileData)
    return fileData

app.run(host="0.0.0.0", port=80)