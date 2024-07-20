import * as Yup from "yup";

export const loginschema = Yup.object({
    email:Yup.string().email().matches(/^\d+bmiit\d+@gmail\.com$/, 'Invalid email address')
    .required('Email is required'),
    password:Yup.string().matches(/^[a-zA-Z0-9]{5,9}$/,'Invalid password').required('Password is required')
})