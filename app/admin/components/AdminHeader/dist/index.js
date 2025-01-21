"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("@/components/ui/avatar");
function AdminHeader(_a) {
    var title = _a.title, handleClick = _a.handleClick, btnTitle = _a.btnTitle;
    var handleProfileClick = function () {
        alert("Profile clicked!");
    };
    return (react_1["default"].createElement("header", { className: "bg-white py-8 border-b w-full flex items-center justify-between sticky top-0 z-10 px-5", role: "banner", "aria-label": title + " Header" },
        react_1["default"].createElement("h1", { className: "font-bold capitalize w-fit max-w-[250px] truncate text-[#000929] leading-7 text-[2rem]", id: "header-title" }, title),
        react_1["default"].createElement("div", { className: "relative", role: "search" },
            react_1["default"].createElement("label", { htmlFor: "search-input", className: "sr-only" },
                "Search ",
                title),
            react_1["default"].createElement(input_1.Input, { id: "search-input", placeholder: "Search", "aria-labelledby": "search-input", className: "pl-5 pr-10 text-[1.25rem] w-[450px] h-[60px] rounded-[30px] focus-visible:ring-0 focus-visible:outline-0" }),
            react_1["default"].createElement(lucide_react_1.Search, { className: "absolute right-4 top-4", "aria-hidden": "true" })),
        react_1["default"].createElement("div", { className: "flex items-center justify-between" },
            handleClick &&
                react_1["default"].createElement(button_1.Button, { variant: "default", className: "bg-[#7065F0] first-letter:capitalize h-12 rounded-[30px] capitalize mr-10", "aria-label": btnTitle, onClick: handleClick },
                    react_1["default"].createElement("span", null, btnTitle),
                    react_1["default"].createElement(lucide_react_1.Plus, { "aria-hidden": "true" })),
            react_1["default"].createElement(avatar_1.Avatar, { className: "size-12 cursor-pointer", role: "button", "aria-label": "User profile", tabIndex: 0, onClick: handleProfileClick, onKeyDown: function (e) {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleProfileClick();
                    }
                } },
                react_1["default"].createElement(avatar_1.AvatarFallback, { className: "size-full rounded-full bg-[#7065F0] text-white text-[1.5rem] flex items-center justify-center", "aria-hidden": "true" }, "E")))));
}
exports["default"] = AdminHeader;
