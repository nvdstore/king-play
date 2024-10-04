import { g as getUserById, u as updateUser, a as updatePassword } from './user-hL3JAx61.js';
import { v as validateEmail, a as validatePassword } from './validator-CpX5MQGH.js';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';
import 'bcrypt';

const load = async ({ parent }) => {
  const { user } = await parent();
  const check = await getUserById(user.idMember);
  return {
    haspass: check?.password != ""
  };
};
const actions = {
  user: async ({ locals, request }) => {
    const session = await locals.auth();
    const frmData = await request.formData();
    const name = frmData.get("user-name")?.toString() ?? "";
    const email = frmData.get("user-email")?.toString() ?? "";
    let errorBag = {};
    let valueBag = { name, email };
    if (!name) {
      errorBag.name = "Nama harus diisi";
    }
    if (!email) {
      errorBag.email = "Email harus diisi";
    } else if (!validateEmail(email)) {
      errorBag.email = "Format email salah";
    }
    if (Object.keys(errorBag).length) {
      return { user: { errors: errorBag, values: valueBag, message: "Terjadi kesalahan" } };
    }
    const { data, error } = await updateUser({
      idMember: session?.user?.id,
      name,
      email
    });
    if (error) {
      errorBag.email = error;
      return {
        user: {
          errors: errorBag,
          values: valueBag,
          message: error ?? "Terjadi kesalahan saat menyimpan data"
        }
      };
    }
    return { user: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
  },
  password: async ({ locals, request }) => {
    const session = await locals.auth();
    const check = await getUserById(session?.user?.id);
    const hasspass = check?.password != "";
    const frmData = await request.formData();
    const currpas = frmData.get("user-password")?.toString() ?? "";
    const newpass = frmData.get("user-newpass")?.toString() ?? "";
    const confirmpass = frmData.get("user-confirmpass")?.toString() ?? "";
    let errorBag = {};
    let valueBag = { currpas, newpass, confirmpass };
    if (hasspass && !currpas) {
      errorBag.currpass = "Masukkan password Anda.";
    } else if (hasspass && !validatePassword(currpas)) {
      errorBag.newpass = "Format password salah";
    }
    if (!newpass) {
      errorBag.newpass = "Masukkan password baru Anda";
    } else if (!validatePassword(newpass)) {
      errorBag.newpass = "Format password salah";
    }
    if (!confirmpass) {
      errorBag.confirmpass = "Masukkan konfirmasi password baru Anda";
    } else if (newpass != confirmpass) {
      errorBag.confirmpass = "Konfirmasi password tidak sesuai";
    }
    if (Object.keys(errorBag).length) {
      return { password: { errors: errorBag, values: valueBag, message: "Terjadi kesalahan" } };
    }
    const { data, error } = await updatePassword({
      idMember: session?.user?.id,
      password: newpass
    });
    if (error) {
      return {
        password: {
          errors: errorBag,
          values: valueBag,
          message: error ?? "Terjadi kesalahan saat menyimpan data"
        }
      };
    }
    return { password: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BenvDxB0.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/16.gPMO96MJ.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.B-0vqY2A.js","_app/immutable/chunks/index.CDqIpYcz.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.d7ZplmeP.js","_app/immutable/chunks/index.DYWfvrca.js","_app/immutable/chunks/forms.BOvHAqWF.js","_app/immutable/chunks/entry.BEL7CgLR.js","_app/immutable/chunks/store.DhXN1MmQ.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BWg40YSe.js","_app/immutable/chunks/each.DAmsSjCb.js","_app/immutable/chunks/save.C5666raO.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-BCQwxCo0.js.map
