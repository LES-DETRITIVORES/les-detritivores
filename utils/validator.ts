export class Validator {
  constructor() {}
  isEmail(email: string): boolean {
    const lemme =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return lemme.test(String(email).toLowerCase());
  }
  isEmpty(value: string): boolean {
    if (value === undefined || value === null || value === "") {
      return true;
    }
    return false;
  }
  isPhone(phone: string): boolean {
    const lemme = /^[0-9]{10}$/;
    return lemme.test(String(phone).toLowerCase());
  }

  checkForm(form: [], rules: []): boolean {
    let isValid = true;
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        if (rules[key] === "email") {
          if (!this.isEmail(form[key])) {
            isValid = false;
          }
        }
        if (rules[key] === "required") {
          if (this.isEmpty(form[key])) {
            isValid = false;
          }
        }
      }
    }
    return isValid;
  }
  isValid(value: string, rules: any): boolean {
    let valid = true;
    if (rules.required) {
      valid = valid && !this.isEmpty(value);
    }
    if (rules.minLength) {
      valid = valid && value.length >= rules.minLength;
    }
    if (rules.maxLength) {
      valid = valid && value.length <= rules.maxLength;
    }
    if (rules.isEmail) {
      valid = valid && this.isEmail(value);
    }
    return valid;
  }
}
