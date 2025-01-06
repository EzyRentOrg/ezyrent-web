"use strict";
var _a;
exports.__esModule = true;
exports.renderContent = void 0;
// src/helpers/contentRenderer.ts (or .tsx if you need JSX)
var link_1 = require("next/link");
exports.renderContent = function (content) {
    var _a;
    // Handle privacy policy links
    if (content.includes('Privacy Policy')) {
        var parts = content.split('Privacy Policy');
        return ((_a = { parts: parts }, _a[0] = , _a)
            < link_1["default"]);
        href = "/privacy-policy";
        className = "text-blue-500 underline" >
            Privacy;
        Policy
            < /Link>;
        {
            parts[1];
        }
        />;
    }
};
;
// Handle email links
if (content.includes('support@ezrent.ng')) {
    var parts = content.split('support@ezrent.ng');
    return ((_a = { parts: parts }, _a[0] = , _a)
        < a);
    href = "mailto:support@ezrent.ng";
    className = "text-blue-500 underline" >
        support;
    /a>;
    {
        parts[1];
    }
    />;
    ;
}
return content;
;
