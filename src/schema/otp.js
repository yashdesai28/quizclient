import * as Yup from "yup";

export const otpschema = Yup.object({
    otp:Yup.string().required('otp is required'),
})