"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var metadata_1 = require("@/lib/metadata");
var react_1 = require("react");
exports.metadata = metadata_1.generateMetadata({
    title: 'T&C',
    description: 'Terms and Conditions',
    path: 'terms-and-conditions'
});
function PrivacyProlicyLayout(_a) {
    var children = _a.children;
    return react_1["default"].createElement("section", { className: "my-28" }, children);
}
exports["default"] = PrivacyProlicyLayout;
