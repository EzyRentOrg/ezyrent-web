"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function ImageModal(_a) {
    var setExpandedImage = _a.setExpandedImage, expandedImage = _a.expandedImage, images = _a.images;
    var navigateImage = function (direction) {
        var currentIndex = images.indexOf(expandedImage);
        var newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < images.length) {
            setExpandedImage(images[newIndex]);
        }
    };
    return (react_1["default"].createElement("div", { className: "fixed inset-0 bg-[#000000]/90 flex items-center justify-center z-50" },
        react_1["default"].createElement("div", { className: "bg-white p-4 rounded-lg max-w-full max-h-[90vh] relative flex flex-col items-center" },
            react_1["default"].createElement(button_1.Button, { variant: "default", className: "absolute bg-[#7065F0] text-white  top-5 right-4 size-8 p-2", onClick: function () { return setExpandedImage(null); } },
                react_1["default"].createElement(lucide_react_1.X, { className: "w-full" })),
            react_1["default"].createElement("div", { className: "relative w-auto h-[70vh] mt-5 max-w-full flex items-center" },
                react_1["default"].createElement(image_1["default"], { src: expandedImage, alt: "Expanded view", className: "object-contain", width: 800, height: 600 })),
            react_1["default"].createElement("div", { className: "felx items-center justify-between px-5 py-2" },
                react_1["default"].createElement(button_1.Button, { variant: "ghost", className: " rounded-full size-8 disabled:text-black/30 disabled:cursor-not-allowed", onClick: function () { return navigateImage(-1); }, disabled: images.indexOf(expandedImage) === 0 },
                    react_1["default"].createElement(lucide_react_1.CircleChevronLeft, { className: "!size-8 text-black" })),
                react_1["default"].createElement(button_1.Button, { variant: "ghost", className: " rounded-full size-8 disabled:text-black/30 disabled:cursor-not-allowed", onClick: function () { return navigateImage(1); }, disabled: images.indexOf(expandedImage) === images.length - 1 },
                    react_1["default"].createElement(lucide_react_1.CircleChevronRight, { size: 24, className: "!size-8 !text-black " }))))));
}
exports["default"] = ImageModal;
