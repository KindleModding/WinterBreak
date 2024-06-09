/*
 * constants.js
 *
 * Copyright (c) 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

/**
 * The standard radius for rounded dialog corners.
 */
const DIALOG_CORNER_RADIUS_POINTS = 2.2;

/**
 * The standard radius for rounded buttons
 */
const BUTTON_CORNER_RADIUS_POINTS = 3.88;

/***
 ** Used by widget_button_bar.js:
 ** =============================
 **/

/**
 * Lay the buttons out horizontally, right aligned.
 */
const BUTTON_LAYOUT_NORMAL = 1;

/**
 * When there are 3 buttons, put the "middle" button up above the other two.
 */
const BUTTON_LAYOUT_STACKED = 2;

/**
 * Like BUTTON_LAYOUT_STACKED when in portrait, but in landscape, just make the
 * middle button wider.
 *
 * Note: the pillow case using this widget must add the "portrait" or "landscape" class
 * to some parent element of the button bar container element.
 */
const BUTTON_LAYOUT_AUTO = 3;

/**
 * When there are three buttons, put them like a list one after another.
 */
const BUTTON_LAYOUT_LISTED = 4;


/***
 ** Pillow Case Options
 **/

const OPTION_SEND_DELETE_EVENTS = "sendDeleteEvents";

/**
 * Dynconfig entry to store user preference
 **/
const DYNCONFIG_STORE_PASSWORD_PREF = "pillow.store.pass.pref";

/**
 * Demo Mode File Flag
 **/
const DEMO_MODE_FILE_FLAG = "/var/local/system/DEMO_MODE";

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

const DEVCAP_ACCERLEROMETER = "accelerometer";
const DEVCAP_BUTTON_KEYPAD = "button.keypad";
const DEVCAP_BUTTON_FIVEWAY = "button.fiveway";
const DEVCAP_BUTTON_HOME = "button.home";
const DEVCAP_TOUCH = "touch";
const DEVCAP_FRONTLIGHT = "frontlight";
const DEVCAP_SCREEN = "screen";
const DEVCAP_USB = "usb";
const DEVCAP_WAN = "wan";
const DEVCAP_WIFI = "wifi";
const DEVCAP_AUDIO = "audio";
const DEVCAP_ALS = "als";
const DEVCAP_CAFL = "cafl";
const DEVCAP_BATTERY = "battery";
const DEVCAP_MENU_WIRELESS = "menu.wireless";
/*Value subject to modification*/
const DEVCAP_MENU_BT = "menu.bluetooth";
const DEVCAP_PROPERTY_AVAILABLE = "available";
const DEVCAP_PROPERTY_PROC = "proc";
const DEVCAP_PROPERTY_RESOLUTION_WIDTH = "resolution.width";
const DEVCAP_PROPERTY_RESOLUTION_HEIGHT = "resolution.height";
const DEVCAP_PROPERTY_LED_TYPE = "led_type";
const DEVCAP_PROPERTY_DPI = "dpi";
const DEVCAP_PROPERTY_NO_OF_SUPPORTED_BATT = "no_of_supported_batt";
const DEVCAP_LONGPRESS_VOICEVIEW = "powerButtonLongPressVoiceView";
const DEVCAP_WPA3 = "wpa3";

/**
 * Flash Trigger Constants
 */

// Wave Form to use
const FLASH_TRIGGER_FIDELITY_AUTO = 0;
const FLASH_TRIGGER_FIDELITY_FAST_FULL = 1;
const FLASH_TRIGGER_FIDELITY_TWOPASS = 2;
const FLASH_TRIGGER_FIDELITY_GLFAST = 3;
const FLASH_TRIGGER_FIDELITY_GL = 4;
const FLASH_TRIGGER_FIDELITY_SLOW_WHITE = 5;
const FLASH_TRIGGER_FIDELITY_GC = 6;
const FLASH_TRIGGER_FIDELITY_FULL = 7;
const FLASH_TRIGGER_FIDELITY_XOR = 8;
const FLASH_TRIGGER_FIDELITY_SLOW_FULL = 9;
const FLASH_TRIGGER_FIDELITY_GCFAST = 10;

// Type of flash trigger
const FLASH_TRIGGER_TYPE_CLIENT_NEXT_DRAW = 0;
const FLASH_TRIGGER_TYPE_CLIENT = 1;
const FLASH_TRIGGER_TYPE_CLIENT_SIGNAL = 2;
const FLASH_TRIGGER_TYPE_CLIENT_RECT = 3;
const FLASH_TRIGGER_TYPE_CLIENT_RECT_ONLY = 4;
const FLASH_TRIGGER_TYPE_WAIT_FOR_KB_SHOW = 5;
const FLASH_TRIGGER_TYPE_WAIT_FOR_KB_HIDE = 6;
const FLASH_TRIGGER_TYPE_WAIT_FOR_RESHOW = 7;

/**
 * Dynamic configuration keys.
 */
const DYNCONFIG_OBFUSCATED_MARKETPLACE_KEY = 'marketplace.obfuscated.id';
const DYNCONFIG_URL_BAIDU_SEARCH = "url.baidusearch";

/**
 * Household Roles
 */
const HOUSEHOLD_ADULT_ROLE = 'ADULT';

/**
 * Registration service keys.
 */
const REGISTRATION_SERVICE_DEREGISTERED = 2;
const REGISTRATION_SERVICE_IS_REGISTERED = 1;

/**
 * Metric constants
 */
const METRICS_RECORD_SUCCESS = 0;
const METRICS_RECORD_FAILURE = 1;
const METRIC_PRIORITY_LOW = 0;
const METRIC_PRIORITY_HIGH = 1;
const METRIC_TYPE_COUNTER = 0;
const METRIC_TYPE_TIMER = 1;

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

/*
 * Bluetooth Related Constants
 */
const TRANSACT_FAILED_TIMEOUT = 15000;
const DEFAULT_NUM_SCAN_CYCLES = 6;
const LIPC_BTFD_SOURCE = "com.lab126.btfd";
const LIPC_APP_MGR_SOURCE = "com.lab126.appmgrd";
const PROP_BTFD_PAIR = "Bond";
const PROP_BTFD_CONNECT = "Connect";
const PROP_BTFD_FORGET = "Unbond";
const PROP_BTFD_DISCONNECT = "Disconnect";
const LIPC_PILLOW_SOURCE = "com.lab126.pillow";
const WINMGR_LIPC_SOURCE = "com.lab126.winmgr";
const PROP_BT_DISCOVER = "DiscoverA2DP";
const EVENT_BOND_RESULT = "Bond_Result";
const EVENT_UNBOND_RESULT = "Unbond_Result";
const EVENT_CONNECT_RESULT = "Connect_Result";
const EVENT_DISCONNECT_RESULT = "Disconnect_Result";
const EVENT_DISCOVER_RESULT = "Discover_Result";
const EVENT_CANCEL_DISCOVER_RESULT = "Cancel_Discover_Result";
const EVENT_DISCOVER_COMPLETE = "Discover_Complete";
const EVENT_BT_STATE_CHANGED = "BTstateChanged";
const EVENT_APP_ACTIVATING = "appActivating";
const EVENT_PAIR_NUMERIC_PIN_TO_DISPLAY = "btPairNumericPinToDisplay";
const DISMISSED_WITHOUT_CONNECTING = "cancelled";
const DISMISSED_AFTER_CONNECTING = "connected";
const PROP_BT_DIALOG_RESPONSE = "btPopupDone";
const PILLOW_PROGRAM_NAME = "Pillow";
const BT_PROGRAM_SOURCE = "BtWizard";
const BT_STATE_OFF = 0;

var BtActivity = {
    PAIRING : "BtPairing",
    CONNECTING : "BtConnecting",
    SCANNING : "BtScanning"
};

const EM_NO_WIFI_FOUND_ERROR = "noWifiFound";

/**
 * Fast Metrics constants
 */
// Wifi connection time constants
const SCHEMA_WIFI_CONNECTION_TIME = "ereader_wifi_conn_time_taken";
const SCHEMA_VERSION_WIFI_CONNECTION_TIME = 0;
const KEY_WIFI_CONN_TIME_TAKEN = "time_ms";
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

Object.freeze(BtActivity);

/*
 * TimeProfiler Constants
 */
const BT_WIZARD_CONN_SCOPE = "BT Wizard Unpaired Connect";
const BT_WIZARD_CONN_ID = "BTWizardConnect";
const BT_SWITCH_CONN_SCOPE = "BT Switch Paired Connect";
const BT_SWITCH_CONN_ID = "BTSwitchConnect";

/*
 * Powerd Constants
 */
const LIPC_POWERD_SOURCE = "com.lab126.powerd";
const PROP_POWERD_STATE = "state";
const POWERD_STATE_READY_TO_SUSPEND = "readyToSuspend";
const POWERD_STATE_SUSPENDED = "suspended";
