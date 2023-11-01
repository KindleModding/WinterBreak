/*
 * common_utils.js
 *
 * Copyright (c) 2017-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

var sIsDisplayModeLarge = nativeBridge.isDisplayModeLarge();

//checks for large mode and constructs DialogStringTable based on the display mode
function constructTableOnDisplayModeChange(defaultTable,LargeTable) {
    if (sIsDisplayModeLarge) {
       return merge(defaultTable,LargeTable);
    } else {
       return defaultTable;
    }
}

//function to merge large value with default value without duplicates
function merge(a, b) {
    for(var idx in b) {
        a[idx] = b[idx];
    }
    return a;
}

// Change class name of the DOM if in large mode.
function modifyClassNameDOM() {
    if (sIsDisplayModeLarge) {
        var all = document.getElementsByTagName('*');
        for (var i=0, max=all.length; i < max; i++) {
            all[i].className = all[i].className + " large";
        }
    }
}

// Change class name of DOM element in large mode.
function modifyClassNameElement(element) {
    if (sIsDisplayModeLarge) {
        element.className = element.className + " large";
    }
}

/* Adding escapeHTML utility to string prototype.
* escapeHTML will replace the HTML entities
* "&, <, >, ", ', /" with corresponding html escape
* characters
*/
(function () {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    function escapeHTML() {
        return this.replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }

    if (typeof(String.prototype.escapeHTML) !== 'function') {
        String.prototype.escapeHTML = escapeHTML;
    }
})();

// escapeHTML utility wrapper with type check.
function escapeHTML(text) {
    if (typeof text == "string") {
        return text.escapeHTML();
    }
    return text;
};

/*
 * Helper function will record wifi error dialogs metric in FM
 * @param errorReason: Reason for the error
 * @param errorDialogSelection: Selection in the error dialog
 */
function recordWifiErrorDialogMetric(errorReason, errorDialogSelection) {
    var fmEmitter = new FMEmitter();
    fmEmitter.addString(KEY_WIFI_ERROR_DIALOG_ERROR_REASON, errorReason);
    if (errorDialogSelection != null) {
        fmEmitter.addString(KEY_WIFI_ERROR_DIALOG_SELECTED_OPTION, errorDialogSelection);
    }
    fmEmitter.emitFastMetrics(SCHEMA_WIFI_ERROR_DIALOGS, SCHEMA_VERSION_WIFI_ERROR_DIALOGS);
};

/*
 * Helper function will record Bluetooth Connection time taken metric in FM
 * @param btConnTime: Elapsed time for BT connection
 * @param isPaired: 0 if the device is originally not paired, 1 otherwise
 */
function captureBTConnTimeMetric(btConnTime, isPaired) {
    if (btConnTime > 0) {
        var fmEmitter = new FMEmitter();
        fmEmitter.addInt(KEY_BT_CONN_TIME_TAKEN, btConnTime);
        fmEmitter.addInt(KEY_BT_IS_PAIRED_DEVICE, isPaired);
        fmEmitter.emitFastMetrics(SCHEMA_BT_CONNECTION_TIME, SCHEMA_VERSION_BT_CONNECTION_TIME);
    }
};

/**
 * Object to add values to FM payload and emit a metric in FM
 */
var FMEmitter = function() {

    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;

    var fmPayload = {};

    /**
    * Const defining Payload Keys, used to process data by Native FM SDK
    */
    const fmPayloadKey = {
        INT : "INT_",
        STRING : "STRING_",
        LONG : "LONG_"
    };

    /**
    * Method to add int to Fast Metrics Payload
    * @param key: key of metric emitted
    * @param value: value of corresponding key
    */
    this.addInt = function(key, value) {
        if (typeof value === 'number' && typeof key === 'string') {
            if ((value >= 0 && value <= INT_MAX) || (value < 0 && value >= INT_MIN)) {
                var payload_key = fmPayloadKey.INT + key;
                fmPayload[payload_key] = value.toString();
            } else {
                Pillow.logError("RangeError: Int value out of range");
            }
        } else {
            Pillow.logError("TypeError: key is not a string or value is not a number");
        }
    }

    /**
    * Method to add long to Fast Metrics Payload
    * @param key: key of metric emitted
    * @param value: value of corresponding key
    */
    this.addLong = function(key, value) {
        if (typeof value === 'number' && typeof key === 'string') {
            var payload_key = fmPayloadKey.LONG + key;
            fmPayload[payload_key] = value.toString();
        } else {
            Pillow.logError("TypeError: key is not a string or value is not a number");
        }
    }

    /**
    * Method to add string to Fast Metrics Payload
    * @param key: key of metric emitted
    * @param value: value of corresponding key
    */
    this.addString = function(key, value) {
        if (typeof value === 'string' && typeof key === 'string') {
            var payload_key = fmPayloadKey.STRING + key;
            fmPayload[payload_key] = value;
        } else {
            Pillow.logError("TypeError: key or value is not a string");
        }
    }

    /**
    * Method to add bool to Fast Metrics Payload
    * @param key: key of metric emitted
    * @param value: value of corresponding key
    */
    this.addBool = function(key, value) {
        if (typeof value === 'boolean' && typeof key === 'string') {
            var payload_key = fmPayloadKey.STRING + key;
            fmPayload[payload_key] = Boolean(value).toString();
        } else {
            Pillow.logError("TypeError: key is not a string or value is not a boolean");
        }
    }

    /**
     * This method is used to emit a FM metric via nativeBridge
     * @param schema name: Name of the schema to be emitted to
     * @param schema version: version of the schema to be emitted to
     */
    this.emitFastMetrics = function(schemaName, schemaVersion) {
        nativeBridge.emitFastMetrics(schemaName, schemaVersion, fmPayload);
    }
};

/**
 * TimeProfiler provides performance monitoring that can be used throughout the file
 * with multiple scopes.
 */
var TimeProfiler = function() {

    /** Scopes stored by identifier */
    var m_mapped_scopes = {};

    /**
     * Specifies single profiling scope
     */
    var ProfilerScope = function(aScopeName) {
        var m_name = aScopeName;
        var m_startTime = 0;
        var m_endTime = 0;
        var m_elapsedTime = 0;

        this.getScopeName = function() {
            return m_name;
        };

        this.getStartTime = function() {
            return m_startTime;
        };

        this.getEndTime = function() {
            return m_endTime;
        };

        this.getElapsedTime = function() {
            if(m_elapsedTime === 0 && m_startTime > 0) {
                return (new Date().getTime() - m_startTime);
            }
            return m_elapsedTime;
        };

        this.startScope = function() {
            m_startTime = new Date().getTime();
            m_elapsedTime = 0;
        };

        this.endScope = function() {
            m_endTime = new Date().getTime();
            m_elapsedTime = m_endTime - m_startTime;
            return m_elapsedTime;
        };
    };

    /**
     * Start profiling section.
     *
     * @param scopeName - Logical scope name
     * @param identifier - identifying string to use for tracking Scope
     *
     */
    this.startProfile = function(scopeName, identifier) {
        if(scopeName === null &&  identifier === null) {
            Pillow.logError("scopeName or identifier cannot be empty");
            return;
        }

        if(m_mapped_scopes.hasOwnProperty(identifier)) {
            Pillow.logError("identifier " + identifier + " already corresponds to a stored ProfilerScope");
            return;
        }

        var scope = new ProfilerScope(scopeName);
        scope.startScope();

        m_mapped_scopes[identifier] = scope;
    };

    /**
     * Ends profiling section.
     *
     * This method uses an identifier String lieu of a {@link ProfilerScope} and looks up
     * the stored {@link ProfilerScope} by the String for the purposes of closing the scope.
     *
     * @param identifier request ID identifying stored scope
     * @return elapsedTime
     *
     */
    this.endProfile = function(identifier) {
        if(identifier === null) {
            Pillow.logError("identifier cannot be empty");
            return;
        }
        if(!m_mapped_scopes.hasOwnProperty(identifier)) {
            Pillow.logError("identifier does not exists");
            return;
        }

        var scope = m_mapped_scopes[identifier];
        if (scope !== null) {
            delete m_mapped_scopes[identifier];
            return scope.endScope();
        }
    };

    /**
     * Returns profiling scope.
     *
     * This method uses an identifier String lieu of a {@link ProfilerScope} and looks up
     * the stored {@link ProfilerScope} by the String and returns the scopeObject
     *
     * @param identifier request ID identifying stored scope
     * @return {@link ProfilerScope}
     */
    this.getScope = function(identifier) {
        if(m_mapped_scopes.hasOwnProperty(identifier)) {
            return m_mapped_scopes[identifier];
        }
    };
};