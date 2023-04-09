import Joi from "joi";

export const schema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]*$")).required(),
	age: Joi.number().integer().min(4).max(130).required(),
	isDeleted: Joi.boolean(),
});