dex),
    maker: String(club.maker || "").trim(),
    model: String(club.model || "").trim(),
    category: String(club.category || "").trim(),
    year: Number(club.year || 0),
    loft: String(club.loft || "").trim(),
    shaft: String(club.shaft || "").trim(),
    flex: String(club.flex || "").trim(),
    sale: Number(club.sale || 0),
    buy: Number(club.buy || 0),
    source: String(club.source || "").trim(),
    updatedAt: String(club.updatedAt || SAMPLE_DATA_DATE).trim(),
    confidence: String(club.confidence || "参考").trim(),
    memo: String(club.memo || "").trim()
  };
}

function isBuiltInSample(club) {
  return String(club.source || "").trim() === "内蔵サンプル";
}

function loadClubs() {
  const initialSamples = sampleCatalog
    .map(normalizeClub)
    .filter(isValidClub);

  if (typeof localStorage === "undefined") {
    return initialSamples;
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(saved) && saved.length) {
      const savedClubs = saved
        .map(normalizeClub)
        .filter(isValidClub)
        .filter((club) => !isBuiltInSample(club));
      const savedKeys = new Set(savedClubs.map(makeCatalogKey));
      const missingSamples = initialSamples.filter((club) => !savedKeys.has(makeCatalogKey(club)));
      return [...missingSamples, ...savedClubs];
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return initialSamples;
}

function saveClubs() {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clubs));
  }
}

function loadHistory() {
  if (typeof localStorage === "undefined") return [];

  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    return [];
  }
}

function saveHistory() {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(appraisalHistory.slice(0, 300)));
  }
}

function isValidClub(club) {
  return Boolean(club.maker && club.model && club.category && club.sale > 0 && club.buy >= 0);
}

function canUseLocalStorage() {
  if (typeof localStorage === "undefined") return false;
  try {
    const key = "__usedGolfMarketStorageTest";
    localStorage.setItem(key, "ok");
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

let clubs = loadClubs();
let appraisalHistory = loadHistory();
let selectedIndex = 0;
let draftMode = false;
let tableVisibleCount = TABLE_PAGE_SIZE;

const elements = {
  versionLabel: document.getElementById("versionLabel"),
  storageStatus: document.getElementById("storageStatus"),
  offlineStatus: document.getElementById("offlineStatus"),
  importStatus: document.getElementById("importStatus"),
  demoAppraiseButton: document.getElementById("demoAppraiseButton"),
  overviewTotal: document.getElementById("overviewTotal"),
  overviewAvgSale: document.getElementById("overviewAvgSale"),
  overviewMaxSale: document.getElementById("overviewMaxSale"),
  overviewIronSets: document.getElementById("overviewIronSets"),
  categoryBars: document.getElementById("categoryBars"),
  search: document.getElementById("searchInput"),
  categoryFilter: document.getElementById("categoryFilter"),
  conditionFilter: document.getElementById("conditionFilter"),
  qualityFilter: document.getElementById("qualityFilter"),
  sortSelect: document.getElementById("sortSelect"),
  minMarginInput: document.getElementById("minMarginInput"),
  table: document.getElementById("marketTable"),
  tableLimitLabel: document.getElementById("tableLimitLabel"),
  loadMoreTableButton: document.getElementById("loadMoreTableButton"),
  tableCategoryTabs: document.getElementById("tableCategoryTabs"),
  resultCount: document.getElementById("resultCount"),
  avgSale: document.getElementById("avgSale"),
  avgBuy: document.getElementById("avgBuy"),
  maxSale: document.getElementById("maxSale"),
  dataQuality: document.getElementById("dataQuality"),
  avgMargin: document.getElementById("avgMargin"),
  categoryChips: document.getElementById("categoryChips"),
  auditSummary: document.getElementById("auditSummary"),
  updatedLabel: document.getElementById("updatedLabel"),
  selectedCategory: document.getElementById("selectedCategory"),
  selectedName: document.getElementById("selectedName"),
  selectedSpec: document.getElementById("selectedSpec"),
  selectedSale: document.getElementById("selectedSale"),
  selectedBuy: document.getElementById("selectedBuy"),
  selectedLow: document.getElementById("selectedLow"),
  selectedHigh: document.getElementById("selectedHigh"),
  selectedMemo: document.getElementById("selectedMemo"),
  selectedSource: document.getElementById("selectedSource"),
  selectedUpdatedAt: document.getElementById("selectedUpdatedAt"),
  selectedConfidence: document.getElementById("selectedConfidence"),
  selectedRiskBox: document.getElementById("selectedRiskBox"),
  selectedRiskLabel: document.getElementById("selectedRiskLabel"),
  selectedRiskText: document.getElementById("selectedRiskText"),
  meterFill: document.getElementById("meterFill"),
  appraisalDateInput: document.getElementById("appraisalDateInput"),
  staffNameInput: document.getElementById("staffNameInput"),
  customerNameInput: document.getElementById("customerNameInput"),
  dealStatusInput: document.getElementById("dealStatusInput"),
  proposalCondition: document.getElementById("proposalCondition"),
  proposalStock: document.getElementById("proposalStock"),
  proposalAccessories: document.getElementById("proposalAccessories"),
  targetMarginInput: document.getElementById("targetMarginInput"),
  repairCostInput: document.getElementById("repairCostInput"),
  proposalSale: document.getElementById("proposalSale"),
  proposalBuyMax: document.getElementById("proposalBuyMax"),
  proposalProfit: document.getElementById("proposalProfit"),
  proposalMargin: document.getElementById("proposalMargin"),
  proposalAdvice: document.getElementById("proposalAdvice"),
  saveAppraisalButton: document.getElementById("saveAppraisalButton"),
  copyProposalButton: document.getElementById("copyProposalButton"),
  printAppraisalButton: document.getElementById("printAppraisalButton"),
  externalKeywordInput: document.getElementById("externalKeywordInput"),
  openYahooSoldButton: document.getElementById("openYahooSoldButton"),
  openRakutenButton: document.getElementById("openRakutenButton"),
  openMercariButton: document.getElementById("openMercariButton"),
  openKakakuButton: document.getElementById("openKakakuButton"),
  openGoogleButton: document.getElementById("openGoogleButton"),
  externalSaleInput: document.getElementById("externalSaleInput"),
  externalBuyInput: document.getElementById("externalBuyInput"),
  externalSourceSelect: document.getElementById("externalSourceSelect"),
  externalMemoInput: document.getElementById("externalMemoInput"),
  applyExternalMarketButton: document.getElementById("applyExternalMarketButton"),
  externalStatus: document.getElementById("externalStatus"),
  printSheet: document.getElementById("printSheet"),
  historyList: document.getElementById("historyList"),
  exportHistoryButton: document.getElementById("exportHistoryButton"),
  clearHistoryButton: document.getElementById("clearHistoryButton"),
  csvInput: document.getElementById("csvInput"),
  exportCsvButton: document.getElementById("exportCsvButton"),
  copyButton: document.getElementById("copyButton"),
  editForm: document.getElementById("editForm"),
  editMaker: document.getElementById("editMaker"),
  editModel: document.getElementById("editModel"),
  editCategory: document.getElementById("editCategory"),
  editYear: document.getElementById("editYear"),
  editLoft: document.getElementById("editLoft"),
  editShaft: document.getElementById("editShaft"),
  editFlex: document.getElementById("editFlex"),
  editSale: document.getElementById("editSale"),
  editBuy: document.getElementById("editBuy"),
  editSource: document.getElementById("editSource"),
  editUpdatedAt: document.getElementById("editUpdatedAt"),
  editConfidence: document.getElementById("editConfidence"),
  editMemo: document.getElementById("editMemo"),
  validationMessage: document.getElementById("validationMessage"),
  newRecordButton: document.getElementById("newRecordButton")
};

function yen(value) {
  return `${Math.round(value).toLocaleString("ja-JP")}円`;
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u3041-\u3096]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60))
    .replace(/[\s　・･\-_./\\,，、。:：;；()（）[\]【】{}「」『』"'`]/g, "");
}

function getSearchTerms(value) {
  const raw = String(value ?? "").trim();
  const terms = raw
    .split(/[\s　]+/)
    .map(normalizeSearchText)
    .filter(Boolean);
  return terms.length > 1 ? terms : [normalizeSearchText(raw)].filter(Boolean);
}

function roundToHundred(value) {
  return Math.max(0, Math.round(value / 100) * 100);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysSince(dateText) {
  if (!dateText) return Infinity;
  const timestamp = Date.parse(dateText);
  if (Number.isNaN(timestamp)) return Infinity;
  return Math.floor((Date.now() - timestamp) / 86400000);
}

function getDataIssues(club) {
  const issues = [];
  if (!club.source || club.source === "内蔵サンプル") issues.push("根拠確認");
  if (!club.updatedAt || daysSince(club.updatedAt) > DATA_FRESH_DAYS) issues.push("更新日");
  if (!club.confidence || club.confidence === "参考" || club.confidence === "要確認") issues.push("信頼度");
  if (club.buy > club.sale) issues.push("買取高すぎ");
  if (!club.sale || !club.buy) issues.push("価格");
  return issues;
}

function baseMarginRate(club) {
  if (!club.sale) return 0;
  return ((club.sale - club.buy) / club.sale) * 100;
}

function getAuditIssues(club) {
  const issues = getDataIssues(club);
  if (club.sale && club.buy && baseMarginRate(club) < LOW_MARGIN_THRESHOLD) issues.push("低粗利");
  return issues;
}

function getRiskStatus(club) {
  const issues = getAuditIssues(club);
  if (!issues.length) {
    return {
      label: "査定利用OK",
      text: "根拠、更新日、信頼度、粗利を確認済みです。",
      className: "risk-box is-ok",
      issues: "OK"
    };
  }

  return {
    label: "査定前確認が必要",
    text: issues.join(" / "),
    className: "risk-box is-warning",
    issues: issues.join(" / ")
  };
}

function latestUpdatedAt(items = clubs) {
  const dates = items.map((club) => club.updatedAt).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : "未設定";
}

function pricedClub(club) {
  const rate = conditionRates[elements.conditionFilter.value] || conditionRates.B;
  return {
    ...club,
    adjustedSale: roundToHundred(club.sale * rate.sale),
    adjustedBuy: roundToHundred(club.buy * rate.buy),
    conditionLabel: rate.label
  };
}

function searchableText(club) {
  const fields = [
    club.maker,
    club.model,
    club.category,
    club.year,
    club.loft,
    club.shaft,
    club.flex,
    club.memo
  ];
  const baseText = normalizeSearchText(fields.join(" "));
  const aliases = [];

  aliasGroups.forEach((group) => {
    const normalized = group.map(normalizeSearchText);
    if (normalized.some((term) => term && baseText.includes(term))) {
      aliases.push(...group);
    }
  });

  return normalizeSearchText([...fields, ...aliases].join(" "));
}

function currentMarketKeyword() {
  const typed = elements.search.value.trim();
  if (typed) return typed;
  const club = selectedIndex >= 0 ? clubs[selectedIndex] : null;
  if (!club) return "";
  return [club.maker, club.model, club.category, club.year, club.loft, club.shaft, club.flex]
    .filter(Boolean)
    .join(" ");
}

function updateExternalKeyword() {
  if (!elements.externalKeywordInput.value.trim()) {
    elements.externalKeywordInput.value = currentMarketKeyword();
  }
}

function externalSearchUrl(kind) {
  const keyword = elements.externalKeywordInput.value.trim() || currentMarketKeyword();
  const encoded = encodeURIComponent(keyword);
  if (!encoded) return "";
  if (kind === "yahooSold") return `https://auctions.yahoo.co.jp/closedsearch/closedsearch?p=${encoded}`;
  if (kind === "rakuten") return `https://search.rakuten.co.jp/search/mall/${encoded}/`;
  if (kind === "mercari") return `https://jp.mercari.com/search?keyword=${encoded}`;
  if (kind === "kakaku") return `https://search.kakaku.com/${encoded}/`;
  return `https://www.google.com/search?q=${encoded}%20中古%20ゴルフ%20相場`;
}

function openExternalMarket(kind) {
  updateExternalKeyword();
  const url = externalSearchUrl(kind);
  if (!url) {
    elements.externalStatus.textContent = "検索キーワードを入力してください。";
    return;
  }
  window.open(url, "_blank", "noopener");
}

function getFilteredClubs() {
  const searchTerms = getSearchTerms(elements.search.value);
  const category = elements.categoryFilter.value;
  const minMargin = Number(elements.minMarginInput.value || 0);

  const filtered = clubs
    .map((club, index) => ({ club: pricedClub(club), index }))
    .filter(({ club }) => {
      const text = searchableText(club);
      const matchesQuery = !searchTerms.length || searchTerms.every((term) => text.includes(term));
      const matchesCategory = !category || club.category === category;
      const matchesQuality = matchesQualityFilter(club);
      const matchesMargin = !minMargin || marginRate(club) >= minMargin;
      return matchesQuery && matchesCategory && matchesQuality && matchesMargin;
    });

  return sortFilteredItems(filtered);
}

function average(items, key) {
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + item.club[key], 0) / items.length;
}

function averageClubValue(items, key) {
  if (!items.length) return 0;
  return items.reduce((sum, club) => sum + Number(club[key] || 0), 0) / items.length;
}

function marginRate(club) {
  if (!club.adjustedSale) return 0;
  return ((club.adjustedSale - club.adjustedBuy) / club.adjustedSale) * 100;
}

function renderOverview() {
  const categories = [...new Set(clubs.map((club) => club.category))];
  const maxSale = clubs.length ? Math.max(...clubs.map((club) => Number(club.sale || 0))) : 0;
  const ironSets = clubs.filter((club) => club.category === "アイアンセット").length;
  const maxCount = Math.max(1, ...categories.map((category) => clubs.filter((club) => club.category === category).length));

  elements.overviewTotal.textContent = `${clubs.length}件`;
  elements.overviewAvgSale.textContent = yen(averageClubValue(clubs, "sale"));
  elements.overviewMaxSale.textContent = yen(maxSale);
  elements.overviewIronSets.textContent = `${ironSets}件`;
  elements.categoryBars