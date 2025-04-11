export const emailValidity = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;\

export const passwordStrength = {
  weak: /^(?=.*[a-z]).{6,}$/, // Minimum 6 characters with at least one lowercase letter
  medium: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, // Minimum 6 characters with at least one lowercase and one uppercase letter
  strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>?]).{6,}$/, // Minimum 6 characters with at least one lowercase, one uppercase, one digit, and one special character
};

// import * as Yup from "yup";

// const passwordStrength = {
//   weak: /^(?=.*[a-z]).{6,}$/, // Minimum 6 characters with at least one lowercase letter
//   medium: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, // Minimum 6 characters with at least one lowercase and one uppercase letter
//   strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>?]).{6,}$/, // Minimum 6 characters with at least one lowercase, one uppercase, one digit, and one special character
// };

// export const loginSchema = Yup.object({
//   email: Yup.string().email().required("Please enter your email"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .matches(
//       passwordStrength.weak,
//       "Password is too weak, consider adding more complexity"
//     )
//     .matches(
//       passwordStrength.medium,
//       "Password should include both uppercase and lowercase letters"
//     )
//     .matches(
//       passwordStrength.strong,
//       "Password is strong! It should include at least one uppercase letter, one lowercase letter, one number, and one special character"
//     )
//     .required("Please enter your password"),
// });