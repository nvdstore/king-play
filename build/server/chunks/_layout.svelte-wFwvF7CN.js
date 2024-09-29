import { c as create_ssr_component } from './ssr-D8vzeGmv.js';

const css = {
  code: "body{--tw-bg-opacity:1;background-color:rgb(23 23 23 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(250 250 250 / var(--tw-text-opacity))\n}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<svelte:head>\\n\\t<title>Dashboard KingPlay</title>\\n</svelte:head>\\n\\n<slot />\\n\\n<style>\\n\\t:global(body) {\\n    --tw-bg-opacity: 1;\\n    background-color: rgb(23 23 23 / var(--tw-bg-opacity));\\n    --tw-text-opacity: 1;\\n    color: rgb(250 250 250 / var(--tw-text-opacity))\\n}\\n</style>\\n"],"names":[],"mappings":"AAOS,IAAM,CACX,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CACtD,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC;AACpD"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1022o89_START -->${$$result.title = `<title>Dashboard KingPlay</title>`, ""}<!-- HEAD_svelte-1022o89_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-wFwvF7CN.js.map
