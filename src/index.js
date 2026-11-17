/**
 * parv-quickvalidate
 * Small, dependency-free validation helpers.
 */

export function isRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function isEmail(value) {
  if (typeof value !== "string") return false;
  const email = value.trim();
  if (email.length > 254) return false;
  // Practical format check, not proof that the mailbox exists.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function isStrongPassword(value, options = {}) {
  if (typeof value !== "string") return false;
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSymbol = true
  } = options;

  if (value.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(value)) return false;
  if (requireLowercase && !/[a-z]/.test(value)) return false;
  if (requireNumber && !/[0-9]/.test(value)) return false;
  if (requireSymbol && !/[^A-Za-z0-9]/.test(value)) return false;
  return true;
}

export function isIndianMobile(value) {
  if (typeof value !== "string" && typeof value !== "number") return false;
  const digits = String(value).replace(/[\s-]/g, "").replace(/^\+91/, "");
  return /^[6-9]\d{9}$/.test(digits);
}

export function isUrl(value) {
  if (typeof value !== "string" || value.trim() === "") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isNumeric(value) {
  if (typeof value !== "string" && typeof value !== "number") return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return Number.isFinite(Number(value));
}

export function isAlphanumeric(value) {
  return typeof value === "string" && /^[a-z0-9]+$/i.test(value);
}

export function validatePassword(value, options = {}) {
  const checks = {
    minLength: typeof value === "string" && value.length >= (options.minLength ?? 8),
    uppercase: options.requireUppercase === false || (typeof value === "string" && /[A-Z]/.test(value)),
    lowercase: options.requireLowercase === false || (typeof value === "string" && /[a-z]/.test(value)),
    number: options.requireNumber === false || (typeof value === "string" && /[0-9]/.test(value)),
    symbol: options.requireSymbol === false || (typeof value === "string" && /[^A-Za-z0-9]/.test(value))
  };
  return {
    valid: Object.values(checks).every(Boolean),
    checks,
    score: Object.values(checks).filter(Boolean).length
  };
}
