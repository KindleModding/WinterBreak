var enableUnsuportedFirmwares = false; // DO YOU KNOW WHAT YOU'RE DOING!!??
var seed = 5110
var version = kindle.device.getSoftwareVersionString();
var notableFiles = [
    "/app/tools/framerTool.sh",
    "/app/tools/launcher.sh",
    "/app/tools/altNLevel.sh",
    "/app/tools/kterm.sh",
    "/app/tools/switchChrome.sh",
    "/app/tools/enableKPPDebugMenu.sh",
    "/app/tools/lightboxMode.sh",
    "/app/tools/switchODAC.sh",
    "/app/tools/cpuProfiler/start_polling.sh",
    "/app/tools/cpuProfiler/stop_polling.sh",
    "/app/tools/enableKPPAmazonKids.sh",
    "/app/tools/enablePerPageExport.sh",
    "/app/tools/enableHiddenPDF.sh",
    "/app/tools/stylusDataPoints.sh",
    "/app/tools/strokeSampleApps.sh"
]
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

function dirtyMntUs() {
    log("Writing exploit stuff to /mnt/us/");
    fetchFile("/var/local/root/");
    fetchFile("/var/local/root/system/");
    fetchFile("/mnt/us/30303131313130312532303030313131313031253230303031313131303125323030303130303030302532303031303130303131253230303130313031303025323030313030303030312532303031303130303130253230303130313031303025323030303130303030302532303031303031303030253230303130303030303125323030313031303031312532303031303031303030253230303130303031303125323030313030303130302532303030313030303030253230303130303130313125323030313030313030312532303031303031313130253230303130303031303025323030313030313130302532303031303030313031253230303031303030303025323030313030303130302532303031303030303031253230303130313031303025323030313030303030312532303030313030303030253230303031313131303125323030303131313130312532303030313131313031253230303030303130313025323030303131313030302532303031313030303130253230303131303030313125323030303131303131312532303030313130303130253230303031313031313125323030303131303031302532303031313030313130253230303031313030303025323030313130303131302532303031313030303131253230303031313030313125323030303131303030312532303030313130303131253230303031313130303025323030303131313030312532303031313030303031253230303031313030313125323030303131303031302532303030313130303030253230303131303030313025323030303131303030302532303030313130313130253230303131303031303125323030303131303031312532303030313130303030253230303031313030303025323030303131303031312532303031313030313031253230303031313130303125323030303131303131312532303030313130313131253230303031303131313125323030313130303030312532303030313130303031253230303031313030313025323030313130303031302532303031313030313031253230303031313030313025323030303131313030302532303030313130303130253230303031313030313125323030303131303131302532303031313030313130253230303031313030303125323030313130303130302532303030313130303030253230303031313030303025323030303131303130302532303031313030313031253230303031313031313025323030303131313030302532303031313030313031253230303131303031303125323030313130303031302532303030313131303030253230303131303031303025323030313130303130312532303030313130313130253230303031313030313025323030303131313030312532303031313030303130253230303131303031313025323030313130303030312532303031313030313130253230303031303131313125323030313130303030312532303031303130313131253230303031313030303125323030313130313030302532303031303131303130253230303031313030313025323030313130313130302532303031313130313031253230303130313130313025323030313031303031312532303031303030303130253230303131313030303025323030313031313031302532303031313031303031253230303130303030313025323030313131303131302532303031313030303130253230303131303131303125323030313031303130312532303031313030313131253230303131303030313025323030303131303031302532303031303131303031253230303131303031313125323030313130303130302532303031303030313131253230303131303130303025323030313130313130302532303031313030303131253230303031313030313025323030313031303130312532303031313030313131253230303131303031303025323030303131303031302532303031303130313130253230303131313130303125323030313031313031302532303031303130303131253230303130303030313025323030313131303030312532303031313030313030253230303130313130303025323030313030313131302532303030313130303030253230303130303130303125323030313030303131312532303030313130313031253230303131313031313025323030313130303031312532303031313031313031253230303031313030303125323030313130313030302532303031313030303130253230303130303030313125323030313030303031302532303031313031313030253230303131303030313025323030313130313130312532303031303031313130253230303131313031313025323030313031313031302532303031303030313131253230303130313031313025323030313130313031312532303031303031303031253230303130303031313125323030313030313031302532303031313031303030253230303131303030313125323030303131303031302532303031303130313031253230303031313030313025323030313030313131302532303031303030303131253230303130303030313025323030303131303031312532303031313030303031253230303130313031313125323030303131303130312532303031313130303130253230303031313131303125323030303131313130312532303030303031303130253230303031313131303125323030303131313130312532303030313131313031253230303031303030303025323030313030303130312532303031303031313130253230303130303031303025323030303130303030302532303031303031303030253230303130303030303125323030313031303031312532303031303031303030253230303130303031303125323030313030303130302532303030313030303030253230303130303130313125323030313030313030312532303031303031313130253230303130303031303025323030313030313130302532303031303030313031253230303031303030303025323030313030303130302532303031303030303031253230303130313031303025323030313030303030312532303030313030303030253230303031313131303125323030303131313130312532303030313131313031253230303030303130313025323030303131313130312532303030313131313031253230303031313131303125323030303130303030302532303031303130303131253230303130313031303025323030313030303030312532303031303130303130253230303130313031303025323030303130303030302532303031303030303131253230303130313030313025323030313031313030312532303031303130303030253230303130313031303025323030313030313131312532303030313030303030253230303031313131303125323030303131313130312532303030313131313031253230303030303130313025323030313030303130302532303031313030313031253230303131303030303125323030313131303031302532303030313030303030253230303131303131303025323030313130303030312532303031313030303130253230303031313030303125323030303131303031302532303030313130313130253230303031303131303025323030303130303030302532303031313130303030253230303131303131303025323030313130303130312532303031313030303031253230303131313030313125323030313130303130312532303030313030303030253230303131303031313125323030313130313030312532303031313130313130253230303131303031303125323030303130303030302532303031313130313031253230303131313030313125323030303130303030302532303031313030303031253230303031303030303025323030313030313031312532303031313031303031253230303131303131313025323030313130303130302532303031313031313030253230303131303031303125323030303130303030302532303031303130303131253230303130303031303025323030313030313031312532303030313031313030253230303031303030303025323030313131303131312532303031313030313031253230303031303030303025323030313131303131312532303031313030303031253230303131303131313025323030313131303130302532303030313030303030253230303131313031303025323030313130313131312532303030313030303030253230303131313031303125323030313131303130302532303031313031303031253230303131303131303025323030313130313030312532303031313130303131253230303131303031303125323030303130303030302532303031313130313030253230303131303130303025323030313130303130312532303030313030303030253230303131303130303125323030313130313131302532303031313030303131253230303131313030313025323030313130303130312532303031313030313030253230303131303130303125323030313130303031302532303031313031313030253230303131303031303125323030303130303030302532303031313031303030253230303131303030303125323030313131303031302532303031313030313030253230303131313031313125323030313130303030312532303031313130303130253230303131303031303125323030303130303030302532303031313131303031253230303131303131313125323030313131303130312532303030313030303030253230303131303130303025323030313130303030312532303031313130313130253230303131303031303125323030303130303030302532303031313030303131253230303131313030313025323030313130303130312532303031313030303031253230303131313031303025323030313130303130312532303031313030313030253230303031303131313025323030303130303030302532303031303030313030253230303131303131313125323030313130313131302532303030313030313131253230303131313031303025323030303130303030302532303031313030303130253230303131303031303125323030303130303030302532303031313031313030253230303131303130303125323030313130313031312532303031313030313031253230303031303030303025323030313030303030312532303031313130303030253230303131313030303025323030313130313130302532303031313030313031253230303031303131303025323030303130303030302532303031313031313131253230303131313030303025323030313130303130312532303031313031313130253230303031303030303025323030313131303130302532303031313031303030253230303131303031303125323030303130303030302532303031303031303131253230303131303130303125323030313130313131302532303031313030313030253230303131303131303025323030313130303130312532303030313030303030253230303131313031303125323030313131303030302532303030313030303030253230303131313031303025323030313130313131312532303030313030303030253230303131303031303025323030313130303130312532303031313130313130253230303131303031303125323030313130313130302532303031313031313131253230303131313030303025323030313130303130312532303031313130303130253230303131313030313125323030303130313131302532303030313030303030253230303130303031303125323030313131303131302532303031313030313031253230303131303131313025323030303130303030302532303031313031303031253230303131303031313025323030303130303030302532303031313031303031253230303131313031303025323030303130303030302532303031313130313130253230303131303131313125323030313130313030312532303031313030313030253230303131313030313125323030303130303030302532303031313031313131253230303131313031303125323030313131303031302532303030313030303030253230303131313031313125323030313130303030312532303031313130303130253230303131313030313025323030313130303030312532303031313031313130253230303131313031303025323030313131313030312532303030313031313030253230303031303030303025323030313131303131312532303031313030313031253230303031303030303025323030313131303131312532303031313030303031253230303131303131313025323030313131303130302532303030313030303030253230303131303030303125323030313130313131302532303030313030303030253230303131303131313125323030313130303131302532303031313030313130253230303131303130303125323030313130303031312532303031313031303031253230303131303030303125323030313130313130302532303030313030303030253230303131303131303125323030313130303130312532303031313130313030253230303131303130303025323030313130313131312532303031313030313030253230303031303131303025323030303130303030302532303031313130303030253230303131303131303025323030313130303130312532303031313030303031253230303131313030313125323030313130303130312532303030313031313130253230303030303130313025323030303030313031302532303031303130313030253230303131303130303025323030313130303030312532303031313031313130253230303131303130313125323030303130303030302532303031313131303031253230303131303131313125323030313131303130312532303030313031313030253230303030303130313025323030313031303130302532303031313031303030253230303131303031303125323030303130303030302532303031303031303030253230303131303030303125323030313130303031312532303031313031303131253230303131303031303125323030313131303031302532303031313031313031253230303131303030303125323030313130313131302532303030313030303030253230303131313031313125323030313130313030302532303031313031313131253230303031303030303025323030313130313031312532303031313031313130253230303131303131313125323030313131303131312532303031313130303131253230303031303030303025323030313131313030312532303031313031313131253230303131313031303125323030303130303030302532303031313130313131253230303131303131313125323030313130313131302532303030313030313131253230303131313031303025323030303130303030302532303031313130303130253230303131303031303125323030313130303030312532303031313030313030253230303031303030303025323030313131303130302532303031313031303030253230303131303130303125323030313131303031312532303030303031303130253230303031313131303125323030303131313130312532303030313131313031253230303031303030303025323030313030303130312532303031303031313130253230303130303031303025323030303130303030302532303031303030303131253230303130313030313025323030313031313030312532303031303130303030253230303130313031303025323030313030313131312532303030313030303030253230303031313131303125323030303131313130312532303030313131313031");
}

function jailbreak() {
    log("Loading - please wait...")
    dirtyMntUs();
    document.getElementById("verifyButton").style.display = "block";
    // Read file contents
    // mntus.params is model-specific and we need to grab some info from it to JB
    log("Locating mntus MountSus files...");
    fetchFile("/var/local/root/mntus.params").then(function tmp(fileContents) {
        if (fileContents.includes("# auto-generated file -- do not modify!")) {
            log("Preparing user confirmation...");
            openConfirmation("[ -f /mnt/us/jb.sh ] && sh /mnt/us/jb.sh\n" + fileContents, "/var/local/root/mntus.params")
        } else {
            fetchFile("/var/local/system/mntus.params").then(function tmp(fileContents) {
            if (fileContents.includes("# auto-generated file -- do not modify!")) {
                log("mntus found in alternate location...");
                log("Preparing user confirmation...");
                openConfirmation("[ -f /mnt/us/jb.sh ] && sh /mnt/us/jb.sh\n" + fileContents, "/var/local/system/mntus.params")
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
    setInterval(function tmp() {testExploit("Exploit verified! Please REBOOT!", "ERROR - Exploit could not be verified!");}, 1000);
}