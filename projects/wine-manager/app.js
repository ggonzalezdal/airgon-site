const els = {
  q: document.getElementById("q"),
  type: document.getElementById("type"),
  country: document.getElementById("country"),
  region: document.getElementById("region"),
  reset: document.getElementById("reset"),
  tbody: document.getElementById("tbody"),
  count: document.getElementById("count"),
  headers: document.querySelectorAll(".wm-t thead th"),

  pageInfo: document.getElementById("page-info"),
  pagination: document.getElementById("pagination"),

  modal: document.getElementById("wine-modal"),
  modalBackdrop: document.getElementById("wine-modal-backdrop"),
  modalClose: document.getElementById("wine-modal-close"),
  modalTitle: document.getElementById("wine-modal-title"),
  modalSubtitle: document.getElementById("wine-modal-subtitle"),
  modalBody: document.getElementById("wine-modal-body"),
};

let wines = [];
let currentPageRows = [];

const sortState = {
  key: "name",
  dir: "asc",
};

const paginationState = {
  page: 1,
  pageSize: 25,
};

const columnMap = [
  "name",
  "producer",
  "vintage",
  "type",
  "country",
  "region",
  "price",
  "abv",
  "cl",
];

const numericColumns = new Set(["vintage", "price", "abv", "cl"]);

function norm(value) {
  return String(value ?? "").trim();
}

function normLower(value) {
  return norm(value).toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function uniqueSorted(values) {
  const set = new Set(values.filter(v => norm(v) !== ""));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function fillSelect(selectEl, values) {
  const first = selectEl.querySelector("option[value='']");
  selectEl.innerHTML = "";
  selectEl.appendChild(first);

  for (const value of values) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = value;
    selectEl.appendChild(opt);
  }
}

function getNumericValue(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : -Infinity;
}

function getSortValue(wine, key) {
  if (numericColumns.has(key)) {
    return getNumericValue(wine[key]);
  }
  return normLower(wine[key]);
}

function filterRows(rows) {
  const q = normLower(els.q.value);
  const type = norm(els.type.value);
  const country = norm(els.country.value);
  const region = norm(els.region.value);

  return rows.filter(w => {
    if (type && norm(w.type) !== type) return false;
    if (country && norm(w.country) !== country) return false;
    if (region && norm(w.region) !== region) return false;

    if (!q) return true;

    const hay = [
      w.name,
      w.producer,
      w.region,
      w.country,
      w.variety,
      w.do,
      w.type,
    ].map(normLower).join(" | ");

    return hay.includes(q);
  });
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const aVal = getSortValue(a, sortState.key);
    const bVal = getSortValue(b, sortState.key);

    if (numericColumns.has(sortState.key)) {
      return sortState.dir === "asc" ? aVal - bVal : bVal - aVal;
    }

    const result = String(aVal).localeCompare(String(bVal));
    return sortState.dir === "asc" ? result : -result;
  });
}

function paginateRows(rows) {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / paginationState.pageSize));

  if (paginationState.page > totalPages) {
    paginationState.page = totalPages;
  }

  const startIndex = (paginationState.page - 1) * paginationState.pageSize;
  const endIndex = startIndex + paginationState.pageSize;
  const pageRows = rows.slice(startIndex, endIndex);

  return {
    pageRows,
    total,
    totalPages,
    startIndex,
    endIndex: Math.min(endIndex, total),
  };
}

function updateSortHeaders() {
  els.headers.forEach((th, index) => {
    const key = columnMap[index];
    if (!key) return;

    const baseLabel = th.textContent.replace(" ▲", "").replace(" ▼", "");
    th.textContent = baseLabel;

    if (key === sortState.key) {
      th.textContent = `${baseLabel} ${sortState.dir === "asc" ? "▲" : "▼"}`;
    }
  });
}

function formatVintage(value) {
  return Number(value) > 0 ? String(value) : "—";
}

function formatPrice(value) {
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(0)} €` : "—";
}

function formatAbv(value) {
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(1)}%` : "—";
}

function formatCl(value) {
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(0)} cl` : "—";
}

function detailItem(label, value) {
  return `
    <div class="wm-detail">
      <p class="wm-detail-label">${escapeHtml(label)}</p>
      <p class="wm-detail-value">${escapeHtml(norm(value) || "—")}</p>
    </div>
  `;
}

function openWineModal(wine) {
  els.modalTitle.textContent = norm(wine.name) || "Wine details";

  const subtitleParts = [
    norm(wine.producer),
    Number(wine.vintage) > 0 ? String(wine.vintage) : "",
  ].filter(Boolean);

  els.modalSubtitle.textContent = subtitleParts.join(" • ");

  els.modalBody.innerHTML = [
    detailItem("Producer", wine.producer),
    detailItem("Vintage", formatVintage(wine.vintage)),
    detailItem("Type", wine.type),
    detailItem("Country", wine.country),
    detailItem("Region", wine.region),
    detailItem("Variety", wine.variety),
    detailItem("DO / Appellation", wine.do),
    detailItem("Price", formatPrice(wine.price)),
    detailItem("ABV", formatAbv(wine.abv)),
    detailItem("Bottle size", formatCl(wine.cl)),
  ].join("");

  els.modal.hidden = false;
  document.body.classList.add("wm-modal-open");
}

function closeWineModal() {
  els.modal.hidden = true;
  document.body.classList.remove("wm-modal-open");
}

function createPageButton(label, page, disabled = false, active = false) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `btn small wm-page-btn${active ? " is-active" : ""}`;
  btn.textContent = label;
  btn.disabled = disabled;

  if (!disabled) {
    btn.addEventListener("click", () => {
      paginationState.page = page;
      applyFilters();
    });
  }

  return btn;
}

function renderPagination(totalPages) {
  els.pagination.innerHTML = "";

  if (totalPages <= 1) return;

  els.pagination.appendChild(
    createPageButton("Prev", paginationState.page - 1, paginationState.page === 1)
  );

  const maxVisible = 5;
  let startPage = Math.max(1, paginationState.page - 2);
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  startPage = Math.max(1, endPage - maxVisible + 1);

  if (startPage > 1) {
    els.pagination.appendChild(
      createPageButton("1", 1, false, paginationState.page === 1)
    );

    if (startPage > 2) {
      const dots = document.createElement("span");
      dots.className = "wm-page-dots";
      dots.textContent = "…";
      els.pagination.appendChild(dots);
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    els.pagination.appendChild(
      createPageButton(String(page), page, false, paginationState.page === page)
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement("span");
      dots.className = "wm-page-dots";
      dots.textContent = "…";
      els.pagination.appendChild(dots);
    }

    els.pagination.appendChild(
      createPageButton(
        String(totalPages),
        totalPages,
        false,
        paginationState.page === totalPages
      )
    );
  }

  els.pagination.appendChild(
    createPageButton("Next", paginationState.page + 1, paginationState.page === totalPages)
  );
}

function render(rows, meta) {
  currentPageRows = rows;

  els.tbody.innerHTML = rows.map((w, index) => {
    const vintage = Number(w.vintage) > 0 ? w.vintage : "";
    const price = Number.isFinite(Number(w.price)) ? Number(w.price).toFixed(0) : "";
    const abv = Number.isFinite(Number(w.abv)) ? Number(w.abv).toFixed(1) : "";
    const cl = Number.isFinite(Number(w.cl)) ? Number(w.cl).toFixed(0) : "";

    return `
      <tr data-row-index="${index}" tabindex="0">
        <td>${escapeHtml(norm(w.name))}</td>
        <td>${escapeHtml(norm(w.producer))}</td>
        <td class="num">${escapeHtml(vintage)}</td>
        <td>${escapeHtml(norm(w.type))}</td>
        <td>${escapeHtml(norm(w.country))}</td>
        <td>${escapeHtml(norm(w.region))}</td>
        <td class="num">${escapeHtml(price)}</td>
        <td class="num">${escapeHtml(abv)}</td>
        <td class="num">${escapeHtml(cl)}</td>
      </tr>
    `;
  }).join("");

  els.count.textContent = `${meta.total} wine${meta.total === 1 ? "" : "s"}`;

  if (meta.total === 0) {
    els.pageInfo.textContent = "Showing 0–0 of 0";
  } else {
    els.pageInfo.textContent = `Showing ${meta.startIndex + 1}–${meta.endIndex} of ${meta.total}`;
  }

  renderPagination(meta.totalPages);
  updateSortHeaders();
}

function applyFilters() {
  const filtered = filterRows(wines);
  const sorted = sortRows(filtered);
  const paginated = paginateRows(sorted);

  render(paginated.pageRows, paginated);
}

function resetToFirstPageAndApply() {
  paginationState.page = 1;
  applyFilters();
}

function setupSorting() {
  els.headers.forEach((th, index) => {
    const key = columnMap[index];
    if (!key) return;

    th.style.cursor = "pointer";
    th.title = `Sort by ${key}`;

    th.addEventListener("click", () => {
      if (sortState.key === key) {
        sortState.dir = sortState.dir === "asc" ? "desc" : "asc";
      } else {
        sortState.key = key;
        sortState.dir = "asc";
      }

      paginationState.page = 1;
      applyFilters();
    });
  });
}

function setupModalEvents() {
  els.tbody.addEventListener("click", event => {
    const row = event.target.closest("tr[data-row-index]");
    if (!row) return;

    const index = Number(row.dataset.rowIndex);
    const wine = currentPageRows[index];
    if (!wine) return;

    openWineModal(wine);
  });

  els.tbody.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const row = event.target.closest("tr[data-row-index]");
    if (!row) return;

    event.preventDefault();

    const index = Number(row.dataset.rowIndex);
    const wine = currentPageRows[index];
    if (!wine) return;

    openWineModal(wine);
  });

  els.modalClose.addEventListener("click", closeWineModal);
  els.modalBackdrop.addEventListener("click", closeWineModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !els.modal.hidden) {
      closeWineModal();
    }
  });
}

async function init() {
  const res = await fetch("./data/wines.json", { cache: "no-store" });
  wines = await res.json();

  fillSelect(els.type, uniqueSorted(wines.map(w => norm(w.type))));
  fillSelect(els.country, uniqueSorted(wines.map(w => norm(w.country))));
  fillSelect(els.region, uniqueSorted(wines.map(w => norm(w.region))));

  els.q.addEventListener("input", resetToFirstPageAndApply);
  els.type.addEventListener("change", resetToFirstPageAndApply);
  els.country.addEventListener("change", resetToFirstPageAndApply);
  els.region.addEventListener("change", resetToFirstPageAndApply);

  els.reset.addEventListener("click", () => {
    els.q.value = "";
    els.type.value = "";
    els.country.value = "";
    els.region.value = "";
    sortState.key = "name";
    sortState.dir = "asc";
    paginationState.page = 1;
    applyFilters();
  });

  setupSorting();
  setupModalEvents();
  applyFilters();
}

init().catch(err => {
  console.error(err);
  els.count.textContent = "Failed to load wines.json";
  if (els.pageInfo) {
    els.pageInfo.textContent = "";
  }
});