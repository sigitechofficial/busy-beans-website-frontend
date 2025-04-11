import * as Yup from "yup";

const passwordStrength = {
  weak: /^(?=.*[a-z]).{6,}$/,
  medium: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>?]).{8,}$/,
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
      "Password is medium strength, consider using uppercase letters"
    )
    .matches(passwordStrength.strong, "Password is strong, good job!")
    .required("Please enter your password"),
});
