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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var label_1 = require("./label");
var react_hook_form_1 = require("react-hook-form");
var label_2 = require("@/components/ui/label");
var checkbox_1 = require("@/components/ui/checkbox");
var selectionButton_1 = require("./selectionButton");
var property_form_1 = require("@/app/admin/constants/property-form");
var react_1 = require("react");
var MAX_ADDRESS_LENGTH = 150;
var MAX_DESCRIPTION_LENGTH = 1500;
function ListingForm(_a) {
    var _b, _c;
    var control = _a.control, errors = _a.errors, watch = _a.watch, onImageUpload = _a.onImageUpload, onInputChange = _a.onInputChange, onSubmit = _a.onSubmit, onSaveDraft = _a.onSaveDraft;
    var _d = react_1.useState(""), selectedBuildingType = _d[0], setSelectedBuildingType = _d[1];
    console.log("errors: ", errors);
    var handleSubmit = function (e) {
        e.preventDefault();
        onSubmit(e);
    };
    return (React.createElement("aside", { className: "w-full max-w-[740px] flex flex-col space-y-8 lg:pl-10 bg-gradient-to-b from-neutral-50 to-white/70 rounded-lg" },
        React.createElement("h2", { className: "text-[#000929] text-[1.25rem] font-medium mb-3 capitalize" }, "property listing"),
        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-8" },
            React.createElement("section", { "aria-label": "Image Upload" },
                React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, "Add Image"),
                React.createElement("div", { className: "bg-white h-40 w-full max-w-[416px] rounded-lg flex items-center justify-center shadow-sm" },
                    React.createElement("div", { className: "w-[90%] h-[85%] border border-dashed border-[#CACACA] rounded-lg flex flex-col items-center justify-center" },
                        React.createElement("label", { htmlFor: "image", className: "w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" },
                            React.createElement("input", { id: "image", type: "file", className: "hidden", accept: "image/*", multiple: true, onChange: onImageUpload, "aria-label": "Upload images" }),
                            React.createElement("span", { className: "w-11 h-11 bg-[#F5F5F5] flex items-center justify-center rounded-full mb-2" },
                                React.createElement(lucide_react_1.FileUp, { className: "text-[#7065F0]", size: 24 })),
                            React.createElement("div", { className: "flex flex-col items-center" },
                                React.createElement("p", { className: "text-center text-sm" },
                                    React.createElement("span", { className: "text-[#7065F0] font-medium hover:underline" }, "Click to upload"),
                                    " ",
                                    "or",
                                    " ",
                                    React.createElement("span", { className: "text-[#7065F0] font-medium hover:underline" }, "Drag and drop")),
                                React.createElement("small", { className: "text-[#707070] mt-1" }, "(Max. file size: 25 MB)"))))),
                errors.images && (React.createElement("p", { className: "mt-2 text-red-500 text-sm" }, errors.images.message))),
            React.createElement("div", { className: "flex-1" },
                React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, "Price"),
                React.createElement(react_hook_form_1.Controller, { name: "price", control: control, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(input_1.Input, __assign({}, field, { className: "focus-visible:ring-1 focus-visible:ring-[#7065F0] bg-[#F7F7F7] border border-[#E6E6E6]", placeholder: "Enter property price", "aria-label": "Property price" })));
                    } }),
                errors.price && (React.createElement("p", { className: "mt-2 text-red-500 text-sm" }, errors.price.message))),
            React.createElement("div", { className: "w-full md:w-[200px] h-auto border-black" },
                React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, "Duration"),
                React.createElement(react_hook_form_1.Controller, { name: "duration", control: control, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement("select", __assign({}, field, { className: "w-full rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 shadow-sm focus:border-[#7065F0] focus:outline-none focus:ring-1 focus:ring-[#7065F0]", "aria-label": "Select duration" }), property_form_1.durations.map(function (duration) { return (React.createElement("option", { key: duration, value: duration }, duration)); })));
                    } }),
                errors.duration && (React.createElement("p", { className: "mt-2 text-red-500 text-sm" }, errors.duration.message))),
            React.createElement("div", { className: "w-fit mt-10" },
                React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, "Building Type"),
                React.createElement(react_hook_form_1.Controller, { name: "buildingType", control: control, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement("div", { className: "grid grid-cols-5 gap-3 mt-2" }, property_form_1.buildingTypes.map(function (type) { return (React.createElement(selectionButton_1["default"], __assign({}, field, { key: type, label: type, selected: field.value === type, onClick: function () {
                                setSelectedBuildingType(type);
                                field.onChange(type);
                            } }))); })));
                    } }),
                errors.buildingType && (React.createElement("p", { className: "mt-2 text-red-500 text-sm" }, errors.buildingType.message))),
            [
                { label: "No. of Beds", options: property_form_1.bedOptions, fieldName: "beds" },
                { label: "No. of Baths", options: property_form_1.bathOptions, fieldName: "baths" },
            ].map(function (_a) {
                var label = _a.label, options = _a.options, fieldName = _a.fieldName;
                return (React.createElement("div", { key: fieldName, className: "w-fit mt-10" },
                    React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, label),
                    React.createElement(react_hook_form_1.Controller, { name: fieldName, control: control, render: function (_a) {
                            var field = _a.field, fieldState = _a.fieldState;
                            return (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "grid grid-cols-5 gap-3 mt-2" }, options.map(function (option) { return (React.createElement(selectionButton_1["default"], __assign({}, field, { key: option, label: option, selected: field.value === option, onClick: function () { return field.onChange(option); } }))); })),
                                fieldState.error && (React.createElement("p", { className: "mt-2 text-red-500 text-sm" }, fieldState.error.message))));
                        } })));
            }),
            React.createElement("div", { className: "mt-10 w-fit" },
                React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, "Amenities"),
                React.createElement(react_hook_form_1.Controller, { name: "amenities", control: control, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement("div", { className: "mt-2 grid grid-cols-3 gap-5" }, property_form_1.amenityOptions.map(function (amenity) {
                            var _a;
                            return (React.createElement("div", { key: amenity, className: "flex items-center space-x-2" },
                                React.createElement(checkbox_1.Checkbox, __assign({}, field, { id: "preview-" + amenity, checked: (_a = field.value) === null || _a === void 0 ? void 0 : _a.includes(amenity), onCheckedChange: function (checked) {
                                        var newValue = checked
                                            ? __spreadArrays((field.value || []), [amenity]) : (field.value || []).filter(function (item) { return item !== amenity; });
                                        field.onChange(newValue);
                                    } })),
                                React.createElement(label_2.Label, { htmlFor: "preview-" + amenity }, amenity)));
                        })));
                    } }),
                errors.amenities && (React.createElement("p", { className: "mt-2 text-red-500 text-sm" }, errors.amenities.message))),
            React.createElement("section", null,
                React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, "Address"),
                React.createElement("div", { className: "relative" },
                    React.createElement(react_hook_form_1.Controller, { name: "address", control: control, render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(input_1.Input, __assign({}, field, { onChange: function (e) {
                                    field.onChange(e);
                                    onInputChange('address', e.target.value);
                                }, className: "bg-[#F7F7F7] border border-[#E6E6E6] pr-14 focus-visible:ring-1 focus-visible:ring-[#7065F0]", placeholder: "Enter property address", "aria-label": "Property address" })));
                        } }),
                    React.createElement("div", { className: "mt-2 flex items-center space-x-5" },
                        React.createElement(label_1["default"], { minValue: ((_b = watch('address')) === null || _b === void 0 ? void 0 : _b.length) || 0, maxValue: MAX_ADDRESS_LENGTH, className: "bg-[#F7F7F7] text-xs w-fit" }),
                        errors.address && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.address.message))))),
            React.createElement("section", null,
                React.createElement("h2", { className: "text-[#000929] text-xl font-medium mb-3" }, "Description"),
                React.createElement("div", { className: "relative" },
                    React.createElement(react_hook_form_1.Controller, { name: "description", control: control, render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(textarea_1.Textarea, __assign({}, field, { onChange: function (e) {
                                    field.onChange(e);
                                    onInputChange('description', e.target.value);
                                }, className: "bg-[#F7F7F7] border border-[#E6E6E6] pr-14 focus-visible:ring-1 focus-visible:ring-[#7065F0] min-h-[150px]", placeholder: "Describe the property", "aria-label": "Property description" })));
                        } }),
                    React.createElement("div", { className: "mt-2 flex items-center space-x-5" },
                        React.createElement(label_1["default"], { minValue: ((_c = watch('description')) === null || _c === void 0 ? void 0 : _c.length) || 0, maxValue: MAX_DESCRIPTION_LENGTH, className: "bg-[#F7F7F7] text-xs w-fit" }),
                        errors.description && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.description.message))))),
            React.createElement("section", { className: "flex items-center justify-center gap-6 pt-4" },
                React.createElement(button_1.Button, { type: "button", onClick: onSaveDraft, className: "flex items-center gap-2 h-12 lg:text-[1.1rem] bg-white text-[#037F4A] shadow-sm hover:bg-[#F5FFF9] border border-[#037F4A] transition-colors", "aria-label": "Save draft" },
                    React.createElement("span", null, "Save"),
                    React.createElement(lucide_react_1.Save, { size: 18 })),
                React.createElement(button_1.Button, { type: "submit", className: "flex items-center gap-2 h-12 lg:text-[1.1rem] bg-[#7065F0] hover:bg-[#5B52C5] transition-colors", "aria-label": "Upload listing" },
                    React.createElement("span", null, "Upload"),
                    React.createElement(lucide_react_1.CloudUpload, { size: 18 }))))));
}
exports["default"] = ListingForm;
