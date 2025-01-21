"use client";
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
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var Layouts_1 = require("../../components/Layouts");
var AdminHeader_1 = require("../../components/AdminHeader");
var Preview_1 = require("./components/Preview");
var ListingForm_1 = require("./components/ListingForm");
var validations_1 = require("@/lib/validations");
var STORAGE_KEY = "property_listing_draft";
var MAX_ADDRESS_LENGTH = 150;
var MAX_DESCRIPTION_LENGTH = 1500;
var MAX_IMAGES = 7;
var initialFormData = {
    address: "",
    description: "",
    price: "",
    duration: "1 year",
    images: [],
    buildingType: "flat",
    beds: "2 beds",
    baths: "3 baths",
    amenities: [],
    error: null,
    errorMessage: null
};
function CreateListing() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), formError = _a[0], setFormError = _a[1];
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(validations_1.propertyFormSchema),
        defaultValues: initialFormData
    });
    var handleSubmit = form.handleSubmit, watch = form.watch, setValue = form.setValue, reset = form.reset, control = form.control, errors = form.formState.errors;
    // Watch form values for auto-saving
    var formValues = watch();
    // Auto-save form data to localStorage whenever values change
    react_1.useEffect(function () {
        var saveTimeout = setTimeout(function () {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
            }
            catch (error) {
                console.error("Error saving form:", error);
                setFormError({
                    field: "save",
                    message: "Failed to save draft. The images might be too large."
                });
            }
        }, 1000); // Debounce save for 1 second
        return function () { return clearTimeout(saveTimeout); };
    }, [formValues]);
    // Load saved form data once on mount
    react_1.useEffect(function () {
        try {
            var savedForm = localStorage.getItem(STORAGE_KEY);
            if (savedForm) {
                var parsedForm = JSON.parse(savedForm);
                reset(parsedForm);
            }
        }
        catch (error) {
            console.error("Error loading saved form:", error);
            setFormError({
                field: "load",
                message: "Failed to load draft. Please try again."
            });
        }
    }, [reset]);
    var handleImageUpload = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var currentImages, newImages, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((_a = e.target.files) === null || _a === void 0 ? void 0 : _a.length))
                        return [2 /*return*/];
                    currentImages = watch("images");
                    if (currentImages.length + e.target.files.length > MAX_IMAGES) {
                        setFormError({
                            field: "images",
                            message: "You cannot upload more than " + MAX_IMAGES + " images"
                        });
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(Array.from(e.target.files).map(function (file) {
                            return new Promise(function (resolve, reject) {
                                // Add file size check
                                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                                    reject(new Error("File size too large"));
                                    return;
                                }
                                var reader = new FileReader();
                                reader.onload = function () { return resolve(reader.result); };
                                reader.onerror = reject;
                                reader.readAsDataURL(file);
                            });
                        }))];
                case 2:
                    newImages = _b.sent();
                    setValue("images", __spreadArrays(currentImages, newImages));
                    setFormError(null);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Error processing images:", error_1);
                    setFormError({
                        field: "images",
                        message: "Error uploading images. Please ensure each image is under 5MB."
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleImageDelete = function (index) {
        var currentImages = watch("images");
        setValue("images", currentImages.filter(function (_, i) { return i !== index; }));
        setFormError(null);
    };
    var handleInputChange = function (field, value) {
        if (field === "address" && value.length > MAX_ADDRESS_LENGTH)
            return;
        if (field === "description" && value.length > MAX_DESCRIPTION_LENGTH)
            return;
        setValue(field, value);
        setFormError(null);
    };
    var handleSaveDraft = function () {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
            alert("Draft saved successfully!");
        }
        catch (error) {
            console.error("Error saving draft:", error);
            setFormError({
                field: "save",
                message: "Failed to save draft. The images might be too large."
            });
        }
    };
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                console.log("Submitting property listing:", data);
                localStorage.removeItem(STORAGE_KEY);
                alert("Property listing created successfully!");
                router.push("/admin/property-management");
            }
            catch (error) {
                console.error("Error submitting form:", error);
                setFormError({
                    field: "submit",
                    message: "Error submitting form. Please try again."
                });
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(Layouts_1["default"], null,
        React.createElement(AdminHeader_1["default"], { title: "Create Listing" }),
        React.createElement("main", { className: "p-5" },
            React.createElement(button_1.Button, { variant: "default", onClick: function () { return router.push("/admin/property-management"); }, className: "capitalize flex items-center space-x-1 bg-[#7065F0] mb-5" },
                React.createElement(lucide_react_1.MoveLeft, null),
                React.createElement("span", null, "Go Back")),
            formError && (React.createElement("div", { className: "mb-4 p-3 bg-red-100 text-red-700 rounded" }, formError.message)),
            React.createElement("section", { className: "grid grid-cols-2 gap-10" },
                React.createElement(Preview_1["default"], { control: control, watch: watch, images: watch("images"), onImageDelete: handleImageDelete }),
                React.createElement(ListingForm_1["default"], { control: control, errors: errors, watch: watch, onImageUpload: handleImageUpload, onInputChange: handleInputChange, onSubmit: handleSubmit(onSubmit), onSaveDraft: handleSaveDraft })))));
}
exports["default"] = CreateListing;
