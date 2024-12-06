// src/utils/formValidation.ts

interface FormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export const validateForm = (values: FormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.name?.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
    errors.password = 'Password must include at least one special character.';
  }

  if (!values?.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};
