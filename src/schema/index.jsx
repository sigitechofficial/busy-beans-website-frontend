import { emailValidity } from "@/utilities/authValidation";
import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email()
    .matches(emailValidity, "email must be a valid email")
    .required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});