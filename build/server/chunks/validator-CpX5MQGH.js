function validateEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
function checkDomain(domain) {
  return /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/.test(
    domain
  );
}
function validatePassword(password) {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return passwordRegex.test(password);
}

export { validatePassword as a, checkDomain as c, validateEmail as v };
//# sourceMappingURL=validator-CpX5MQGH.js.map
