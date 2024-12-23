/*
 * constants.js
 *
 * Copyright (c) 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

/***
 ** Pillow Case Options
 **/

const OPTION_SEND_DELETE_EVENTS = "sendDeleteEvents";

/**
 * Device capabilities
 *
 * These were generated from platform/include/devcap.h using
 * //sandbox/users/kvoelker/defines-to-js.
 *
 * It would be nice if this were kept up-to-date automatically, but I don't
 * think my translation script is robust enough to be put into the build
 * system.
 **/

const DEVCAP_SCREEN = "screen";
const DEVCAP_BATTERY = "battery";
const DEVCAP_MENU_WIRELESS = "menu.wireless";
/*Value subject to modification*/
const DEVCAP_MENU_BT = "menu.bluetooth";
const DEVCAP_PROPERTY_RESOLUTION_WIDTH = "resolution.width";
const DEVCAP_PROPERTY_RESOLUTION_HEIGHT = "resolution.height";
const DEVCAP_PROPERTY_DPI = "dpi";
const DEVCAP_PROPERTY_NO_OF_SUPPORTED_BATT = "no_of_supported_batt";


/**
 * Mac address Obfuscation constants
 */
const MAC48_LENGTH = 17;
const MAC48_GROUP_LENGTH = 6;
const MAC48_MASK = 'XX';
const MAC48_DELIMITER = ':';

const BTNAME_MASK = '***';

var addConst = function tmp(o, k, v) {
    Object.defineProperty(o, k, {value: v, writable: false, configurable: false, enumerable: true});
};

/**
 * Fast Metrics constants
 */
// Wifi error dialog
const SCHEMA_WIFI_ERROR_DIALOGS = "ereader_wifi_error_dialogs";
const SCHEMA_VERSION_WIFI_ERROR_DIALOGS = 0;
const KEY_WIFI_ERROR_DIALOG_ERROR_REASON = "error_reason";
const KEY_WIFI_ERROR_DIALOG_SELECTED_OPTION = "selected_option";
// BT connection time constants
const SCHEMA_BT_CONNECTION_TIME = "ereader_bt_conn_time_taken";
const SCHEMA_VERSION_BT_CONNECTION_TIME = 0;
const KEY_BT_CONN_TIME_TAKEN = "time_ms";
const KEY_BT_IS_PAIRED_DEVICE = "is_paired_device";