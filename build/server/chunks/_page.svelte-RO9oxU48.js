import { c as create_ssr_component, v as validate_component } from './ssr-CY05hr6B.js';
import { S as Store } from './store2-BKt_dGs3.js';
import { I as Icon } from './Icon-DBe1eK66.js';

const Save = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      }
    ],
    [
      "path",
      {
        "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"
      }
    ],
    ["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "save" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="space-y-6"><header class="space-y-1" id="store" data-svelte-h="svelte-169s7a"><h2 class="text-xl font-bold">Pengaturan Toko</h2> <p class="text-sm">Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa yang Anda bagikan..</p></header> <div class="md:flex"><a href="/dashboard/store" class="btn">${validate_component(Store, "Store").$$render($$result, { class: "mr-2", size: 18 }, {}, {})}Manajemen Toko</a></div> <form method="POST" action="?/store" class="space-y-4"><h4 class="font-semibold text-red-500" data-svelte-h="svelte-f7klko">Informasi Toko</h4> <div class="grid md:grid-cols-2 gap-4" data-svelte-h="svelte-l6xj4q"><div class="input-group"><label for="store-name" class="input-label">Nama Toko</label> <input type="text" name="store-name" class="input" placeholder="Nama toko"></div> <div class="input-group"><label for="store-desc" class="input-label">Deskripsi Toko</label> <input type="text" name="store-desc" class="input" placeholder="Deskripsi toko"></div> <div class="input-group"><label for="store-email" class="input-label">Email</label> <input type="text" name="store-email" class="input" placeholder="Email toko"></div> <div class="input-group"><label for="store-phone" class="input-label">Nomor WhatsApp</label> <input type="text" name="store-phone" class="input" placeholder="Nomor whatsapp toko"></div></div> <button type="submit" class="btn btn-primary w-full md:w-auto">${validate_component(Save, "Save").$$render($$result, { class: "mr-2", size: 18 }, {}, {})}Simpan Perubahan</button></form> <form method="POST" action="?/social" class="space-y-4"><h4 class="font-semibold text-red-500" data-svelte-h="svelte-y41fw">Sosial Media</h4> <div class="grid md:grid-cols-2 gap-4" data-svelte-h="svelte-wkxpnc"><div class="input-group"><label for="store-fb" class="input-label">Facebook</label> <input type="text" name="store-fb" class="input" placeholder="fb.com/kinggaming"></div> <div class="input-group"><label for="store-ig" class="input-label">Instagram</label> <input type="text" name="store-ig" class="input" placeholder="instagram.com/kinggaming"></div> <div class="input-group"><label for="store-twitter" class="input-label">X/Twitter</label> <input type="text" name="store-twitter" class="input" placeholder="x.com/kinggaming"></div> <div class="input-group"><label for="store-tgram" class="input-label">Telegram</label> <input type="text" name="store-tgram" class="input" placeholder="t.me/6280.."></div> <div class="input-group"><label for="store-line" class="input-label">Line</label> <input type="text" name="store-line" class="input" placeholder="line.me/6280..."></div></div> <button type="submit" class="btn btn-primary w-full md:w-auto">${validate_component(Save, "Save").$$render($$result, { class: "mr-2", size: 18 }, {}, {})}Simpan Perubahan</button></form> <header class="space-y-1" id="profile" data-svelte-h="svelte-nzxifm"><h2 class="text-xl font-bold">Ubah Profil</h2> <p class="text-sm">Informasi ini bersifat rahasia, jadi berhati-hatilah dengan apa yang Anda bagikan..</p></header> <form method="POST" action="?/user" class="space-y-4"><div class="grid md:grid-cols-2 gap-4" data-svelte-h="svelte-2xr422"><div class="input-group"><label for="user-name" class="input-label">Nama</label> <input type="text" name="user-name" class="input" placeholder="Masukkan Nama Anda"></div> <div class="input-group"><label for="user-phone" class="input-label">Nomor WhatsApp</label> <input type="text" name="user-phone" class="input" placeholder="Masukkan No. WhatsApp Anda"></div> <div class="input-group"><label for="user-email" class="input-label">Email</label> <input type="text" name="user-email" class="input" placeholder="Masukkan Email Anda"></div></div> <button type="submit" class="btn btn-primary w-full md:w-auto">${validate_component(Save, "Save").$$render($$result, { class: "mr-2", size: 18 }, {}, {})}Simpan Perubahan</button></form> <header class="space-y-1" data-svelte-h="svelte-qnjeoe"><h2 class="text-xl font-bold">Ubah Kata Sandi</h2> <p class="text-sm">Pastikan Anda mengingat kata sandi baru Anda sebelum mengubahnya.</p></header> <form method="POST" action="?/password" class="space-y-4"><div class="grid md:grid-cols-2 gap-4" data-svelte-h="svelte-10amkdm"><div class="input-group"><label for="user-name" class="input-label">Password Anda</label> <input type="text" name="user-name" class="input" placeholder="Masukkan password Anda saat ini"></div> <div class="hidden md:block"></div> <div class="input-group"><label for="user-email" class="input-label">Password Baru</label> <input type="text" name="user-email" class="input" placeholder="Masukkan password baru"></div> <div class="input-group"><label for="user-email" class="input-label">Konfirmasi Password Baru</label> <input type="text" name="user-email" class="input" placeholder="Konfirmasi password baru"></div></div> <button type="submit" class="btn btn-primary w-full md:w-auto">${validate_component(Save, "Save").$$render($$result, { class: "mr-2", size: 18 }, {}, {})}Ubah Kata Sandi</button></form></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-RO9oxU48.js.map
