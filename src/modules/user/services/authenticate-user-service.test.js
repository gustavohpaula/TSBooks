"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const user_repository_1 = __importDefault(require("../repositories/fakes/user.repository"));
const fake_1 = __importDefault(require("../provider/jwt/fake"));
const authenticate_user_service_1 = __importDefault(require("./authenticate-user.service"));
const user_service_1 = __importDefault(require("./user.service"));
let authenticateUserService;
let jwt;
let userRepository;
let userService;
(0, vitest_1.describe)('AuthenticateUserService', () => {
    (0, vitest_1.beforeEach)(() => {
        jwt = new fake_1.default();
        userRepository = new user_repository_1.default();
        userService = new user_service_1.default(userRepository);
        authenticateUserService = new authenticate_user_service_1.default(userRepository, jwt);
    });
    // DRY Don't repeat yourself
    (0, vitest_1.it)('should be able to authenticate', async () => {
        const user = await userService.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        const result = await authenticateUserService.authenticate({
            email: user.email,
            password: 'password123',
        });
        (0, vitest_1.expect)(result).toBe('your-jwt-token');
    });
    (0, vitest_1.it)('should not be able to authenticate with non existing user', async () => {
        (0, vitest_1.expect)(authenticateUserService.authenticate({
            email: 'john.doe@example',
            password: 'password123',
        })).rejects.toThrow('Invalid email or password');
    });
    (0, vitest_1.it)('should not be able to authenticate with incorrect password', async () => {
        const user = await userService.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        (0, vitest_1.expect)(authenticateUserService.authenticate({
            email: user.email,
            password: 'password12',
        })).rejects.toThrow('Invalid email or password');
    });
});
