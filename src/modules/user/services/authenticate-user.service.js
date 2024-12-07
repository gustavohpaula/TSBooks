"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthenticateUserService {
    constructor(userRepository, jwt) {
        this.userRepository = userRepository;
        this.jwt = jwt;
    }
    async authenticate({ password, email, }) {
        const user = await this.userRepository.findByEmail(email);
        const isMatch = user && (await bcrypt_1.default.compare(password, user.password));
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const token = this.jwt.sign(payload);
        return token;
    }
}
exports.default = AuthenticateUserService;
