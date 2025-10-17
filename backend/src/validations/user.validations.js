import Joi from "joi";


export const updateValidation = Joi.object({
    edad: Joi.number()
    .min(18)
    .required()
    .messages({
        "number.base": "la edad debe ser un numero",
        "number.integer": "la edad debe ser un numero entero",
        "number.min": "la edad no puede ser negativa",
        "any.required": "la edad es obligatoria"
    }),
    email: Joi.string()
    .email()
    .required()
    .messages({
        "string.email":"el correo debe ser valido",
        "string.empty":"el correo no puede quedar vacio", 
    }),
    password: Joi.string()
    .required()
    .messages({
        "string.empty": "la contraseña no debe dde estar vacio",
        "any.required":"la contraseña es obligatoria"
    })
})
export default { updateValidation}
