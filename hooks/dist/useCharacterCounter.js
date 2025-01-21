"use strict";
exports.__esModule = true;
exports.useCharacterCounter = void 0;
var react_1 = require("react");
exports.useCharacterCounter = function (maxLength) {
    var _a = react_1.useState(0), count = _a[0], setCount = _a[1];
    var _b = react_1.useState(''), text = _b[0], setText = _b[1];
    var updateText = function (newText) {
        setText(newText);
        setCount(newText.length);
    };
    var getStyledText = function () {
        if (text.length <= maxLength) {
            return { normal: text, overflow: '' };
        }
        return {
            normal: text.slice(0, maxLength),
            overflow: text.slice(maxLength)
        };
    };
    return {
        count: count,
        text: text,
        updateText: updateText,
        getStyledText: getStyledText,
        isExceeded: count > maxLength
    };
};
