"use strict";
exports.__esModule = true;
var utils_1 = require("@/lib/utils");
var react_1 = require("react");
var Header_1 = require("@/components/nav/Header");
var Footer_1 = require("@/components/footer/Footer");
function MaxWidthWrapper(_a) {
    var children = _a.children, className = _a.className;
    return (react_1["default"].createElement("main", { className: "flex-1 flex flex-col h-auto" },
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement("div", { className: utils_1.cn('w-full max-w-[1440px] mx-auto px-5 md:px-10  flex-1', className) }, children),
        react_1["default"].createElement(Footer_1["default"], null)));
}
exports["default"] = MaxWidthWrapper;
