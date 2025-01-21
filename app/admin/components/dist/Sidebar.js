"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var constants_1 = require("../constants");
var navigation_1 = require("next/navigation");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function Sidebar() {
    var pathname = navigation_1.usePathname();
    var _a = react_1.useState(null), hoveredItem = _a[0], setHoveredItem = _a[1];
    var menuRefs = react_1.useRef([]);
    var handleKeyDown = function (event, index) {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter")
            return;
        var maxIndex = constants_1.siderbarItems.length + 2; // +2 for settings and logout
        if (event.key === "Enter") {
            event.currentTarget.click();
            return;
        }
        event.preventDefault();
        var nextIndex = event.key === "ArrowDown"
            ? (index + 1) % maxIndex
            : (index - 1 + maxIndex) % maxIndex;
        var nextElement = menuRefs.current[nextIndex];
        if (nextElement) {
            nextElement.focus();
        }
    };
    // Initialize refs array when component mounts
    react_1.useEffect(function () {
        menuRefs.current = new Array(constants_1.siderbarItems.length + 2).fill(null);
    }, []);
    var getItemStyles = function (isActive, isHovered) {
        return "\n      " + (isActive ? "bg-[#7065F0] text-white" : "text-[#000929] hover:text-[#7065F0]") + " my-5\n      flex items-center space-x-2 font-medium text-[1.125rem] px-4 py-3 rounded-[8px] w-fit\n      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7065F0] focus:ring-offset-2\n    ";
    };
    return (react_1["default"].createElement("aside", { className: "sticky top-0 shadow-md shadow-white bg-white border-r h-screen w-[220px] flex flex-col overflow-y-auto custom-scrollbar", role: "navigation", "aria-label": "Main Sidebar" },
        react_1["default"].createElement("div", { className: "sticky top-0 bg-white w-full px-5 py-3 z-10" },
            react_1["default"].createElement(link_1["default"], { href: "/admin/dashboard", "aria-label": "Go to homepage" },
                react_1["default"].createElement(image_1["default"], { src: "/logo/ezyRentNavLogo.svg", width: 200, height: 40, tabIndex: 0, alt: "EzyRent Logo", className: "w-[200px] h-[100px] object-fill", priority: true }))),
        react_1["default"].createElement("nav", { className: "flex-1 px-5" },
            react_1["default"].createElement("ul", { role: "menu", "aria-label": "Main Navigation" },
                constants_1.siderbarItems.map(function (item, index) {
                    var Icon = item.icon;
                    var isActive = pathname.startsWith(item.href);
                    var isHovered = hoveredItem === index;
                    return (react_1["default"].createElement("li", { key: item.title + "-" + index, role: "menuitem" },
                        react_1["default"].createElement(link_1["default"], { href: item.href, "aria-label": "Navigate to " + item.title, "aria-current": isActive ? "page" : undefined, onMouseEnter: function () { return setHoveredItem(index); }, onMouseLeave: function () { return setHoveredItem(null); }, ref: function (el) {
                                menuRefs.current[index] = el;
                            }, onKeyDown: function (e) { return handleKeyDown(e, index); }, className: getItemStyles(isActive, isHovered) },
                            react_1["default"].createElement(Icon, { className: "size-5", "aria-hidden": "true" }),
                            react_1["default"].createElement("span", { className: "whitespace-nowrap capitalize " + (isHovered ? "w-fit" : "max-w-[150px] truncate") }, item.title))));
                }),
                react_1["default"].createElement("li", { role: "menuitem" },
                    react_1["default"].createElement(link_1["default"], { href: "/settings", "aria-label": "Navigate to Settings", "aria-current": pathname === "/settings" ? "page" : undefined, onMouseEnter: function () { return setHoveredItem(-1); }, onMouseLeave: function () { return setHoveredItem(null); }, ref: function (el) {
                            menuRefs.current[constants_1.siderbarItems.length] = el;
                        }, onKeyDown: function (e) { return handleKeyDown(e, constants_1.siderbarItems.length); }, className: getItemStyles(pathname === "/settings", hoveredItem === -1) },
                        react_1["default"].createElement(lucide_react_1.Settings, { className: "size-5", "aria-hidden": "true" }),
                        react_1["default"].createElement("span", { className: "whitespace-nowrap capitalize " + (hoveredItem === -1 ? "w-fit" : "max-w-[150px] truncate") }, "Settings"))))),
        react_1["default"].createElement("div", { className: "mt-auto px-5 py-5" },
            react_1["default"].createElement(button_1.Button, { variant: "ghost", className: "w-fit capitalize text-red-500 flex items-center space-x-2 font-medium text-[1.125rem] px-4 py-3 hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2", "aria-label": "Logout from application", onClick: function () { }, ref: function (el) {
                    if (el) {
                        menuRefs.current[constants_1.siderbarItems.length + 1] = el;
                    }
                }, onKeyDown: function (e) { return handleKeyDown(e, constants_1.siderbarItems.length + 1); } },
                react_1["default"].createElement(lucide_react_1.LogOut, { className: "size-5", "aria-hidden": "true" }),
                react_1["default"].createElement("span", { className: "max-w-[150px] truncate whitespace-nowrap" }, "Logout")))));
}
exports["default"] = Sidebar;
