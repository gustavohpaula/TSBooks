"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('books', (table) => {
        table.uuid('user_id').index();
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
    });
}
async function down(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.dropForeign('user_id');
        table.dropColumn('user_id');
    });
}
