=== "issues") return issues.length > 0;
  if (filter === "clean") return issues.length === 0;
  if (filter === "old") return !club.updatedAt || daysSince(club.updatedAt) > DATA_FRESH_DAYS;
  if (filter === "sample") return club.source === "内蔵サンプル";
  return true;
}

function sortFilteredItems(items) {
  const sort = elements.sortSelect.value;
  const collator = new Intl.Collator("ja-JP", { numeric: true, sensitivity: "base" });

  return items.sort((a, b) => {
    if (sort === "saleDesc") return b.club.adjustedSale - a.club.adjustedSale;
    if (sort === "saleAsc") return a.club.adjustedSale - b.club.adjustedSale;
    if (sort === "buyDesc") return b.club.adjustedBuy - a.club.adjustedBuy;
    if (sort === "marginDesc") return marginRate(b.club) - marginRate(a.club);
    if (sort === "updatedAsc") return String(a.club.updatedAt || "9999-99-99").localeCompare(String(b.club.updatedAt || "9999-99-99"));
    if (sort === "updatedDesc") return String(b.club.updatedAt || "").localeCompare(String(a.club.updatedAt || ""));
    return collator.compare(`${a.club.maker} ${a.club.model}`, `${b.club.maker} ${b.club.model}`);
  });
}

function renderStats(filtered) {
  elements.resultCount.textContent = `${filtered.length}件`;
  elements.avgSale.textContent = yen(average(filtered, "adjustedSale"));
  elements.avgBuy.textContent = yen(average(filtered, "adjustedBuy"));
  elements.maxSale.textContent = yen(filtered.length ? Math.max(...filtered.map((item) => item.club.adjustedSale)) : 0);
  elements.dataQuality.textContent = `${clubs.filter((club) => getAuditIssues(club).length).length}件`;
  elements.avgMargin.textContent = filtered.length ? `${Math.round(filtered.reduce((sum, item) => sum + marginRate(item.club), 0) / filtered.length)}%` : "0%";
  elements.updatedLabel.textContent = `最終更新: ${latestUpdatedAt()}`;
  renderOverview();

  const categories = [...new Set(clubs.map((club) => club.category))];
  elements.categoryChips.innerHTML = categories
    .map((category) => {
      const count = clubs.filter((club) => club.category === category).length;
      return `<span class="chip">${category} ${count}件</span>`;
    })
    .join("");

  renderAudit();
}

function renderTableCategoryTabs() {
  const activeCategory = elements.categoryFilter.value;
  const categories = ["", ...new Set(clubs.map((club) => club.category).filter(Boolean))];
  elements.tableCategoryTabs.innerHTML = categories
    .map((category) => {
      const label = category || "すべて";
      const count = category ? clubs.filter((club) => club.category === category).length : clubs.length;
      const activeClass = category === activeCategory ? " is-active" : "";
      return `<button type="button" class="table-tab${activeClass}" data-category="${escapeHtml(category)}">${escapeHtml(label)} <span>${count}</span></button>`;
    })
    .join("");
}

function clearDetailForNoResults() {
  elements.selectedCategory.textContent = "外部確認";
  elements.selectedName.textContent = "外部相場を確認してください";
  elements.selectedSpec.textContent = "検索キーワードを入れて、外部サイトで確認した価格を登録します。";
  elements.selectedSale.textContent = yen(0);
  elements.selectedBuy.textContent = yen(0);
  elements.selectedLow.textContent = yen(0);
  elements.selectedHigh.textContent = yen(0);
  elements.selectedMemo.textContent = "確認価格を入力し「確認価格で査定・登録欄へ反映」を押すと、査定価格を計算できます。";
  elements.selectedSource.textContent = "未設定";
  elements.selectedUpdatedAt.textContent = "未設定";
  elements.selectedConfidence.textContent = "未設定";
  elements.selectedRiskBox.className = "risk-box is-warning";
  elements.selectedRiskLabel.textContent = "外部確認待ち";
  elements.selectedRiskText.textContent = "外部サイトで価格を確認し、根拠を残してください。";
  elements.meterFill.style.width = "0%";
  elements.proposalSale.textContent = yen(0);
  elements.proposalBuyMax.textContent = yen(0);
  elements.proposalProfit.textContent = yen(0);
  elements.proposalMargin.textContent = "0%";
  elements.proposalAdvice.textContent = "確認価格を入力すると、販売提案、買取上限、粗利を計算します。";
  updateExternalKeyword();
}

function renderTable(options = {}) {
  const { autoSelectFirst = false } = options;
  const filtered = getFilteredClubs();
  renderStats(filtered);
  renderTableCategoryTabs();

  if (filtered.length && (autoSelectFirst || !filtered.some((item) => item.index === selectedIndex))) {
    selectedIndex = filtered[0].index;
  }

  elements.table.innerHTML = filtered
    .map(({ club, index }) => {
      const selectedClass = index === selectedIndex ? " class=\"is-selected\"" : "";
      const issues = getAuditIssues(club);
      const qualityLabel = issues.length ? issues.join(" / ") : "OK";
      const qualityClass = issues.length ? "status-badge is-warning" : "status-badge is-ok";
      return `
        <tr${selectedClass} data-index="${index}">
          <td>
            <span class="club-name">${club.maker} ${club.model}</span>
            <span class="club-spec">${club.shaft} / ${club.flex} / ${club.loft} / ${club.source}</span>
          </td>
          <td>${club.category}</td>
          <td>${club.year}</td>
          <td class="price">${yen(club.adjustedSale)}</td>
          <td class="price">${yen(club.adjustedBuy)}</td>
          <td class="price">${Math.round(marginRate(club))}%</td>
          <td><span class="${qualityClass}">${qualityLabel}</span></td>
        </tr>
      `;
    })
    .join("");

  if (!filtered.length) {
    selectedIndex = -1;
    elements.table.innerHTML = `<tr><td colspan="7">該当するクラブがありません。</td></tr>`;
    clearDetailForNoResults();
    return;
  }

  renderDetail();
}

function renderDetail() {
  const rawClub = selectedIndex >= 0 ? clubs[selectedIndex] : null;
  if (!rawClub) return;

  const club = pricedClub(rawClub);
  const low = roundToHundred(club.adjustedSale * 0.86);
  const high = roundToHundred(club.adjustedSale * 1.14);
  const meter = Math.min(90, Math.max(35, ((club.adjustedSale - low) / Math.max(1, high - low)) * 100));

  elements.selectedCategory.textContent = `${club.category} / ${club.conditionLabel}`;
  elements.selectedName.textContent = `${club.maker} ${club.model}`;
  elements.selectedSpec.textContent = `${club.year}年 / ${club.loft} / ${club.shaft} / ${club.flex}`;
  elements.selectedSale.textContent = yen(club.adjustedSale);
  elements.selectedBuy.textContent = yen(club.adjustedBuy);
  elements.selectedLow.textContent = yen(low);
  elements.selectedHigh.textContent = yen(high);
  elements.selectedMemo.textContent = club.memo;
  elements.selectedSource.textContent = club.source || "未設定";
  elements.selectedUpdatedAt.textContent = club.updatedAt || "未設定";
  elements.selectedConfidence.textContent = club.confidence || "未設定";
  const risk = getRiskStatus(rawClub);
  elements.selectedRiskBox.className = risk.className;
  elements.selectedRiskLabel.textContent = risk.label;
  elements.selectedRiskText.textContent = risk.text;
  elements.meterFill.style.width = `${meter}%`;
  fillEditForm(rawClub);
  updateExternalKeyword();
  renderProposal();
}

function fillEditForm(club) {
  elements.editMaker.value = club.maker || "";
  elements.editModel.value = club.model || "";
  elements.editCategory.value = club.category || "ドライバー";
  elements.editYear.value = club.year || "";
  elements.editLoft.value = club.loft || "";
  elements.editShaft.value = club.shaft || "";
  elements.editFlex.value = club.flex || "";
  elements.editSale.value = club.sale || "";
  elements.editBuy.value = club.buy || "";
  elements.editSource.value = club.source || "";
  elements.editUpdatedAt.value = club.updatedAt || todayISO();
  elements.editConfidence.value = club.confidence || "要確認";
  elements.editMemo.value = club.memo || "";
  const issues = getDataIssues(normalizeClub(club));
  elements.validationMessage.textContent = issues.length ? `要確認: ${issues.join(" / ")}` : "確認済み";
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === "\"" && next === "\"") {
      current += "\"";
      i += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((item, header, index) => {
      item[header] = values[index] ?? "";
      return item;
    }, {});
  });
}

function setImportStatus(message, status = "is-ok") {
  elements.importStatus.textContent = message;
  elements.importStatus.className = status;
}

function mergeImportedClubs(imported) {
  const existingKeys = new Map(clubs.map((club, index) => [makeCatalogKey(club), index]));
  let added = 0;
  let updated = 0;

  imported.forEach((club) => {
    const key = makeCatalogKey(club);
    if (existingKeys.has(key)) {
      const index = existingKeys.get(key);
      clubs[index] = normalizeClub({ ...club, id: clubs[index].id }, index);
      updated += 1;
      return;
    }

    clubs.push(normalizeClub(club, clubs.length));
    existingKeys.set(key, clubs.length - 1);
    added += 1;
  });

  return { added, updated };
}

function importCsv(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const imported = parseCsv(String(reader.result))
      .map((item, index) => normalizeClub({
        maker: item.maker || item["メーカー"] || "",
        model: item.model || item["モデル"] || "",
        category: item.category || item["種類"] || "",
        year: Number(item.year || item["年式"] || 0),
        loft: item.loft || item["ロフト"] || "",
        shaft: item.shaft || item["シャフト"] || "",
        flex: item.flex || item["フレックス"] || "",
        sale: Number(item.sale || item["店頭相場"] || 0),
        buy: Number(item.buy || item["買取目安"] || 0),
        source: item.source || item["根拠"] || "",
        updatedAt: item.updatedAt || item["更新日"] || todayISO(),
        confidence: item.confidence || item["信頼度"] || "要確認",
        memo: item.memo || item["メモ"] || ""
      }, index))
      .filter(isValidClub);

    if (!imported.length) {
      setImportStatus("有効データなし", "is-warning");
      elements.csvInput.value = "";
      return;
    }

    const result = mergeImportedClubs(imported);
    setImportStatus(`追加${result.added}件 更新${result.updated}件`, "is-ok");

    if (imported.length) {
      selectedIndex = 0;
      saveClubs();
      renderTable();
    }
    elements.csvInput.value = "";
  };
  reader.onerror = () => {
    setImportStatus("読み込み失敗", "is-warning");
    elements.csvInput.value = "";
  };
  reader.readAsText(file);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, "\"\"")}"` : text;
}

function exportCsv() {
  const headers = CSV_HEADERS;
  const body = clubs.map((club) => headers.map((key) => csvEscape(club[key])).join(","));
  const blob = new Blob([[headers.join(","), ...body].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "used-golf-market.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function applyExternalMarketToEdit() {
  updateExternalKeyword();
  const sale = Number(elements.externalSaleInput.value || 0);
  if (!sale) {
    elements.externalStatus.textContent = "確認価格を入力してください。";
    return;
  }

  const keyword = elements.externalKeywordInput.value.trim();
  const buy = Number(elements.externalBuyInput.value || 0) || roundToHundred(sale * 0.6);
  const source = `${elements.externalSourceSelect.value} ${todayISO()}`;
  const memoParts = [
    elements.externalMemoInput.value.trim(),
    keyword ? `外部確認キーワード: ${keyword}` : ""
  ].filter(Boolean);
  const currentClub = selectedIndex >= 0 ? clubs[selectedIndex] : null;

  if (!currentClub || isBuiltInSample(currentClub)) {
    startNewRecord();
    elements.editMaker.value = "外部確認";
    elements.editModel.value = keyword || "未設定";
    elements.editCategory.value = elements.categoryFilter.value || "ドライバー";
  }

  elements.editSale.value = sale;
  elements.editBuy.value = buy;
  elements.editSource.value = source;
  elements.editUpdatedAt.value = todayISO();
  elements.editConfidence.value = "相場確認";
  elements.editMemo.value = memoParts.join(" / ");
  elements.validationMessage.textContent = "外部確認価格を編集欄へ反映しました。内容を確認して保存してください。";
  elements.externalStatus.textContent = "査定価格を計算しました。保存ボタンで登録できます。";
  renderProposal();
}

function readEditForm() {
  return normalizeClub({
    id: draftMode ? `club-${Date.now()}` : clubs[selectedIndex]?.id || `club-${Date.now()}`,
    maker: elements.editMaker.value,
    model: elements.editModel.value,
    category: elements.editCategory.value,
    year: Number(elements.editYear.value || 0),
    loft: elements.editLoft.value,
    shaft: elements.editShaft.value,
    flex: elements.editFlex.value,
    sale: Number(elements.editSale.value || 0),
    buy: Number(elements.editBuy.value || 0),
    source: elements.editSource.value,
    updatedAt: elements.editUpdatedAt.value || todayISO(),
    confidence: elements.editConfidence.value,
    memo: elements.editMemo.value
  }, selectedIndex);
}

function saveEditedRecord(event) {
  event.preventDefault();
  const nextClub = readEditForm();
  if (!isValidClub(nextClub)) {
    elements.validationMessage.textContent = "メーカー、モデル、種類、店頭相場、買取目安を確認してください。";
    return;
  }

  if (draftMode) {
    clubs.unshift(nextClub);
    selectedIndex = 0;
    draftMode = false;
  } else {
    clubs[selectedIndex] = nextClub;
  }
  saveClubs();
  renderTable();
}

function startNewRecord() {
  draftMode = true;
  const blank = normalizeClub({
    id: `club-${Date.now()}`,
    maker: "",
    model: "",
    category: "ドライバー",
    year: new Date().getFullYear(),
    loft: "",
    shaft: "",
    flex: "",
    sale: 0,
    buy: 0