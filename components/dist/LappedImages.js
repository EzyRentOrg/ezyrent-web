"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var config_1 = require("@/config");
function LappedImages() {
    return (react_1["default"].createElement("div", { className: "bg-[#F8F8F8] rounded-[20px] py-4 px-10 mt-auto w-full" },
        react_1["default"].createElement("div", { className: "flex items-center w-full " },
            react_1["default"].createElement("div", { className: "flex items-center -space-x-4 " }, config_1.lappedImages.map(function (image, index) { return (react_1["default"].createElement("div", { key: image.src + index, className: " rounded-full size-[59px] border-[2px] border-white" },
                react_1["default"].createElement(image_1["default"], { src: "/" + image.src, width: image.width, height: image.height, alt: image.alt, className: "size-full rounded-full object-cover border-[2px] border-white" }))); })),
            react_1["default"].createElement("div", { className: "ml-4" },
                react_1["default"].createElement("p", { className: "text-[#344054] text-[0.75rem] md:text-[1.125rem] font-semibold leading-[25.2px] first-letter:capitalize" }, "Making your next home easy"),
                react_1["default"].createElement("p", { className: "text-[0.6rem] md:text-[#0.875rem] text-[#98A2B3] leading-[19.6px]" }, "Join 200k people to find a Home")),
            react_1["default"].createElement("div", { className: "hidden md:block size-[59px] ml-auto text-[#667085]" },
                react_1["default"].createElement(image_1["default"], { src: '/icons/arrow-up-right_59x59.svg', width: 59, height: 59, alt: "Circled right arrow.", className: "size-full object-cover " })))));
}
exports["default"] = LappedImages;
