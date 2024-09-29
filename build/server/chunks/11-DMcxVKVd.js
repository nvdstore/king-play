import { g as getTransactions } from './transactions-DYWTDf_D.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';
import 'date-fns';

const load = async ({ locals, url }) => {
  const session = await locals.auth();
  const limit = 10;
  const page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;
  const { count, data: transactions } = await getTransactions({
    idMember: session?.user?.id?.toString(),
    startDate: /* @__PURE__ */ new Date(),
    endDate: /* @__PURE__ */ new Date(),
    limit,
    offset: limit * page
  });
  return {
    transactions,
    total: count,
    limit
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D9UCrfFJ.js')).default;
const server_id = "src/routes/(dashboard)/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/11.DdBqE-qK.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js","_app/immutable/chunks/stores.DO0B0Jqy.js","_app/immutable/chunks/entry.CwivGntT.js","_app/immutable/chunks/index.BQ1UVc3K.js","_app/immutable/chunks/transaction-list.g9UQ6_ob.js","_app/immutable/chunks/each.tx5UTMWu.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/empty-table.CuB-elXv.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.zC-8_Prq.js","_app/immutable/chunks/clock.x8SrJwgu.js"];
const stylesheets = ["_app/immutable/assets/11.4UcaflNZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-DMcxVKVd.js.map
