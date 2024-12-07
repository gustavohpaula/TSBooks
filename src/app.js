"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const books_1 = require("./routes/books");
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const user_route_1 = require("./modules/user/routes/user.route");
const session_route_1 = require("./modules/user/routes/session.route");
const env_1 = require("./env");
const check_user_authentication_1 = require("./modules/user/middlewares/check-user-authentication");
exports.app = (0, fastify_1.default)();
// plugins
exports.app.register(jwt_1.default, {
    secret: env_1.env.SECRET_KEY,
});
exports.app.register(cookie_1.default);
// Decorators
exports.app.decorate('authenticate', check_user_authentication_1.checkUserAuthentication);
// Routes
exports.app.addHook('preHandler', async (req, res) => {
    req.jwt = exports.app.jwt;
});
exports.app.register(session_route_1.sessionRoute, { prefix: '/session' });
exports.app.register(user_route_1.userRoute, { prefix: '/users' });
exports.app.register(books_1.booksRouter, { prefix: '/books' });
