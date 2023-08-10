import * as yup from 'yup';

export const schemaSignup = yup.object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    phone: yup.string().length(11).matches(/^\d+$/).required(),
    password: yup.string().min(4).required(),
    state: yup.string().length(2).matches(/^[A-Za-z]{2}$/).required(),
    city: yup.string().required(),
    cep: yup.string().length(8).matches(/^\d+$/).required(),
});