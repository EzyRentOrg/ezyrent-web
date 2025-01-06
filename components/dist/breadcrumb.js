'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
function Breadcrumb() {
    var pathname = navigation_1.usePathname();
    // Split the path into segments, excluding empty and ID-like segments
    var pathSegments = pathname
        .split('/')
        .filter(function (segment) { return segment && !/^\d+(\[.+\])?$/.test(segment); }); // Exclude numeric or [id]-like segments
    var breadcrumbs = __spreadArrays([
        { label: 'Home', href: '/', isActive: pathname === '/' }
    ], pathSegments.map(function (segment, index) {
        var href = "/" + pathSegments.slice(0, index + 1).join('/');
        return {
            label: decodeURIComponent(segment.replace(/-/g, ' ')),
            href: href,
            isActive: pathname.startsWith(href)
        };
    }));
    return (react_1["default"].createElement("nav", { "aria-label": "Breadcrumb", className: "w-full flex space-x-px text-sm text-[#000929]" }, breadcrumbs.map(function (breadcrumb, index) { return (react_1["default"].createElement("div", { key: breadcrumb.href, className: "flex items-center capitalize" },
        index !== 0 && react_1["default"].createElement("span", { className: "mx-2 text-gray-400" }, "/"),
        breadcrumb.isActive ? (react_1["default"].createElement("span", { className: "text-[#000929] font-bold" }, breadcrumb.label)) : (react_1["default"].createElement(link_1["default"], { href: breadcrumb.href, className: "hover:text-gray-700 transition-colors" }, breadcrumb.label)))); })));
}
exports["default"] = Breadcrumb;
