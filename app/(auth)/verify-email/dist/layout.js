"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var metadata_1 = require("@/lib/metadata");
var react_1 = require("react");
exports.metadata = metadata_1.generateMetadata({
    title: 'Email verification',
    description: 'Verify your email to enjoy a lot of unique features',
    path: 'verify-email'
});
function VerifyEmailLayout(_a) {
    var children = _a.children;
    return react_1["default"].createElement("section", { className: "" }, children);
}
exports["default"] = VerifyEmailLayout;
