/*
 * local_debug.js
 *
 * Copyright 2012 Amazon.com, Inc. or its affiliates. All Rights Reserved. 
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

/**
 * @fileOverview This file mocks out nativeBridge when it is undefined.  This
 *               is useful for development locally.
 */
(function() {
    if (window.nativeBridge) {
        return;
    }

    var methods = [
        'accessHasharrayProperty',
        'cancelPendingDismiss',
        'createFlashTrigger',
        'clearFlashTrigger',
        'dbgCmd',
        'devcapInitialize',
        'devcapIsAvailable',
        'devcapGetInt',
        'devcapGetString',
        'dismissChrome',
        'dismissMe',
        'flash',
        'getAppId',
        'getDynamicConfigValue',
        'getIntLipcProperty',
        'getScreenSize',
        'getStringLipcProperty',
        'getVisibilityEvents',
        'getWindowPosition',
        'hideKb',
        'hideMe',
        'isBricked',
        'isMaxPasswordAttemptPolicyEnabled',
        'logDbg',
        'logDbgNum',
        'logInfo',
        'logString',
        'logTime',
        'logWarn',
        'logError',
        'messagePillowCase',
        'raiseChrome',
        'redraw',
        'registerClientParamsCallback',
        'registerEventsWatchCallback',
        'setAcceptFocus',
        'setIntLipcProperty',
        'setLipcProperty',
        'setWindowPosition',
        'setWindowSize',
        'setWindowTitle',
        'showDialog',
        'showKb',
        'showMe',
        'subscribeToEvent',
    ];

    var debugFormat = function(data) {
        if (typeof data === 'string') {
            return '"' + data + '"';
        }

        if (typeof data === 'function') {
            return 'function';
        }

        if (typeof data === 'array') {
            return 'array(' + data.length + ')';
        }

        if (typeof data === 'object') {
            return 'object';
        }

        return data;
    };

    var createDebugBridge = function(method, mockImpl) {
        return function() {
            var args = [];
            for (var i = 0; i < arguments.length; ++i) {
                args[i] = debugFormat(arguments[i]);
            }

            console.log('nativeBridge.' + method + ' called' +
                        (args.length > 0 ? ' with ' + args.join(', ') : ''));

            if (mockImpl) {
                return mockImpl.apply(null, arguments);
            }
        };
    };

    window.nativeBridge = {};

    const INT = 1;
    const STRING = 2;
    const HASH = 3;

    var mockLipc = {
        'com.lab126.powerd': {
            flIntensity: {
                type: INT,
                value: 0,
                get: function() { return this.value; },
                set: function(value) { this.value = value; }
            },
            flMaxIntensity: {
                type: INT,
                get: function() { return 24; }
            }
        },
        'com.lab126.wifid': {
            scanList: {
                type: HASH,
                get: function() {
                    return [
                      { essid : "Lorem"
                      , secured : "yes"
                      , known : "no"
                      , signal : (5)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "no"
                      },
                      { essid : "Lipsum"
                      , secured : "yes"
                      , known : "no"
                      , signal : (5)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "no"
                      },
                      { essid : "dolor"
                      , secured : "yes"
                      , known : "yes"
                      , signal : (5)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "no"
                      },
                      { essid : "sit"
                      , secured : "yes"
                      , known : "no"
                      , signal : (5)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "no"
                      },
                      { essid : "amet"
                      , secured : "no"
                      , known : "no"
                      , signal : (5)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "yes"
                      , enterprise : "no"
                      },
                      { essid : "consectetur"
                      , secured : "yes"
                      , known : "no"
                      , signal : (5)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "yes"
                      },
                      { essid : "sed"
                      , secured : "yes"
                      , known : "no"
                      , signal : (4)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "yes"
                      , enterprise : "no"
                      },
                      { essid : "eiusmod"
                      , secured : "no"
                      , known : "no"
                      , signal : (4)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "yes"
                      , enterprise : "no"
                      },
                      { essid : "tempor"
                      , secured : "yes"
                      , known : "no"
                      , signal : (2)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "no"
                      },
                      { essid : "incididunt"
                      , secured : "yes"
                      , known : "no"
                      , signal : (2)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "yes"
                      , enterprise : "no"
                      },
                      { essid : "labore"
                      , secured : "yes"
                      , known : "no"
                      , signal : (1)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "yes"
                      , enterprise : "no"
                      },
                      { essid : "dolore"
                      , secured : "yes"
                      , known : "no"
                      , signal : (1)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "no"
                      },
                      { essid : "voluptatem"
                      , secured : "no"
                      , known : "no"
                      , signal : (1)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "no"
                      },
                      { essid : "adipisci"
                      , secured : "yes"
                      , known : "no"
                      , signal : (1)
                      , signal_max : (5)
                      , supported : "yes"
                      , wps : "no"
                      , enterprise : "yes"
                      }
                    ]
                }
            }
        },
        'com.lab126.winmgr': {
            orientation: {
                type: STRING,
                value: 'U',
                get: function() { return this.value; }
            }
        },
        'com.lab126.dpmManager': {
            isKindleStoreDisabled: {
                type: INT,
                value: 1,
                get: function() { return this.value; }
            }
        }
    };

    var setMockLipc = function(lipc, type, source, prop, value) {
        var s = lipc[source];
        if (s) {
            var p = s[prop];
            if (p && p.type === type && p.set) {
                return p.set.call(p, value);
            }
        }
    };

    var getMockLipc = function(lipc, type, source, prop) {
        var s = lipc[source];
        if (s) {
            var p = s[prop];
            if (p && p.type === type && p.get) {
                return p.get.call(p);
            }
        }
        return undefined;
    };

    window.nativeBridge.setIntLipcProperty = function(source, prop, value) {
        setMockLipc(mockLipc, INT, source, prop, value);
    };

    window.nativeBridge.getIntLipcProperty = function(source, prop) {
        return getMockLipc(mockLipc, INT, source, prop);
    };

    window.nativeBridge.getStringLipcProperty = function(source, prop) {
        return getMockLipc(mockLipc, STRING, source, prop);
    };

    window.nativeBridge.accessHasharrayProperty = function(source, prop) {
        return getMockLipc(mockLipc, HASH, source, prop);
    };

    var mockDevCap = {
        frontlight: {
            available: true
        },
        screen: {
            dpi: 96,
            "resolution.width": 1024,
            "resolution.height": 758
        }
    };

    window.nativeBridge.devcapIsAvailable = function(feature) {
        return Boolean(mockDevCap[feature] && mockDevCap[feature].available);
    };

    window.nativeBridge.devcapGetInt = function(feature, prop) {
        if (mockDevCap[feature] && mockDevCap[feature].hasOwnProperty(prop) &&
                typeof(mockDevCap[feature][prop]) === 'number') {
            return mockDevCap[feature][prop];
        }
        return null;
    };

    window.nativeBridge.devcapGetString = function(feature, prop) {
        if (mockDevCap[feature] && mockDevCap[feature].hasOwnProperty(prop) &&
                typeof(mockDevCap[feature][prop]) === 'string') {
            return mockDevCap[feature][prop];
        }
        return null;
    };

    window.nativeBridge.getScreenSize = function() {
        /**
         * This isn't accurate, but it doesn't really matter.  We can't debug
         * size-perfection in the browser anyway, because we don't control
         * the window size.
         */
        return {width: 1024, height: 758};
    };

    window.nativeBridge.getWindowPosition = function() {
        return {x: 0, y: 38};
    };

    window.nativeBridge.isMaxPasswordAttemptPolicyEnabled = function() {
        return false;
    };

    for (var c = 0; c < methods.length; ++c) {
        var mockImpl = window.nativeBridge[methods[c]];
        window.nativeBridge[methods[c]] = createDebugBridge(methods[c], mockImpl);
    }
})();
