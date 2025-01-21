'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var maxWidthWrapper_1 = require("@/app/maxWidthWrapper");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var zod_1 = require("@hookform/resolvers/zod");
var useDelay_1 = require("@/hooks/useDelay");
var validations_1 = require("@/lib/validations");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var react_hook_form_1 = require("react-hook-form");
var separator_1 = require("@/components/ui/separator");
var OAuth_1 = require("@/components/OAuth");
var link_1 = require("next/link");
var RightHandAuthPage_1 = require("@/components/RightHandAuthPage");
var sonner_1 = require("sonner");
var LappedImages_1 = require("@/components/LappedImages");
function Register() {
    var _this = this;
    var _a = react_1.useState(false), isPasswordVisible = _a[0], setIsPasswordVisible = _a[1];
    var _b = react_1.useState(false), isConfirmPasswordVisible = _b[0], setIsConfirmPasswordVisible = _b[1];
    var delay = useDelay_1["default"]();
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(validations_1.signUpSchema),
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });
    var handleSubmit = form.handleSubmit, isSubmitting = form.formState.isSubmitting;
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delay(2000)];
                case 1:
                    _a.sent();
                    sonner_1.toast.success('Congratulations', {
                        description: 'You have successfully registered'
                    });
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    }); };
    var handlePasswordVisibility = function () {
        setIsPasswordVisible(function (prev) { return !prev; });
    };
    var handleConfirmPasswordVisibility = function () {
        setIsConfirmPasswordVisible(function (prev) { return !prev; });
    };
    return (react_1["default"].createElement(maxWidthWrapper_1["default"], null,
        react_1["default"].createElement("section", { className: "min-h-[984px] mx-auto mb-10 flex items-center space-x-10" },
            react_1["default"].createElement("main", { className: "h-[964px] w-full flex flex-col " },
                react_1["default"].createElement("div", { className: "bg-[#F8F8F8] h-full mb-10  rounded-[20px] pt-[120px]" },
                    react_1["default"].createElement("div", { className: "md:w-[80%] mx-auto pb-5" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("h2", { className: "capitalize text-[#7F56D9] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]" },
                                react_1["default"].createElement("em", null, "welcome to ezyRent")),
                            react_1["default"].createElement("p", { className: "my-1px text-[#475467] text-[1.25rem] leading-[28px] font-bold -tracking-[2%]" }, "Find, Rent, and Manage Properties Seamlessly"),
                            react_1["default"].createElement("p", { className: "text-[0.975rem] italic leading-[24px] font-normal text-[#667085]" }, "EzyRent simplifies property transactions with verified listings, AI-powered insights, & secure processes, making renting or buying homes stress-free.")),
                        react_1["default"].createElement(form_1.Form, __assign({}, form),
                            react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit), className: " mt-6" },
                                react_1["default"].createElement("div", { className: "grid gap-4" },
                                    react_1["default"].createElement(form_1.FormField, { control: form.control, name: "email", render: function (_a) {
                                            var field = _a.field;
                                            return (react_1["default"].createElement(form_1.FormItem, null,
                                                react_1["default"].createElement(form_1.FormControl, null,
                                                    react_1["default"].createElement("div", { className: "relative flex items-center " },
                                                        react_1["default"].createElement("div", { className: "absolute left-5 flex items-center space-x-4" },
                                                            react_1["default"].createElement(lucide_react_1.Mail, { size: 20, stroke: "#9E77ED" }),
                                                            react_1["default"].createElement(separator_1.Separator, { orientation: "vertical", className: "bg-[#9E77ED] h-6 w-[1px]" })),
                                                        react_1["default"].createElement(input_1.Input, __assign({ type: "email", className: "bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem]", placeholder: "example@gmail.com" }, field)))),
                                                react_1["default"].createElement(form_1.FormMessage, null)));
                                        } }),
                                    react_1["default"].createElement(form_1.FormField, { control: form.control, name: "password", render: function (_a) {
                                            var field = _a.field;
                                            return (react_1["default"].createElement(form_1.FormItem, null,
                                                react_1["default"].createElement(form_1.FormControl, null,
                                                    react_1["default"].createElement("div", { className: "relative flex items-center " },
                                                        react_1["default"].createElement("div", { className: "absolute left-5 flex items-center space-x-4" },
                                                            react_1["default"].createElement(lucide_react_1.Lock, { size: 20, stroke: "#9E77ED" }),
                                                            react_1["default"].createElement(separator_1.Separator, { orientation: "vertical", className: "bg-[#9E77ED] h-6 w-[1px]" })),
                                                        react_1["default"].createElement(input_1.Input, __assign({ type: isPasswordVisible ? 'text' : 'password', className: "bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem] ", placeholder: "password" }, field)),
                                                        react_1["default"].createElement("div", { tabIndex: 0, role: "button", "aria-label": "Toggle password visibility", onClick: handlePasswordVisibility, className: "absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" }, isPasswordVisible ? react_1["default"].createElement(lucide_react_1.EyeOffIcon, null) : react_1["default"].createElement(lucide_react_1.Eye, null)))),
                                                react_1["default"].createElement(form_1.FormMessage, null)));
                                        } }),
                                    react_1["default"].createElement(form_1.FormField, { control: form.control, name: "confirmPassword", render: function (_a) {
                                            var field = _a.field;
                                            return (react_1["default"].createElement(form_1.FormItem, null,
                                                react_1["default"].createElement(form_1.FormControl, null,
                                                    react_1["default"].createElement("div", { className: "relative flex items-center " },
                                                        react_1["default"].createElement("div", { className: "absolute left-5 flex items-center space-x-4" },
                                                            react_1["default"].createElement(lucide_react_1.Lock, { size: 20, stroke: "#9E77ED" }),
                                                            react_1["default"].createElement(separator_1.Separator, { orientation: "vertical", className: "bg-[#9E77ED] h-6 w-[1px]" })),
                                                        react_1["default"].createElement(input_1.Input, __assign({ type: isConfirmPasswordVisible ? 'text' : 'password', className: "bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem] ", placeholder: "Re-enter password" }, field)),
                                                        react_1["default"].createElement("div", { tabIndex: 0, role: "button", "aria-label": "Toggle password visibility", onClick: handleConfirmPasswordVisibility, className: "absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" }, isConfirmPasswordVisible ? (react_1["default"].createElement(lucide_react_1.EyeOffIcon, null)) : (react_1["default"].createElement(lucide_react_1.Eye, null))))),
                                                react_1["default"].createElement(form_1.FormMessage, null)));
                                        } })),
                                react_1["default"].createElement(button_1.Button, { type: "submit", className: utils_1.cn('bg-[#000929] h-[72px] !mt-10 w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150', {
                                        'bg-opacity-75 transition-colors duration-150 ease-in-out': isSubmitting
                                    }) }, isSubmitting ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                                    react_1["default"].createElement(lucide_react_1.Loader, null),
                                    " submitting...")) : ('Submit'))),
                            react_1["default"].createElement(OAuth_1["default"], null),
                            react_1["default"].createElement("div", { className: "mt-5 text-[1rem] font-medium leading-[22.4px] flex items-center justify-center space-x-2" },
                                react_1["default"].createElement("p", null, "Already have an account? "),
                                react_1["default"].createElement(link_1["default"], { href: '/login', className: "capitalize text-[#6941C6] hover:text-opacity-85 transition-colors duration-100" }, "Login"))))),
                react_1["default"].createElement(LappedImages_1["default"], null)),
            react_1["default"].createElement(RightHandAuthPage_1["default"], null))));
}
exports["default"] = Register;
