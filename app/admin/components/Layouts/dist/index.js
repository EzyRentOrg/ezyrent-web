"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Sidebar_1 = require("../Sidebar");
function DashboardLayout(_a) {
    var children = _a.children;
    return (react_1["default"].createElement("main", { className: "flex min-h-screen" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Sidebar_1["default"], null)),
        react_1["default"].createElement("section", { className: "flex-1 flex flex-col" },
            react_1["default"].createElement("div", { className: "flex-1 bg-neutral-50" }, children))));
}
exports["default"] = DashboardLayout;
