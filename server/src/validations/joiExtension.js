import expValidator from 'express-validator'
import sanitizeHtml from 'sanitize-html'
import BaseJoi from 'joi'

const extension = (joi) => ({
type: 'string',
base: joi.string(),
message: {
    'string.escapeHTML': '{{#label}} must not include HTML!'
},
rules: {
    escapeHTML: {
        validate(value, helper) {
            const clean = sanitizeHtml(value, {
                allowedTags:[],
                allowedAttributes: {},
            });
            if(clean != value) return helper.error('string.escapeHTML', {value});
            return clean;
        }
    }
}
})

export default Joi = BaseJoi.extend(extension)