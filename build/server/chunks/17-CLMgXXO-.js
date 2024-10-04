import { b as getMemberFees, c as getAllProduct, u as updateStore, s as setFeeDefault, d as setFee, e as deleteFee, f as updateStoreInfo } from './store-BcfelaBj.js';
import { v as validateEmail } from './validator-CpX5MQGH.js';
import fs from 'fs';
import './db-Dt_6_ZQU.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';

async function upload(params) {
  try {
    if (params.file.size > 0) {
      const dirName = params.dirname ? `/upload/${params.dirname}` : "/upload";
      if (!fs.existsSync(`static${dirName}`)) {
        fs.mkdirSync(`static${dirName}`);
      }
      const fileName = `${dirName}/${params.filename ?? params.file.name}`;
      fs.writeFileSync(`static${fileName}`, Buffer.from(await params.file.arrayBuffer()));
      return fileName;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const load = async ({ parent }) => {
  const { user } = await parent();
  const { fees, defaultFee } = await getMemberFees(user.idMember);
  const feeList = fees?.map(
    (fee) => ({
      memberId: fee.id_member,
      productId: fee.id_produk,
      product: `${fee.nama_group_produk} - ${fee.produk}`,
      fee: fee.fee_member
    })
  );
  const products = await getAllProduct();
  return {
    fees: feeList ?? [],
    defaultFee,
    products
  };
};
const actions = {
  store: storeAction,
  setdefault: setfeeDefaultAction,
  setfee: setfeeAction,
  deletefee: deletefeeAction,
  social: socialAction
};
async function storeAction(event) {
  const session = await event.locals.auth();
  const frmData = await event.request.formData();
  const name = frmData.get("store-name")?.toString();
  const desc = frmData.get("store-desc")?.toString();
  const email = frmData.get("store-email")?.toString();
  const phone = frmData.get("store-phone")?.toString();
  const theme = frmData.get("store-theme")?.toString() ?? "light";
  const color = frmData.get("store-color")?.toString() ?? "blue";
  const logo = frmData.get("store-logo");
  let errorBag = {};
  let valueBag = {
    name,
    desc,
    email,
    phone,
    theme,
    color
  };
  if (!name) {
    errorBag.name = "Nama harus diisi";
  }
  if (!email) {
    errorBag.email = "Email harus diisi";
  } else if (!validateEmail(email.toString())) {
    errorBag.email = "Format email salah";
  }
  if (!phone) {
    errorBag.phone = "Nomor harus diisi";
  }
  if (logo.size > 0 && !logo.type.match("image/")) {
    errorBag.logo = "Format file salah";
  }
  if (Object.keys(errorBag).length) {
    return { store: { errors: errorBag, values: valueBag, message: "Input salah, periksa form" } };
  }
  const filename = await upload({ file: logo, dirname: session?.user?.id });
  const { data, error } = await updateStore({
    memberId: session?.user?.id,
    name,
    description: desc ?? "",
    email,
    phone,
    theme,
    color,
    logo: filename ?? void 0
  });
  if (error) {
    return {
      store: { errors: {}, values: valueBag, message: "Terjadi kesalahan saat menyimpan data" }
    };
  }
  return { store: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
}
async function setfeeDefaultAction(event) {
  const session = await event.locals.auth();
  const frmData = await event.request.formData();
  const fee = frmData.get("fee-nominal")?.toString() ?? "";
  let errorBag = {};
  let valueBag = { fee };
  if (!fee || Number(fee) <= 0) {
    errorBag.fee = "Nominal harus diisi";
  }
  if (Object.keys(errorBag).length) {
    return {
      feedefault: { errors: errorBag, values: valueBag, message: "Input salah, periksa form" }
    };
  }
  const { data, error } = await setFeeDefault({
    memberId: session?.user?.id,
    amount: Number(fee)
  });
  if (error) {
    return {
      feedefault: { errors: {}, values: valueBag, message: "Terjadi kesalahan saat menyimpan data" }
    };
  }
  return { feedefault: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
}
async function setfeeAction(event) {
  const session = await event.locals.auth();
  const frmData = await event.request.formData();
  const product = frmData.get("fee-product")?.toString() ?? "";
  const fee = frmData.get("fee-nominal")?.toString() ?? "";
  let errorBag = {};
  let valueBag = { product, fee };
  if (!product) {
    errorBag.product = "Pilih produk terlebih dahulu";
  }
  console.log(fee);
  if (!fee || Number(fee) <= 0) {
    errorBag.fee = "Nominal harus diisi";
  }
  if (Object.keys(errorBag).length) {
    return { fee: { errors: errorBag, values: valueBag, message: "Input salah, periksa form" } };
  }
  const { data, error } = await setFee({
    memberId: session?.user?.id,
    product,
    amount: Number(fee)
  });
  if (error) {
    return {
      fee: { errors: {}, values: valueBag, message: "Terjadi kesalahan saat menyimpan data" }
    };
  }
  return { fee: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
}
async function deletefeeAction(event) {
  const session = await event.locals.auth();
  const frmData = await event.request.formData();
  const productId = frmData.get("product-id")?.toString() ?? "";
  await deleteFee(session?.user?.id, productId);
}
async function socialAction(event) {
  const session = await event.locals.auth();
  const frmData = await event.request.formData();
  const tiktok = frmData.get("store-tiktok")?.toString() ?? "";
  const fb = frmData.get("store-fb")?.toString() ?? "";
  const ig = frmData.get("store-ig")?.toString() ?? "";
  const twitter = frmData.get("store-twitter")?.toString() ?? "";
  const telegram = frmData.get("store-telegram")?.toString() ?? "";
  let valueBag = {
    tiktok,
    fb,
    ig,
    twitter,
    telegram
  };
  const { data, error } = await updateStoreInfo({
    memberId: session?.user?.id,
    tiktok,
    fb,
    ig,
    twitter,
    telegram
  });
  if (error) {
    return {
      social: { errors: {}, values: valueBag, message: "Terjadi kesalahan saat menyimpan data" }
    };
  }
  return { social: { errors: {}, values: valueBag, message: "Berhasil menyimpan data" } };
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CVhuPu85.js')).default;
const server_id = "src/routes/(member)/(dashboard)/dashboard/store/+page.server.ts";
const imports = ["_app/immutable/nodes/17.BaxLI3b0.js","_app/immutable/chunks/scheduler.CcfLnVM_.js","_app/immutable/chunks/index.B-0vqY2A.js","_app/immutable/chunks/each.DAmsSjCb.js","_app/immutable/chunks/index.CDqIpYcz.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.d7ZplmeP.js","_app/immutable/chunks/index.DYWfvrca.js","_app/immutable/chunks/forms.BOvHAqWF.js","_app/immutable/chunks/entry.BEL7CgLR.js","_app/immutable/chunks/empty-table.YdeDD9pJ.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.BWg40YSe.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/save.C5666raO.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-CLMgXXO-.js.map
