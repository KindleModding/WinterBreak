/**
 * Constructs a new handler for clientParams.  Do not call unless you are
 * directly extending it.
 * @class This class is abstract and should be subclassed with a method for
 *        each clientParams property that needs to be handled.
 */
Pillow.ClientParamsHandler = function() {
    /**
     * This method is bound to the nativeBridge callback by Pillow.Case#onLoad.
     * @param {String} clientParamsJSON JSON string to be parsed and handled
     */
    this.handle = function(clientParamsJSON) {
        var clientParams = JSON.parse(clientParamsJSON);

        for (var property in clientParams) {
            if (clientParams.hasOwnProperty(property) &&
                this.hasOwnProperty(property)) {
                this[property](clientParams);
            }
        }
    };

    Pillow.logWrapObject('Pillow.ClientParamsHandler', this);
};
