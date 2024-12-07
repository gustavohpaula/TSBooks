"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create({ name, email, password }) {
        const checkUserExists = await this.userRepository.findByEmail(email);
        if (checkUserExists) {
            throw new Error('Email already in use');
        }
        const hash = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        const user = await this.userRepository.create({
            name,
            email,
            password: hash,
        });
        return user;
    }
}
exports.default = UserService;
