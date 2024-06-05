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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/', function (_, res) {
    return res.send('Hello World!');
});
router.post('/:id', function (req, res) {
    var concatenatedData = __assign(__assign({}, req.params), req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(concatenatedData);
});
