
export const validationUtil = {
  validateRequiredField,
  validateAllRequiredFields,
  validateInput,
  validateEmail,
  validatePassword
};
// regex from org.hibernate.validator.constraints.impl.EmailValidator
const ATOM = "[a-z0-9!#$%&'*+/=?^_`{|}~-]";
const DOMAIN = "(" + ATOM + "+(\\." + ATOM + "+)*";
const IP_DOMAIN = "\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\]";
const REGEX =
  "^" + ATOM + "+(\\." + ATOM + "+)*@" + DOMAIN + "|" + IP_DOMAIN + ")$";
const PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)([a-zA-Z0-9@\\$=!:.#%]){6,}$";

function validateRequiredField(name, validationErrors, requiredFields, form) {
  if (requiredFields.includes(name) && !form[name]) {
    validationErrors[name] = "This field is required";
  } else {
    delete validationErrors[name];
  }
  return validationErrors;
}

function validateAllRequiredFields(requiredFields, form) {
  let errorFields = {};
  requiredFields.map((field) => {
    if (!form[field]) {
      errorFields[field] = `This ${field} is required`;
    }
    else {
      delete errorFields[field];
    }
    return field;
  });
  return errorFields;
}

function validateEmail(email) {
  let errorField = {};
  if (email && !email.match(REGEX)) {
    errorField['email'] = `Email is invalid`;
    return errorField['email']
  }
}

function validatePassword(password) {
  let errorField = {};
  if (password && !password.match(PASSWORD_REGEX)) {
    errorField['password'] = "Password must contain at least 6 characters including one number and one letter";
    return errorField['password']
  }
}

function validateInput(e, validatedForm, errors, validationFunction) {
  let name = e.target.name;
  let val = e.target.value;
  validatedForm[name] = val;
  let currentErrors = { ...errors };
  if (validationFunction(val)) {
    currentErrors[name] = validationFunction(val);
  } else {
    delete currentErrors[name];
  }
  return {
    currentErrors: currentErrors,
    validatedForm: validatedForm
  };
}
export default validationUtil;
