import { Joi } from 'celebrate'

const Validation = {
    body: Joi.object().keys({
        title: Joi.string().min(5).max(100).required(),
        value: Joi.number().precision(2).required(),
        date: Joi.string().isoDate().required(),
        comment: Joi.string().optional().allow('')
    })
}

export default Validation