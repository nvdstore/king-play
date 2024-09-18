const themes = {
  dark: {
    main: "bg-gradient-to-b from-slate-800 to-slate-900 text-neutral-50",
    nav: "bg-gradient-to-b from-slate-700/75 to-slate-800/75 border-b border-slate-700 backdrop-blur-md",
    footer: "border-t border-slate-700",
    bgColor: "bg-slate-800",
    bgColorSecondary: "bg-slate-700/50",
    color: "text-neutral-50",
    border: "border-slate-600",
    button: "btn btn-slate",
    input: "px-2.5 h-10 bg-slate-700/50 border border-slate-600 focus:border-slate-600 rounded-lg outline-none text-sm",
    card: "bg-slate-800 border border-slate-700 rounded-xl",
    cardButton: "px-2.5 bg-slate-700/50 border border-slate-600 rounded-lg outline-none",
    cardButtonActive: "px-2.5 bg-slate-700/75 rounded-lg outline-none transition-all"
  },
  light: {
    main: "bg-neutral-50 text-slate-800",
    nav: "bg-neutral-100/75 border-b border-neutral-200 backdrop-blur-md",
    bgColor: "bg-neutral-100",
    bgColorSecondary: "bg-neutral-200",
    color: "text-slate-800",
    border: "border-neutral-300",
    button: "btn btn-slate text-neutral-50",
    input: "px-2.5 h-10 bg-neutral-100/75 border border-neutral-300 focus:border-neutral-400 rounded-lg outline-none text-sm",
    card: "bg-neutral-100/75 border border-neutral-200 rounded-xl",
    cardButton: "px-2.5 border border-neutral-300 rounded-lg outline-none text-sm",
    cardButtonActive: "px-2.5 rounded-lg outline-none text-sm"
  }
};
const load = async ({ url }) => {
  const getTheme = url.searchParams.get("theme");
  let dataTheme = getTheme ?? "dark";
  let dataColor = "yellow";
  const color = dataColor ?? "";
  const theme = themes[dataTheme ?? "dark"];
  let games = [
    {
      id: 1,
      slug: "honor-of-kings",
      name: "Honor of Kings",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/db/37/63/db376320-c37b-c8c8-05bc-578ace590ad8/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp"
    },
    {
      id: 2,
      slug: "mobile-legends",
      name: "Mobile Legends",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/81/1d/2b/811d2b5e-eda1-b4a2-5fd9-1736dd04c9ae/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp"
    },
    {
      id: 3,
      slug: "pokemon-go",
      name: "Pokemon GO",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6b/ca/c9/6bcac96a-ba65-d71c-ac59-079e28853b83/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp"
    }
  ];
  const popularGames = [
    {
      id: 1,
      slug: "honor-of-kings",
      name: "Honor of Kings",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/db/37/63/db376320-c37b-c8c8-05bc-578ace590ad8/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp"
    },
    {
      id: 2,
      slug: "mobile-legends",
      name: "Mobile Legends",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/81/1d/2b/811d2b5e-eda1-b4a2-5fd9-1736dd04c9ae/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/230x0w.webp"
    },
    {
      id: 3,
      slug: "pokemon-go",
      name: "Pokemon GO",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6b/ca/c9/6bcac96a-ba65-d71c-ac59-079e28853b83/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp"
    }
  ];
  return {
    color,
    theme,
    games,
    popularGames
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-I5b3t7Zc.js')).default;
const server_id = "src/routes/(homepage)/+layout.server.ts";
const imports = ["_app/immutable/nodes/5.Cg5-lR1e.js","_app/immutable/chunks/8.D6-lxqIh.js","_app/immutable/chunks/index.qVoW8Mvc.js","_app/immutable/chunks/each.BYqwBxiO.js","_app/immutable/chunks/index.DELV8H0S.js","_app/immutable/chunks/swiper-element-bundle.DIkDjTNm.js","_app/immutable/chunks/crown.Ci8VROjV.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.DnJzLTTh.js","_app/immutable/chunks/x.DmcRsZrL.js"];
const stylesheets = ["_app/immutable/assets/5.B5i__Hu-.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-B3aP10Yd.js.map
