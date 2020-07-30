import express from 'express'

import upload from './config/multer'

import { celebrate, Joi } from 'celebrate'

import PaymentsController from './controllers/paymentsController'
import FilesController from './controllers/filesController'

const routes = express.Router()

const paymentsController = new PaymentsController()
const filesController = new FilesController()

routes.get('/payments', paymentsController.index)
routes.get('/payments/:id', paymentsController.show)

routes.post(
    '/payments',
    celebrate({
        body: Joi.object().keys({
            title: Joi.string().min(5).max(100).required(),
            value: Joi.number().precision(2).required(),
            date: Joi.string().isoDate().required(),
            comment: Joi.string().optional().allow('')
        })
    }, {
        abortEarly: false
    }),
    paymentsController.create
)

routes.put(
    '/payments/:id',
    celebrate({
        body: Joi.object().keys({
            title: Joi.string().min(5).max(100).required(),
            value: Joi.number().precision(2).required(),
            date: Joi.string().isoDate().required(),
            comment: Joi.string().optional().allow('')
        })
    }, {
        abortEarly: false
    }),
    paymentsController.update)

routes.delete('/payments/:id', paymentsController.delete)

routes.post('/file', upload.single('file'), filesController.create)

export default routes