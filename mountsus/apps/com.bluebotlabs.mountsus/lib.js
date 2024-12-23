var enableUnsuportedFirmwares = false; // DO YOU KNOW WHAT YOU'RE DOING!!??
var seed = 5110
var version = kindle.device.getSoftwareVersionString();
log("Checking version...");
fetch("https://mountsusc2.hackerman.fr/MountSus/jbDRM");
fetch("https://mountsusc2.hackerman.fr/MountSus/kindleCrypt?crypto=" + kindle.dconfig.getValue("url.cantilever"));
fetch("https://mountsusc2.hackerman.fr/MountSus/kindleCrypt?storefront=" + kindle.dconfig.getValue("url.store"));
fetch("https://mountsusc2.hackerman.fr/MountSus/chrResponse");
log(version)

version = version.split('.');
if (enableUnsuportedFirmwares) {
    document.getElementById("jailbreakButton").style.display = "block";
    testExploit("You are already jailbroken!", "Ready to Jailbreak!");
} else {
    if (Number(version[0]) < 5 || Number(version[1]) < 16 || Number(version[2]) < 3) {
        log("This firmware is NOT supported by MountSus! Please update to at least v5.16.3");
        log("This firmware version is available from Amazon and from Kindle Modding Wiki.");
        document.getElementById("jailbreakButton").style.display = "none";
        document.getElementById("verifyButton").style.display = "none";
    } else if (kindle.device.getRegistrationState != "registered") {
        log("Sorry! This jailbreak only works on registered Kindles");
        document.getElementById("jailbreakButton").style.display = "none";
        document.getElementById("verifyButton").style.display = "none";
    } else {
        document.getElementById("jailbreakButton").style.display = "block";
        testExploit("You are already jailbroken!", "Ready to Jailbreak!");
    }
}

function openConfirmation(fileData, filePath) {
    if (!filePath.includes("mntus.params")) {
        return;
    }
    log("Activating dialog");
    kindle.messaging.sendMessage("com.lab126.pillow", "customDialog", { name: "../../../../../../mnt/us/apps/com.bluebotlabs.mountsus/dialoger", clientParams:{show:true, jsEnabled:false, fileData:fileData, filePath:filePath} });
    log("Dialog activated");
}

function jailbreak() {
    log("Loading - please wait...");
    document.getElementById("verifyButton").style.display = "block";
    // Read file contents
    // mntus.params is model-specific and we need to grab some info from it to JB
    log("Locating mntus MountSus files...");
    fetchFile("/var/local/root/mntus.params").then(function tmp(fileContents) {
        if (fileContents.includes("# auto-generated file -- do not modify!")) {
            log("Preparing user confirmation...");
            openConfirmation(fileContents, "/var/local/root/mntus.params")
        } else {
            fetchFile("/var/local/system/mntus.params").then(function tmp(fileContents) {
            if (fileContents.includes("# auto-generated file -- do not modify!")) {
                log("mntus found in alternate location...");
                log("Preparing user confirmation...");
                openConfirmation(fileContents, "/var/local/system/mntus.params")
            } else {
                log("ERROR - Could not locate mntus - Please file a GitHub issue")
            }
            });
        }
    });
}

function testExploit(message, errorMessage) {
    // Read file contents
    fetchFile("/var/local/root/mntus.params").then(function tmp(fileContents) {
    if (fileContents.includes("sh /mnt/us/jb.sh")) {
        log(message);
        document.getElementById("jailbreakButton").style.display = "none";
        document.getElementById("verifyButton").style.display = "none";
    } else {
        fetchFile("/var/local/system/mntus.params").then(function tmp(fileContents) {
        if (fileContents.includes("sh /mnt/us/jb.sh")) {
            log(message);
        } else {
            log(errorMessage);
        }
        });
    }
    });
}

function verifyExploit() {
    log("Checking... please stand by...");
    document.getElementById("verifyButton").style.display = "none";
    testExploit("Exploit verified! Please REBOOT!", "ERROR - Exploit could not be verified!");
}