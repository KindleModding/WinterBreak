var JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('node:fs');

if (fs.existsSync(__dirname + "/../mountsus-obs/")) {
    fs.rmdirSync(__dirname + "/../mountsus-obs/", { recursive: true, force: true });
}

fs.cpSync(__dirname + "/../mountsus/", __dirname + "/../mountsus-obs/", {recursive: true})

const files = [
    __dirname + "/../../mountsus-obs/apps/com.bluebotlaboratories.mountsus/js/mountsus_dialog.js",
    __dirname + "/../../mountsus-obs/apps/com.bluebotlaboratories.mountsus/js/mountsus_dialog2.js",
    __dirname + "/../../mountsus-obs/apps/com.bluebotlaboratories.mountsus/js/constants.js",
    __dirname + "/../../mountsus-obs/apps/com.bluebotlaboratories.mountsus/js/widget_list.js",
    __dirname + "/../../mountsus-obs/apps/com.bluebotlaboratories.mountsus/main.js",
    __dirname + "/../../mountsus-obs/apps/com.bluebotlaboratories.mountsus/lib.js"
]

var nameCache = {};



const obfuscators = [
    
]


for (let i=0; i < files.length; i++) {
    console.log("Obfuscating: " + files[i]);
    const fileData = fs.readFileSync(files[i], {encoding: 'utf-8'});

    const obfuscatedCode = JavaScriptObfuscator.obfuscate(
        fileData,
        {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            debugProtectionInterval: 4000,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'mangled-shuffled',
            identifiersPrefix: 'GIVEUSDEVELOPERMODE_',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            renameProperties: false,
            reservedNames: [
                "log",
                "Pillow",
                "Pillow.*",
                "this.*",
                "this.+",
                "Pillow.MountSusDialog",
                "MountSusDialog",
                "that",
                "parent",
                "windowTitle",
                "onLoad",
                "listItemSelection",
                "nativeBridge",
                "clientParamsCallback",
                "getBrowserSettings",
                "renderBrowserSettings",
                "setBrowserSettings",
                "show",
                "hide",
                "close",
                "logWrapObject",
                "this\\.onLoad",
                "this\\.listItemSelection",
                "this\\.nativeBridge",
                "this\\.clientParamsCallback",
                "this\\.getBrowserSettings",
                "this\\.renderBrowserSettings",
                "this\\.setBrowserSettings",
                "this\\.show",
                "this\\.hide",
                "this\\.close",
                "this\\.logWrapObject",
                "this\\.mountSusDialog",
                "ListWidget",
                "init",
                "sendVisualChangeEvent",
                "forEachVisibleItem",
                "shouldItemBeDisabled",
                "renderItemInSlot",
                "updateItemContents",
                "setMaxVisibleItems",
                "renderItem",
                "setItems",
                "setProperListWidgetSize",
                "scrollDown",
                "scrollUp",
                "setScrollOffset",
                "clear",
                "setDisabled",
                "call",
                "init.call",
                "this\\.init",
                "this\\.forEachVisibleItem",
                "this\\.shouldItemBeDisabled",
                "this\\.renderItemInSlot",
                "this\\.updateItemContents",
                "this\\.setMaxVisibleItems",
                "this\\.renderItem",
                "this\\.sendVisualChangeEvent",
                "this\\.setItems",
                "this\\.setProperListWidgetSize",
                "this\\.scrollDown",
                "this\\.scrollUp",
                "this\\.setScrollOffset",
                "this\\.clear",
                "this\\.setDisabled",
                "this\\.call",
                "this\\.init.call",
            ],
            identifierNamesCache: nameCache,
            selfDefending: false,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 1,
            stringArrayEncoding: ['rc4', 'base64'],
            stringArrayIndexesType: ['hexadecimal-numeric-string', 'hexadecimal-number'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 3,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 5,
            stringArrayThreshold: 1,
            transformObjectKeys: false, // Would break lipc sadly
            unicodeEscapeSequence: true,
            optionsPreset: 'high-obfuscation',
        }
    )

    nameCache = obfuscatedCode.getIdentifierNamesCache();
    fs.writeFileSync(files[i], obfuscatedCode.getObfuscatedCode(), {encoding: 'utf-8'});
}