/*
 * window_title.js
 *
 * Copyright 2012 Amazon.com, Inc. or its affiliates. All Rights Reserved. 
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

const WINMGR = {};

addConst(WINMGR, 'KEY', {});
addConst(WINMGR.KEY, 'LAYER', 'L');
addConst(WINMGR.KEY, 'ROLE', 'N');
addConst(WINMGR.KEY, 'ID', 'ID');
addConst(WINMGR.KEY, 'FLASH_ON_SHOW', 'FS');
addConst(WINMGR.KEY, 'FLASH_ON_HIDE', 'FH');
addConst(WINMGR.KEY, 'FLASH_ON_UPDATE', 'FU');
addConst(WINMGR.KEY, 'REQUIRES_KB', 'RKB');
addConst(WINMGR.KEY, 'KB_VISIBILITY', 'KBS');
addConst(WINMGR.KEY, 'ALWAYS_SHOW_SEARCH_BAR', 'ASB');
addConst(WINMGR.KEY, 'WHOLE_SCREEN_APP', 'WS');
addConst(WINMGR.KEY, 'WIN_IS_MODAL', 'M');
addConst(WINMGR.KEY, 'CUSTOM_SEARCH_BAR', 'CSB');
addConst(WINMGR.KEY, 'EWC', 'EWC');
addConst(WINMGR.KEY, 'ORIENTATION', 'O');
addConst(WINMGR.KEY, 'PERSISTENT_CHROME', 'PC');
addConst(WINMGR.KEY, 'CHROME_DIALOG', 'CD');
addConst(WINMGR.KEY, 'PORTRAIT_HEIGHT', 'PorH');
addConst(WINMGR.KEY, 'PORTRAIT_WIDTH', 'PorW');
addConst(WINMGR.KEY, 'LANDSCAPE_HEIGHT', 'LanH');
addConst(WINMGR.KEY, 'LANDSCAPE_WIDTH', 'LanW');
addConst(WINMGR.KEY, 'DRAW_MODE', 'DM');
addConst(WINMGR.KEY, 'SENSITIVE_MODE', 'S');
addConst(WINMGR.KEY, 'ROUNDED_CORNERS', 'RC');
addConst(WINMGR.KEY, 'BORDER_WIDTH', 'BW');
addConst(WINMGR.KEY, 'ROTATION_DIALOG', 'RD');
addConst(WINMGR.KEY, 'ROUNDED_CORNERS_TOP_LEFT', 'RCTL');
addConst(WINMGR.KEY, 'ROUNDED_CORNERS_TOP_RIGHT', 'RCTR');
addConst(WINMGR.KEY, 'ROUNDED_CORNERS_BOTTOM_LEFT', 'RCBL');
addConst(WINMGR.KEY, 'ROUNDED_CORNERS_BOTTOM_RIGHT', 'RCBR');
addConst(WINMGR.KEY, 'AFTER_HIDE_DAMAGE_TIMEOUT', 'HIDET1');
addConst(WINMGR.KEY, 'AFTER_SHOW_DAMAGE_TIMEOUT', 'SHOWT1');
addConst(WINMGR.KEY, 'HIDE_DIALOG', 'HIDE');
addConst(WINMGR.KEY, 'TAP_AWAY_PARENT', 'TAP');
addConst(WINMGR.KEY, 'TAP_AWAY_CHILD', 'TAC');
addConst(WINMGR.KEY, 'TAP_AWAY_BUTTON', 'TAB');
addConst(WINMGR.KEY, 'SUBSCRIPTIONS', 'CMS');
addConst(WINMGR.KEY, 'SHOWEVENT', 'SE');

addConst(WINMGR.KEY, 'CUSTOM', {});
addConst(WINMGR.KEY.CUSTOM, 'PILLOW_ID', 'PILLOW');
addConst(WINMGR.KEY.CUSTOM, 'FORCE_VISIBLE', 'TV');
addConst(WINMGR.KEY.CUSTOM, 'PERSISTENT_HEIGHT', 'SBPH');
addConst(WINMGR.KEY.CUSTOM, 'TRANSIENT_HEIGHT', 'SBTH');

addConst(WINMGR, 'ROLE', {});
addConst(WINMGR.ROLE, 'APPLICATION', 'application');
addConst(WINMGR.ROLE, 'KEYBOARD', 'keyboard');
addConst(WINMGR.ROLE, 'DIALOG', 'dialog');
addConst(WINMGR.ROLE, 'SEARCHBAR', 'searchBar');
addConst(WINMGR.ROLE, 'SYSTEMMENU', 'systemMenu');
addConst(WINMGR.ROLE, 'TITLEBAR', 'titleBar');
addConst(WINMGR.ROLE, 'FOOTERBAR', 'footerBar');
addConst(WINMGR.ROLE, 'TILEDBOTTOM', 'tiledBottom');
addConst(WINMGR.ROLE, 'SCREEN_SAVER', 'screenSaver');
addConst(WINMGR.ROLE, 'ALERT', 'pillowAlert');
addConst(WINMGR.ROLE, 'MEDIABAR', 'mediaBar');
addConst(WINMGR.ROLE, 'OVERLAY', 'overlay');

addConst(WINMGR, 'LAYER', {});
addConst(WINMGR.LAYER, 'APPLICATION', 'A');
addConst(WINMGR.LAYER, 'UNMANAGED', 'Unmanaged');
addConst(WINMGR.LAYER, 'CHROME', 'C');
addConst(WINMGR.LAYER, 'DIALOG', 'D');
addConst(WINMGR.LAYER, 'KEYBOARD', 'KB');
addConst(WINMGR.LAYER, 'SYS_NOTIFICATIONS', 'N');
addConst(WINMGR.LAYER, 'SCREEN_SAVER', 'SS');

addConst(WINMGR, 'ID', {});
addConst(WINMGR.ID, 'SYSTEM', 'system');

addConst(WINMGR, 'DIALOG_HIDE', {});
addConst(WINMGR.DIALOG_HIDE, 'BACKGROUND', 'background');
addConst(WINMGR.DIALOG_HIDE, 'HOLD_FOCUS', 'holdFocus');

addConst(WINMGR, 'FLASH_ON_HIDE', {});
addConst(WINMGR.FLASH_ON_HIDE, 'SUPPRESS', 'S');
addConst(WINMGR.FLASH_ON_HIDE, 'DEFAULT', 'D');
addConst(WINMGR.FLASH_ON_HIDE, 'FORCE_FULL', 'F');

addConst(WINMGR, 'FLASH_ON_SHOW', {});
addConst(WINMGR.FLASH_ON_SHOW, 'SUPPRESS', 'S');
addConst(WINMGR.FLASH_ON_SHOW, 'DEFAULT', 'D');
addConst(WINMGR.FLASH_ON_SHOW, 'FORCE_FULL', 'F');

addConst(WINMGR, 'MODALITY', {});
addConst(WINMGR.MODALITY, 'MODAL', 'true');
addConst(WINMGR.MODALITY, 'DISMISSIBLE_MODAL', 'dismissible');
addConst(WINMGR.MODALITY, 'NOT_MODAL', 'false');

addConst(WINMGR, 'ROUNDED_CORNERS', {});
addConst(WINMGR.ROUNDED_CORNERS, 'CUSTOM', 'custom');

addConst(WINMGR, 'SUBSCRIPTION', {});
addConst(WINMGR.SUBSCRIPTION, 'SCREEN_SAVER', 'ss');
addConst(WINMGR.SUBSCRIPTION, 'CHROME_RESET', 'cr');

addConst(WINMGR, 'TYPE', {});
addConst(WINMGR.TYPE, 'STRING', 'S');
addConst(WINMGR.TYPE, 'ARRAY', 'A');
addConst(WINMGR.TYPE, 'SET', 'E');

addConst(WINMGR, 'KEY_TYPE', {});
addConst(WINMGR.KEY_TYPE, WINMGR.KEY.SUBSCRIPTIONS, WINMGR.TYPE.SET);

/**
 * @class WindowTitle       Manages the window title parameters for a pillow case
 * @param windowLayer       (Optional) The value under WINMGR.KEY.LAYER (default WINMGR.LAYER.DIALOG)
 * @param windowRole        (Optional) The value under WINMGR.KEY.ROLE (default WINMGR.ROLE.DIALOG)
 * @param setTitleCallback  (Optional) A callback which takes the formatted title and sets it on
 *                          the window (default nativeBridge.setWindowTitle). This is for tests.
 *
 * The ID and PILLOW_ID are determined automatically and cannot be changed.
 *
 * Note that we currently assume only one WindowTitle should be created in any given pillow case.
 * As such, a warning will be issued if a second WindowTitle is initialized.
 *
 * Note that the window title will not format and send its title when initialized, only when updated.
 * If you aren't adding any parameters immediately after initialization, call sendTitle.
 */
var WindowTitle = function(windowLayer, windowRole, setTitleCallback) {

    /**
     * See if there's an existing instance
     */
    if (WindowTitle.instance) {
        Pillow.logWarn('pillow-wintitle-reinit');
    }
    WindowTitle.instance = this;

    /**
     * Default parameter values
     */
    if (!windowLayer) {
        windowLayer = WINMGR.LAYER.DIALOG;
    }
    if (!windowRole) {
        windowRole = WINMGR.ROLE.DIALOG;
    }
    if (!setTitleCallback) {
        setTitleCallback = nativeBridge.setWindowTitle;
    }

    /**
     * The parameters
     */
    var windowParams = {};

    /**
     * The previous title, to avoid setting it when it hasn't changed
     */
    var prevTitle = '';

    /**
     * Escape a string by replacing window title metacharacters with hyphens.
     */
    var esc = function(v) {
        return String(v).replace(/_|:/g, '-');
    };

    /**
     * Format a key-value pair for inclusion in the title.
     */
    var formatParam = function(k, v) {
        var t = WINMGR.KEY_TYPE[k] || WINMGR.TYPE.STRING;
        if (t === WINMGR.TYPE.ARRAY || t === WINMGR.TYPE.SET) {
            v = v.join(',');
        }
        return esc(k) + ((t === WINMGR.TYPE.STRING) ? '' : ('~' + t)) + ':' + esc(v);
    };

    /**
     * If true, changes are not sent to the callback immediately.
     * This is used in conjunction with the withChanges method.
     */
    var waitToSend = false;

    /**
     * @method sendTitle  Format the entire title and send it to the callback
     *
     * It's not necessary to call this method when updating the object with
     * addParam, removeParam, clearParams, or withChanges.
     */
    this.sendTitle = function() {
        if (waitToSend) {
            return;
        }
        var titleArray = [
            formatParam(WINMGR.KEY.LAYER, windowLayer),
            formatParam(WINMGR.KEY.ROLE, windowRole),
            formatParam(WINMGR.KEY.ID, WINMGR.ID.SYSTEM)];
        if (windowLayer === WINMGR.LAYER.DIALOG) {
            titleArray.push(formatParam(WINMGR.KEY.CUSTOM.PILLOW_ID, window.pillowId));
        }
        for (var k in windowParams) {
            titleArray.push(formatParam(k, windowParams[k]));
        }
        var titleStr = titleArray.join('_');
        if (titleStr === prevTitle) {
            Pillow.logDbgMid('window title has not changed: ', prevTitle);
        } else {
            prevTitle = titleStr;
            setTitleCallback(titleStr);
        }
    };

    /**
     * @method addParam  Add a parameter to the title
     * @param  k         The key (should be a value from WINMGR.KEY)
     * @param  v         The value
     */
    this.addParam = function(k, v) {
        if (windowParams[k] !== v){
            windowParams[k] = v;
            this.sendTitle();
        }
    };

    /**
     * @method removeParam  Remove a parameter from the title
     * @param  k            The key (should be a value from WINMGR.KEY)
     *
     * Note: LAYER and ROLE cannot be removed.
     */
    this.removeParam = function(k) {
        if (windowParams[k]){
            delete windowParams[k];
            this.sendTitle();
        }
    };

    /**
     * @method clearParams  Remove all parameters from the title except LAYER and ROLE
     */
    this.clearParams = function() {
        windowParams = {};
        this.sendTitle();
    };

    /**
     * @method withChanges  Apply multiple changes to the title, waiting to send the formatted
     *                      title until all changes are complete.
     * @param  fn           A callback which applies the changes to the title.
     *                      It will be called with this WindowTitle object as "this".
     * 
     * Note: this function is safe in the presence of callbacks which throw exceptions.
     * The exception will be caught, the formatted title will be sent, and then the exception
     * will be re-thrown.
     *
     * The motivation for providing this instead of an addParams method which takes an object
     * is that such objects are difficult to construct correctly when using the constants defined
     * under WINMGR.KEY as the keys. The object literal syntax {K:V} treats K as a string literal
     * whether it is quoted or not, so {WINMGR.KEY.FOO:V} does not have the desired effect, which
     * would be to evaluate WINMGR.KEY.FOO to produce some string like "Foo".
     */
    this.withChanges = function(fn) {
        var exception = null;
        try {
            waitToSend = true;
            fn.call(this);
        } catch (e) {
            exception = e;
        } finally {
            waitToSend = false;
            this.sendTitle();
        }
        if (exception) {
            throw exception;
        }
    };
};

