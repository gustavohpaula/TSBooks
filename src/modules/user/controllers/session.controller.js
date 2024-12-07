"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const user_respository_1 = __importDefault(require("../repositories/user.respository"));
const authenticate_user_service_1 = __importDefault(require("../services/authenticate-user.service"));
class SessionController {
    async create(request, reply) {
        const sessionSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6),
        });
        const { email, password } = sessionSchema.parse(request.body);
        const authenticateUserService = new authenticate_user_service_1.default(new user_respository_1.default(), request.jwt);
        const token = await authenticateUserService.authenticate({
            email,
            password,
        });
        reply.cookie('access_token', token, {
            path: '/',
            httpOnly: true,
            secure: true,
        });
        return { accessToken: token };
    }
}
exports.default = SessionController;
