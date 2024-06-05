"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./server/Server");
Server_1.server.listen(process.env.PORT || 3333, function () {
    console.log("Running... ".concat(process.env.PORT || 3333, " "));
});
