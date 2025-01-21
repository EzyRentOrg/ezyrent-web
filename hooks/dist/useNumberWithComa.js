"use strict";
exports.__esModule = true;
exports.useNumberWithCommas = void 0;
var react_1 = require("react");
function useNumberWithCommas(number) {
    return react_1.useMemo(function () {
        if (typeof number === "number") {
            number = number.toString();
        }
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, [number]);
}
exports.useNumberWithCommas = useNumberWithCommas;
