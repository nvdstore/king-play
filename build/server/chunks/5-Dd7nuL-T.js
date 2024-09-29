import { e as error } from './index-DzcLzHBX.js';
import { g as getClientIp, B as BASE_API_URL } from './request-qZghsHO2.js';
import { addDays } from 'date-fns';
import { c as createSession } from './user-CrEk0Zen.js';
import { a as getStoreByDomain } from './store-DkaSSJZX.js';
import 'fs';
import 'crypto';
import 'nanoid';
import './db-BEDA57LU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

const themes = {
  dark: {
    main: "bg-gradient-to-b from-slate-800 to-slate-900 text-neutral-50",
    nav: "bg-gradient-to-b from-slate-700/75 to-slate-800/75 border-b border-slate-700 backdrop-blur-md",
    footer: "border-t border-slate-700",
    bgColor: "bg-slate-800",
    bgColorSecondary: "bg-slate-700/75",
    color: "text-neutral-50",
    border: "border-slate-600",
    button: "btn btn-slate",
    input: "px-2.5 h-10 bg-slate-700/50 border border-slate-600 focus:border-slate-600 rounded-lg outline-none text-sm",
    card: "bg-slate-800 border border-slate-700 rounded-xl",
    cardButton: "bg-slate-700/50 border border-slate-600 rounded-lg outline-none",
    cardButtonActive: "bg-slate-700/75 rounded-lg outline-none transition-all"
  },
  light: {
    main: "bg-neutral-50 text-slate-800",
    nav: "bg-neutral-100/75 border-b border-neutral-200 backdrop-blur-md",
    footer: "border-t border-neutral-200",
    bgColor: "bg-neutral-100",
    bgColorSecondary: "bg-neutral-200",
    color: "text-slate-800",
    border: "border-neutral-300",
    button: "btn btn-slate text-neutral-50",
    input: "px-2.5 h-10 bg-neutral-100/75 border border-neutral-300 focus:border-neutral-400 rounded-lg outline-none text-sm",
    card: "bg-neutral-100/75 md:border border-neutral-200 rounded-xl",
    cardButton: "border border-neutral-300 rounded-lg outline-none text-sm",
    cardButtonActive: "rounded-lg border-neutral-800 outline-none text-sm"
  }
};
const ID_MASTER = "1000001";
const UUID_KEY = "uuid";
const load = async ({ fetch, url, cookies, request }) => {
  let idMember = ID_MASTER;
  let store;
  let host = url.hostname;
  if (host == "localhost") {
    host = "jelogaming.kingplay.id";
  }
  const storeData = await getStoreByDomain(host);
  if (storeData && storeData.id_member) {
    idMember = storeData.id_member;
    store = {
      idMember: storeData.id_member,
      name: storeData.name,
      description: storeData.description,
      phone: storeData.phone,
      email: storeData.email,
      domain: storeData.custom_domain ?? storeData.domain,
      logo: storeData.logo,
      promo: [],
      info: {
        fb: storeData.fb,
        tiktok: storeData.tiktok,
        ig: storeData.ig,
        telegram: storeData.telegram,
        twitter: storeData.twitter
      }
    };
  } else {
    error(404, "Store Not Found");
  }
  let userId = cookies.get(UUID_KEY);
  if (!userId) {
    const ip = await getClientIp();
    const expires = addDays(/* @__PURE__ */ new Date(), 1);
    userId = crypto.randomUUID();
    const { data: data2, error: error2 } = await createSession({
      userId: store.idMember,
      sessionToken: userId,
      expires,
      type: "user",
      host,
      ip,
      deviceInfo: request.headers.get("user-agent") ?? ""
    });
    if (error2 == null) {
      cookies.set(UUID_KEY, userId, {
        path: "/",
        domain: host == "localhost" ? "" : host,
        secure: true,
        expires,
        httpOnly: true
      });
    }
  }
  const getTheme = url.searchParams.get("theme");
  let dataTheme = getTheme ?? "light";
  let dataColor = "blue";
  const color = dataColor ?? "";
  const theme = themes[dataTheme ?? "light"];
  let games = [];
  const response = await fetch(new URL("/v1.0/api/produk/list-group-produk", BASE_API_URL).href);
  if (!response.ok) {
    throw error(500, `HTTP Error status: ${response.status}`);
  }
  const data = await response.json();
  if (data.response_code != "00") {
    throw error(500, `Error get games: ${data.response_message}`);
  }
  const item = data.response_data;
  if (item.length > 0) {
    games = item.map(
      (game) => ({
        id: game.id_group_produk,
        name: game.nama_group_produk,
        image: game.img,
        slug: game.slug
      })
    );
  } else {
    games = [];
  }
  const popularGames = games.slice(0, 3);
  return {
    color,
    theme,
    store,
    games,
    popularGames,
    isMaster: idMember == ID_MASTER
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-cFBerBbG.js')).default;
const server_id = "src/routes/(homepage)/+layout.server.ts";
const imports = ["_app/immutable/nodes/5.B7kEY68D.js","_app/immutable/chunks/scheduler.4YBzcwTj.js","_app/immutable/chunks/index.BNFUcRFq.js","_app/immutable/chunks/each.tx5UTMWu.js","_app/immutable/chunks/index.D1J_exWT.js","_app/immutable/chunks/swiper-element-bundle.DIkDjTNm.js","_app/immutable/chunks/general.BYefm5Bk.js","_app/immutable/chunks/index.BQ1UVc3K.js","_app/immutable/chunks/x.DX6qtAec.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.zC-8_Prq.js","_app/immutable/chunks/crown.BcGhwUv-.js"];
const stylesheets = ["_app/immutable/assets/5.B5i__Hu-.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-Dd7nuL-T.js.map
