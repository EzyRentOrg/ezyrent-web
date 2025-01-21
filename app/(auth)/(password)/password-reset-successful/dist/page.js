'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var RightHandAuthPage_1 = require("@/components/RightHandAuthPage");
var maxWidthWrapper_1 = require("@/app/maxWidthWrapper");
var navigation_1 = require("next/navigation");
var LappedImages_1 = require("@/components/LappedImages");
function PasswordResetSuccess() {
    var router = navigation_1.useRouter();
    return (react_1["default"].createElement(maxWidthWrapper_1["default"], null,
        react_1["default"].createElement("section", { className: "min-h-[984px] mx-auto mb-10 flex items-center space-x-10" },
            react_1["default"].createElement("main", { className: "h-[964px] w-full flex flex-col " },
                react_1["default"].createElement("div", { className: "bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]" },
                    react_1["default"].createElement("div", { className: "ml-5 pb-5" },
                        react_1["default"].createElement("div", { className: "md:w-[80%] mx-auto" },
                            react_1["default"].createElement("div", { className: "my-10 text-center flex flex-col items-center justify-center space-y-4" },
                                react_1["default"].createElement("div", { className: "bg-[#F4EBFF] size-20 rounded-full flex items-center justify-center" },
                                    react_1["default"].createElement("div", { className: "bg-[#7F56D9] rounded-full size-10 flex items-center justify-center" },
                                        react_1["default"].createElement(lucide_react_1.Check, { stroke: '#f1f1f1', size: 35 }))),
                                react_1["default"].createElement("h2", { className: "max-w-[80%] w-[90%] text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]" }, "Your password has been successfully reset!"),
                                react_1["default"].createElement("p", { className: "first-letter:capitalize my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] max-w-[80%] w-[90%]" }, "you can now log in with your new password. If you encounter any issues, please contact support")),
                            react_1["default"].createElement(button_1.Button, { onClick: function () { return router.push('/login'); }, type: "submit", className: utils_1.cn('bg-[#000929] h-[72px]  w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150') }, "Back to Login")))),
                react_1["default"].createElement(LappedImages_1["default"], null)),
            react_1["default"].createElement(RightHandAuthPage_1["default"], null))));
}
exports["default"] = PasswordResetSuccess;
