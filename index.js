const Connection = require("./src/scripts/validate");
const { getAccessToken } = require("./src/config/OAuth");
const BC = require("./src/modules/BC.v1.module");
const BCv2 = require("./src/modules/BC.v2.module");
const Api = require("./src/api/BC.api");


module.exports = { getAccessToken, Connection, BCv2, BC, Api };
