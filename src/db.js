"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.knexConfig = void 0;
const knex_1 = require("knex");
const env_1 = require("./env");
exports.knexConfig = {
    client: env_1.env.DATABASE_CLIENT,
    connection: env_1.env.DATABASE_CLIENT === 'sqlite'
        ? {
            filename: env_1.env.DATABASE_URL,
        }
        : env_1.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
};
exports.knex = (0, knex_1.knex)(exports.knexConfig);
