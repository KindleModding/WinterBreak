/*
 * XorButton.js
 *
 * Copyright 2011-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved. 
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

/**
 * The XorButton class manages the visual inversion of a button.
 *
 * @param eventTarget     The DOM element that should generate click events
 * @param mouseUpAction     A function which handles click events
 * @param dom             The DOM button element
 * @param normalClass     The class name which styles the button normally
 * @param invertedClass   The class name which styles the button inversely
 * @param options         Optional by-name parameters
 */
var XorButton = function(eventTarget, mouseUpAction, dom, normalClass, invertedClass, callerOptions) {

    var that = this;

    const DEFAULT_OPTIONS = {
        delayAction: true,
        checkEnabledCallback: function() { return true; },
        initialTimeoutLength: 1000,
        onHold: null,
        holdDuration: 500,
        fast: false,
        actionDelay: 5,
        incrementalUpdate: false
    };

    if (!callerOptions) {
        callerOptions = {};
    }

    var options = {};

    for (var o in DEFAULT_OPTIONS) {
        options[o] = callerOptions.hasOwnProperty(o) ? callerOptions[o] : DEFAULT_OPTIONS[o];
    }

    /**
     * This becomes true on mousedown.
     * We only respond to mouseup if armed.
     * On mouseout, we set a timer to un-arm after a delay.
     */
    var armed = false;

    /**
     * If there is an onHold action, then whenever the button becomes armed, we
     * set this timeout.
     */
    var holdTimeout = null;

    /**
     * This is the period of time after a mouseout event during which an armed
     * button remains armed.
     */
    var unarmDelay = options.fast ? 50 : 1000;

    /**
     * This is how long we delay the button's action after switching the button
     * to the inverse style. This delay is to ensure that the style change
     * becomes visible before the screen pauses (or before the system simply
     * becomes busy handling the button's action).
     */
    var actionDelay = options.delayAction ? options.actionDelay : 0;

    /**
     * This is how long we wait after the button press before switching the
     * button back to the normal style. If we observe the beginning of an app
     * state change before reaching this timeout, then it is cleared and the
     * app switch timeout applies instead.
     */
    // 500 seems to line up perfectly with the drawing of the Home and Settings menus
    // 1000 occurs a short time after the menu has drawn, which is safer
    var initialTimeoutLength = options.fast ? 50 : options.initialTimeoutLength;

    /**
     * This is how long we wait after an app's Go 0 event before switching the
     * button back to the normal style.
     *
     * This timeout is intended to fall during the period of time in which the
     * screen is paused, so that the apparent reversion to the normal button
     * style occurs at the same time as the screen unpausing.
     */
    var appSwitchTimeoutLength = 50;

    var inverted = false;
    var appSwitching = false;
    var initialTimeout = null;
    var appSwitchTimeout = null;

    var clearInitialTimeout = function() {
        clearTimeout(initialTimeout);
        initialTimeout = null;
    };

    var clearAppSwitchTimeout = function() {
        clearTimeout(appSwitchTimeout);
        appSwitchTimeout = null;
    };

    var setInversion = function(newState) {
        Pillow.logDbgHigh("XorButton.setInversion:" + inverted + ":" + newState);

        if (inverted != newState) {
            inverted = newState;
            if (options.incrementalUpdate) {
                var oldClass = newState ? normalClass : invertedClass;
                var newClass = newState ? invertedClass : normalClass;
                if (oldClass) {
                    Pillow.removeClass(dom, oldClass);
                }
                if (newClass) {
                    Pillow.addClass(dom, newClass);
                }
            } else {
                dom.setAttribute("class", newState ? invertedClass: normalClass);
            }
        }
    };

    var setNormal = Pillow.bind(null, setInversion, false);

    var setInverted = Pillow.bind(null, setInversion, true);

    eventTarget.addEventListener('mouseout', function() {
            Pillow.logDbgHigh("XorButton.MOUSEOUT");
            if (armed) {
                clearTimeout(holdTimeout);
                armed = false;
                Pillow.logDbgHigh("XorButton.UNARM");
                setNormal();
            }
	    event.stopPropagation();
            event.preventDefault();
        }, false);

    var fireAction = function(action, arg) {
        armed = false;
        clearAppSwitchTimeout();
        clearInitialTimeout();
        // set a timeout to un-xor the button
        initialTimeout = setTimeout(function() {
                    Pillow.logDbgHigh("XorButton.initialTimeout:" + appSwitching);
                    initialTimeout = null;
                    if (!appSwitching) {
                        setNormal();
                    }
                }, initialTimeoutLength);
        // Execute the action of the button with a slight delay to allow our change
        // to become visible before any screen pausing that might happen.
        setTimeout(function() {
            Pillow.logDbgHigh("XorButton.ACTION");
            return action(arg);
        }, actionDelay);
    };

    eventTarget.addEventListener('mousedown', function(event) {
	    Pillow.logDbgHigh("XorButton.MOUSEDOWN Time = " + Date.now());
            if (!inverted && options.checkEnabledCallback()) {
                armed = true;
                holdTimeout = setTimeout(function() {
                    if (armed) {
                        if(options.onHold) {
                            fireAction(options.onHold);
                        } else {
                            Pillow.logInfo("XorButton.UNARM Time = " + Date.now());
                            that.unarm();
                        }
                    }
                }, options.holdDuration);
                setInverted();
            }
            event.stopPropagation();
            event.preventDefault();
        }, false);

    eventTarget.addEventListener('mouseup', function(event) {
            Pillow.logDbgHigh("XorButton.MOUSEUP Time = " + Date.now());
            if (armed) {
                clearTimeout(holdTimeout);
                fireAction(mouseUpAction, event);
            }
            event.stopPropagation();
            event.preventDefault();
        }, false);

    /**
     * Unarms the button.
     */
    this.unarm = function() {
        armed = false;
        setNormal();
    };

    /**
     * Updates the image classes.
     */
    this.setImageClasses = function(normClass, invertClass) {
    	
    	// Remove the existing class.
    	Pillow.removeClass(dom, normalClass);
    	Pillow.removeClass(dom, invertedClass);

    	normalClass = normClass;
    	invertedClass = invertClass;
    	
    	// Add the default class to the dom.
    	if(normalClass) {
            Pillow.addClass(dom, normalClass);	
    	}    	
    };
    
    /**
     * This should be called when an app switch starts.
     */
    this.appSwitchStarted = function() {
        Pillow.logDbgHigh("XorButton.appSwitchStarted:" + inverted + ":" + appSwitchTimeout);
        if (inverted) {
            appSwitching = true;
            clearInitialTimeout();
            clearAppSwitchTimeout();
            appSwitchTimeout = setTimeout(function() {
                        Pillow.logDbgHigh("XorButton.appSwitchTimeout");
                        appSwitching = false;
                        appSwitchTimeout = null;
                        setNormal();
                    } , appSwitchTimeoutLength);
        }
    };

    var appSwitchDone = function() {
        appSwitching = false;
        clearAppSwitchTimeout();
        setNormal();
    };

    /**
     * This should be called when an app switch ends.
     */
    this.appSwitchEnded = function() {
        Pillow.logDbgHigh("XorButton.appSwitchEnded:" + inverted + ":" + appSwitchTimeout);
        appSwitchDone();
    };

    /**
     * This should be called when an app switch fails.
     */
    this.appSwitchFailed = function() {
        Pillow.logDbgHigh("XorButton.appSwitchFailed:" + inverted + ":" + appSwitchTimeout);
        appSwitchDone();
    };

    /**
     * This should be called when a non-app-switching button
     * is no longer visible.
     */
    this.notVisible = function() {
        Pillow.logDbgHigh("XorButton.notVisible:" + inverted + ":" + initialTimeout);
        clearInitialTimeout();
        setNormal();
    };

};

