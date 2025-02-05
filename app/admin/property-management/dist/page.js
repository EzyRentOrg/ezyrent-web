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
var Layouts_1 = require("../components/Layouts");
var navigation_1 = require("next/navigation");
var house_listing_card_1 = require("@/components/ui/house-listing-card");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var getCleanImageUrl_1 = require("@/lib/getCleanImageUrl");
var useDebounce_1 = require("@/hooks/useDebounce");
function PropertyManagement() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState([]), properties = _a[0], setProperties = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(false), error = _c[0], setError = _c[1];
    var _d = react_1.useState(1), page = _d[0], setPage = _d[1];
    var _e = react_1.useState(1), totalPages = _e[0], setTotalPages = _e[1];
    var _f = react_1.useState(''), search = _f[0], setSearch = _f[1];
    var _g = react_1.useState('createdAt'), sortBy = _g[0], setSortBy = _g[1];
    var _h = react_1.useState('desc'), sortOrder = _h[0], setSortOrder = _h[1];
    var debouncedSearch = useDebounce_1.useDebounce(search, 2000);
    // Fix: Use useCallback properly
    var fetchProperties = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var queryParams, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    setError(false);
                    queryParams = new URLSearchParams(__assign(__assign({ page: page.toString(), limit: '10' }, (debouncedSearch && { debouncedSearch: debouncedSearch })), { sortBy: sortBy,
                        sortOrder: sortOrder }));
                    return [4 /*yield*/, fetch("/api/fetch-listing?" + queryParams)];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to fetch');
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setProperties(data.data.data);
                    setTotalPages(data.data.totalPages);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    setError(true);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [page, sortBy, sortOrder, debouncedSearch]);
    react_1.useEffect(function () {
        fetchProperties();
    }, [fetchProperties]);
    var handleCreateListing = function () {
        router.push('/admin/property-management/create-listing');
    };
    return (react_1["default"].createElement(Layouts_1["default"], { title: 'Property Management', btnTitle: 'Add Property', handleClick: handleCreateListing },
        react_1["default"].createElement("div", { className: "flex flex-col h-screen px-5" },
            react_1["default"].createElement("div", { className: "flex gap-4 items-center mt-4 mb-10" },
                react_1["default"].createElement(input_1.Input, { disabled: loading, placeholder: "Search properties...", value: search, onChange: function (e) { return setSearch(e.target.value); }, className: "max-w-xs" }),
                react_1["default"].createElement("select", { value: sortBy, onChange: function (e) { return setSortBy(e.target.value); }, className: "w-40" },
                    react_1["default"].createElement("option", { value: "createdAt" }, "Date Added"),
                    react_1["default"].createElement("option", { value: "price" }, "Price"),
                    react_1["default"].createElement("option", { value: "title" }, "Title")),
                react_1["default"].createElement("select", { value: sortOrder, onChange: function (e) { return setSortOrder(e.target.value); }, className: "w-40" },
                    react_1["default"].createElement("option", { value: "desc" }, "Descending"),
                    react_1["default"].createElement("option", { value: "asc" }, "Ascending"))),
            loading ? (react_1["default"].createElement("div", { className: "text-center flex-1 flex items-center justify-center text-lg font-semibold" },
                "Fetching properties",
                react_1["default"].createElement("span", { className: "animate-pulse" }, "..."))) : error ? (react_1["default"].createElement("div", { className: "text-center flex-1 flex flex-col items-center justify-center" },
                react_1["default"].createElement("p", { className: "text-red-500 font-semibold" }, "Failed to fetch properties."),
                react_1["default"].createElement(button_1.Button, { onClick: fetchProperties, className: "mt-4" }, "Retry"))) : (react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, properties.map(function (property) { return (react_1["default"].createElement(house_listing_card_1["default"], __assign({ key: property.id }, property, { image: getCleanImageUrl_1.getCleanImageUrl(property.mainImage || '/fallback-image.jpg') }))); }))),
            !error && (react_1["default"].createElement("div", { className: "mt-auto flex justify-center gap-2" },
                react_1["default"].createElement(button_1.Button, { onClick: function () { return setPage(function (p) { return Math.max(1, p - 1); }); }, disabled: page === 1, variant: "outline" }, "Previous"),
                react_1["default"].createElement("span", { className: "py-2 px-4" },
                    "Page ",
                    page,
                    " of ",
                    totalPages),
                react_1["default"].createElement(button_1.Button, { onClick: function () { return setPage(function (p) { return Math.min(totalPages, p + 1); }); }, disabled: page === totalPages, variant: "outline" }, "Next"))))));
}
exports["default"] = PropertyManagement;
