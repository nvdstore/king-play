import { c as create_ssr_component, v as validate_component, e as each, b as add_attribute, a as escape } from './ssr-CY05hr6B.js';
import { D as Datepicker, C as Cloud_download, E as Empty_table, a as Chevron_left, b as Chevron_right } from './empty-table-tQvTBxO5.js';

const Transaction_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const statusItem = [
    { value: "wait", label: "Menunggu" },
    {
      value: "process",
      label: "Sedang diproses"
    },
    { value: "done", label: "Selesai" },
    { value: "cancel", label: "Dibatalkan" },
    { value: "fail", label: "Gagal" }
  ];
  let { hideFilter = false } = $$props;
  let { data = ["hehe"] } = $$props;
  let startDate = /* @__PURE__ */ new Date();
  let endDate = /* @__PURE__ */ new Date();
  let search = "";
  if ($$props.hideFilter === void 0 && $$bindings.hideFilter && hideFilter !== void 0) $$bindings.hideFilter(hideFilter);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="space-y-6">${!hideFilter ? `<div class="grid md:grid-cols-3 gap-4 md:bg-neutral-800 md:border md:border-neutral-700 md:p-4 md:rounded-lg">${validate_component(Datepicker, "Datepicker").$$render(
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
    )} <div class="input-group"><label for="status" class="input-label" data-svelte-h="svelte-35wqu0">Status Transaksi</label> <select name="status" class="input"><option value="" data-svelte-h="svelte-1i38ern">Semua Transaksi</option>${each(statusItem, (item) => {
      return `<option${add_attribute("value", item.value, 0)}>${escape(item.label)}</option>`;
    })}</select></div> <div class="input-group"><label for="search" class="input-label" data-svelte-h="svelte-5eq6ht">Pencarian</label> <input type="text" class="input" name="search" placeholder="Cari data transaksi"${add_attribute("value", search, 0)}></div></div>` : ``} <div class="space-y-4">${!hideFilter ? `<div class="flex items-center space-x-4"><select name="status" class="input"><option value="10" data-svelte-h="svelte-ow94py">10 Entries</option><option value="25" data-svelte-h="svelte-ghpcca">25 Entries</option><option value="50" data-svelte-h="svelte-clndq6">50 Entries</option><option value="100" data-svelte-h="svelte-ai93ew">100 Entries</option></select> <button class="btn">${validate_component(Cloud_download, "DownloadCloud").$$render($$result, { size: 18, class: "md:mr-2" }, {}, {})} <span class="hidden md:block" data-svelte-h="svelte-1rn18gm">Ekspor ke XLSX</span></button></div>` : ``} <div class="overflow-x-auto border border-neutral-700 rounded-lg"><table class="min-w-full"><thead data-svelte-h="svelte-ioj0b4"><th>Invoice Number</th> <th class="hidden lg:table-cell">ID Transaksi</th> <th class="hidden lg:table-cell">Produk</th> <th>Harga</th> <th class="hidden md:table-cell">Tanggal</th> <th>Status</th></thead> <tbody>${data.length > 0 ? `<tr data-svelte-h="svelte-1pnwir7"><td>WHE-2q383928
								<dl class="lg:hidden mt-2"><dt>#203029302</dt><dt class="mb-1">Mobile Legends 20 Diamond</dt><dt class="md:hidden text-xs text-neutral-400">Tgl: 10/06/2024</dt></dl></td> <td class="hidden lg:table-cell">203029302</td> <td class="hidden lg:table-cell">Mobile Legends 20 Diamond</td> <td>Rp20.000</td> <td class="hidden md:table-cell">10/06/2024</td> <td>Sukses</td></tr>` : `<tr><td colspan="6">${validate_component(Empty_table, "EmptyTable").$$render($$result, { description: "Belum ada data transaksi" }, {}, {})}</td></tr>`}</tbody></table> ${data.length > 0 ? `<div class="flex items-center justify-between px-6 py-2 border-t border-t-neutral-700"><span class="text-xs text-neutral-400" data-svelte-h="svelte-ltjzy1">Menampilkan halaman 1 dari 1</span> <div class="flex items-center space-x-2"><button class="p-2 rounded-full hover:bg-neutral-700 transition-all">${validate_component(Chevron_left, "ChevronLeft").$$render($$result, { size: 18 }, {}, {})}</button> <button class="p-2 rounded-full hover:bg-neutral-700 transition-all">${validate_component(Chevron_right, "ChevronRight").$$render($$result, { size: 18 }, {}, {})}</button></div></div>` : ``}</div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Transaction_list as T };
//# sourceMappingURL=transaction-list-IQEqRAYL.js.map
