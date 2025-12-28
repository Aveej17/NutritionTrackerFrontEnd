export const PASSWORD_RULES = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  special: /[@$!%*?&]/,
};

export const validatePassword = (password: string) => {
  if (!password) return null;

  if (password.length < PASSWORD_RULES.minLength) {
    return 'Password must be at least 8 characters';
  }
  if (!PASSWORD_RULES.uppercase.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!PASSWORD_RULES.lowercase.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!PASSWORD_RULES.number.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!PASSWORD_RULES.special.test(password)) {
    return 'Password must contain at least one special character';
  }

  return null;
};
