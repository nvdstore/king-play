function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
function currency(nominal) {
  if (Number.isNaN(nominal)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(nominal).replace(",00", "");
}

export { currency as c, slugify as s };
//# sourceMappingURL=formatter-xDj28_d0.js.map
