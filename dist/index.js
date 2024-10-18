"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
app_1.app.listen(config_1.CONFIG.PORT, () => {
    console.log('...server started in port ' + config_1.CONFIG.PORT);
});
