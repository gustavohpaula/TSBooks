"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./env");
const port = env_1.env.PORT;
const host = 'RENDER' in process.env ? '0.0.0.0' : 'localhost';
app_1.app
    .listen({
    port,
    host,
})
    .then(() => {
    console.log(`Server listening on ${port}`);
});
