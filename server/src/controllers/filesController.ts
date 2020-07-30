import { Request, Response } from 'express'
import knex from '../database/connection'

class FilesController {
    async create(request: Request, response: Response) {
        return response.json('Sucesso')
    }
}

export default FilesController