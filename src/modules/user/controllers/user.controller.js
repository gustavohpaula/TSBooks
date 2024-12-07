"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const user_service_1 = __importDefault(require("../services/user.service"));
const user_respository_1 = __importDefault(require("../repositories/user.respository"));
class UserController {
    async create(request, reply) {
        const createUserSchema = zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string().email({}),
            password: zod_1.z.string().min(6),
        });
        const { name, password, email } = createUserSchema.parse(request.body);
        const userService = new user_service_1.default(new user_respository_1.default());
        const user = await userService.create({ name, password, email });
        return reply.status(201).send(user);
    }
}
exports.default = UserController;
