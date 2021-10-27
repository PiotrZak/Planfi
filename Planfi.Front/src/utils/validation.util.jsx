export const validationUtil = {
  validateRequiredField,
  validateAllRequiredFields,
  validateInput,
  validateEmail,
  validatePassword,
  runSetErrors,
  validatePhone,
  runValidateOnSubmit,
};

const phoneValidationMessage = 'Telephone number should be correct';

// regex from org.hibernate.validator.constraints.impl.EmailValidator
const ATOM = "[a-z0-9!#$%&'*+/=?^_`{|}~-]";
const DOMAIN = `(${ATOM}+(\\.${ATOM}+)*`;
const IP_DOMAIN = '\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\]';
const REGEX = `^${ATOM}+(\\.${ATOM}+)*@${DOMAIN}|${IP_DOMAIN})$`;
const PASSWORD_REGEX = '^(?=.*[A-Za-z])(?=.*\\d)([a-zA-Z0-9@\\$=!:.#%]){6,}$';
const PHONE_REGEX = '/^[0-9()-]+$/';

function validateRequiredField(name, validationErrors, requiredFields, form) {
  if (requiredFields.includes(name) && !form[name]) {
    validationErrors[name] = 'This field is required';
  } else {
    delete validationErrors[name];
  }
  return validationErrors;
}

function validateAllRequiredFields(requiredFields, form) {
  const errorFields = {};
  requiredFields.map((field) => {
    if (!form[field]) {
      errorFields[field] = `This ${field} is required`;
    } else {
      delete errorFields[field];
    }
    return field;
  });
  return errorFields;
}

function validateEmail(email) {
  const errorField = {};
  if (email && !email.match(REGEX)) {
    errorField.email = 'Email is invalid';
    return errorField.email;
  }
}

function validatePassword(password) {
  const errorField = {};
  if (password && !password.match(PASSWORD_REGEX)) {
    errorField.password = 'Password must contain at least 6 characters including one number and one letter';
    return errorField.password;
  }
}

function validateInput(e, validatedForm, errors, validationFunction) {
  const { name } = e.target;
  const val = e.target.value;
  validatedForm[name] = val;
  const currentErrors = { ...errors };
  if (validationFunction(val)) {
    currentErrors[name] = validationFunction(val);
  } else {
    delete currentErrors[name];
  }
  return {
    currentErrors,
    validatedForm,
  };
}

function runSetErrors(name, setErrors, errors, requiredFields, data) {
  setErrors(
    validationUtil.validateRequiredField(
      name,
      { ...errors },
      requiredFields,
      data,
    ),
  );
}

function runValidateOnSubmit(setErrors, errors, requiredFields, data) {
  const currentErrors = validationUtil.validateAllRequiredFields(
    requiredFields,
    data,
  );

  setErrors({ ...errors, ...currentErrors });
  if (
    Object.getOwnPropertyNames(currentErrors).length === 0
    && Object.getOwnPropertyNames(errors).length === 0
  ) {
    return true;
  }
}

// todo make phone validation
function validatePhone(phone) {
  const errorField = {};
  if (phone && !phone.match(PHONE_REGEX)) {
    errorField.phone = phoneValidationMessage;
    return errorField.phone;
  }
}

export default validationUtil;
