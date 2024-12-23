/**
 * Constructs a new handler for lipc events.  Do not call unless you are
 * directly extending it.
 * @class This class is abstract and should be subclassed 
 */
Pillow.LipcEventHandler = function(pillowCase) {
    
    /**
     * loop through and subscribe to all events in subclass
     */
    this.subscribeToEvents = function(){
        //subscribe to events in subclass
        for (srcKey in this.subscribedEvents.sources){
            var src = this.subscribedEvents.sources[srcKey];
            for (eventKey in src.events){
                var event = src.events[eventKey];
                nativeBridge.subscribeToEvent(src.name, event.name);
            }
        }
    };
    
    /**
     * This method is bound to the nativeBridge callback by Pillow.Case#onLoad.
     * @param {String} clientParamsJSON JSON string to be parsed and handled
     */
    this.handle = function(lipcEventJSON) {
        var lipcEvent = JSON.parse(lipcEventJSON);

        if (this.hasOwnProperty(lipcEvent.eventName)) {
            this[lipcEvent.eventName](lipcEvent.eventValues);
        }
    };

    /*
     * Subscribe to the two finger event upon which every pillowCase has to
     * dismiss itself.
     */

    this.subscribedEvents = {
        sources: [ { name: "com.lab126.asrGesture" ,
                     events: [ { name : "twoFingerHold" } ] },
                   { name: "com.lab126.hal",
                     events: [ { name : "voiceViewStatus" } ] }
                 ]
    };

    this.twoFingerHold = function(values) {
        Pillow.logDbgHigh("Got Two fingerhold event.");
        if (!nativeBridge.checkFileFlag("/var/local/POWER_BUTTON_HELD"))
            return;
        if (pillowCase && pillowCase.handleTriggerASR)
            pillowCase.handleTriggerASR();
    };

    this.voiceViewStatus = function(values) {
        Pillow.logDbgHigh("Got voiceViewStatus event.");
        if (!values || !values[0])
            return;

        if (pillowCase && pillowCase.handleVoiceViewStatusEvent)
            pillowCase.handleVoiceViewStatusEvent(values[0]);
    };

    Pillow.logWrapObject('Pillow.LipcEventsHandler', this);
};
