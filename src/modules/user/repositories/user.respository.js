"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const db_1 = require("../../../db");
class UserRepository {
    async create({ name, email, password }) {
        const user = await (0, db_1.knex)('users')
            .insert({
            id: (0, crypto_1.randomUUID)(),
            name,
            email,
            password,
        })
            .returning(['id', 'name', 'email', 'created_at']);
        return user[0];
    }
    async findByEmail(email) {
        const user = await (0, db_1.knex)('users').where('email', email).first();
        return user;
    }
}
exports.default = UserRepository;
