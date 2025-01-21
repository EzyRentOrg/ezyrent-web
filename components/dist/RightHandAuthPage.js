"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
function RightHandAuthPage() {
    return (react_1["default"].createElement("main", { className: "hidden lg:block w-full h-[964px]" },
        react_1["default"].createElement("div", { className: "bg-[url('/a-block-of-apartments_2000x1333.png')] bg-no-repeat bg-center rounded-[20px] h-full w-full relative" },
            react_1["default"].createElement("div", { className: "absolute rounded-[20px] h-full w-full bg-black/40" }),
            react_1["default"].createElement("div", { className: "w-[90%] mx-auto pb-5" },
                react_1["default"].createElement("div", { className: "w-[528px] mx-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] glassmorphism p-10" },
                    react_1["default"].createElement("h3", { className: "text-xl font-bold text-[1.25rem] -tracking-[2%] leading-[26.04px] text-white" }, "Your Gateway to a Hassle-Free Home Search"),
                    react_1["default"].createElement("ul", { className: "list-disc mt-5" },
                        react_1["default"].createElement("li", { className: "font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB]" }, "Access 100% verified property listings."),
                        react_1["default"].createElement("li", { className: "font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB]" }, "AI-driven recommendations tailored to your needs."),
                        react_1["default"].createElement("li", { className: "font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB]" }, "Safe and transparent transactions every step of the way.")),
                    react_1["default"].createElement("div", { className: "mt-10 flex items-center space-x-8" },
                        react_1["default"].createElement("p", { className: "font-medium text-[0.8rem] w-[75%] -tracking-[2%] text-[#F9FAFB] italic" }, "Start your journey today and join 10k users finding their dream spaces with EzyRent."),
                        react_1["default"].createElement("div", { className: "size-[80px] ml-auto" },
                            react_1["default"].createElement(image_1["default"], { src: '/icons/arrow-up-right-white_59x59.svg', width: 59, height: 59, alt: "Circled right arrow.", className: "size-full object-cover" }))))))));
}
exports["default"] = RightHandAuthPage;
