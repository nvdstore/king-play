import { u as updateStore, b as updateStoreInfo } from './store-8a_gaJzG.js';
import { v as validateEmail } from './validator-CNGUo1jv.js';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const actions = {
  store: async ({ request, locals }) => {
    const session = await locals.auth();
    const frmData = await request.formData();
    const name = frmData.get("store-name")?.toString();
    const desc = frmData.get("store-desc")?.toString();
    const email = frmData.get("store-email")?.toString();
    const phone = frmData.get("store-phone")?.toString();
    const theme = frmData.get("store-theme")?.toString() ?? "light";
    const color = frmData.get("store-color")?.toString() ?? "blue";
    let errorBag = {};
    let valueBag = {
      name,
      desc,
      email,
      phone,
      theme,
      color
    };
    if (!name) {
      errorBag.name = "Nama harus diisi";
    }
    if (!email) {
      errorBag.email = "Email harus diisi";
    } else if (!validateEmail(email.toString())) {
      errorBag.email = "Format email salah";
    }
    if (!phone) {
      errorBag.phone = "Nomor harus diisi";
    }
    if (Object.keys(errorBag).length) {
      return { store: { errors: errorBag, values: valueBag, message: "Terjadi kesalahan" } };
    }
    const { data, error } = await updateStore({
      memberId: session?.user?.id,
      name,
      description: desc ?? "",
      email,
      phone,
      theme,
      color
    });
    if (error) {
      return {
        store: { errors: {}, values: valueBag, message: "Terjadi kesalahan saat menyimpan data" }
      };
    }
    return { store: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
  },
  social: async ({ locals, request }) => {
    const session = await locals.auth();
    const frmData = await request.formData();
    const tiktok = frmData.get("store-tiktok")?.toString() ?? "";
    const fb = frmData.get("store-fb")?.toString() ?? "";
    const ig = frmData.get("store-ig")?.toString() ?? "";
    const twitter = frmData.get("store-twitter")?.toString() ?? "";
    const telegram = frmData.get("store-telegram")?.toString() ?? "";
    let valueBag = {
      tiktok,
      fb,
      ig,
      twitter,
      telegram
    };
    const { data, error } = await updateStoreInfo({
      memberId: session?.user?.id,
      tiktok,
      fb,
      ig,
      twitter,
      telegram
    });
    if (error) {
      return {
        social: { errors: {}, values: valueBag, message: "Terjadi kesalahan saat menyimpan data" }
      };
    }
    return { social: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DsThWp1J.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/store/+page.server.ts";
const imports = ["_app/immutable/nodes/17.-ps_iEhl.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js","_app/immutable/chunks/index.CbVfT7vS.js","_app/immutable/chunks/forms.ovepNqXh.js","_app/immutable/chunks/entry.CAuGH5yM.js","_app/immutable/chunks/index.B4FbLfrC.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.CY_U3FVi.js","_app/immutable/chunks/save.Cq5lqbEs.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.QrzoY6PX.js","_app/immutable/chunks/each.MhIJo3BG.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-C4xBUili.js.map
