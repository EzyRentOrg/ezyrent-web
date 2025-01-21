"use strict";
exports.__esModule = true;
exports.ImagePreview = void 0;
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
exports.ImagePreview = function (_a) {
    var src = _a.src, onClick = _a.onClick, onDelete = _a.onDelete;
    return (React.createElement("div", { className: "relative group cursor-pointer overflow-hidden rounded-lg aspect-square", onClick: onClick }, src ? (React.createElement(React.Fragment, null,
        React.createElement(image_1["default"], { src: src, alt: "Property", height: 150, width: 150, className: "object-cover h-[150px] w-[150px] transition-transform duration-300 group-hover:scale-110" }),
        React.createElement("button", { type: "button", onClick: function (e) {
                e.stopPropagation(); // Prevent triggering the onClick for the image
                onDelete();
            }, className: "absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition" },
            React.createElement(lucide_react_1.Trash2, { size: 20 })))) : (React.createElement("div", { className: "w-full h-full bg-gray-200 flex items-center justify-center" },
        React.createElement("p", { className: "text-gray-500" }, "No image available")))));
};
