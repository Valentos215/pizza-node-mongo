"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_dev_1 = require("./keys.dev");
const keys_prod_1 = require("./keys.prod");
let keys;
if (process.env.NODE_ENV === "production") {
    keys = keys_prod_1.keysProd;
}
else {
    keys = keys_dev_1.keysDev;
}
exports.default = keys;
