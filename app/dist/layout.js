"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var font_1 = require("@/lib/font");
var utils_1 = require("@/lib/utils");
var google_1 = require("@react-oauth/google");
var sonner_1 = require("sonner");
var metadata_1 = require("@/lib/metadata");
require("./globals.css");
exports.metadata = metadata_1.generateMetadata({
    title: 'Home',
    description: 'Welcome to EzyRent',
    path: ''
});
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: utils_1.cn(font_1.dmSans.className, 'flex flex-col min-h-screen bg-white') },
            React.createElement(google_1.GoogleOAuthProvider, { clientId: "214122998362-8gc20qq486bsnigkugj7fh09du0dm9hm.apps.googleusercontent.com" },
                React.createElement("main", null, children),
                React.createElement(sonner_1.Toaster, { richColors: true })))));
}
exports["default"] = RootLayout;
