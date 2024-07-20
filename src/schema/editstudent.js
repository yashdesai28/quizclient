import * as Yup from "yup";

export const editstudentschema = Yup.object({
    name:Yup.string().min(2,"First Name Must Be Atleast 2 Characters").max(25).matches(/^[A-Z][a-zA-Z]*$/, 'Numbers,special characters Not Allowed and First Letter Must Be Capital').required('First name is required'),
    email:Yup.string().email().matches(/^\d+bmiit\d+@gmail\.com$/, 'Invalid email address')
    .required('Email is required'),
    enrollment_number: Yup.string().required('Enrollment number is required').matches(/^\d{15}$/,'Exactly 15 digits are expected'),

    

})