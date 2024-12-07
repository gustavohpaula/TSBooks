"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = booksRouter;
const db_1 = require("../db");
const zod_1 = require("zod");
const crypto_1 = require("crypto");
// http
// controller
// service
// repository
// SOLID
// unit
// integration
// e2e
async function booksRouter(app) {
    app.get('/', {
        preHandler: [app.authenticate],
    }, async (request) => {
        const { id } = request.user;
        const books = await (0, db_1.knex)('books').where('user_id', id).select();
        return { books };
    });
    app.get('/:id', {
        preHandler: [app.authenticate],
    }, async (request) => {
        const { id: user_id } = request.user;
        const getBookParamsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getBookParamsSchema.parse(request.params);
        const book = await (0, db_1.knex)('books')
            .where({
            id,
            user_id,
        })
            .first();
        return { book };
    });
    app.post('/', {
        preHandler: [app.authenticate],
    }, async (request, reply) => {
        const createBookBodySchema = zod_1.z.object({
            title: zod_1.z.string(),
            genrer: zod_1.z.string(),
            author: zod_1.z.string(),
        });
        const { title, author, genrer } = createBookBodySchema.parse(request.body);
        await (0, db_1.knex)('books').insert({
            id: (0, crypto_1.randomUUID)(),
            title,
            author,
            genrer,
            user_id: request.user.id,
        });
        return reply.status(201).send();
    });
    app.put('/:id', {
        preHandler: [app.authenticate],
    }, async (request, reply) => {
        const updateBookParamsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const updateBookBodySchema = zod_1.z.object({
            title: zod_1.z.string().optional(),
            genrer: zod_1.z.string().optional(),
            author: zod_1.z.string().optional(),
        });
        const { id } = updateBookParamsSchema.parse(request.params);
        const { title, author, genrer } = updateBookBodySchema.parse(request.body);
        const { id: user_id } = request.user;
        const book = await (0, db_1.knex)('books')
            .where({ id, user_id })
            .first();
        if (!book) {
            return reply.status(404).send({ message: 'Book not found' });
        }
        await (0, db_1.knex)('books')
            .where({ id, user_id })
            .update({
            title,
            author,
            genrer
        });
        return reply.status(201).send();
    });
    app.delete('/:id', {
        preHandler: [app.authenticate],
    }, async (request, reply) => {
        const deleteBookParamsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = deleteBookParamsSchema.parse(request.params);
        const { id: user_id } = request.user;
        const book = await (0, db_1.knex)('books')
            .where({ id, user_id })
            .first();
        if (!book) {
            return reply.status(404).send({ message: 'Book not found' });
        }
        await (0, db_1.knex)('books')
            .where({ id, user_id })
            .delete();
        return reply.status(200).send({ message: 'Book deleted successfully' });
    });
}
