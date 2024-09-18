let private_env = {};
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
  private_env = environment;
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}

export { public_env as a, set_private_env as b, set_public_env as c, set_safe_public_env as d, private_env as p, safe_public_env as s };
//# sourceMappingURL=shared-server-DWgAsK3Q.js.map
