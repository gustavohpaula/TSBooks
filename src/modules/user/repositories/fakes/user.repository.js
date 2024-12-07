"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class UserRepository {
    constructor() {
        this.users = [];
    }
    async create({ name, email, password }) {
        const user = { id: (0, crypto_1.randomUUID)(), name, email, password };
        this.users.push(user);
        return user;
    }
    async findByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        return user;
    }
}
exports.default = UserRepository;
