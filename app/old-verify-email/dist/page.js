'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var maxWidthWrapper_1 = require("../maxWidthWrapper");
var MultiStepForm_1 = require("./MultiStepForm");
function OldVerifyEmail() {
    return (React.createElement("div", { className: "py-16 mt-4" },
        React.createElement(maxWidthWrapper_1["default"], { className: "flex justify-center items-center" },
            React.createElement(react_1.Suspense, { fallback: React.createElement("div", null, "loading...") },
                React.createElement(MultiStepForm_1["default"], null)))));
}
exports["default"] = OldVerifyEmail;
