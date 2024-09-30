import { e as error } from './index-DzcLzHBX.js';
import { d as db } from './db-Dt_6_ZQU.js';
import { M as MappingGroupChannel } from './constant-CVq9EQOr.js';
import { r as request, a as generateMid } from './request-qZghsHO2.js';
import './shared-server-DWgAsK3Q.js';
import 'pg';
import 'date-fns';
import 'fs';
import 'crypto';
import 'nanoid';

async function getGameGroupBySlug(slug) {
  const res = await db.query("select * from mt_group_produk mgp where slug = $1 limit 1", [slug]);
  return res.rows[0] ?? null;
}
async function getGameField(groupId) {
  const res = await db.query(
    "select * from mt_fields mf where id_group_produk = $1 and is_active = true order by field_order asc",
    [groupId]
  );
  return res.rows ?? [];
}
async function getPaymentChannels() {
  const res = await db.query("select * from mt_channel_pembayaran");
  return res.rows ?? [];
}
const load = async ({ cookies, params, url }) => {
  const productId = url.searchParams.get("product")?.toString() ?? "";
  const group = await getGameGroupBySlug(params.game);
  if (!group || !group.id_group_produk) {
    error(404);
  }
  const game = {
    id: group.id_group_produk,
    slug: group?.slug ?? "",
    name: group.nama_group_produk,
    image: group.img,
    fields: []
  };
  const fields = await getGameField(group.id_group_produk);
  game.fields = fields.map((fld) => ({
    key: fld.field_name,
    title: fld.field_title,
    target: fld.field_target,
    placeholder: fld.field_placeholder,
    options: fld.field_options ?? [],
    type: fld.field_type,
    required: fld.is_required ?? false
  }));
  const userId = cookies.get("uuid") ?? "";
  const { data: dataProducts } = await request({
    method: "POST",
    endpoint: "/v1.0/api/produk/list-produk",
    payload: { id_group_produk: game.id.toString() },
    uuid: userId
  });
  let products = dataProducts?.map((product) => ({
    id: product.id_produk,
    name: product.produk,
    price: product.nominal,
    icon: "",
    isActive: true
  }));
  products = products.sort((a, b) => a.price - b.price);
  let channels = [];
  let selectedProduct = null;
  let dataChannels = [];
  if (productId) {
    const { data: resChannels } = await request({
      method: "POST",
      endpoint: "/v1.0/api/invoices/channel",
      payload: { mid: crypto.randomUUID(), id_produk: productId, id_user: userId },
      uuid: userId
    });
    dataChannels = resChannels ?? [];
    selectedProduct = products.find((val) => val.id == productId) ?? null;
  } else {
    dataChannels = await getPaymentChannels();
  }
  channels = groupingPaymentChannel(dataChannels);
  return {
    game,
    products,
    selectedProduct,
    channels
  };
};
const actions = {
  default: async ({ request: req, cookies }) => {
    const formData = await req.formData();
    const product = formData.get("product");
    const idpel1 = formData.get("id_pelanggan_1");
    const idpel2 = formData.get("id_pelanggan_2");
    const channel = formData.get("channel");
    const mid = generateMid();
    const userId = cookies.get("uuid") ?? "";
    const inquiry = await request({
      method: "POST",
      endpoint: "/v1.0/api/inquiry/",
      payload: {
        mid,
        step: 2,
        data: {
          id_produk: product,
          id_user: userId,
          id_pelanggan: idpel1 ?? "",
          id_pelanggan2: idpel2 ?? "",
          id_pelanggan3: "",
          email: ""
        }
      },
      uuid: userId
    });
    const inqAdditional = inquiry?.additional;
    const idInquiry = inqAdditional?.response_transaction_detail?.id_transaksi_inquiry;
    if (inquiry.code != "00" || !inquiry.data || !idInquiry) {
      return inquiry;
    }
    const invoice = await request({
      method: "POST",
      endpoint: "/v1.0/api/invoices/",
      payload: {
        mid,
        step: 2,
        data: {
          id_produk: product,
          id_user: userId,
          id_pelanggan1: idpel1 ?? "",
          id_pelanggan2: idpel2 ?? "",
          id_pelanggan3: "",
          email: "",
          phone: ""
        },
        invoice_detail: {
          id_channel_pembayaran: channel,
          id_transaksi_inquiry: idInquiry
        }
      },
      uuid: userId
    });
    return invoice;
  }
};
const groupingPaymentChannel = (data) => {
  const groupMapping = {};
  data.forEach((item, idx) => {
    if (!groupMapping[item.nama_group_channel]) {
      const group = MappingGroupChannel.find((ch) => ch.group == item.nama_group_channel);
      groupMapping[item.nama_group_channel] = {
        id: Object.keys(groupMapping).length + 1,
        label: group?.name ?? "",
        type: group?.group ?? "",
        channels: [],
        images: []
      };
    }
    const channel = {
      id: item.id_channel_pembayaran,
      code: item.via,
      image: item.img,
      name: item.via,
      price: item.nominal_up_pg ?? "",
      helper: "<ul><li>Step 1</li><li>Step 2</li></ul>"
    };
    groupMapping[item.nama_group_channel].channels.push(channel);
    groupMapping[item.nama_group_channel].images.push(item.img);
  });
  return Object.values(groupMapping);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bp9ajIBf.js')).default;
const server_id = "src/routes/(homepage)/[game]/+page.server.ts";
const imports = ["_app/immutable/nodes/8.viTYZD2U.js","_app/immutable/chunks/scheduler.6KT2eGMr.js","_app/immutable/chunks/index.B8s6-p5L.js","_app/immutable/chunks/each.MhIJo3BG.js","_app/immutable/chunks/index.CbVfT7vS.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.CY_U3FVi.js","_app/immutable/chunks/index.B4FbLfrC.js","_app/immutable/chunks/forms.amhr-z1F.js","_app/immutable/chunks/entry.D_G1TyTl.js","_app/immutable/chunks/stores.D3HUAG9M.js","_app/immutable/chunks/formatter.1SswtO-0.js","_app/immutable/chunks/general.BZVfGAiX.js","_app/immutable/chunks/x.UiVs2M9z.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Icon.QrzoY6PX.js"];
const stylesheets = ["_app/immutable/assets/SvelteToast.DbLvtVfH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-BgAS8q_j.js.map
