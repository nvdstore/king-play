import { c as create_ssr_component, b as add_attribute } from './ssr-D8vzeGmv.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let password;
  let confirmPassword;
  return `<form class="space-y-6"><header class="space-y-1.5 text-center md:text-left" data-svelte-h="svelte-11nk759"><h4 class="text-2xl font-medium">Ubah Kata Sandi</h4> <p class="text-sm">Masukkan Kata Sandi baru untuk merubah Kata Sandi Anda.</p></header> <section class="space-y-4"><div class="input-group w-full"><label for="password" class="input-label" data-svelte-h="svelte-1u44sht">Kata Sandi Baru</label> <input name="password" class="input" type="password" placeholder="Masukkan Kata Sandi Anda"${add_attribute("value", password, 0)}></div> <div class="input-group w-full"><label for="confirm-password" class="input-label" data-svelte-h="svelte-ddnrfx">Konfirmasi Kata Sandi Baru</label> <input name="confirm-password" class="input" type="password" placeholder="Konfirmasi Kata Sandi Baru Anda"${add_attribute("value", confirmPassword, 0)}></div> <button class="btn btn-primary w-full" type="submit" data-svelte-h="svelte-9q1zgm">Ubah Kata Sandi</button></section></form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-D676rLbN.js.map
