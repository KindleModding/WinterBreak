/**
 * Construct a new Pillow.Case.  Do not call unless you are directly extending.
 * @class This is the superclass for pillow cases.  It provides registration
 *        with nativeBridge and onLoad can be subclassed to get a callback when
 *        the DOM is ready.
 * @param {String} name The name of the subclass.  This is used to create the
 *                      appropriate ClientParamsHandler.
 */
Pillow.Case = function(name) {
    /**
     * Call this method to get the Pillow.Case running.  After the DOM is
     * loaded, onLoad will be called automatically.
     */
    this.register = function() {
        document.addEventListener('DOMContentLoaded',
                                  Pillow.bind(this, 'onPillowCaseLoad'),
                                  false);
    };

    /**
     * This method registers the clientParams handler with nativeBridge.
     */
    this.onLoad = function() {
        var clientParamsHandler = new Pillow[name].ClientParamsHandler(this);
        var clientParamsCallback = Pillow.bind(clientParamsHandler, clientParamsHandler.handle);
        nativeBridge.registerClientParamsCallback(clientParamsCallback);

        // if there is an event handler class set it up as well
        if (Pillow[name].LipcEventHandler){
            var lipcEventHandler = new Pillow[name].LipcEventHandler(this);

            var lipcEventCallback = Pillow.bind(lipcEventHandler, lipcEventHandler.handle);
            nativeBridge.registerEventsWatchCallback(lipcEventCallback);

            lipcEventHandler.subscribeToEvents();
        }
    };

    /**
     * This method handles the twoFingerHold ASR gesture event.
     */
    this.handleTriggerASR = function() {
        /* default implementation can just dismiss itself */
        this.close && this.close({numScans: 0, close: true});
    };

    this.onPillowCaseLoad = function() {
        // Introduce inASRMode property in derived object here
        this.inASRMode = nativeBridge.isASREnabled();
        this.onLoad();
    };

    this.handleVoiceViewStatusEvent = function(status) {
        var needDismiss = false;
        var inASRMode = this.inASRMode;

        Pillow.logInfo("Got voiceViewStatus " + status);
        needDismiss = (status === "started" && !inASRMode);
        needDismiss = needDismiss || (status === "stopped" && inASRMode);

        if (needDismiss)
            this.close && this.close({numScans: 0, close: true});
    };

    Pillow.logWrapObject('Pillow.Case', this);
};
