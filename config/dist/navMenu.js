"use strict";
exports.__esModule = true;
exports.navbarMenuAuth = exports.navbarMenu = void 0;
exports.navbarMenu = [
    { label: 'rent', href: '/property-listing' },
    { label: 'buy', href: '/buy' },
    {
        label: 'manage property',
        href: '#',
        dropdown: [
            { label: 'Property Management', href: '/property-management' },
            { label: 'Landlord Resources', href: '/landlord' }
        ]
    },
    {
        label: 'about',
        href: '/about'
        // dropdown: [
        //   { label: 'Our Story', href: '/our-story' },
        //   { label: 'Team', href: '/team' },
        //   { label: 'Careers', href: '/careers' }
        // ]
    }
    // { label: 'blog', href: '#' }
];
exports.navbarMenuAuth = [
    { label: 'login', href: '/login' },
    { label: 'sign up', href: '/login' }
];
