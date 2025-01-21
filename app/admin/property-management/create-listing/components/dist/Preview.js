"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var label_1 = require("./label");
var imagePreview_1 = require("./imagePreview");
var imageModal_1 = require("./imageModal");
var react_hook_form_1 = require("react-hook-form");
var useNumberWithComa_1 = require("@/hooks/useNumberWithComa");
function Preview(_a) {
    var _b, _c, _d;
    var control = _a.control, watch = _a.watch, images = _a.images, onImageDelete = _a.onImageDelete;
    var _e = react_1.useState(null), expandedImage = _e[0], setExpandedImage = _e[1];
    var formValues = watch();
    return (React.createElement("aside", { className: "w-full max-w-[520px]" },
        React.createElement("div", null,
            React.createElement("div", { className: "relative w-full h-[350px] overflow-y-auto rounded-[16px] bg-white shadow-md shadow-[#000000]/35 p-4" },
                React.createElement("div", { className: "grid grid-cols-[repeat(3,_minmax(0,_150px))] gap-4" }, images.length > 0 ? (images.map(function (img, index) { return (React.createElement(imagePreview_1.ImagePreview, { key: index, src: img, onClick: function () { return setExpandedImage(img); }, onDelete: function () { return onImageDelete(index); } })); })) : (React.createElement("div", { className: "col-span-3 flex items-center justify-center h-full" },
                    React.createElement("p", { className: "text-gray-400" }, "Add up to 7 images"))))),
            React.createElement(label_1["default"], { minValue: images.length, maxValue: 7, className: "w-fit text-[0.75rem] ml-auto mt-2" })),
        React.createElement("div", { className: "mt-10 w-full relative" },
            React.createElement(react_hook_form_1.Controller, { name: "address", control: control, render: function (_a) {
                    var field = _a.field;
                    return (React.createElement(input_1.Input, __assign({}, field, { disabled: true, className: "border-none pr-14 focus-visible:ring-0 focus-visible:outline-0 w-full" })));
                } }),
            React.createElement(label_1["default"], { minValue: ((_b = formValues.address) === null || _b === void 0 ? void 0 : _b.length) || 0, maxValue: 150, className: "text-[0.75rem] w-fit" })),
        React.createElement("div", { className: "mt-10 w-full relative" },
            React.createElement(react_hook_form_1.Controller, { name: "description", control: control, render: function (_a) {
                    var field = _a.field;
                    return (React.createElement(textarea_1.Textarea, __assign({}, field, { disabled: true, className: "focus-visible:ring-0 focus-visible:outline-0 w-full" })));
                } }),
            React.createElement(label_1["default"], { minValue: ((_c = formValues.description) === null || _c === void 0 ? void 0 : _c.length) || 0, maxValue: 1500, className: "text-[0.75rem] w-fit" })),
        React.createElement("div", { className: "capitalize flex items-center space-x-3 text-[1.125rem] mt-10" },
            React.createElement("h3", { className: "capitalize" }, "price"),
            React.createElement("span", { className: "flex items-center" },
                React.createElement(image_1["default"], { src: "/icons/naira-currency.svg", width: 28, height: 28, alt: "Naira symbol", className: "mr-1 text-black w-4" }),
                React.createElement("span", null, useNumberWithComa_1.useNumberWithCommas(((_d = formValues.price) === null || _d === void 0 ? void 0 : _d.toString()) || "0")))),
        React.createElement("div", { className: "mt-10 " },
            React.createElement("h3", { className: "capitalize" }, "Duration"),
            React.createElement("div", { className: "mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3" }, formValues.duration)),
        React.createElement("div", { className: "mt-10 " },
            React.createElement("h3", { className: "capitalize" }, "building Type"),
            React.createElement("div", { className: "mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3" }, formValues.buildingType)),
        React.createElement("div", { className: "mt-10 " },
            React.createElement("h3", { className: "capitalize" }, "Beds"),
            React.createElement("div", { className: "mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3" }, formValues.beds)),
        React.createElement("div", { className: "mt-10" },
            React.createElement("h3", { className: "capitalize" }, "Baths"),
            React.createElement("div", { className: "mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3" }, formValues.baths)),
        React.createElement("div", { className: "mt-10" },
            React.createElement("h3", { className: "capitalize" }, "amenities"),
            React.createElement("div", { className: "grid grid-cols-4 gap-5" }, formValues.amenities.map(function (amenity) { return (React.createElement("span", { key: amenity, className: "mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3" }, amenity)); }))),
        expandedImage && (React.createElement(imageModal_1["default"], { expandedImage: expandedImage, setExpandedImage: setExpandedImage, images: images }))));
}
exports["default"] = Preview;
