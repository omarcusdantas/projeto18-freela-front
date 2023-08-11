import * as yup from 'yup';

export const schemaService = yup.object().shape({
    categoryId: yup.number().integer().required(),
    title: yup.string().max(20).required(),
    description: yup.string().required(),
    image: yup.string().url().required(),
    price: yup.number().min(0).required(),
});