import { Request, Response } from 'express'
import knex from '../database/connection'

class PaymentsController {
    async index(req: Request, res: Response) {
        const payments = await knex('payments').select('*')

        return res.json(payments)
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const payment = await knex('payments').where('id', id).first()

        if (!payment) {
            return res.status(400).json({ message: 'Payment not found.' })
        }

        return res.json(payment)
    }

    async create(req: Request, res: Response) {
        const {
            title,
            value,
            date,
            comment
        } = req.body

        const payment = {
            title,
            value,
            date,
            externalTax: (value * .05).toFixed(2),
            comment
        }

        await knex('payments').insert(payment)

        return res.json(payment)
    }

    async update(req: Request, res: Response) {
        const { id } = req.params

        const {
            title,
            value,
            date,
            comment
        } = req.body

        const payment = {
            title,
            value,
            date,
            externalTax: (value * .05).toFixed(2),
            comment
        }

        await knex('payments').where('id', id).update(payment)

        return res.json(payment)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        await knex('payments').where('id', id).delete()

        return res.json(`Item ${id} deletado com sucesso!`)
    }
}

export default PaymentsController