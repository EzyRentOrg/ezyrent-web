'use client';
"use strict";
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
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
// import { Alert, AlertDescription } from '@/components/ui/alert';
var useDelay_1 = require("@/hooks/useDelay");
var CountdownButton_1 = require("@/components/CountdownButton");
var VerificationInput_1 = require("@/components/VerificationInput");
var utils_1 = require("@/lib/utils");
var lucide_react_2 = require("lucide-react");
var RightHandAuthPage_1 = require("@/components/RightHandAuthPage");
var maxWidthWrapper_1 = require("@/app/maxWidthWrapper");
var navigation_2 = require("next/navigation");
var LappedImages_1 = require("@/components/LappedImages");
var sonner_1 = require("sonner");
function VerifyEmail(_a) {
    var _this = this;
    var onSuccess = _a.onSuccess, onResendCode = _a.onResendCode;
    var _b = react_1.useState(Array(6).fill('')), code = _b[0], setCode = _b[1];
    var _c = react_1.useState(''), error = _c[0], setError = _c[1];
    var _d = react_1.useState(false), isError = _d[0], setIsError = _d[1];
    var _e = react_1.useState(false), isSuccess = _e[0], setIsSuccess = _e[1];
    var _f = react_1.useState(false), isVerifying = _f[0], setIsVerifying = _f[1];
    var _g = react_1.useState(60), timeLeft = _g[0], setTimeLeft = _g[1];
    var _h = react_1.useState(true), isResendDisabled = _h[0], setIsResendDisabled = _h[1];
    // const [allowDigits, setAllowDigits] = useState<boolean>(true);
    var inputRefs = react_1.useRef([]);
    var searchParams = navigation_1.useSearchParams();
    var router = navigation_2.useRouter();
    var delay = useDelay_1["default"]();
    var setInputRef = function (index) { return function (el) {
        inputRefs.current[index] = el;
    }; };
    react_1.useEffect(function () {
        var urlCode = searchParams.get('code');
        if ((urlCode === null || urlCode === void 0 ? void 0 : urlCode.length) === 6) {
            setCode(urlCode.split(''));
        }
        setIsResendDisabled(true);
    }, [searchParams]);
    react_1.useEffect(function () {
        var timer;
        if (timeLeft > 0 && isResendDisabled) {
            timer = setTimeout(function () { return setTimeLeft(function (prev) { return prev - 1; }); }, 1000);
        }
        else if (timeLeft === 0) {
            setIsResendDisabled(false);
        }
        return function () { return clearTimeout(timer); };
    }, [timeLeft, isResendDisabled]);
    // Helper function to check if all digits are filled
    var areAllDigitsFilled = function (codeArray) {
        return codeArray.every(function (digit) { return digit !== ''; });
    };
    // handle change function
    var handleChange = function (value, index) {
        var _a;
        if (!/^\d*$/.test(value)) {
            // setAllowDigits(false);
            return;
        }
        var newCode = __spreadArrays(code);
        newCode[index] = value;
        setCode(newCode);
        // Clear non-digit error if it exists
        // setAllowDigits(true);
        // Clear error when any digit is entered in the last input
        if (index === 5 && value) {
            setError('');
        }
        else if (!areAllDigitsFilled(newCode)) {
            setError('Please enter all 6 digits');
        }
        else {
            setError('');
        }
        // Auto-advance to next input
        if (value && index < 5) {
            (_a = inputRefs.current[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
        // Auto-submit if all digits are filled
        if (index === 5 && value && areAllDigitsFilled(newCode)) {
            handleVerification();
        }
    };
    // error state for each box
    var updateErrorState = function (codeArray) {
        if (areAllDigitsFilled(codeArray)) {
            setError('');
        }
        else {
            setError('Please enter all 6 digits');
        }
    };
    // keyboard key navigation
    var handleKeyDown = function (e, index) {
        var _a, _b, _c, _d, _e;
        if (e.key === 'Backspace') {
            if (!code[index] && index > 0) {
                (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
                var newCode = __spreadArrays(code);
                newCode[index - 1] = '';
                setCode(newCode);
                updateErrorState(newCode);
                e.preventDefault();
            }
            else if (code[index]) {
                var newCode = __spreadArrays(code);
                newCode[index] = '';
                setCode(newCode);
                updateErrorState(newCode);
            }
        }
        else if (e.key === 'ArrowLeft' && index > 0) {
            (_b = inputRefs.current[index - 1]) === null || _b === void 0 ? void 0 : _b.focus();
        }
        else if (e.key === 'ArrowRight' && index < 5) {
            (_c = inputRefs.current[index + 1]) === null || _c === void 0 ? void 0 : _c.focus();
        }
        if (e.key === 'Delete') {
            var newCode = __spreadArrays(code);
            newCode[index] = '';
            setCode(newCode);
            updateErrorState(newCode);
            if (index < code.length - 1) {
                (_d = inputRefs.current[index + 1]) === null || _d === void 0 ? void 0 : _d.focus();
            }
            else {
                (_e = inputRefs.current[5]) === null || _e === void 0 ? void 0 : _e.focus();
            }
        }
    };
    var handlePaste = function (e) {
        var _a;
        e.preventDefault();
        var pastedData = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, 6);
        if (pastedData.length === 6) {
            var newCode = pastedData.split('');
            setCode(newCode);
            (_a = inputRefs.current[5]) === null || _a === void 0 ? void 0 : _a.focus();
            setError(''); // Clear error when valid code is pasted
        }
        else {
            setError('Please enter all 6 digits');
        }
    };
    // for test.
    var handleVerification = function () { return __awaiter(_this, void 0, void 0, function () {
        var enteredCode, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setError('');
                    setIsError(false);
                    setIsSuccess(false);
                    enteredCode = code.join('');
                    if (!enteredCode || enteredCode.length !== 6) {
                        setError('Please enter all 6 digits');
                        return [2 /*return*/];
                    }
                    setIsVerifying(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!(enteredCode === '123456')) return [3 /*break*/, 3];
                    setIsSuccess(true);
                    return [4 /*yield*/, delay(1000)];
                case 2:
                    _a.sent();
                    router.replace("/admin/dashboard");
                    return [3 /*break*/, 4];
                case 3:
                    sonner_1.toast.error('Invalid verification code. Please try again.');
                    setIsError(true);
                    setIsSuccess(false);
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    // console.log(err);
                    setError(err_1 + "Verification failed. Please try again.");
                    sonner_1.toast.error(err_1 + "Verification failed. Please try again.");
                    setIsError(true);
                    setIsSuccess(false);
                    return [3 /*break*/, 7];
                case 6:
                    setIsVerifying(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleResendCode = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (isResendDisabled)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (onResendCode === null || onResendCode === void 0 ? void 0 : onResendCode())];
                case 2:
                    _b.sent();
                    setTimeLeft(60);
                    setIsResendDisabled(true);
                    setCode(Array(6).fill(''));
                    setError('');
                    (_a = inputRefs.current[0]) === null || _a === void 0 ? void 0 : _a.focus();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    setError(err_2 + " Failed to resend code. Please try again.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(maxWidthWrapper_1["default"], null,
        react_1["default"].createElement("section", { className: "min-h-[984px] mx-auto mb-10 flex items-center space-x-10" },
            react_1["default"].createElement("main", { className: "h-[964px] w-full flex flex-col " },
                react_1["default"].createElement("div", { className: "bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]" },
                    react_1["default"].createElement("div", { className: "ml-5 pb-5" },
                        react_1["default"].createElement("div", { className: "md:w-[80%] mx-auto" },
                            react_1["default"].createElement("div", { className: "my-10 text-center flex flex-col items-center justify-center space-y-4" },
                                react_1["default"].createElement("div", { className: "bg-[#E9D7FE] rounded-full size-20 flex items-center justify-center" },
                                    react_1["default"].createElement(lucide_react_2.Mail, { stroke: '#f1f1f1', fill: '#7F56D9', size: 35 })),
                                react_1["default"].createElement("h2", { className: "capitalize text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]" }, "Check your email"),
                                react_1["default"].createElement("p", { className: "my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] w-[80%]" },
                                    "Enter the",
                                    react_1["default"].createElement("span", { className: "text-[#4036af] font-medium mx-2" }, "6-digit"),
                                    "code sent to your email to complete registration")),
                            react_1["default"].createElement("div", { className: "flex justify-center gap-10" }, code.map(function (digit, index) { return (react_1["default"].createElement(VerificationInput_1["default"], { key: index, value: digit, index: index, isError: isError, isSuccess: isSuccess, onChange: function (value) { return handleChange(value, index); }, onKeyDown: function (e) { return handleKeyDown(e, index); }, onPaste: handlePaste, ref: setInputRef(index) })); })),
                            react_1["default"].createElement("div", { className: "space-y-4" },
                                react_1["default"].createElement(button_1.Button, { onClick: handleVerification, disabled: isVerifying || code.some(function (digit) { return !digit; }), type: "submit", className: utils_1.cn('bg-[#000929] h-[72px] !mt-10 w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150', {
                                        'bg-opacity-75 transition-colors duration-150 ease-in-out': isVerifying
                                    }) }, isVerifying ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                                    react_1["default"].createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                                    "Verifying...")) : ('Proceed')),
                                react_1["default"].createElement("div", { className: "text-center" },
                                    react_1["default"].createElement(CountdownButton_1["default"], { onClick: handleResendCode, isDisabled: isResendDisabled, timeLeft: timeLeft })))))),
                react_1["default"].createElement(LappedImages_1["default"], null)),
            react_1["default"].createElement(RightHandAuthPage_1["default"], null))));
}
exports["default"] = VerifyEmail;
