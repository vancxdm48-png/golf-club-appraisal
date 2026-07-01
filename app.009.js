ach((club) => {
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
    buy: 0,
    source: "",
    updatedAt: todayISO(),
    confidence: "要確認",
    memo: ""
  });
  elements.selectedCategory.textContent = "新規";
  elements.selectedName.textContent = "新しいクラブデータ";
  elements.selectedSpec.textContent = "入力後に保存してください。";
  elements.selectedSale.textContent = yen(0);
  elements.selectedBuy.textContent = yen(0);
  elements.selectedLow.textContent = yen(0);
  elements.selectedHigh.textContent = yen(0);
  elements.selectedMemo.textContent = "";
  elements.selectedSource.textContent = "未設定";
  elements.selectedUpdatedAt.textContent = blank.updatedAt;
  elements.selectedConfidence.textContent = blank.confidence;
  const risk = getRiskStatus(blank);
  elements.selectedRiskBox.className = risk.className;
  elements.selectedRiskLabel.textContent = risk.label;
  elements.selectedRiskText.textContent = risk.text;
  elements.meterFill.style.width = "0%";
  fillEditForm(blank);
}

async function copySelected() {
  if (selectedIndex < 0 || !clubs[selectedIndex]) return;
  const club = pricedClub(clubs[selectedIndex]);
  const text = [
    `${club.maker} ${club.model}`,
    `種類: ${club.category}`,
    `仕様: ${club.year}年 / ${club.loft} / ${club.shaft} / ${club.flex}`,
    `店頭相場: ${yen(club.adjustedSale)}`,
    `買取目安: ${yen(club.adjustedBuy)}`,
    `根拠: ${club.source || "未設定"}`,
    `更新日: ${club.updatedAt || "未設定"}`,
    `信頼度: ${club.confidence || "未設定"}`,
    `査定確認: ${getRiskStatus(club).label}`,
    `確認内容: ${getRiskStatus(club).issues}`,
    `メモ: ${club.memo}`
  ].join("\n");

  await navigator.clipboard.writeText(text);
  elements.copyButton.textContent = "コピーしました";
  setTimeout(() => {
    elements.copyButton.textContent = "相場メモをコピー";
  }, 1200);
}

async function copyProposal() {
  const proposal = getProposal();
  if (!proposal) return;

  const text = [
    `${proposal.club.maker} ${proposal.club.model}`,
    `条件: ${proposal.conditionLabel} / ${proposal.stockLabel} / ${proposal.accessoriesLabel}`,
    `販売提案: ${yen(proposal.sale)}`,
    `買取上限: ${yen(proposal.buyMax)}`,
    `想定粗利: ${yen(proposal.profit)}`,
    `粗利率: ${Math.round(proposal.actualMargin)}%`,
    `目標粗利率: ${proposal.targetMargin}%`,
    `査定確認: ${proposal.dataStatus}`,
    `確認内容: ${proposal.dataIssues}`,
    `整備費: ${yen(proposal.repairCost)}`,
    `判断メモ: ${proposal.advice}`
  ].join("\n");

  await navigator.clipboard.writeText(text);
  elements.copyProposalButton.textContent = "コピーしました";
  setTimeout(() => {
    elements.copyProposalButton.textContent = "提案をコピー";
  }, 1200);
}

function renderTableWithAutoSelect() {
  draftMode = false;
  elements.externalKeywordInput.value = elements.search.value.trim();
  renderTable({ autoSelectFirst: true });
}

elements.search.addEventListener("input", renderTableWithAutoSelect);
elements.demoAppraiseButton.addEventListener("click", applyDemoMarket);
elements.categoryFilter.addEventListener("change", renderTableWithAutoSelect);
elements.conditionFilter.addEventListener("change", renderTableWithAutoSelect);
elements.qualityFilter.addEventListener("change", renderTableWithAutoSelect);
elements.sortSelect.addEventListener("change", renderTableWithAutoSelect);
elements.minMarginInput.addEventListener("input", renderTableWithAutoSelect);
elements.exportCsvButton.addEventListener("click", exportCsv);
elements.copyButton.addEventListener("click", copySelected);
elements.saveAppraisalButton.addEventListener("click", saveCurrentAppraisal);
elements.copyProposalButton.addEventListener("click", copyProposal);
elements.printAppraisalButton.addEventListener("click", printAppraisalSheet);
elements.openYahooSoldButton.addEventListener("click", () => openExternalMarket("yahooSold"));
elements.openRakutenButton.addEventListener("click", () => openExternalMarket("rakuten"));
elements.openMercariButton.addEventListener("click", () => openExternalMarket("mercari"));
elements.openKakakuButton.addEventListener("click", () => openExternalMarket("kakaku"));
elements.openGoogleButton.addEventListener("click", () => openExternalMarket("google"));
elements.applyExternalMarketButton.addEventListener("click", applyExternalMarketToEdit);
elements.exportHistoryButton.addEventListener("click", exportHistoryCsv);
elements.clearHistoryButton.addEventListener("click", clearHistory);
[
  elements.proposalCondition,
  elements.proposalStock,
  elements.proposalAccessories,
  elements.targetMarginInput,
  elements.repairCostInput
].forEach((element) => element.addEventListener("input", renderProposal));
[
  elements.proposalCondition,
  elements.proposalStock,
  elements.proposalAccessories
].forEach((element) => element.addEventListener("change", renderProposal));
elements.editForm.addEventListener("submit", saveEditedRecord);
elements.newRecordButton.addEventListener("click", startNewRecord);
elements.csvInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importCsv(file);
});
elements.table.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-index]");
  if (!row) return;
  draftMode = false;
  selectedIndex = Number(row.dataset.index);
  renderTable({ autoSelectFirst: false });
});
elements.tableCategoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  elements.categoryFilter.value = button.dataset.category;
  renderTableWithAutoSelect();
});

elements.appraisalDateInput.value = elements.appraisalDateInput.value || todayISO();
updateAppStatus();
renderTable({ autoSelectFirst: true });
updateExternalKeyword();
renderHistory();
