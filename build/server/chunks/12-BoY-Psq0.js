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
const component = async () => component_cache ??= (await import('./_page.svelte-DPradU-z.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/12.DKdNg_-z.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.B-0vqY2A.js","_app/immutable/chunks/stores.Bff2IPOf.js","_app/immutable/chunks/entry.BEL7CgLR.js","_app/immutable/chunks/index.DYWfvrca.js","_app/immutable/chunks/transaction-list.DqjFhoLj.js","_app/immutable/chunks/each.DAmsSjCb.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/empty-table.YdeDD9pJ.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BWg40YSe.js","_app/immutable/chunks/chevron-right.CeidWwH6.js","_app/immutable/chunks/clock.CKDdOqe7.js"];
const stylesheets = ["_app/immutable/assets/12.4UcaflNZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-BoY-Psq0.js.map
