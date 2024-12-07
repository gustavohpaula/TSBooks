"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// import { config } from 'dotenv';
//import 'dotenv/config';
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
if (process.env.NODE_ENV === 'test') {
    dotenv_1.default.config({ path: '.env.test' });
}
else {
    dotenv_1.default.config();
}
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['production', 'test', 'development']).default('production'),
    PORT: zod_1.z.coerce.number().default(3000),
    DATABASE_URL: zod_1.z.string(),
    DATABASE_CLIENT: zod_1.z.enum(['sqlite', 'pg']),
    SECRET_KEY: zod_1.z.string(),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variable!', _env);
    throw new Error('Invalid environment variable');
}
exports.env = _env.data;
