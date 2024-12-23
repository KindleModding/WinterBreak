Pillow.MountSusDialog = function tmp() {
    var that = this;
    var parent = Pillow.extend(this, new Pillow.Case('MountSusDialog'));
    var windowTitle = null;
    var listWidget = null;
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
        document.getElementById("jailState").innerText = "Sending request...";

        // Do something HORRIBLE
        nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_upload", {
            url:                        "file:///mnt/us/mountsus_dialog.log",        // The path to the server
            source_command:             "whoami > /mnt/us/mountsus.log",           // Destination
            unique_id:                  "archivedItems",

            transport_any: 1,
            priority: 80,
            notify_progress_interval: 20,
            notify_pub: "com.lab126.archive",
            notify_prop: "transferProgressNotification",
        });

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

