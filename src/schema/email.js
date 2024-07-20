import * as Yup from "yup";

export const emailschema = Yup.object({
    email:Yup.string().email().matches(/^\d+bmiit\d+@gmail\.com$/, 'Invalid email address')
    .required('Email is required'),
    
})