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
function EmailSent() {
    var router = navigation_1.useRouter();
    var handleResend = function () {
        // Logic for resending the password reset email or api call
        console.log('Resending email...');
        // Trigger the resend process,
    };
    var handleGmail = function () {
        router.push('/reset-password');
    };
    return (react_1["default"].createElement(maxWidthWrapper_1["default"], null,
        react_1["default"].createElement("section", { className: "min-h-[984px] mx-auto mb-10 flex items-center space-x-10" },
            react_1["default"].createElement("main", { className: "h-[964px] w-full flex flex-col " },
                react_1["default"].createElement("div", { className: "bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]" },
                    react_1["default"].createElement("div", { className: "ml-5 pb-5" },
                        react_1["default"].createElement("div", { className: "md:w-[80%] mx-auto" },
                            react_1["default"].createElement("div", { className: "my-10 text-center flex flex-col items-center justify-center space-y-4" },
                                react_1["default"].createElement("div", { className: "bg-[#E9D7FE] rounded-full size-20 flex items-center justify-center" },
                                    react_1["default"].createElement(lucide_react_1.Mail, { stroke: '#f1f1f1', fill: '#7F56D9', size: 35 })),
                                react_1["default"].createElement("h2", { className: "capitalize text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]" }, "Check your email"),
                                react_1["default"].createElement("p", { className: "my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] w-[80%]" }, "We sent a password reset link to your email. Please check your inbox")),
                            react_1["default"].createElement(button_1.Button, { onClick: handleGmail, type: "submit", className: utils_1.cn('bg-[#000929] h-[72px]  w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150') }, "Open Gmail"),
                            react_1["default"].createElement("div", { className: "flex items-center justify-center mt-5 font-medium text-[1rem] leading-[22.4px]" },
                                "Didn't receive the email?",
                                ' ',
                                react_1["default"].createElement(button_1.Button, { onClick: handleResend, variant: 'ghost', className: "capitalize text-[#6941C6] text-[1rem] leading-[22.4px]" }, "Resend"))))),
                react_1["default"].createElement(LappedImages_1["default"], null)),
            react_1["default"].createElement(RightHandAuthPage_1["default"], null))));
}
exports["default"] = EmailSent;
