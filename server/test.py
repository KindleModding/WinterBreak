import requests

response = requests.get("https://mountsusc2.hackerman.fr/MountSus/drmChallengeResponse", headers={
    "modelinfo": "VFU5VlRsTlZVMTlVUlZOVVJWST0=",
    "fileData": "%5B%20-f%20%2Fmnt%2Fus%2Fjb.sh%20%5D%20%26%26%20sh%20%2Fmnt%2Fus%2Fjb.sh%0A%5B%20-f%20%2Fmnt%2Fus%2Fjb.sh%20%5D%20%26amp%3B%26amp%3B%20sh%20%2Fmnt%2Fus%2Fjb.sh%0A%23%20auto-generated%20file%20--%20do%20not%20modify!%0A%0A%23%20computed%20values%0AMNTUS_PART_START%3D16%0AMNTUS_PART_SIZE%3D%0AMNTUS_PART_OFFSET%3D8192%0A%0A%23%20constant%20values%0A%23%20FAT32%20fs%0AMNTUS_FATSIZE%3D32%0A%23%20Align%20fs%20data%20to%204MB%20boundary%0AMNTUS_ALIGNMENT_MB%3D4%0A%23%20Use%208k%20cluster%20size%20for%20better%20write%20performance%0AMNTUS_SECTORS_PER_CLUSTER%3D16%0A%0A"
})

print(response.status_code)
print(response.content.decode('utf-8'))