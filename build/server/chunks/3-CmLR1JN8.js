import { e as error, r as redirect } from './index-DzcLzHBX.js';
import { a as getStoreByMember } from './store-8a_gaJzG.js';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async ({ url, locals, parent }) => {
  const { masterHost } = await parent();
  if (!masterHost) {
    error(404);
  }
  const session = await locals.auth();
  const pathname = url.pathname;
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
    if (!session?.user) {
      return redirect(307, "/auth/login");
    }
    const store2 = await getStoreByMember(session?.user?.id);
    if (!pathname.startsWith("/onboarding") && !store2) {
      return redirect(307, "/onboarding");
    } else if (pathname.startsWith("/onboarding") && store2) {
      return redirect(307, "/dashboard");
    }
  }
  if (pathname.startsWith("/auth") && session?.user) {
    return redirect(307, "/dashboard");
  }
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-BMn6Ue9x.js')).default;
const server_id = "src/routes/(member)/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.Cgse4ehR.js","_app/immutable/chunks/scheduler.BBfqLarD.js","_app/immutable/chunks/index.BP6FsQ8L.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-CmLR1JN8.js.map
