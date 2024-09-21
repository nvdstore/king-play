import { r as redirect } from './index-DzcLzHBX.js';
import { S as Store } from './store-DgD9K3hN.js';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const load = async (events) => {
  const session = await events.locals.auth();
  const pathname = events.url.pathname;
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
    if (!session?.user) {
      return redirect(307, "/auth/login");
    }
    const store = await Store.getStoreByMember(session.user.id);
    if (!pathname.startsWith("/onboarding") && !store) {
      return redirect(307, "/onboarding");
    } else if (pathname.startsWith("/onboarding") && store) {
      return redirect(307, "/dashboard");
    }
  }
  if (pathname.startsWith("/auth") && session?.user) {
    return redirect(307, "/dashboard");
  }
  return {
    session
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-DbI9ROBW.js')).default;
const server_id = "src/routes/(dashboard)/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.B2ZQ_SdM.js","_app/immutable/chunks/8.4XKJvd4g.js","_app/immutable/chunks/index.BrjDpy8l.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-Dl0V8bDz.js.map
