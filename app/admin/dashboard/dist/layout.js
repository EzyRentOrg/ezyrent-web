"use strict";
exports.__esModule = true;
var react_1 = require("react");
function AdminLayout(_a) {
    var children = _a.children;
    return (react_1["default"].createElement("section", { className: "!min-w-full overflow-hidden " },
        react_1["default"].createElement("div", { className: "min-w-full overflow-x-hidden" }, children)));
}
exports["default"] = AdminLayout;
