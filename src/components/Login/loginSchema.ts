import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Z]/, 'First name must start with a capital letter')
    .matches(/^[a-zA-Z]+$/, 'First name must contain only English characters')
    .min(3, 'First name should be at least 3 characters long')
    .max(20, 'First name should be at most 20 characters long')
    .required('Name is required'),
  surname: yup
    .string()
    .matches(/^[A-Z]/, 'Surname must start with a capital letter')
    .matches(/^[a-zA-Z]+$/, 'Surname must contain only English characters')
    .min(3, 'Surname should be at least 4 characters long')
    .max(20, 'Surname should be at most 20 characters long')
    .required('Surname is required'),
});
