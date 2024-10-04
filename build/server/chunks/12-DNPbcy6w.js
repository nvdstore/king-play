import { g as getTransactions, a as getResumeTrx } from './transactions-CPciDDPa.js';
import './db-Dt_6_ZQU.js';
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
  const resume = await getResumeTrx(session?.user?.id);
  return {
    transactions,
    total: count,
    limit,
    resume
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5v7ZH2rJ.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/12.D1xxtDR0.js","_app/immutable/chunks/scheduler.DDK_FMqP.js","_app/immutable/chunks/index.CLy-O5qq.js","_app/immutable/chunks/stores.CW4ATsLg.js","_app/immutable/chunks/entry.eGK5Mmx5.js","_app/immutable/chunks/index.zbdKov3I.js","_app/immutable/chunks/transaction-list.C1tei_YA.js","_app/immutable/chunks/each.CMQ7KCsU.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/empty-table.BYabzZfH.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BGFqZV4V.js","_app/immutable/chunks/chevron-right.D4H97Ea6.js","_app/immutable/chunks/clock.DPecC3uq.js","_app/immutable/chunks/refresh-ccw.yf2Tgo07.js"];
const stylesheets = ["_app/immutable/assets/12.4UcaflNZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-DNPbcy6w.js.map
