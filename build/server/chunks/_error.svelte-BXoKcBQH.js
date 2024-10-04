import { c as create_ssr_component, s as subscribe, a as escape, v as validate_component } from './ssr-D8vzeGmv.js';
import { p as page } from './stores-Cwz-jE6o.js';
import { R as Refresh_ccw } from './refresh-ccw-C4CCmAyx.js';
import { H as House } from './house-C6OILGKB.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';
import './Icon-6B7qrYG7.js';

const css = {
  code: "h1.svelte-kh67yw{font-size:6rem}",
  map: `{"version":3,"file":"+error.svelte","sources":["+error.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nimport { ServerCrash, House, RefreshCcw } from \\"lucide-svelte\\";\\n<\/script>\\n\\n<div class=\\"flex items-center justify-center h-screen\\">\\n\\t<div class=\\"w-[400px] border rounded-2xl p-6\\">\\n\\t\\t<div class=\\"flex flex-col items-center\\">\\n\\t\\t\\t<h1 class=\\"font-medium opacity-75\\">{$page.status}</h1>\\n\\t\\t\\t<h2>Oops, Terjadi Kesalahan</h2>\\n\\t\\t\\t<h4 class=\\"text-xl mb-8\\">{$page.error?.message ?? 'Internal Server Error'}</h4>\\n\\t\\t\\t{#if $page.url.pathname == '/'}\\n\\t\\t\\t\\t<button on:click={() => window.location.reload()} class=\\"btn btn-red\\">\\n\\t\\t\\t\\t\\t<RefreshCcw size={18} class=\\"mr-2\\" />Muat Ulang\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<a href=\\"/\\" class=\\"btn btn-red\\"><House size={18} class=\\"mr-2\\" />Kembali ke Beranda</a>\\n\\t\\t\\t{/if}\\n\\t\\t\\t<p class=\\"text-sm mt-3\\">\\n\\t\\t\\t\\tButuh bantuan: <a href=\\"mailto:supprot@kingplay.id\\" class=\\"text-red-500\\">\\n\\t\\t\\t\\t\\tsupprot@kingplay.id\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t</p>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\th1 {\\n\\t\\tfont-size: 6rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA2BC,gBAAG,CACF,SAAS,CAAE,IACZ"}`
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="flex items-center justify-center h-screen"><div class="w-[400px] border rounded-2xl p-6"><div class="flex flex-col items-center"><h1 class="font-medium opacity-75 svelte-kh67yw">${escape($page.status)}</h1> <h2 data-svelte-h="svelte-5iajxc">Oops, Terjadi Kesalahan</h2> <h4 class="text-xl mb-8">${escape($page.error?.message ?? "Internal Server Error")}</h4> ${$page.url.pathname == "/" ? `<button class="btn btn-red">${validate_component(Refresh_ccw, "RefreshCcw").$$render($$result, { size: 18, class: "mr-2" }, {}, {})}Muat Ulang</button>` : `<a href="/" class="btn btn-red">${validate_component(House, "House").$$render($$result, { size: 18, class: "mr-2" }, {}, {})}Kembali ke Beranda</a>`} <p class="text-sm mt-3" data-svelte-h="svelte-fkvu4">Butuh bantuan: <a href="mailto:supprot@kingplay.id" class="text-red-500">supprot@kingplay.id</a></p></div></div> </div>`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-BXoKcBQH.js.map
