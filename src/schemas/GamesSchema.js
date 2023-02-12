import joi from 'joi';

export const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().not(null).positive().required(),
    pricePerDay: joi.number().not(null).positive().required(),
});

