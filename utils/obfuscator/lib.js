const errorMessages = {
    [0 /* CannotGetVariableName */]: "Cannot get a variable name, try increasing the variable name length",
    [1 /* CannotGetVariableNameCustom */]: "Cannot get a variable name, try adding more custom characters or increase the variable name length",
    [2 /* CharsetIsIncompatibleES5 */]: "The selected charset is not supported for es5 target",
    [3 /* HasInvalidCustomCharacters */]: "Some of the custom characters cannot be used in variable names"
};
export class ObfuscateError {
    type;
    message;
    invalidCharacters; // Not null if type is `HasInvalidCustomCharacters`
    constructor(type, invalidCharacters) {
        this.type = type;
        this.message = errorMessages[type];
        this.invalidCharacters = invalidCharacters ?? null;
    }
}
// Simple random number generator with seed
function Mulberry32(seed) {
    return () => {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
let Random = Math.random;
function Shuffle(array) {
    let current = array.length;
    let temp;
    let rand;
    while (current !== 0) {
        rand = Math.floor(Random() * current);
        --current;
        temp = array[current];
        array[current] = array[rand];
        array[rand] = temp;
    }
}
function Urand(min, max) {
    if (max === undefined) {
        return Math.floor(Random() * min);
    }
    return Math.floor(Random() * max - min) + min;
}
function RandomElementsOfStringArray(array, count) {
    let ret = "";
    for (let i = 0; i < count; ++i) {
        ret += array[Urand(array.length)];
    }
    return ret;
}
function RandomElementOf(array) {
    return array[Urand(array.length)];
}
function IsValidName(name) {
    try {
        eval("var " + name);
        return true;
    }
    catch (e) {
        return false;
    }
}
const zalgoCharsExtended = [
    "\u08f1", "\u0363", "\u0364", "\u0365", "\u0366", "\u0367", "\u0368", "\u0369",
    "\u036a", "\u036b", "\u036c", "\u036d", "\u036e", "\u036f", "\u0483", "\u0484",
    "\u0485", "\u0486", "\u0593", "\u0594", "\u0595", "\u0597", "\u0598", "\u059c",
    "\u059e", "\u059f", "\u05a0", "\u05a1", "\u05a8", "\u05a9", "\u05ab", "\u05ac",
    "\u05af", "\u05b5", "\u05c4", "\u0610", "\u0611", "\u0612", "\u0613", "\u0614",
    "\u0615", "\u0616", "\u0617", "\u0618", "\u0619", "\u061a", "\u0656", "\u0657",
    "\u0658", "\u065a", "\u065b", "\u065d", "\u065e", "\u065f", "\u0674", "\u06d6",
    "\u06d7", "\u06d8", "\u06d9", "\u06da", "\u06db", "\u06dc", "\u06df", "\u06e0",
    "\u06e1", "\u06e2", "\u06e3", "\u06e4", "\u06e7", "\u06e8", "\u06ea", "\u06eb",
    "\u06ec", "\u06ed", "\u08e4", "\u08e5", "\u08e6", "\u08e7", "\u08e8",
    "\u08e9", "\u08f0", "\u08f2", "\u08f3", "\u08f4", "\u08f5", "\u08f6", "\u08f7",
    "\u08f8", "\u08f9", "\u08fa", "\u08fb", "\u08fc", "\u08fd", "\u08fe", "\u0e31",
    "\u0e34", "\u0e35", "\u0e36", "\u0e37", "\u0e38", "\u0e39", "\u0e3a", "\u0e47",
    "\u0e48", "\u0e49", "\u0e4a", "\u0e4b", "\u0e4c", "\u0e4d", "\u0e4e", "\u0ec9",
    "\u0f19", "\u0f35", "\u0f37", "\u0f72", "\u0f7a", "\u0f7b", "\u0f7c", "\u0f7d",
    "\u0f80", "\u0f84", "\u1dc0", "\u1dc1", "\u1dc2", "\u1dc3", "\u1dc4", "\u1dc5",
    "\u1dc6", "\u1dc7", "\u1dc8", "\u1dc9", "\u1dca", "\u1dfe", "\u1dff", "\ufb1e",
    "\ufc5e", "\ufc5f", "\ufc60", "\ufc61", "\ufc62", "\ufc63"
];
// Stolen from http://eeemo.net/
const zalgo_up = [
    '\u030d', '\u030e', '\u0304', '\u0305',
    '\u033f', '\u0311', '\u0306', '\u0310',
    '\u0352', '\u0357', '\u0351', '\u0307',
    '\u0308', '\u030a', '\u0342', '\u0343',
    '\u0344', '\u034a', '\u034b', '\u034c',
    '\u0303', '\u0302', '\u030c', '\u0350',
    '\u0300', '\u0301', '\u030b', '\u030f',
    '\u0312', '\u0313', '\u0314', '\u033d',
    '\u0309', '\u0363', '\u0364', '\u0365',
    '\u0366', '\u0367', '\u0368', '\u0369',
    '\u036a', '\u036b', '\u036c', '\u036d',
    '\u036e', '\u036f', '\u033e', '\u035b',
    '\u0346', '\u031a'
];
const zalgo_down = [
    '\u0316', '\u0317', '\u0318', '\u0319',
    '\u031c', '\u031d', '\u031e', '\u031f',
    '\u0320', '\u0324', '\u0325', '\u0326',
    '\u0329', '\u032a', '\u032b', '\u032c',
    '\u032d', '\u032e', '\u032f', '\u0330',
    '\u0331', '\u0332', '\u0333', '\u0339',
    '\u033a', '\u033b', '\u033c', '\u0345',
    '\u0347', '\u0348', '\u0349', '\u034d',
    '\u034e', '\u0353', '\u0354', '\u0355',
    '\u0356', '\u0359', '\u035a', '\u0323'
];
const zalgo_mid = [
    '\u0315', '\u031b', '\u0340', '\u0341',
    '\u0358', '\u0321', '\u0322', '\u0327',
    '\u0328', '\u0334', '\u0335', '\u0336',
    '\u034f', '\u035c', '\u035d', '\u035e',
    '\u035f', '\u0360', '\u0362', '\u0338',
    '\u0337', '\u0361'
];
const standaloneChars = [
    "\u13B0", "\u13B1", "\u2C0D", "\u2CB2",
    "\u2CBA", "\uA722", "\uA724", "\uA78B",
    "\u02B9", "\u02BA", "\u02BB", "\u02BC",
    "\u02BD", "\u02BE", "\u02BF", "\u02C6",
    "\u02C7", "\u02C8", "\u02C9", "\u02CA",
    "\u02CB", "\u02CC", "\u02CE", "\u02CF",
    "\u02D0", "\u02D1", "\u02EC", "\u0374",
    "\u037A", "\u0559", "\u0640", "\u07F4",
    "\u07F5", "\u07FA", "\u0971", "\u1843",
    "\u1C78", "\u1C79", "\u1C7A", "\u1C7B",
    "\u1C7C", "\u1D54", "\u1D55", "\u2D6F",
    "\u3035", "\u3033", "\u309D",
    "\u30FC", "\u30FD", "\u30FE", "\uA4F8",
    "\uA4F9", "\uA4FA", "\uA4FB", "\uA4FC",
    "\uA4FD", "\uA67F", "\uA788", "\uFF70",
    "\uFF9E", "\uFF9F", "\uA9E6",
    "\u05D9", "\u05D5", "\u0621", "\u0629",
    "\u0647", "\u06C0", "\u06C1", "\u06C2",
    "\u06C3", "\u06D5", "\u0715", "\u0716",
    "\u0718", "\u0719", "\u071A", "\u071D",
    "\u0722", "\u072A", "\u072F", "\u074D",
    "\u075A", "\u0765", "\u0766", "\u0780",
    "\u0789", "\u0799", "\u079A", "\u07D1",
    "\u07EA", "\u0B83", "\u0B9F", "\u0CF2",
    "\u0E14", "\u0E15", "\u0E16", "\u0E23",
    "\u0E27", "\u0E32", "\u0E33", "\u0E40",
    "\u0E45", "\u0EB0", "\u0EB2",
    "\u0EC0", "\u0F44", "\u0F4B", "\u0F50",
    "\u0F54", "\u0F55", "\u0F56", "\u0F66",
    "\u113C", "\u113E", "\u1173", "\u119E",
    "\u11A2", "\u141D", "\u141F", "\u1420",
    "\u1425", "\u1426", "\u1427", "\u1428",
    "\u1429", "\u1449", "\u144A", "\u14BB",
    "\u14BC", "\u14BD", "\u14BE", "\u14D0",
    "\u1508", "\u1540", "\u153E",
];
const startingChars = [
    "\u02b9", "\u02ba", "\u02bb", "\u02bc", "\u02bd", "\u02be", "\u02bf", "\u02c6",
    "\u02c7", "\u02c8", "\u02cc", "\u02d1", "\u0374", "\u037a", "\u0559", "\u1843",
    "\u1c78", "\u1c79", "\u1c7a", "\u1c7c", "\u1d54", "\u1d55", "\u1da5",
    "\u309d", "\u30fd", "\ua4f8", "\ua4f9", "\ua4fa", "\ua4fb", "\ua4fc", "\ua4fd",
    "\ua67f", "\ua717", "\ua718", "\ua719", "\ua71a", "\ua788", "\uff9e", "\uff9f",
    "\ua9e6", "\u05d9", "\u0621", "\u0627", "\u0674", "\u06c0", "\u06c1", "\u06c2",
    "\u06c3", "\u06d5", "\u0715", "\u0716", "\u0719", "\u071d", "\u072a", "\u072f",
    "\u0780", "\u0787", "\u0789", "\u0799", "\u079a", "\u07a2", "\u07a3", "\u07d1",
    "\u07e8", "\u0eb2", "\u03b3", "\u0f44", "\u0f4b", "\u0f56", "\u0f8b", "\u141d",
    "\u141e", "\u141f", "\u1420", "\u1425", "\u1426", "\u1427", "\u1449", "\u14a1",
    "\u14a2", "\u14bb", "\u14bc", "\u14bd", "\u14d0", "\u14d2", "\u14ea", "\u1505",
    "\u1507", "\u1508", "\u1509", "\u150a", "\u153e", "\u1550", "\u155d", "\u156a",
    "\u1595", "\u159f", "\u15a6", "\u15ae", "\u1690", "\u1691", "\u1692", "\u1693",
    "\u1694", "\u16b2", "\u16cd", "\u16e7", "\u1822", "\u1823", "\u1824", "\u1825",
    "\u1826", "\u1827", "\u1829", "\u182b", "\u1830", "\u1831", "\u1832", "\u1833",
    "\u1834", "\u1835", "\u1836", "\u1837", "\u1838", "\u1839", "\u183a", "\u183b",
    "\u184d", "\u1855", "\u185f", "\u186a", "\u188f", "\u189c", "\u18a4", "\u18a5",
    "\u18a6", "\u18d9", "\u18da", "\u18de", "\u18df", "\u2d30", "\u2d3e", "\u2d42",
    "\u2d46", "\u2d48", "\u2d53", "\u2d57", "\u318d", "\u31b4", "\u31b5", "\u31b6"
];
const baseChars = [
    "\u02b9", "\u02ba", "\u02bb", "\u02bc", "\u02bd", "\u02be", "\u02bf", "\u02c6",
    "\u02c7", "\u02c8", "\u02cc", "\u02d1", "\u0374", "\u037a", "\u0559", "\u1d54",
    "\u1d55", "\u1da5", "\ua4f8", "\ua4f9", "\ua4fa", "\ua4fb", "\ua4fc", "\ua4fd",
    "\ua67f", "\ua717", "\ua718", "\ua719", "\ua71a", "\ua788", "\u05d9", "\u0621",
    "\u0627", "\u0674", "\u06c0", "\u06c1", "\u06c2", "\u06c3", "\u06d5", "\u03b3"
];
const linesLetters = [
    "\u13B1", "\u13DD",
    "\u13DE", "\u13DF",
    "\u2C84", "\u2CA4",
    "\u2CB6", "\u2CBA",
    "\u2CD0", "\u2CDE",
    "\uA78B", "\u{10411}",
    "\u{10415}", "\u{1041B}",
    "\u{10423}", "\u{1D5A2}",
    "\u{1D5A8}", "\u{1D5A9}",
    "\u{1D5AB}", "\u{1D5D6}",
    "\u{1D5DC}", "\u{1D5DD}",
    "\u{1D5DF}", "\u{1D758}",
    "\u{1D75E}", "\u{1D763}",
    "\u2C85", "\u2C93",
    "\u2CA5", "\u2CB7",
    "\u2CBB", "\u2CDF",
    "\uA78C", "\u{10439}",
    "\u{1043D}", "\u{10443}",
    "\u{1044B}", "\u{1D5C5}",
    "\u{1D5F9}", "\uAB81",
    "\uABAE", "\uABAF",
    "\u02B9", "\u02BB",
    "\u02BC", "\u02BD",
    "\u02C8", "\u02C9",
    "\u02CA", "\u02CB",
    "\u02CC", "\u02CD",
    "\u02CE", "\u02CF",
    "\u0374", "\u0559",
    "\u07F4", "\u07F5",
    "\u1C7B", "\u1C7C",
    "\uA4F9", "\uA60C",
    "\uFF70", "\u01C0",
    "\u01C1", "\u0B9F",
    "\u1100", "\u1102",
    "\u115F", "\u1160",
    "\u1173", "\u1175",
    "\u119E", "\u11A1",
    "\u11A8", "\u11AB",
    "\u11FA", "\u1427",
    "\u1428", "\u1429",
    "\u1433", "\u1438",
    "\u1440", "\u1441",
    "\u1444", "\u1445",
    "\u1449", "\u144A",
    "\u14A3", "\u14A5",
    "\u14A7", "\u14AA",
    "\u14AC", "\u14AF",
    "\u14B2", "\u14B7",
    "\u1540", "\u167F",
    "\u16C1", "\u16CC",
    "\u16E7", "\u18B4",
    "\u18B5", "\u18B6",
    "\u18DE", "\u18DF",
    "\u1963", "\u2D4E",
    "\u2D4F", "\u30CB",
    "\u30FF", "\u3127",
    "\u3131", "\u3134",
    "\u3137", "\u3161",
    "\u3163", "\u318D",
    "\u318E",
    //"\uFF9E", "\uFF9F",
];
const linesLetters_compatibility = [
    "\u13b1", "\u13dd", "\u13de", "\u13df",
    "\u2c84", "\u2ca4", "\u2cb6", "\u2cba",
    "\u2cd0", "\u2cde", "\ua78b", "\u2c85",
    "\u2c93", "\u2ca5", "\u2cb7", "\u2cbb",
    "\u2cdf", "\ua78c", "\u02bb", "\u02bc",
    "\u02bd", "\u0559", "\u07f4", "\u07f5",
    "\u1c7b", "\u1c7c", "\ua60c", "\uff70",
    "\u01c0", "\u01c1", "\u0b9f", "\u1100",
    "\u1102", "\u115f", "\u1160", "\u1173",
    "\u1175", "\u119e", "\u11a1", "\u11a8",
    "\u11ab", "\u1427", "\u1428", "\u1429",
    "\u1433", "\u1438", "\u1440", "\u1441",
    "\u1444", "\u1445", "\u1449", "\u144a",
    "\u14a3", "\u14a5", "\u14a7", "\u14aa",
    "\u14ac", "\u14af", "\u14b2", "\u14b7",
    "\u1540", "\u16c1", "\u16cc", "\u16e7",
    "\u1963", "\u2d4e", "\u2d4f", "\u30cb",
    "\u30ff", "\u3127", "\u3131", "\u3134",
    "\u3137", "\u3161", "\u3163", "\u318d",
    "\u318e"
];
const iLetters = ["\u0049", "\u0399", "\u0406"];
function Unreachable(_) {
    throw Error("Unreachable");
}
export function CheckCustomCharacters(characters) {
    // Unique characters
    const startingChars = new Set();
    const nonStartingChars = new Set();
    const invalidChars = new Set();
    // Same characters as above, but characters can appear multiple times
    const allNonStartingChars = [];
    const allStartingChars = [];
    // These can cause `"var a" + char` to be valid code, so these are skipped early
    const badCharacters = ["\n", "\r", "\t", " ", ";"];
    for (const char of characters) {
        if (char.length === 0) {
            // Skip empty
            continue;
        }
        if (badCharacters.includes(char)) {
            // Skip bad character
            invalidChars.add(char);
            continue;
        }
        if (char.length !== 1) {
            // Longer "character", must not contain any of the bad characters
            let valid = true;
            for (const ch of char) {
                if (badCharacters.includes(ch)) {
                    valid = false;
                    break;
                }
            }
            if (!valid) {
                invalidChars.add(char);
                continue;
            }
        }
        if (invalidChars.has(char)) {
            // Already checked, invalid
            continue;
        }
        if (nonStartingChars.has(char)) {
            // Already checked, valid
            // Add again to increase chance
            allNonStartingChars.push(char);
            continue;
        }
        if (startingChars.has(char)) {
            // Same as before, but for starting characters
            allStartingChars.push(char);
            continue;
        }
        try {
            // Check if the current character is valid as a starting character in a variable name
            eval("var " + char);
            // If no exception is thrown, then it's valid
            startingChars.add(char);
            allStartingChars.push(char);
        }
        catch { }
        try {
            // Check again, but as a non-starting character
            eval("var a" + char);
            nonStartingChars.add(char);
            allNonStartingChars.push(char);
        }
        catch {
            // The current character cannot be used
            invalidChars.add(char);
        }
    }
    return {
        startingChars: allStartingChars,
        nonStartingChars: allNonStartingChars,
        invalidChars,
    };
}
let debugVarIndex = 0;
let debuggingVarNames = false;
function GetRandomVariableName(length, allowLonger, options, customCharacterData) {
    if (debuggingVarNames) {
        return "a_" + (debugVarIndex++);
    }
    const { charset } = options;
    let name = "";
    switch (charset.type) {
        case "zalgo":
            {
                name = RandomElementOf(startingChars);
                const zalgoLevel = charset.zalgoLevel ?? 3;
                while (name.length < length) {
                    if (zalgoLevel === 0) {
                        name += RandomElementOf(standaloneChars);
                    }
                    else {
                        if (Random() < 0.9) {
                            // Add a random number of zalgo characters with a starting character
                            name += RandomElementOf(baseChars);
                            const min = zalgoLevel;
                            const max = zalgoLevel * 1.5;
                            const diff = max - min;
                            name += RandomElementsOfStringArray(zalgo_up, Math.floor(Random() * diff + min));
                            name += RandomElementsOfStringArray(zalgo_mid, Math.floor(Random() * diff + min));
                            name += RandomElementsOfStringArray(zalgo_down, Math.floor(Random() * diff + min));
                            continue;
                        }
                        else {
                            // Add a random extended zalgo character with a starting character
                            // The only character that actually works and is not a letter is _
                            name += "_";
                            const count = Urand(zalgoLevel, zalgoLevel * 1.5);
                            const ch = RandomElementOf(zalgoCharsExtended);
                            for (let j = 0; j < count; ++j) {
                                name += ch;
                            }
                            continue;
                        }
                    }
                }
                break;
            }
        case "lines":
            {
                name = RandomElementsOfStringArray(options.target === "es5-" ? linesLetters_compatibility : linesLetters, length);
                break;
            }
        case "invisible":
            {
                name = "\u02cb";
                for (let i = 0; i < length; ++i) {
                    name += String.fromCharCode(0xfe00 + (Random() * 16) | 0);
                }
                break;
            }
        case "iiii":
            {
                name = RandomElementsOfStringArray(iLetters, length);
                break;
            }
        case "custom":
            {
                name =
                    RandomElementsOfStringArray(customCharacterData.startingChars, 1) +
                        RandomElementsOfStringArray(customCharacterData.nonStartingChars, length - 1);
                break;
            }
        default:
            Unreachable(charset);
    }
    if (allowLonger) {
        return name;
    }
    // Trim name to the given length
    const chars = [...name].slice(0, length);
    return chars.join("");
}
function GetNewVariableName(usedVariableNames, options, customCharacterData) {
    const { variableNameLength, charset } = options;
    const allowLongerName = charset.type === "zalgo";
    let len;
    if (allowLongerName) {
        const min = variableNameLength;
        const max = variableNameLength * 1.5;
        len = Math.floor(Random() * (max - min) + min);
    }
    else {
        len = variableNameLength;
    }
    const maxAttempts = 100;
    for (let i = 0; i < maxAttempts; ++i) {
        const name = GetRandomVariableName(len, allowLongerName, options, customCharacterData);
        if (!IsValidName(name)) {
            // Should not happen, was already checked before
            continue;
        }
        if (!usedVariableNames.has(name)) {
            // Found a new variable name which has not been used yet
            usedVariableNames.add(name);
            return name;
        }
    }
    // Could not get new variable name
    if (charset.type === "custom") {
        throw new ObfuscateError(1 /* CannotGetVariableNameCustom */);
    }
    else {
        throw new ObfuscateError(0 /* CannotGetVariableName */);
    }
}
function GetCharCodes(str) {
    // Note: this will split characters with char code >0xffff into two characters
    // But those will be re-combined after string concatenation, so it will work fine
    // By not using code points, we only need to go to 32768 for the highest number bit, instead of 524288, which saves some space
    // return str.split("").map(ch => ch.charCodeAt(0));
    const codes = new Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        codes[i] = str.charCodeAt(i);
    }
    return codes;
}
function GetIntFromBits(number, i0, i1, i2, i4, i8, i16, i32, i64, i128, i256, i512, i1024, i2048, i4096, i8192, i16384, i32768) {
    // Construct a number from bits, using the given variable names
    // e.g. the number 20 can be constructed from 4 + 16
    if (number === 0) {
        return i0;
    }
    const ret = [];
    const numberNames = [i1, i2, i4, i8, i16, i32, i64, i128, i256, i512, i1024, i2048, i4096, i8192, i16384, i32768];
    for (const num of numberNames) {
        if (number & 1) {
            ret.push(num);
        }
        number >>= 1;
    }
    Shuffle(ret);
    let retStr = ret[0]; // Should always have at least one element
    for (let i = 1; i < ret.length; ++i) {
        // Use + or | at random; since the numbers are powers of 2, both have the same effect
        retStr += Random() < 0.5 ? "+" : "|";
        retStr += ret[i];
    }
    return retStr;
}
function ValidateRngSeed(seed) {
    if (Number.isNaN(seed) || !Number.isFinite(seed)) {
        return 0;
    }
    else if (seed < 0) {
        return 0;
    }
    else if (seed > 0xffffffff) {
        return 0xffffffff;
    }
    return Math.floor(seed);
}
// Returns the obfuscated version of the input code
// Throws `ObfuscateError` if the code could not be obfuscated for some reason
// See comments for `ObfuscationOptions` for more information about the options (everything is optional)
export function Obfuscate(inputCode, options) {
    if (inputCode === "") {
        return "";
    }
    const optionsValidated = {
        charset: options?.charset ?? { type: "zalgo" },
        variableNameLength: Math.max(options?.variableNameLength ?? 2, 2),
        target: options?.target ?? "es6+",
        deobfuscationProtection: options?.deobfuscationProtection ?? null
    };
    const rngSeed = options?.rngSeed ?? null;
    Random = (rngSeed === null) ? Math.random : Mulberry32(ValidateRngSeed(rngSeed));
    const { charset, variableNameLength, target, deobfuscationProtection } = optionsValidated;
    if (target === "es5-") {
        if (charset.type === "zalgo" || charset.type === "invisible") {
            throw new ObfuscateError(2 /* CharsetIsIncompatibleES5 */);
        }
    }
    // Check custom characters, or just use an empty array if the charset is not custom
    const customCharacterData = CheckCustomCharacters(charset.type === "custom" ? charset.characters : []);
    if (customCharacterData.invalidChars.size !== 0) {
        throw new ObfuscateError(3 /* HasInvalidCustomCharacters */, customCharacterData.invalidChars);
    }
    const usedVariableNames = new Set();
    function GetVariableName() {
        return GetNewVariableName(usedVariableNames, optionsValidated, customCharacterData);
    }
    const resultSegments = [];
    function AddToResult(str) {
        resultSegments.push(str);
    }
    AddToResult("(" + (target === "es5-" ? "function()" : "()=>") + "{var ");
    const v_number_0 = GetVariableName();
    const v_number_1 = GetVariableName();
    const v_number_2 = GetVariableName();
    const v_number_4 = GetVariableName();
    const v_number_8 = GetVariableName();
    const v_number_16 = GetVariableName();
    const v_number_32 = GetVariableName();
    const v_number_64 = GetVariableName();
    const v_number_128 = GetVariableName();
    const v_number_256 = GetVariableName();
    const v_number_512 = GetVariableName();
    const v_number_1024 = GetVariableName();
    const v_number_2048 = GetVariableName();
    const v_number_4096 = GetVariableName();
    const v_number_8192 = GetVariableName();
    const v_number_16384 = GetVariableName();
    const v_number_32768 = GetVariableName();
    // Generate variables for each letter in the input code
    const letters = new Map();
    function GetNumber(num) {
        return GetIntFromBits(num, v_number_0, v_number_1, v_number_2, v_number_4, v_number_8, v_number_16, v_number_32, v_number_64, v_number_128, v_number_256, v_number_512, v_number_1024, v_number_2048, v_number_4096, v_number_8192, v_number_16384, v_number_32768);
    }
    const inputCharCodes = GetCharCodes(inputCode);
    // Collect unique characters from the input text
    for (const ch of inputCharCodes) {
        if (letters.has(ch)) {
            continue;
        }
        const variableName = GetVariableName();
        letters.set(ch, { variableName, assignmentExpr: variableName + "=" + GetNumber(ch) });
    }
    const allowLongerName = charset.type === "zalgo";
    function GetRandomStr(allowLonger) {
        return GetRandomVariableName(variableNameLength, allowLonger, optionsValidated, customCharacterData);
    }
    AddToResult(v_number_0 + "='" + GetRandomStr(allowLongerName) + "'&'" + GetRandomStr(allowLongerName) + "',");
    AddToResult(v_number_1 + "=-~'" + GetRandomStr(allowLongerName) + "',");
    AddToResult(v_number_2 + "=" + v_number_1 + "-~'" + GetRandomStr(false) + "',");
    AddToResult(v_number_4 + "=" + v_number_2 + "+" + v_number_2 + ",");
    AddToResult(v_number_8 + "=" + v_number_4 + "*" + v_number_2 + ",");
    AddToResult(v_number_16 + "=" + v_number_2 + "*" + v_number_4 + "*" + v_number_2 + ",");
    AddToResult(v_number_32 + "=" + v_number_8 + "*" + v_number_4 + ",");
    AddToResult(v_number_64 + "=" + v_number_4 + "*" + v_number_16 + ",");
    AddToResult(v_number_128 + "=" + v_number_8 + "*" + v_number_2 + "*" + v_number_8 + ",");
    AddToResult(v_number_256 + "=" + v_number_64 + "*" + v_number_4 + ",");
    AddToResult(v_number_512 + "=" + v_number_8 + "*" + v_number_64 + ",");
    AddToResult(v_number_1024 + "=" + v_number_4 + "*" + v_number_256 + ",");
    AddToResult(v_number_2048 + "=" + v_number_64 + "*" + v_number_32 + ",");
    AddToResult(v_number_4096 + "=" + v_number_256 + "*" + v_number_16 + ",");
    AddToResult(v_number_8192 + "=" + v_number_8 + "*" + v_number_1024 + ",");
    AddToResult(v_number_16384 + "=" + v_number_32 + "*" + v_number_512 + ",");
    AddToResult(v_number_32768 + "=" + v_number_4 + "*" + v_number_8192 + ",");
    // "acCdefghilmnoprsStuv. " <- we need these characters
    // "false" = !1+[]
    const v_string_false = GetVariableName();
    AddToResult(v_string_false + "=!" + v_number_1 + "+[],");
    // f = "false"[0]
    const v_char_f = GetVariableName();
    AddToResult(v_char_f + "=" + v_string_false + "[" + v_number_0 + "],");
    // "undefined" = "f"[1]+[]
    const v_string_undefined = GetVariableName();
    AddToResult(v_string_undefined + "=" + v_char_f + "[" + v_number_1 + "]+[],");
    // a = "false"[1]
    const v_char_a = GetVariableName();
    AddToResult(v_char_a + "=" + v_string_false + "[" + v_number_1 + "],");
    // l = "false"[2]
    const v_char_l = GetVariableName();
    AddToResult(v_char_l + "=" + v_string_false + "[" + v_number_2 + "],");
    // s = "false"[3]
    const v_char_s = GetVariableName();
    AddToResult(v_char_s + "=" + v_string_false + "[" + v_number_2 + "+" + v_number_1 + "],");
    // e = "false"[4]
    const v_char_e = GetVariableName();
    AddToResult(v_char_e + "=" + v_string_false + "[" + v_number_4 + "],");
    // i = "undefined"[5]
    const v_char_i = GetVariableName();
    AddToResult(v_char_i + "=" + v_string_undefined + "[" + v_number_4 + "+" + v_number_1 + "],");
    // "[object Object]"
    const v_string_object_object = GetVariableName();
    AddToResult(v_string_object_object + "=[]+{},");
    // c = "[object Object]"[5]
    const v_char_c = GetVariableName();
    AddToResult(v_char_c + "=" + v_string_object_object + "[" + v_number_4 + "+" + v_number_1 + "],");
    // b = "[object Object]"[2]
    const v_char_b = GetVariableName();
    AddToResult(v_char_b + "=" + v_string_object_object + "[" + v_number_2 + "],");
    // u = "undefined"[0]
    const v_char_u = GetVariableName();
    AddToResult(v_char_u + "=" + v_string_undefined + "[" + v_number_0 + "],");
    // n = "undefined"[1]
    const v_char_n = GetVariableName();
    AddToResult(v_char_n + "=" + v_string_undefined + "[" + v_number_1 + "],");
    // t = (!0+[])[0]
    const v_char_t = GetVariableName();
    AddToResult(v_char_t + "=(!" + v_number_0 + "+[])[" + v_number_0 + "],");
    // o = "[object Object]"[1]
    const v_char_o = GetVariableName();
    AddToResult(v_char_o + "=" + v_string_object_object + "[" + v_number_1 + "],");
    // space = "[object Object]"[7]
    const v_char_space = GetVariableName();
    AddToResult(v_char_space + "=" + v_string_object_object + "[" + v_number_8 + "-" + v_number_1 + "],");
    // d = "undefined"[2]
    const v_char_d = GetVariableName();
    AddToResult(v_char_d + "=" + v_string_undefined + "[" + v_number_2 + "],");
    // r = (!0+[])[1]
    const v_char_r = GetVariableName();
    AddToResult(v_char_r + "=(!" + v_number_0 + "+[])[" + v_number_1 + "],");
    // "constructor"
    const v_string_constructor = GetVariableName();
    AddToResult(v_string_constructor + "=" +
        [v_char_c, v_char_o, v_char_n, v_char_s, v_char_t, v_char_r, v_char_u, v_char_c, v_char_t, v_char_o, v_char_r,].join("+")
        + ",");
    // []["filter"]
    const v_function_filter = GetVariableName();
    AddToResult(v_function_filter + "=[][" + [v_char_f, v_char_i, v_char_l, v_char_t, v_char_e, v_char_r].join("+") + "],");
    // []["filter"]["constructor"]
    const v_function_function = GetVariableName();
    AddToResult(v_function_function + "=" + v_function_filter + "[" + v_string_constructor + "],");
    const v_char_g = GetVariableName();
    const v_char_S = GetVariableName();
    if (target === "nodejs") {
        // `btoa` is not always available on node.js, so we need to use a different approach
        // Here, we convert native functions to strings, which always works in node.js,
        // but is not consistent across browsers, because it's not part of the ECMAScript standard
        // ''["constructor"]+[]
        const v_string_StringConstructor = GetVariableName();
        AddToResult(v_string_StringConstructor + "=''[" + v_string_constructor + "]+[],");
        // S = (''["constructor"]+[])[1+8]
        AddToResult(v_char_S + "=" + v_string_StringConstructor + "[" + v_number_1 + "+" + v_number_8 + "],");
        // g = (''["constructor"]+[])[16-2]
        AddToResult(v_char_g + "=" + v_string_StringConstructor + "[" + v_number_16 + "-" + v_number_2 + "],");
    }
    else {
        // []["filter"]["constructor"]("return btoa")()
        const v_function_btoa = GetVariableName();
        AddToResult(v_function_btoa + "=" + v_function_function + "(" +
            [v_char_r, v_char_e, v_char_t, v_char_u, v_char_r, v_char_n, v_char_space, v_char_b, v_char_t, v_char_o, v_char_a].join("+")
            + ")(),");
        // S = btoa("a ")[1]
        AddToResult(v_char_S + "=" + v_function_btoa + "(" + v_char_a + "+" + v_char_space + ")[" + v_number_1 + "],");
        // g = btoa("b")[1]
        AddToResult(v_char_g + "=" + v_function_btoa + "(" + v_char_b + ")[" + v_number_1 + "],");
    }
    // "toString"
    const v_string_toString = GetVariableName();
    AddToResult(v_string_toString + "=" + [v_char_t, v_char_o, v_char_S, v_char_t, v_char_r, v_char_i, v_char_n, v_char_g].join("+") + ",");
    // p = (16+8+1)["toString"](32)
    const v_char_p = GetVariableName();
    AddToResult(v_char_p + "=(" + v_number_1 + "+" + v_number_8 + "+" + v_number_16 + ")[" + v_string_toString + "](" + v_number_32 + "),");
    // []["constructor"]["constructor"]("return escape")()
    const v_function_escape = GetVariableName();
    AddToResult(v_function_escape + "=[][" + v_string_constructor + "][" + v_string_constructor + "](" +
        [v_char_r, v_char_e, v_char_t, v_char_u, v_char_r, v_char_n, v_char_space, v_char_e, v_char_s, v_char_c, v_char_a, v_char_p, v_char_e].join("+")
        + ")(),");
    // C = escape(''["big"]())[2]
    const v_char_C = GetVariableName();
    AddToResult(v_char_C + "=" + v_function_escape + "(''[" + [v_char_b, v_char_i, v_char_g].join("+") + "]())[" + v_number_2 + "],");
    // m = (16+4+2)["toString"](32)
    const v_char_m = GetVariableName();
    AddToResult(v_char_m + "=(" + v_number_16 + "+" + v_number_4 + "+" + v_number_2 + ")[" + v_string_toString + "](" + v_number_32 + "),");
    // h = (16+1)["toString"](32)
    const v_char_h = GetVariableName();
    AddToResult(v_char_h + "=(" + v_number_16 + "+" + v_number_1 + ")[" + v_string_toString + "](" + v_number_32 + "),");
    // h = (32-1)["toString"](32)
    const v_char_v = GetVariableName();
    AddToResult(v_char_v + "=(" + v_number_32 + "-" + v_number_1 + ")[" + v_string_toString + "](" + v_number_32 + "),");
    // ''["constructor"]["fromCharCode"]
    const v_function_stringFromCharCode = GetVariableName();
    AddToResult(v_function_stringFromCharCode + "=''[" + v_string_constructor + "][" +
        [v_char_f, v_char_r, v_char_o, v_char_m, v_char_C, v_char_h, v_char_a, v_char_r, v_char_C, v_char_o, v_char_d, v_char_e].join("+")
        + "],");
    // []["filter"]["constructor"]("return eval")()
    const v_function_eval = GetVariableName();
    AddToResult(v_function_eval + "=" + v_function_function + "(" +
        [v_char_r, v_char_e, v_char_t, v_char_u, v_char_r, v_char_n, v_char_space, v_char_e, v_char_v, v_char_a, v_char_l].join("+")
        + ")(),");
    let v_bool_deobfuscationOk = "";
    if (deobfuscationProtection) {
        const dummyString = GetRandomStr(allowLongerName);
        const v_string_dummyString = GetVariableName();
        AddToResult(v_string_dummyString + "='" + dummyString + "',");
        const v_function_deobfuscationProtection = GetVariableName();
        const functionStart = target === "es5-" ? "function()" : "()=>";
        AddToResult(v_function_deobfuscationProtection + "=" + functionStart + "{'" + dummyString + "'},");
        // How this works:
        // In javascript, you can convert functions to a string, and if you convert a user-defined function to string,
        // you'll get back the exact string representation of the function
        // Deobfuscators usually format the code to make it more readable, so we create a dummy function which will be formatted for sure
        // So we store the original string representation, and compare it with the new one
        // If the code was formatted, then those two won't match, and we can do stuff with that
        v_bool_deobfuscationOk = GetVariableName();
        AddToResult(v_bool_deobfuscationOk + "=(" + v_function_deobfuscationProtection + "+[])["
            + [v_char_s, v_char_u, v_char_b, v_char_s, v_char_t, v_char_r].join("+")
            + "](" + GetNumber(functionStart.length + 2) + "," + GetNumber(dummyString.length) + ")==" + v_string_dummyString + ",");
        if (deobfuscationProtection.type !== "skip") {
            const v_string_otherFunctionName = GetVariableName();
            const v_string_param1_deobfuscationProtection = GetVariableName();
            AddToResult(v_string_otherFunctionName + "=" + v_function_function + "('" + v_string_param1_deobfuscationProtection + "',");
            function GetCharCodesOf(str) {
                const charCodes = GetCharCodes(str);
                return v_function_stringFromCharCode + "(" + charCodes.map(charCode => GetNumber(charCode))
                    .join(",") + ")";
            }
            switch (deobfuscationProtection.type) {
                case "error":
                    {
                        AddToResult(GetCharCodesOf("!function \u0192(){" + v_string_param1_deobfuscationProtection + "=='" + dummyString + "'||\u0192()}()"));
                        break;
                    }
                case "loop":
                    {
                        AddToResult(GetCharCodesOf("if(" + v_string_param1_deobfuscationProtection + "!='" + dummyString + "')for(;;){}"));
                        break;
                    }
                case "custom":
                    {
                        AddToResult(GetCharCodesOf(v_string_param1_deobfuscationProtection + "=='" + dummyString
                            + "'||!function(){" + deobfuscationProtection.codeToRun + "}()"));
                        break;
                    }
                default:
                    Unreachable(deobfuscationProtection);
            }
            AddToResult(")((" + v_function_deobfuscationProtection + "+[])["
                + [v_char_s, v_char_u, v_char_b, v_char_s, v_char_t, v_char_r].join("+")
                + "](" + GetNumber(functionStart.length + 2) + "," + GetNumber(dummyString.length) + ")),");
        }
    }
    const finalLetters = [];
    for (const [_, letterData] of letters) {
        finalLetters.push(letterData.assignmentExpr);
    }
    Shuffle(finalLetters);
    AddToResult(finalLetters.join(",") + ";");
    if (deobfuscationProtection) {
        AddToResult(v_bool_deobfuscationOk + "&&");
    }
    AddToResult(v_function_eval + "(");
    // Assemble the characters from the input code, using String.fromCharCode
    // The maximum number of function arguments is limited (e.g. 65535 on chrome), so for long texts, we need to split up the process
    // `batchCount` indicates how many arguments we use for a function call
    // 4096 should be fine on all browsers
    // Also add random count at a time
    const batchCount = 4096;
    const batchData = [];
    let textIndex = 0;
    while (textIndex < inputCharCodes.length) {
        const finalTextAssembled = [];
        const batchEndIndex = Math.min(textIndex + Math.floor(batchCount * (Random() * 0.5 + 0.5)), inputCharCodes.length);
        while (textIndex < batchEndIndex) {
            const letterData = letters.get(inputCharCodes[textIndex]);
            finalTextAssembled.push(letterData.variableName);
            ++textIndex;
        }
        const currentBatchText = v_function_stringFromCharCode + "(" + finalTextAssembled.join(",") + ")";
        batchData.push(currentBatchText);
    }
    AddToResult(batchData.join("+"));
    AddToResult(")");
    AddToResult("})()");
    return resultSegments.join("");
}
