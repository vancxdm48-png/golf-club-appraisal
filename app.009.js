,
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
