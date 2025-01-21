"use strict";
exports.__esModule = true;
exports.propertyFormSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.signUpSchema = void 0;
var zod_1 = require("zod");
exports.signUpSchema = zod_1.z
    .object({
    email: zod_1.z
        .string({
        required_error: 'Please enter a valid email address.'
    })
        .email(),
    password: zod_1.z.string({
        required_error: 'Please enter a password.'
    }),
    confirmPassword: zod_1.z.string({
        required_error: 'Please confirm your password.'
    })
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    path: ['confirmPassword'],
    message: 'Passwords must match.'
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Please enter a valid email address.'
    })
        .email()
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Please enter a valid email address.'
    })
        .email()
});
exports.resetPasswordSchema = zod_1.z
    .object({
    password: zod_1.z.string({
        required_error: 'Please enter a password.'
    }),
    confirmPassword: zod_1.z.string({
        required_error: 'Please confirm your password.'
    })
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    path: ['confirmPassword'],
    message: 'Passwords must match.'
});
//  property form validation
exports.propertyFormSchema = zod_1.z.object({
    address: zod_1.z
        .string()
        .min(1, 'Address is required')
        .max(150, 'Address must be less than 150 characters'),
    description: zod_1.z
        .string()
        .min(1, 'Description is required')
        .max(1500, 'Description must be less than 1500 characters'),
    price: zod_1.z
        .string()
        .min(1, 'Price is required')
        .refine(function (val) { return !isNaN(Number(val)); }, 'Price must be a valid number'),
    duration: zod_1.z["enum"](['1 year', '2 years', '3 years'], {
        required_error: 'Please select a duration'
    }),
    images: zod_1.z
        .array(zod_1.z.string())
        .min(1, 'At least one image is required')
        .max(7, 'Maximum 7 images allowed'),
    buildingType: zod_1.z["enum"](['apartment', 'shortlet', 'flat', 'hotel', 'condo'], {
        required_error: 'Please select a building type'
    }),
    beds: zod_1.z["enum"](['1 bed', '2 beds', '3 beds', '4 beds', '5+ beds'], {
        required_error: 'Please select number of beds'
    }),
    baths: zod_1.z["enum"](['1 bath', '2 baths', '3 baths', '4 baths', '5+ baths'], {
        required_error: 'Please select number of baths'
    }),
    amenities: zod_1.z.array(zod_1.z["enum"]([
        'Gym',
        'POP Ceiling',
        'Water Treatment',
        'Security',
        'Parking Space',
        'Spacious Compound',
        '24/7 Electricity',
        'Supermarket Nearby',
        'Swimming Pool',
        'Fast Internet',
        'Restaurants Nearby',
        'Free WiFi'
    ])),
    error: zod_1.z.string().nullable()
});
