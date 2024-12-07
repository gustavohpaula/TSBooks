"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('books', (table) => {
        table.text('session_id').after('id').index();
    });
}
async function down(knex) {
    await knex.schema.alterTable('books', (table) => {
        table.dropColumn('session_id');
    });
}
