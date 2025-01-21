"use strict";
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
function SelectionButton(_a) {
    var label = _a.label, selected = _a.selected, onClick = _a.onClick, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (React.createElement(button_1.Button, { variant: "outline", onClick: onClick, className: "\n        capitalize \n        flex \n        items-center \n        px-2 \n        rounded-lg\n        border \n        border-gray-400\n        w-24\n        transition-all \n        duration-200 \n        " + (selected ? "bg-[#7065f0] text-white" : "hover:bg-[#7065f0]/10") + "\n        " + className + "\n      " },
        React.createElement("span", { className: "truncate" }, label)));
}
exports["default"] = SelectionButton;
