/*
 * pillow.js
 *
 * Copyright 2012-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

/**
 * @namespace Holds functions and classes related to pillow.
 */
window.Pillow = {};

nativeBridge.devcapInitialize();

/**
 * In the future, we should consider detecting the DPI by making an invisible
 * div with a fixed size given in points and then reading out its size in
 * pixels.  However, that will be a little bit of a risky change, so do it when
 * we can adequately test that it never becomes visible, covers a touch target,
 * or screws up tricky CSS things like :first-child.
 */
Pillow.dpi = nativeBridge.devcapGetInt(DEVCAP_SCREEN, DEVCAP_PROPERTY_DPI);

Pillow.screenWidth = nativeBridge.devcapGetInt(DEVCAP_SCREEN, DEVCAP_PROPERTY_RESOLUTION_WIDTH);

Pillow.screenHeight = nativeBridge.devcapGetInt(DEVCAP_SCREEN, DEVCAP_PROPERTY_RESOLUTION_HEIGHT);

/**
 * Check if device needs Wireless Menu or Airplane Mode.
 */
Pillow.hasWirelessMenu = nativeBridge.devcapIsAvailable(DEVCAP_MENU_WIRELESS);

/**
 * Check if device needs Bluetooth Menu or Airplane Mode.
 */
Pillow.hasBluetoothMenu = nativeBridge.devcapIsAvailable(DEVCAP_MENU_BT);


/**
 * Check if device supports dual battery
 */
Pillow.hasDualBattery = (nativeBridge.devcapGetInt(DEVCAP_BATTERY, DEVCAP_PROPERTY_NO_OF_SUPPORTED_BATT) == 2);

/*
 * Ratio used to convert points to pixels
 * NOTE : the vertical and horizontal rationmight not be exactly the same
 *        for now it is good enough to use the DEVCAP_PROPERTY_DPI value for both
 */
Pillow.pixelPointRatio = Pillow.dpi / 72;

/**
 * Convert a value from points to pixels.
 * @param points The value in points
 * @returns The value in pixels
 */
Pillow.pointsToPixels = function tmp(points) {
    return Math.floor(points * Pillow.pixelPointRatio);
};

/**
 * Add two positions and return the result. A position is any object which has x and y properties.
 * @param a One position
 * @param b The other position
 * @returns The sum of the positions
 */
Pillow.addPositions = function tmp(a, b) {
    return {x: a.x + b.x, y: a.y + b.y};
};

/**
 * Get the position of a DOM element relative to the window.
 * @param elem The DOM element
 * @returns The relative position of the element in the window
 */
Pillow.getPositionInWindow = function tmp(elem) {
    var cur = {x: elem.offsetLeft, y: elem.offsetTop};
    if (elem.offsetParent) {
        cur = Pillow.addPositions(cur, Pillow.getPositionInWindow(elem.offsetParent));
    }
    return cur;
};

/**
 * Get the position of a DOM element on screen.
 * @param elem The DOM element
 * @returns The position of the element on screen
 */
Pillow.getPositionOnScreen = function tmp(elem) {
    return Pillow.addPositions(nativeBridge.getWindowPosition(), Pillow.getPositionInWindow(elem));
};

/**
 * Set the size of the window to the size of the given DOM element.
 * @param elem The DOM element
 */
Pillow.setWindowSizeByElement = function tmp(elem) {
    nativeBridge.setWindowSize(elem.offsetWidth, elem.offsetHeight);
};

/**
 * Display only last two hex values of a given MAC-48 Address.
 *
 * @param object MacAddress
 *
 */
Pillow.obfuscateMac48Address = function tmp(macAddress, maskLevel) {
    if (!macAddress) {
        return null;
    }
    if (macAddress.length !== MAC48_LENGTH) {
        return macAddress;
    }
    var macSplit = macAddress.split(MAC48_DELIMITER);
    if (macSplit.length !== MAC48_GROUP_LENGTH) {
        return macAddress;
    }
    for (i = 0; i < maskLevel; i++) {
        macAddress = macAddress.replace(macSplit[i], MAC48_MASK);
    }

    return macAddress;
};

/**
 * Displays first and last letters of BT device name, rest is replaced by '***'.
 * If the btname is only 1 letter, the letter is followed by '***' followed by the letter again.
 * If the btname is empty, '***' is returned.
 *
 * @param object BT device name.
 *
 */
Pillow.obfuscateBTName = function tmp( btName ) {
    if (nativeBridge.isProdDevice()) {
        var returnString = "";
        if (btName.length <= 0) {
            returnString = returnString.concat(BTNAME_MASK);
        }
        else {
            returnString = returnString.concat(btName[0],BTNAME_MASK, btName[btName.length-1]);
        }
        return returnString;
    }
    else {
        return btName;
    }
};

/**
 * Obfuscate parts of log line from GM build.
 */
Pillow.obfus = function tmp( message ) {
    return nativeBridge.obfus( message );
};

/**
 * Check whether a number is an integer.
 */
Pillow.isInteger = function tmp(value) {
    return ((typeof(value) === 'number') || (value instanceof Number)) &&
        Math.floor(value) === value;
};

/**
 * Set a global option.
 * @param k  (String) The key
 * @param v  The value
 */
Pillow.setOption = function tmp(k, v) {
    if (typeof(window.pillowCaseOptions) !== 'object') {
        window.pillowCaseOptions = {};
    }
    window.pillowCaseOptions[k] = v;
};

/**
 * Load a script from the given URL.
 * @param url (String) The URL
 */
Pillow.loadScript = function tmp(url) {
    var elem = document.createElement('script');
    elem.src = url;
    document.head.appendChild(elem);
};

/**
 * Private context for CSS class utilities
 */
(function tmp() {

    var makeClassRegExp = function tmp(cls) {
        return RegExp('\\s*\\b' + cls + '\\b\\s*', 'g');
    };

    var getClass = function tmp(elem) {
        return elem.getAttribute('class') || '';
    };

    /**
     * Check if an element has a class
     * @param elem  (HTMLElement) The DOM element
     * @param cls   (String) The class regexp
     * @return      True if the element has the class
     *
     * Note: don't give the class regexp as a RegExp object. It must be a string.
     */
    Pillow.hasClass = function tmp(elem, cls) {
        return Boolean(getClass(elem).match(makeClassRegExp(cls)));
    };

    /**
     * Add a class to an element
     * @param elem  (HTMLElement) The DOM element
     * @param cls   (String) The class name
     */
    Pillow.addClass = function tmp(elem, cls) {
        if (!Pillow.hasClass(elem, cls)) {
            elem.setAttribute('class', getClass(elem) + ' ' + cls);
        }
    };

    /**
     * Remove all classes matching a regexp from an element
     * @param elem  (HTMLElement) The DOM element
     * @param cls   (String) The class regexp
     *
     * Note: don't try to remove multiple classes at once by separating them with spaces in the regexp.
     * This will only work if the classes happen to be listed in the same order.
     *
     * Note: don't give the class regexp as a RegExp object. It must be a string.
     */
    Pillow.removeClass = function tmp(elem, cls) {
        elem.setAttribute(
            'class',
            (elem.getAttribute('class') || '').replace(makeClassRegExp(cls), ''));
    };

})();

/**
 * Use this function to easily create event handlers and other types of
 * callback functions.
 * @param {Object} context Object that will be "this" inside the method.  If
 *                         null, the call-time "this" is used.
 * @param {String|Function} method Function to call with the given context.  If
 *                                 it is a string it will be looked-up on the
 *                                 context object.
 * @param [arg1] This argument and all following arguments (if specified) are
 *               passed to the method when it is called.  If no arguments are
 *               specified, the call-time arguments are passed in instead.
 * @returns {Function} A function with context, arguments, or both predetermined
 */
Pillow.bind = function tmp(context, method, arg1) {
    var storedArguments = Array.prototype.slice.call(arguments, 2);
    if (storedArguments.length === 0) {
        storedArguments = null;
    }

    return function tmp() {
        if (!context) {
            context = this;
        }

        if (typeof method === 'string') {
            if (typeof context[method] !== 'function') {
                Pillow.logInfo("method-missing", {name: method});
            }
            method = context[method];
        }

        return method.apply(context, storedArguments || arguments);
    };
};

/**
 * Use this function as the first line in your class definition if you are
 * extending another class.  This will return a function useful for accessing
 * parent functionality when overriding.
 * @param {Object} self Object that is inheriting methods
 * @param {Object} superObject Object that is being inherited from
 * @returns {Function} Call this function with "this" as the only argument to
 *                     get an object suitable to call methods from the
 *                     superObject on.  Store the function and call it each
 *                     time you need access to a superclass method to ensure
 *                     the proper context.
 */
Pillow.extend = function tmp(self, superObject) {
    for (var property in superObject) {
        if (superObject.hasOwnProperty(property)) {
            self[property] = superObject[property];
        }
    }

    var contexts = {};
    return function tmp(current) {
        if (contexts[current]) {
            return contexts[current];
        }

        var parent = {};
        for (var property in superObject) {
            if (superObject.hasOwnProperty(property)) {
                parent[property] = superObject[property];

                if (typeof superObject[property] === 'function') {
                    parent[property] = Pillow.bind(current,
                        superObject[property]);
                }
            }
        }

        return contexts[current] = parent;
    };
};

(function tmp() {
    const LOG_MASK_PROP = 'pillowLogMask';

    // these are based on LLOG_LEVEL_* in llog.h
    const LOG_MASK_ERROR = 0x02000000;
    const LOG_MASK_WARN = 0x01000000;
    const LOG_MASK_INFO = 0x00800000;
    const LOG_MASK_DEBUG_HIGH = 0x00008000;
    const LOG_MASK_DEBUG_MID = 0x00004000;
    const LOG_MASK_DEBUG_LOW = 0x00002000;
    const LOG_MASK_DEBUG_PRIVATE = 0x00000040;

    var formatLogParameters = function tmp(kv) {
        if (!kv) {
            return "";
        }
        var str = "";
        for (var k in kv) {
            if (str !== "") {
                str += ", ";
            }
            str += k + "=" + kv[k];
        }
        return str;
    };

    var makeNiceLogger = function tmp(mask, f) {
        return function tmp(id, kv, msg) {
            if (window[LOG_MASK_PROP] & mask) {
                f(id || "pillow-js", formatLogParameters(kv), msg || "");
            }
        };
    };

    var makeNiceDebugLogger = function tmp(mask, f, level) {
        return function tmp() {
            if (window[LOG_MASK_PROP] & mask) {
                f(level, Array.prototype.join.call(arguments, ' '));
            }
        };
    };

    Pillow.logInfo = makeNiceLogger(LOG_MASK_INFO, nativeBridge.logInfo);

    Pillow.logWarn = makeNiceLogger(LOG_MASK_WARN, nativeBridge.logWarn);

    Pillow.logError = makeNiceLogger(LOG_MASK_ERROR, nativeBridge.logError);

    Pillow.logDbgHigh = makeNiceDebugLogger(LOG_MASK_DEBUG_HIGH, nativeBridge.logDbgNum, 0);

    Pillow.logDbgMid = makeNiceDebugLogger(LOG_MASK_DEBUG_MID, nativeBridge.logDbgNum, 1);

    Pillow.logDbgLow = makeNiceDebugLogger(LOG_MASK_DEBUG_LOW, nativeBridge.logDbgNum, 2);

    Pillow.logDbgPrivate = makeNiceDebugLogger(LOG_MASK_DEBUG_LOW, nativeBridge.logDbgNum, 9);

    // test logging
    // Pillow.logInfo("startup-log-test", {a: "foo", b: "bar", l: "info"}, "testing");
    // Pillow.logWarn("startup-log-test", {a: "baz", b: "quux", l: "warn"}, "testing");

    var logMethod;
    if (window.nativeBridge) {
        logMethod = Pillow.logDbgMid;
    }
    else {
        logMethod = Pillow.bind(console, console.log);
    }

    // Incremented and decremented to match the depth of the known call stack.
    var depth = 0;

    /**
     * Duplicate the message the specified number of times.
     * @inner
     * @param {String} message
     * @param {Number} times
     * @returns {String} The message concatenated the specified number of times
     */
    var expand = function tmp(message, times) {
        return (new Array(times + 1)).join(message);
    };

    /**
     * Wrap the given function with logging so that it announces itself via
     * debug or the console whenever it is called.
     * @param {String} name The name to display in the log
     * @param {Function} funktion The function to wrap
     * @returns {Function} The wrapped function
     */
    Pillow.logWrapFunction = function tmp(name, funktion, argNames) {
        return function tmp() {
            logMethod(expand('+', ++depth), name, 'called');
            var result = funktion.apply(this, arguments);

            logMethod(expand('-', depth--), name, 'returned');
            return result;
        };
    };

    /**
     * Wrap the given inner function with logging so that it announces itself
     * via debug or the console whenever it is called.  The name is formatted
     * automatically.
     * @param {String} className The name of the class this function is inside
     * @param {String} functionName The name of the function
     * @param {Function} funktion The function to wrap
     * @returns {Function} The wrapped function
     */
    Pillow.logWrapInner = function tmp(className, functionName, funktion) {
        return Pillow.logWrapFunction(className + '#(' + functionName + ')',
            funktion);
    };

    /**
     * Wrap all the methods on the given object with Pillow.logWrapFunction so
     * they announce themselves when called.  Ignores any specified methods and
     * can be used on static objects by passing true for isStatic.
     * @param {String} name The name of the class this object belongs to
     * @param {Object} instance The object instance to wrap
     * @param {String[]} [ignore] Names of methods to ignore
     * @param {Boolean} [isStatic=false] Send true if this is a static object
     */
    Pillow.logWrapObject = function tmp(name, instance, ignore, isStatic) {
        var ignoreMap = {};
        while (ignore && ignore.length > 0) {
            ignoreMap[ignore.pop()] = true;
        }

        for (var property in instance) {
            if (!ignoreMap[property] && instance.hasOwnProperty(property) &&
                (typeof instance[property] === 'function')) {
                var fullName = name + (isStatic ? '.' : '#') + property;
                instance[property] = Pillow.logWrapFunction(fullName,
                    instance[property]);
            }
        }
    };

    Pillow.logUserAction = function tmp(name) {
        Pillow.logInfo("UserActionInfo", {Action: name});
    };

})();

//This is to escape special characters before creating a RegExp
(function tmp() {
    // Referring to the table here:
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
    // these characters should be escaped
    // \ ^ $ * + ? . ( ) | { } [ ]
    // These characters only have special meaning inside of brackets
    // they do not need to be escaped, but they MAY be escaped
    // without any adverse effects
    // : ! , =

    var specials = [
        // order matters for these
        "-"
        , "["
        , "]"
        // order does not matter for any of these
        , "/"
        , "{"
        , "}"
        , "("
        , ")"
        , "*"
        , "+"
        , "?"
        , "."
        , "\\"
        , "^"
        , "$"
        , "|"
    ]

    regex = RegExp('[' + specials.join('\\') + ']', 'g');

    Pillow.escapeRegExp = function tmp(str) {
        return str.replace(regex, "\\$&");
    };
})();

//Log ReadingStreams metrics from Pillow Cases
(function tmp() {
    var READING_STREAMS_LIPC_SOURCE = "com.lab126.readingstreams";
    var PERFORM_ACTION_PROPERTY = "performAction";
    var ACTION_ID_KEY = "actionID";
    var CONTEXT_KEY = "context";
    var CONTEXT_GLOBAL_PROP_VALUE = "global";

    Pillow.recordReadingStreamsPerformAction = function tmp(actionID) {
        var performActionObject = {};
        performActionObject[CONTEXT_KEY] = CONTEXT_GLOBAL_PROP_VALUE;
        performActionObject[ACTION_ID_KEY] = actionID;

        return nativeBridge.accessHasharrayProperty(READING_STREAMS_LIPC_SOURCE, PERFORM_ACTION_PROPERTY, performActionObject);
    };

})();

(function tmp() {
    var BASE_INTERROGATE_FILE = "javascripts/interrogate.js";
    var LOCAL_INTERROGATE_FILE_TEMPLATE = "javascripts/interrogate_PILLOW_CASE.js";

    Pillow.loadInterrogateFiles = function tmp(pillowCaseName) {
        var interrogateElem = document.createElement('script');
        interrogateElem.setAttribute("type", "text/javascript");
        interrogateElem.src = BASE_INTERROGATE_FILE;

        interrogateElem.onload = function tmp() {
            Pillow.logDbgHigh("Loading local interrogate file " + name);
            var localInterrogateElem = document.createElement('script');
            localInterrogateElem.setAttribute("type", "text/javascript");
            localInterrogateElem.src = LOCAL_INTERROGATE_FILE_TEMPLATE.replace("PILLOW_CASE", pillowCaseName);

            localInterrogateElem.onload = function tmp() {
                Pillow.logInfo("Finished loading interrogate files for " + pillowCaseName);
                nativeBridge.setInterrogateFilesLoaded();
                //Initialize Widgets for pillow case
                Test.init();
            };

            document.head.appendChild(localInterrogateElem);
        };

        document.head.appendChild(interrogateElem);
    };
})();
