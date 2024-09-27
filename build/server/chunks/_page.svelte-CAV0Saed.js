import { c as create_ssr_component, v as validate_component } from './ssr-D8vzeGmv.js';
import { D as Datepicker, C as Cloud_download } from './datepicker-BoJtjwTJ.js';
import { E as Empty_table, C as Chevron_left, a as Chevron_right } from './empty-table-CuEobDfe.js';
import './Icon-6B7qrYG7.js';
import 'date-fns';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dataReport = [] } = $$props;
  let startDate = /* @__PURE__ */ new Date();
  let endDate = /* @__PURE__ */ new Date();
  if ($$props.dataReport === void 0 && $$bindings.dataReport && dataReport !== void 0) $$bindings.dataReport(dataReport);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<section class="space-y-6"><header class="space-y-1" data-svelte-h="svelte-rbjqif"><h2 class="text-xl font-bold">Laporan</h2> <p class="text-sm">Menampilkan laporan total penjualan per hari.</p></header> <div class="space-y-6"><div class="grid md:grid-cols-3 gap-4 md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg">${validate_component(Datepicker, "Datepicker").$$render(
      $$result,
      {
        label: "Pilih Tanggal",
        isRange: true,
        startDate,
        endDate
      },
      {
        startDate: ($$value) => {
          startDate = $$value;
          $$settled = false;
        },
        endDate: ($$value) => {
          endDate = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="input-group"><label for="status" class="input-label" data-svelte-h="svelte-1v0bzt9">Produk</label> <select name="status" class="input"><option value="" data-svelte-h="svelte-lu4184">Semua Produk</option></select></div></div> <div class="space-y-4"><div class="flex items-center space-x-4"><select name="status" class="input"><option value="10" data-svelte-h="svelte-ow94py">10 Entries</option><option value="25" data-svelte-h="svelte-ghpcca">25 Entries</option><option value="50" data-svelte-h="svelte-clndq6">50 Entries</option><option value="100" data-svelte-h="svelte-ai93ew">100 Entries</option></select> <button class="btn">${validate_component(Cloud_download, "DownloadCloud").$$render($$result, { size: 18, class: "md:mr-2" }, {}, {})} <span class="hidden md:block" data-svelte-h="svelte-1rn18gm">Ekspor ke XLSX</span></button></div> <div class="overflow-x-auto border border-neutral-700 rounded-lg"><table class="min-w-full"><thead data-svelte-h="svelte-bwcg93"><th>Tanggal</th> <th class="hidden md:table-cell">Total Transaksi</th> <th>Total Rupiah</th> <th>Total Komisi</th></thead> <tbody>${dataReport.length > 0 ? `<tr data-svelte-h="svelte-1tfhydu"><td>10/07/2024
									<dl class="lg:hidden mt-2"><dt>Total Transaksi: 50</dt></dl></td> <td class="hidden md:table-cell">50</td> <td>Rp 200.000</td> <td>Rp 10.000</td></tr>` : `<tr><td colspan="4">${validate_component(Empty_table, "EmptyTable").$$render($$result, {}, {}, {})}</td></tr>`}</tbody></table> ${dataReport.length > 0 ? `<div class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700"><span class="text-xs text-neutral-400" data-svelte-h="svelte-ltjzy1">Menampilkan halaman 1 dari 1</span> <div class="flex items-center space-x-2"><button class="p-2 rounded-full hover:bg-neutral-700 transition-all">${validate_component(Chevron_left, "ChevronLeft").$$render($$result, { size: 18 }, {}, {})}</button> <button class="p-2 rounded-full hover:bg-neutral-700 transition-all">${validate_component(Chevron_right, "ChevronRight").$$render($$result, { size: 18 }, {}, {})}</button></div></div>` : ``}</div></div></div></section>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CAV0Saed.js.map
