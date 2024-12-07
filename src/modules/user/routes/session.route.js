"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoute = sessionRoute;
const session_controller_1 = __importDefault(require("../controllers/session.controller"));
const sessionController = new session_controller_1.default();
async function sessionRoute(app) {
    app.post('/', sessionController.create);
}
