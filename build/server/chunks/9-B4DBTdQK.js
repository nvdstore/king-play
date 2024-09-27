import bcrypt from 'bcrypt';
import { U as User } from './user-D-QeBYML.js';
import { v as validateEmail } from './validator-CNGUo1jv.js';
import './db-ooFhjDSf.js';
import './environment-DWgAsK3Q.js';
import 'pg';

const actions = {
  default: async ({ request }) => {
    const body = await request.formData();
    const name = body.get("name")?.toString();
    const email = body.get("email")?.toString();
    const password = body.get("password")?.toString();
    const confirmPassword = body.get("confirm-password")?.toString();
    const terms = body.get("terms")?.toString();
    let errorBag = {};
    let valueBag = {
      name,
      email,
      password,
      confirmPassword,
      terms: terms ? true : false
    };
    if (!name) {
      errorBag.name = "Nama harus diisi";
    }
    if (!email) {
      errorBag.email = "Email harus diisi";
    } else if (!validateEmail(email.toString())) {
      errorBag.email = "Format email salah";
    }
    if (!password) {
      errorBag.password = "Password harus diisi";
    }
    if (!confirmPassword) {
      errorBag.confirmPassword = "Konfirmasi password harus diisi";
    } else if (password != confirmPassword) {
      errorBag.confirmPassword = "Konfirmasi password tidak cocok";
    }
    if (!terms) {
      errorBag.terms = "Untuk melanjutkan, Anda harus menyetujui kebijakan kami";
    }
    if (Object.keys(errorBag).length) {
      return { errors: errorBag, values: valueBag };
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const payload = {
      name,
      email,
      password: hashPassword,
      emailVerified: null
    };
    const { data, error } = await User.createUser(payload);
    if (error || !data) {
      errorBag.message = error ?? "Terjadi kesalahan saat melakukan registrasi";
      return { errors: errorBag, values: valueBag };
    }
    return { errors: errorBag, values: valueBag };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BQ1oaJZK.js')).default;
const server_id = "src/routes/(dashboard)/auth/register/+page.server.ts";
const imports = ["_app/immutable/nodes/9.Cxj5sf9C.js","_app/immutable/chunks/scheduler.BocGr1Ux.js","_app/immutable/chunks/index.BQZXa2CZ.js","_app/immutable/chunks/client.iMzeGs7Z.js","_app/immutable/chunks/entry.C0XtXUXW.js","_app/immutable/chunks/index.Ark2ieeu.js","_app/immutable/chunks/index.D13n4St3.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.BDAuhtBU.js","_app/immutable/chunks/forms.BOIfvtUl.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-B4DBTdQK.js.map
