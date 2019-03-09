export const passwordValidationItems = [
  {
    label: '9 characters',
    regex: /.{9,}/,
  },
  {
    label: '1 Uppercase letter',
    regex: /[A-Z]/,
  },
  {
    label: '1 Lowercase letter',
    regex: /[a-z]/,
  },
  {
    label: '1 Number',
    regex: /[0-9]/,
  },
  {
    label: '1 Special character',
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
  }
];

export const passwordValidationRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)(?=.{9,})/;