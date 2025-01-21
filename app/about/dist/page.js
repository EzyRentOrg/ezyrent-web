"use strict";
exports.__esModule = true;
var react_1 = require("react");
var maxWidthWrapper_1 = require("../maxWidthWrapper");
var breadcrumb_1 = require("@/components/breadcrumb");
var about_1 = require("@/config/about");
var image_1 = require("next/image");
function About() {
    return (react_1["default"].createElement(maxWidthWrapper_1["default"], null,
        react_1["default"].createElement("main", null,
            react_1["default"].createElement("div", { className: "lg:pl-20" },
                react_1["default"].createElement(breadcrumb_1["default"], null)),
            react_1["default"].createElement("header", { className: "mt-5 relative w-full max-w-[1240px] mx-auto h-[400px] md:h-[500px] rounded-[40px] bg-[url('/about/about-image2479x1653.jpeg')] bg-no-repeat bg-center bg-cover overflow-hidden" },
                react_1["default"].createElement("div", { className: "absolute inset-0 bg-[#000929] bg-opacity-75 flex flex-col justify-center items-center text-white text-center h-full" },
                    react_1["default"].createElement("div", { className: "max-w-[900px] mx-auto flex flex-col items-center justify-center h-full px-4" },
                        react_1["default"].createElement("h1", { className: "mb-10 sm:text-[1.2rem] text-[1.5rem] md:text-[3rem] lg:text-[3.5rem] font-semibold !leading-[1.4]" },
                            "Transforming Rentals, ",
                            react_1["default"].createElement("br", null),
                            "One Listing at a Time"),
                        react_1["default"].createElement("em", { className: "text-xs md:text-xl lg:text-[1.5rem] mt-2 !leading-[1.5]" },
                            react_1["default"].createElement("span", { className: " rounded-[40px] font-extrabold text-white" }, "EzyRent"),
                            ' ',
                            "is revolutionizing property rentals across Nigeria and Africa. Making it seamless to find, rent or sell homes from anywhere in the world. With user-first approach, we eliminate the hassle of agent fees and bring transparency , convenience, and security to the rental process - all from the comfort of your home.")))),
            react_1["default"].createElement("section", { className: "py-10 lg:py-20 max-w-[900px] mx-auto" },
                react_1["default"].createElement("h2", { className: "lg:mb-10 text-2xl md:text-3xl lg:text-[2.5rem] 2xl:text-[3rem] font-medium text-[#7065F0] text-center" }, "Our Mission"),
                react_1["default"].createElement("p", { className: "max-w-[800px] mx-auto mt-2 lg:mt-4 lg:text-center lg:text-[1.1rem] text-gray-600" },
                    "At ",
                    react_1["default"].createElement("span", { className: "font-extrabold" }, "EzyRent"),
                    ", our mission is to revolutionize the property rental experience by creating a seamless and trusted platform that bridges the gap between renters, landlords, and property managers. We empower renters with broader, reliable housing options and easy access to secure, affordable homes. We support landlords by providing them with an extensive pool of verified tenants and the tools to manage their properties efficiently.")),
            react_1["default"].createElement("section", { className: "py-10 max-w-[900px] mx-auto " },
                react_1["default"].createElement("h2", { className: "text-2xl md:text-3xl lg:text-[2.5rem] 2xl:text-[3rem] font-medium text-[#7065F0] text-center mb-2 lg:mb-4" }, "What We Offer"),
                react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1240px]  mx-auto px-4" }, about_1.serviceFeatures.map(function (service, index) { return (react_1["default"].createElement("div", { key: service.title + index, className: "max-w-[260px] mx-auto rounded-[40px] border-[2px] border-[#000929] border-opacity-15 flex flex-col items-center space-y-4 p-6 bg-white shadow text-center" },
                    react_1["default"].createElement("div", { className: "border-[2px] border-black border-opacity-20 w-fit p-2 rounded-full flex item-center justify-center" },
                        react_1["default"].createElement(service.icon, { size: 20 })),
                    react_1["default"].createElement("h3", { className: "text-base md:text-lg lg:text-2xl font-medium text-[#000929] text-center" }, service.title),
                    react_1["default"].createElement("p", { className: "font-light text-sm md:text-lg text-center text-[#000929] text-opacity-50" }, service.description))); }))),
            react_1["default"].createElement("section", { className: "py-10 max-w-[1240px] mx-auto " },
                react_1["default"].createElement("h2", { className: "!mb-10 text-2xl md:text-3xl lg:text-[2.5rem] 2xl:text-[3rem] font-medium text-[#7065F0] text-center" }, "Meet the Team"),
                react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto mt-2 lg:mt-4" }, about_1.teamMembers.map(function (member, index) { return (react_1["default"].createElement("div", { key: index, className: "flex flex-col lg:flex-row items-center justify-center md:justify-normal space-x-4 rounded-[40px] max-w-[610px] border-[2px] border-[#000929] border-opacity-15 p-4" },
                    react_1["default"].createElement("div", { className: "w-fit lg:w-full" },
                        react_1["default"].createElement("div", { className: "w-[180px] h-[180px] overflow-hidden" },
                            react_1["default"].createElement(image_1["default"], { src: "/about/" + member.image, alt: "Picture of " + member.name, width: 180, height: 180, className: "w-full h-full rounded-full object-top object-cover" }))),
                    react_1["default"].createElement("div", { className: "py-4 flex flex-col items-center lg:items-start space-y-4" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h3", { className: "text-base lg:text-lg font-semibold text-[#000929]" }, member.name),
                            react_1["default"].createElement("span", { className: "text-[#000929] text-opacity-40 font-medium text-sm lg:text-base" }, member.role)),
                        react_1["default"].createElement("p", { className: "text-[#000929] text-xs lg:text-sm" }, member.description)))); }))))));
}
exports["default"] = About;
