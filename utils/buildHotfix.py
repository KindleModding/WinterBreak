import shutil
import os

os.remove('./newHotfix/gandalf')
os.remove('./newHotfix/fbink')

shutil.copy('./utils/bin-armhf/gandalf', './newHotfix/gandalf')
shutil.copy('./utils/bin-armhf/fbink', './newHotfix/fbink')