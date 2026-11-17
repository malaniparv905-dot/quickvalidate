# parv-quickvalidate

A tiny, dependency-free JavaScript toolkit for common form validations.

## Install

```bash
npm install parv-quickvalidate
```

## Usage

```js
import {
  isEmail,
  isStrongPassword,
  isIndianMobile,
  isUrl,
  isRequired,
  validatePassword
} from "parv-quickvalidate";

console.log(isEmail("hello@example.com")); // true
console.log(isStrongPassword("Parv@12345")); // true
console.log(isIndianMobile("+919876543210")); // true
console.log(isUrl("https://example.com")); // true
console.log(isRequired("hello")); // true

console.log(validatePassword("Parv@12345"));
// { valid: true, checks: { ... }, score: 5 }
```

## API

| Function | Purpose |
| --- | --- |
| `isRequired(value)` | Rejects null, undefined, blank strings and empty arrays |
| `isEmail(value)` | Practical email-format check |
| `isStrongPassword(value, options?)` | Checks password length and character requirements |
| `isIndianMobile(value)` | Checks a 10-digit Indian mobile number, optionally prefixed with +91 |
| `isUrl(value)` | Accepts valid HTTP and HTTPS URLs |
| `isNumeric(value)` | Checks whether a value can be represented as a finite number |
| `isAlphanumeric(value)` | Checks strings containing only letters and digits |
| `validatePassword(value, options?)` | Returns individual checks, validity and a score out of 5 |

### Password options

```js
isStrongPassword("mypassword", {
  minLength: 8,
  requireUppercase: false,
  requireLowercase: true,
  requireNumber: false,
  requireSymbol: false
});
```

All options are optional. Defaults require at least 8 characters, uppercase, lowercase, a number and a symbol.

## Important notes

- Email validation checks syntax only; it cannot confirm that an inbox exists.
- Password checks are basic client-side guidance, not a replacement for secure server-side authentication.
- Phone validation is specifically for Indian mobile number formats.

## Development

```bash
npm test
```

## License

MIT
