import shutil
import os

os.remove('./newHotfix/gandalf')
os.remove('./newHotfix/fbink')

shutil.copy('./utils/bin-armhf/gandalf', './newHotfix/gandalf')
shutil.copy('./utils/bin-armhf/fbink', './newHotfix/fbink')

# Replace branding lol

#branding = '"**** MS JB ****"' # Yes the "" is required

#replacements = {
#    '"**** SQUASH JB ****"': branding
#}
with open('./newHotfix/bridge', 'r+') as file:
    fileData = file.read()
    file.seek(0)
    for replacement in replacements.keys():
        fileData.replace(replacement, replacements[replacement])

    file.write(fileData)