import express from 'express'

import upload from './config/multer'

import { celebrate, Joi } from 'celebrate'
import validation from './schema/validation'

import PaymentsController from './controllers/paymentsController'
import FilesController from './controllers/filesController'

const routes = express.Router()

const paymentsController = new PaymentsController()
const filesController = new FilesController()

routes.get('/payments', paymentsController.index)
routes.get('/payments/:id', paymentsController.show)

routes.post(
    '/payments',
    celebrate(validation, {
        abortEarly: false
    }),
    paymentsController.create
)

routes.put(
    '/payments/:id',
    celebrate(validation, {
        abortEarly: false
    }),
    paymentsController.update)

routes.delete('/payments/:id', paymentsController.delete)

routes.post('/file', upload.single('file'), filesController.create)

export default routes