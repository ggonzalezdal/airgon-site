const els = {
  q: document.getElementById("q"),
  type: document.getElementById("type"),
  country: document.getElementById("country"),
  region: document.getElementById("region"),
  reset: document.getElementById("reset"),
  tbody: document.getElementById("tbody"),
  count: document.getElementById("count"),
};

let wines = [];

function norm(s) {
  return String(s ?? "").trim();
}

function normLower(s) {
  return norm(s).toLowerCase();
}

function uniqueSorted(values) {
  const set = new Set(values.filter(v => norm(v) !== ""));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function fillSelect(selectEl, values) {
  // Keep the first option ("All"), then append unique values
  const first = selectEl.querySelector("option[value='']");
  selectEl.innerHTML = "";
  selectEl.appendChild(first);

  for (const v of values) {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selectEl.appendChild(opt);
  }
}

function render(rows) {
  els.tbody.innerHTML = rows.map(w => {
    const vintage = Number(w.vintage) > 0 ? w.vintage : "";
    const price = Number.isFinite(Number(w.price)) ? Number(w.price).toFixed(0) : "";
    const abv = Number.isFinite(Number(w.abv)) ? Number(w.abv).toFixed(1) : "";
    const cl = Number.isFinite(Number(w.cl)) ? Number(w.cl).toFixed(0) : "";

    return `
      <tr>
        <td>${escapeHtml(norm(w.name))}</td>
        <td>${escapeHtml(norm(w.producer))}</td>
        <td class="num">${escapeHtml(String(vintage))}</td>
        <td>${escapeHtml(norm(w.type))}</td>
        <td>${escapeHtml(norm(w.country))}</td>
        <td>${escapeHtml(norm(w.region))}</td>
        <td class="num">${escapeHtml(price)}</td>
        <td class="num">${escapeHtml(abv)}</td>
        <td class="num">${escapeHtml(cl)}</td>
      </tr>
    `;
  }).join("");

  els.count.textContent = `${rows.length} wine${rows.length === 1 ? "" : "s"}`;
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyFilters() {
  const q = normLower(els.q.value);
  const type = norm(els.type.value);
  const country = norm(els.country.value);
  const region = norm(els.region.value);

  const rows = wines.filter(w => {
    if (type && norm(w.type) !== type) return false;
    if (country && norm(w.country) !== country) return false;
    if (region && norm(w.region) !== region) return false;

    if (!q) return true;

    const hay = [
      w.name, w.producer, w.region, w.country, w.variety, w.do, w.type
    ].map(normLower).join(" | ");

    return hay.includes(q);
  });

  render(rows);
}

async function init() {
  const res = await fetch("./data/wines.json", { cache: "no-store" });
  wines = await res.json();

  fillSelect(els.type, uniqueSorted(wines.map(w => norm(w.type))));
  fillSelect(els.country, uniqueSorted(wines.map(w => norm(w.country))));
  fillSelect(els.region, uniqueSorted(wines.map(w => norm(w.region))));

  els.q.addEventListener("input", applyFilters);
  els.type.addEventListener("change", applyFilters);
  els.country.addEventListener("change", applyFilters);
  els.region.addEventListener("change", applyFilters);

  els.reset.addEventListener("click", () => {
    els.q.value = "";
    els.type.value = "";
    els.country.value = "";
    els.region.value = "";
    applyFilters();
  });

  applyFilters();
}

init().catch(err => {
  console.error(err);
  els.count.textContent = "Failed to load wines.json";
});