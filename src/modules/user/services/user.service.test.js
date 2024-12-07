"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const user_repository_1 = __importDefault(require("../repositories/fakes/user.repository"));
const user_service_1 = __importDefault(require("./user.service"));
(0, vitest_1.describe)('UserService', () => {
    (0, vitest_1.it)('should be able to create a new user', async () => {
        const fakeUserRepository = new user_repository_1.default();
        const userService = new user_service_1.default(fakeUserRepository);
        const user = await userService.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        (0, vitest_1.expect)(user).toHaveProperty('id');
    });
    (0, vitest_1.it)('should not be able to create a new user with same email from another', async () => {
        const fakeUserRepository = new user_repository_1.default();
        const userService = new user_service_1.default(fakeUserRepository);
        await userService.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        await (0, vitest_1.expect)(userService.create({
            name: 'Jane Doe',
            email: 'john.doe@example.com',
            password: 'password456',
        })).rejects.toThrow('Email already in use');
    });
});
