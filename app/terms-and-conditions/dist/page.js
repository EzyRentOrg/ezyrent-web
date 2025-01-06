"use strict";
exports.__esModule = true;
var react_1 = require("react");
var maxWidthWrapper_1 = require("../maxWidthWrapper");
var breadcrumb_1 = require("@/components/breadcrumb");
var termsOfUse_1 = require("@/config/termsOfUse");
var link_1 = require("next/link");
function TermsAndConditions() {
    var renderContent = function (content) {
        // Handle privacy policy links
        if (content.includes('Privacy Policy')) {
            var parts = content.split('Privacy Policy');
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                parts[0],
                react_1["default"].createElement(link_1["default"], { href: "/privacy-policy", className: "text-blue-500 underline" }, "Privacy Policy"),
                parts[1]));
        }
        // Handle email links
        if (content.includes('support@ezrent.ng')) {
            var parts = content.split('support@ezrent.ng');
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                parts[0],
                react_1["default"].createElement("a", { href: "mailto:support@ezrent.ng", className: "text-blue-500 underline" }, "support@ezrent.ng"),
                parts[1]));
        }
        return content;
    };
    return (react_1["default"].createElement("section", { className: 'max-w-[1050px]' },
        react_1["default"].createElement(maxWidthWrapper_1["default"], null,
            react_1["default"].createElement(breadcrumb_1["default"], null),
            react_1["default"].createElement("main", null,
                react_1["default"].createElement("section", { className: "mt-10" },
                    react_1["default"].createElement("h1", { className: "text-[1.1rem] md:text-[1.5rem] lg:text-[2rem] font-semibold text-[#000929] mb-2 leading-[50.4px]" }, "EzyRent Terms Of Use"),
                    react_1["default"].createElement("p", { className: "leading-[33.6px] text-sm md:text-base" }, "Welcome to EzyRent! These Terms and Conditions govern your use of our platform. By accessing or using EzyRent, you agree to these terms. If you do not agree, please discontinue use immediately")),
                react_1["default"].createElement("section", { className: "flex flex-col space-y-5" }, termsOfUse_1.termsOfUseSections.map(function (section, sectionIndex) { return (react_1["default"].createElement("div", { key: sectionIndex, className: "terms-of-use__section" },
                    react_1["default"].createElement("h2", { className: "text-[#000929] font-semibold text-[1.1rem] md:text-[1.5rem] lg:text-[2rem] mt-5" }, section.title),
                    section.content.map(function (content, contentIndex) { return (typeof content === "string" ? (react_1["default"].createElement("p", { key: contentIndex, className: 'mt-5 text-sm md:text-base' }, renderContent(content))) : (react_1["default"].createElement("div", { key: contentIndex, className: "terms-of-use__content" },
                        content.description && (react_1["default"].createElement("p", { className: 'mt-8 font-semibold' }, renderContent(content.description))),
                        content.items && (react_1["default"].createElement("ul", { className: "list-disc flex flex-col space-y-3 my-4 px-5" }, content.items.map(function (item, itemIdx) { return (react_1["default"].createElement("li", { key: itemIdx }, renderContent(item))); })))))); }))); }))))));
}
exports["default"] = TermsAndConditions;
