"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useCharacterCounter = function (max) {
    var _a = react_1.useState(0), count = _a[0], setCount = _a[1];
    var _b = react_1.useState(''), warning = _b[0], setWarning = _b[1];
    var updateCount = function (text) {
        var length = text.length;
        if (length > max) {
            setWarning("Character limit exceeded! Max: " + max);
        }
        else {
            setWarning('');
        }
        setCount(length);
    };
    return { count: count, warning: warning, updateCount: updateCount };
};
