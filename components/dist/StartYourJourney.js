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
var button_1 = require("./ui/button");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var StartYourJourney = function () {
    // Initialize refs for each video
    var videoRefs = [
        react_1.useRef(null),
        react_1.useRef(null),
        react_1.useRef(null),
        react_1.useRef(null)
    ];
    var _a = react_1.useState(Array(4).fill(false)), isPlaying = _a[0], setIsPlaying = _a[1];
    var togglePlay = function (index) {
        var newIsPlaying = __spreadArrays(isPlaying);
        var video = videoRefs[index].current;
        if (video) {
            if (video.paused) {
                video.play();
                newIsPlaying[index] = true;
            }
            else {
                video.pause();
                newIsPlaying[index] = false;
            }
            setIsPlaying(newIsPlaying);
        }
        else {
            // console.error(`Video reference at index ${index} is undefined`);
        }
    };
    return (react_1["default"].createElement("div", { className: "mt-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 " },
        react_1["default"].createElement("div", { className: "my-10 w-full md:h-[496px] grid md:grid-cols-2 gap-5" },
            react_1["default"].createElement("div", { className: "relative rounded-lg w-full border h-[250px] md:h-full overflow-hidden" },
                react_1["default"].createElement("video", { ref: videoRefs[0], src: "/video/house1.mp4", className: "w-full h-full object-cover", loop: true, muted: true }),
                react_1["default"].createElement("button", { onClick: function () { return togglePlay(0); }, className: "absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40" }, isPlaying[0] ? (react_1["default"].createElement(lucide_react_1.PauseCircle, { stroke: "#f3f3f3", size: 60 })) : (react_1["default"].createElement(lucide_react_1.PlayCircle, { stroke: "#f3f3f3", size: 60 })))),
            react_1["default"].createElement("div", { className: "w-full h-full grid md:grid-cols-2 gap-5" },
                react_1["default"].createElement("div", { className: "relative rounded-lg w-full h-[250px] md:h-full overflow-hidden" },
                    react_1["default"].createElement("video", { ref: videoRefs[1], src: "/video/house2.mp4", className: "w-full h-full object-cover", loop: true, muted: true }),
                    react_1["default"].createElement("button", { onClick: function () { return togglePlay(1); }, className: "absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40" }, isPlaying[1] ? (react_1["default"].createElement(lucide_react_1.PauseCircle, { stroke: "#f3f3f3", size: 60 })) : (react_1["default"].createElement(lucide_react_1.PlayCircle, { stroke: "#f3f3f3", size: 60 })))),
                react_1["default"].createElement("div", { className: "w-full h-full grid md:grid-rows-2 gap-5" }, [2, 3].map(function (index) { return (react_1["default"].createElement("div", { key: index, className: "relative rounded-lg w-full h-[250px] md:h-full overflow-hidden" },
                    react_1["default"].createElement("video", { ref: videoRefs[index], src: "/video/house" + (index + 1) + ".mp4", className: "w-full h-full object-cover", loop: true, muted: true }),
                    react_1["default"].createElement("button", { onClick: function () { return togglePlay(index); }, className: "absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40" }, isPlaying[index] ? (react_1["default"].createElement(lucide_react_1.PauseCircle, { stroke: "#f3f3f3", size: 60 })) : (react_1["default"].createElement(lucide_react_1.PlayCircle, { stroke: "#f3f3f3", size: 60 }))))); })))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("p", { className: "max-w-[632px] mx-auto capitalize text-2xl md:text-[3rem] font-semibold md:leading-[67.2px] text-[#000929] text-center" }, "Let\u2019s Start Your Real Estate Journey Today"),
            react_1["default"].createElement("div", { className: "flex items-center justify-center w-full my-10" },
                react_1["default"].createElement(link_1["default"], { href: '/contact' },
                    react_1["default"].createElement(button_1.Button, { variant: "default", className: utils_1.cn('h-[72px] text-xl bg-[#000929]') },
                        "Send us a Message ",
                        react_1["default"].createElement(lucide_react_1.ArrowRight, { size: 32, className: "h-8 w-8" })))))));
};
exports["default"] = StartYourJourney;
