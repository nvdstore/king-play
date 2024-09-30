import { r as redirect } from './index-DzcLzHBX.js';
import { v as validateEmail, c as checkDomain } from './validator-CNGUo1jv.js';
import { c as createStore } from './store-8a_gaJzG.js';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth();
    const body = await request.formData();
    const name = body.get("name")?.toString();
    const desc = body.get("desc")?.toString();
    const email = body.get("email")?.toString();
    const phone = body.get("phone")?.toString();
    const domain = body.get("domain")?.toString();
    const domainType = body.get("domain-type")?.toString();
    let errorBag = {};
    let valueBag = {
      name,
      desc,
      email,
      phone,
      domain,
      domainType
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
      errorBag.phone = "Nomor handphone harus diisi";
    }
    if (!domain || !domain) {
      errorBag.domain = "Domain harus diisi";
    }
    const subdomain = `${domain}${domainType}`;
    if (!checkDomain(subdomain)) {
      errorBag.domain = "Format Domain salah";
    }
    if (Object.keys(errorBag).length) {
      return { errors: errorBag, values: valueBag };
    }
    const storeData = {
      memberId: session?.user?.id,
      name,
      description: desc ?? "",
      email,
      phone,
      domain: subdomain
    };
    const { error } = await createStore(storeData);
    if (error) {
      errorBag.message = error ?? "Terjadi kesalahan";
      return { errors: errorBag, values: valueBag };
    }
    return redirect(307, "/dashboard");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BhUPCW_T.js')).default;
const server_id = "src/routes/(member)/(dashboard)/onboarding/+page.server.ts";
const imports = ["_app/immutable/nodes/18.C0fYdVbR.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js","_app/immutable/chunks/index.CbVfT7vS.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.CY_U3FVi.js","_app/immutable/chunks/index.B4FbLfrC.js","_app/immutable/chunks/entry.CAuGH5yM.js","_app/immutable/chunks/forms.ovepNqXh.js","_app/immutable/chunks/client.DFS3CJhQ.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/crown.CDQ7V0b7.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.QrzoY6PX.js","_app/immutable/chunks/each.MhIJo3BG.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-CurMJ8yI.js.map
