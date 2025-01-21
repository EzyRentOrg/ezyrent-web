"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Layouts_1 = require("../components/Layouts");
var AdminHeader_1 = require("../components/AdminHeader");
var navigation_1 = require("next/navigation");
function PropertyManagement() {
    var router = navigation_1.useRouter();
    var handleCreateListing = function () {
        router.push("/admin/property-management/create-listing");
    };
    return (react_1["default"].createElement(Layouts_1["default"], null,
        react_1["default"].createElement(AdminHeader_1["default"], { title: "property management", btnTitle: "add property", handleClick: handleCreateListing }),
        react_1["default"].createElement("main", { className: "px-5" },
            react_1["default"].createElement("div", null, "assssssssssssssssss"))));
}
exports["default"] = PropertyManagement;
