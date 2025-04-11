import * as Yup from "yup";

const passwordStrength = {
  weak: /^(?=.*[a-z]).{6,}$/, 
  medium: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 
  strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>?]).{6,}$/, 
};

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      passwordStrength.weak,
      "Password is too weak, consider adding more complexity"
    )
    .matches(
      passwordStrength.medium,
      "Password is medium! It should include both uppercase and lowercase letters"
    )
    .matches(
      passwordStrength.strong,
      "Password is strong! It should include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Please enter your password"),
});
