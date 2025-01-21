"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var metadata_1 = require("@/lib/metadata");
var react_1 = require("react");
exports.metadata = metadata_1.generateMetadata({
    title: 'About',
    description: 'Get to know who we are and what we stand for',
    path: 'about'
});
function AboutLayout(_a) {
    var children = _a.children;
    return (react_1["default"].createElement("section", { className: "mt-28" }, children));
}
exports["default"] = AboutLayout;
