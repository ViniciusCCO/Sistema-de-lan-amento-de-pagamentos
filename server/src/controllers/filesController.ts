import { Request, Response } from 'express'
import knex from '../database/connection'
// @ts-ignore
import readXlsxFile from 'read-excel-file/node'
import schema from '../schema/file'
import path from 'path'

interface Payment {
    title: String
    date: Date
    value: Number
    comment: String
}

class FilesController {
    async create(request: Request, response: Response) {
        const payments = new Array()

        // @ts-ignore
        await readXlsxFile(path.resolve(__dirname, '..', '..', 'temp', request.file.filename), { schema }).then(({ rows, errors }) => {
            if (errors.length == 0) {
                rows.map((row: Payment) => {
                    const {
                        title,
                        value,
                        date,
                        comment = ''
                    } = row

                    payments.push({
                        title,
                        value,
                        date: date.toISOString(),
                        externalTax: (Number(value) * .05).toFixed(2),
                        comment
                    })
                })
            } else {
                return response.status(400).json(errors)
            }
        })

        try {
            await knex('payments').insert(payments)

            return response.json(payments)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}

export default FilesController