import shutil
import os

os.remove('./newHotfix/gandalf')
os.remove('./newHotfix/fbink')

shutil.copy('./utils/bin-armhf/gandalf', './newHotfix/gandalf')
shutil.copy('./utils/bin-armhf/fbink', './newHotfix/fbink')

# Replace branding lol

branding = '"**** MOUNTSUS JB ****"' # Yes the "" is required
with open('./newHotfix/bridge', 'r+') as file:
    fileData = file.read()
    file.seek(0)
    file.write(fileData.replace('"**** SQUASH JB ****"', branding))