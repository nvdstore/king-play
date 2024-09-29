import { r as redirect } from './index-DzcLzHBX.js';
import { v as validateEmail, c as checkDomain } from './validator-CNGUo1jv.js';
import { c as createStore } from './store-DkaSSJZX.js';
import './db-BEDA57LU.js';
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

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BhUPCW_T.js')).default;
const server_id = "src/routes/(dashboard)/onboarding/+page.server.ts";
const imports = ["_app/immutable/nodes/17.DPg4B4s7.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js","_app/immutable/chunks/index.D1J_exWT.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.BajuDz0G.js","_app/immutable/chunks/index.BQ1UVc3K.js","_app/immutable/chunks/entry.CwivGntT.js","_app/immutable/chunks/forms.B1FCSI44.js","_app/immutable/chunks/client.tt94ja3m.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/crown.BcGhwUv-.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.zC-8_Prq.js","_app/immutable/chunks/each.tx5UTMWu.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-DDqpK_om.js.map
