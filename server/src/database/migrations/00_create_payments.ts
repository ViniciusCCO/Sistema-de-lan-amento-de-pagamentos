import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('payments', table => {
        table.increments('id').primary()
        table.string('title', 100).notNullable()
        table.float('value', 2).notNullable()
        table.string('date').notNullable()
        table.float('externalTax', 2).notNullable()
        table.string('comment')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('payments')
}