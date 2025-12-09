import joi from 'joi';
export const realproduct = joi.object({
    id: joi.number().required(),
    name: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().required(),

}); 