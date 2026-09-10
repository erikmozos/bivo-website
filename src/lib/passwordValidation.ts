/** Misma regla que `ValidationService.password` en bivo-app-new. */
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_SPECIAL_CHARS = "@$!%*?&";

export function isSignupPasswordValid(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}

export function getPasswordRequirementChecks(password: string) {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };
}
