"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const node_child_process_1 = require("node:child_process");
const app_1 = require("../src/app");
(0, vitest_1.describe)('Books routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.beforeEach)(() => {
        (0, node_child_process_1.execSync)('yarn knex migrate:rollback --all');
        (0, node_child_process_1.execSync)('yarn knex migrate:latest');
    });
    (0, vitest_1.it)('should be able to create a new book', async () => {
        const response = await (0, supertest_1.default)(app_1.app.server).post('/books').send({
            title: 'Test Book',
            author: 'Test Author',
            genrer: 'Test Genre',
        });
        (0, vitest_1.expect)(response.status).toBe(201);
    });
    (0, vitest_1.describe)('GET/books', () => {
        (0, vitest_1.it)('should be able to list all books', async () => {
            const book = {
                title: 'Test Book 2',
                author: 'Test Author 2',
                genrer: 'Test Genre 2',
            };
            const createBookResponse = await (0, supertest_1.default)(app_1.app.server)
                .post('/books')
                .send(book);
            const cookies = createBookResponse.get('Set-Cookie') ?? [];
            const listBooksResponse = await (0, supertest_1.default)(app_1.app.server)
                .get('/books')
                .set('Cookie', cookies)
                .expect(200);
            (0, vitest_1.expect)(listBooksResponse.body.books).toEqual([
                vitest_1.expect.objectContaining(book),
            ]);
        });
        (0, vitest_1.it)('should retur status 401 when there is not cookies', async () => {
            const listBooksResponse = await (0, supertest_1.default)(app_1.app.server).get('/books');
            (0, vitest_1.expect)(listBooksResponse.status).toBe(401);
        });
    });
    (0, vitest_1.it)('should be able to get a specific book', async () => {
        const book = {
            title: 'Test Book 2',
            author: 'Test Author 2',
            genrer: 'Test Genre 2',
        };
        const createBookResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/books')
            .send(book);
        const cookies = createBookResponse.get('Set-Cookie') ?? [];
        const listBooksResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/books')
            .set('Cookie', cookies)
            .expect(200);
        const bookId = listBooksResponse.body.books[0].id;
        const getBookResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/books/${bookId}`)
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(getBookResponse.body.book).toEqual(vitest_1.expect.objectContaining(book));
    });
    (0, vitest_1.it)('should be able to edit a specific book', async () => {
        const book = {
            title: 'Original Title',
            author: 'Original Author',
            genrer: 'Original Genre',
        };
        const createBookResponse = await (0, supertest_1.default)(app_1.app.server).post('/books').send(book);
        const cookies = createBookResponse.get('Set-Cookie') ?? [];
        const listBooksResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/books')
            .set('Cookie', cookies)
            .expect(200);
        const bookId = listBooksResponse.body.books[0].id;
        const updatedBook = {
            title: 'Updated Title',
            author: 'Updated Author',
            genrer: 'Updated Genre',
        };
        const updateBookResponse = await (0, supertest_1.default)(app_1.app.server)
            .put(`/books/${bookId}`)
            .set('Cookie', cookies)
            .send(updatedBook);
        await (0, vitest_1.expect)(updateBookResponse.status).toBe(200);
        const getUpdatedBookResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/books/${bookId}`)
            .set('Cookie', cookies)
            .expect(200);
        await (0, vitest_1.expect)(getUpdatedBookResponse.body.book).toEqual(vitest_1.expect.objectContaining(updatedBook));
    });
    (0, vitest_1.it)('should be able to delete a specific book', async () => {
        const book = {
            title: 'To Be Deleted',
            author: 'Author To Be Deleted',
            genrer: 'Genre To Be Deleted',
        };
        const createBookResponse = await (0, supertest_1.default)(app_1.app.server).post('/books').send(book);
        const cookies = createBookResponse.get('Set-Cookie') ?? [];
        const listBooksResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/books')
            .set('Cookie', cookies)
            .expect(200);
        const bookId = listBooksResponse.body.books[0].id;
        const deleteBookResponse = await (0, supertest_1.default)(app_1.app.server)
            .delete(`/books/${bookId}`)
            .set('Cookie', cookies);
        await (0, vitest_1.expect)(deleteBookResponse.status).toBe(200);
        const getDeletedBookResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/books/${bookId}`)
            .set('Cookie', cookies);
        await (0, vitest_1.expect)(getDeletedBookResponse.status).toBe(404);
    });
});
