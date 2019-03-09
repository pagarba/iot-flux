export const encapsulateEmail = (email) => {
  const split = email.split('@');
  return `${split[0].replace(/(?!^)(.)(?!$)/g, '*')}@${split[1]}`;
};