import { c as create_ssr_component, b as add_attribute } from './ssr-D8vzeGmv.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let confirmEmail;
  return `<form class="space-y-6"><header class="space-y-1.5 text-center md:text-left" data-svelte-h="svelte-ov9di7"><h4 class="text-2xl font-medium">Lupa Kata Sandi</h4> <p class="text-sm">Masukkan alamat Email Anda, dan kami akan mengirimkan link untuk Reset Kata Sandi Anda.</p></header> <section class="space-y-4"><div class="input-group w-full"><label for="email" class="input-label" data-svelte-h="svelte-rx7s2m">Email</label> <input name="email" class="input" type="email" placeholder="Masukkan Email Anda"${add_attribute("value", email, 0)}></div> <div class="input-group w-full"><label for="confirm-email" class="input-label" data-svelte-h="svelte-1ontm1s">Konfirmasi Email</label> <input name="confirm-email" class="input" type="email" placeholder="Konfirmasi Email Anda"${add_attribute("value", confirmEmail, 0)}></div> <button class="btn btn-primary w-full" type="submit" data-svelte-h="svelte-p95eca">Kirim Link</button> <a href="/auth/login" class="btn btn-outline" data-svelte-h="svelte-g64hi0">Masuk</a></section></form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Dr1eKl_W.js.map
