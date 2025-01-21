"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unused-vars */
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var input_1 = require("./ui/input");
var VerificationInput = react_1.forwardRef(function (_a, ref) {
    var value = _a.value, onChange = _a.onChange, onKeyDown = _a.onKeyDown, onPaste = _a.onPaste, isError = _a.isError, isSuccess = _a.isSuccess;
    return (react_1["default"].createElement(input_1.Input, { ref: ref, type: "text", inputMode: "numeric", maxLength: 1, value: value, onChange: function (e) {
            // Allow only numeric input
            var numericValue = e.target.value.replace(/[^0-9]/g, '');
            onChange(numericValue);
        }, onKeyDown: onKeyDown, onPaste: onPaste, className: utils_1.cn('w-12 h-12 text-center text-lg font-semibold border-2 focus:ring-2 border-[#98A2B3] rounded-[10px] focus:border-[#7065F0] focus:ring-[#7065F0]/20', isError && "animate-errorPulse", isSuccess && "animate-successPulse"), "aria-label": "Digit of verification code", "aria-invalid": isError || undefined }));
});
VerificationInput.displayName = 'VerificationInput';
exports["default"] = VerificationInput;
