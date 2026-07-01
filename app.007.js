  return `
        <div class="category-bar">
          <div class="bar-label"><span>${category}</span><strong>${count}件</strong></div>
          <div class="bar-track"><span style="width: ${width}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function applyDemoMarket() {
  const averageSale = roundToHundred((DEMO_MARKET.yahoo + DEMO_MARKET.mercari + DEMO_MARKET.rakuten) / 3);
  elements.search.value = DEMO_MARKET.keyword;
  elements.categoryFilter.value = DEMO_MARKET.category;
  elements.externalKeywordInput.value = DEMO_MARKET.keyword;
  elements.externalSaleInput.value = averageSale;
  elements.externalBuyInput.value = DEMO_MARKET.buy;
  elements.externalSourceSelect.value = "Yahoo!オークション落札確認";
  elements.externalMemoInput.value = `ヤフオク ${yen(DEMO_MARKET.yahoo)} / メルカリ ${yen(DEMO_MARKET.mercari)} / 楽天 ${yen(DEMO_MARKET.rakuten)} を確認。推奨買取 ${yen(DEMO_MARKET.buy)}。`;
  elements.externalStatus.textContent = "TaylorMade SIM2 MAXのサンプル相場を表示しました。外部リンクで実価格を確認できます。";
  renderTableWithAutoSelect();
}

function getAuditRows() {
  return clubs.map((club) => {
    const issues = getAuditIssues(club);
    return {
      club,
      issues,
      margin: baseMarginRate(club),
      daysOld: daysSince(club.updatedAt)
    };
  });
}

function getAuditSummary() {
  const rows = getAuditRows();
  return {
    total: rows.length,
    issues: rows.filter((row) => row.issues.length).length,
    samples: rows.filter((row) => row.club.source === "内蔵サンプル").length,
    stale: rows.filter((row) => !row.club.updatedAt || row.daysOld > DATA_FRESH_DAYS).length,
    lowMargin: rows.filter((row) => row.club.sale && row.club.buy && row.margin < LOW_MARGIN_THRESHOLD).length,
    clean: rows.filter((row) => !row.issues.length).length
  };
}

function renderAudit() {
  const summary = getAuditSummary();
  const cards = [
    { label: "総登録", value: `${summary.total}件`, className: "is-neutral" },
    { label: "要確認", value: `${summary.issues}件`, className: summary.issues ? "is-warning" : "is-ok" },
    { label: "内蔵サンプル", value: `${summary.samples}件`, className: summary.samples ? "is-warning" : "is-ok" },
    { label: "更新切れ", value: `${summary.stale}件`, className: summary.stale ? "is-warning" : "is-ok" },
    { label: "低粗利", value: `${summary.lowMargin}件`, className: summary.lowMargin ? "is-danger" : "is-ok" },
    { label: "確認済み", value: `${summary.clean}件`, className: "is-ok" }
  ];

  elements.auditSummary.innerHTML = cards
    .map((card) => `
      <div class="audit-card ${card.className}">
        <span>${card.label}</span>
        <strong>${card.value}</strong>
      </div>
    `)
    .join("");
}

function clampPercent(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(80, Math.max(5, number));
}

function getProposal() {
  let baseClub = selectedIndex >= 0 ? clubs[selectedIndex] : null;
  if (draftMode || !baseClub) {
    const draftClub = readEditForm();
    if (isValidClub(draftClub)) baseClub = draftClub;
  }
  if (!baseClub) return null;

  const condition = conditionRates[elements.proposalCondition.value] || conditionRates.B;
  const stock = proposalStockRates[elements.proposalStock.value] || proposalStockRates.normal;
  const accessories = proposalAccessoryRates[elements.proposalAccessories.value] || proposalAccessoryRates.normal;
  const targetMargin = clampPercent(elements.targetMarginInput.value, 35);
  const repairCost = Math.max(0, Number(elements.repairCostInput.value || 0));
  const sale = roundToHundred(baseClub.sale * condition.sale * stock.sale * accessories.sale);
  const marketBuy = roundToHundred(baseClub.buy * condition.buy * stock.buy * accessories.buy);
  const buyLimitByMargin = roundToHundred(sale * (1 - targetMargin / 100) - repairCost);
  const buyMax = Math.max(0, Math.min(marketBuy, buyLimitByMargin));
  const profit = Math.max(0, sale - buyMax - repairCost);
  const actualMargin = sale ? (profit / sale) * 100 : 0;
  const risk = getRiskStatus(baseClub);
  const issues = getAuditIssues(baseClub);
  const advice = [];

  if (issues.length) advice.push(`データ要確認: ${risk.text}`);
  if (buyLimitByMargin < marketBuy) advice.push("目標粗利を優先し、買取上限を相場目安より抑えています。");
  if (elements.proposalStock.value === "slow") advice.push("在庫回転が遅い設定のため、販売価格と買取上限を控えめにしています。");
  if (repairCost > 0) advice.push(`整備費 ${yen(repairCost)} を差し引いています。`);
  if (!advice.length) advice.push("現在の条件では、相場目安の範囲で提案できます。");

  return {
    club: baseClub,
    sale,
    marketBuy,
    buyMax,
    profit,
    actualMargin,
    targetMargin,
    repairCost,
    conditionLabel: condition.label,
    stockLabel: stock.label,
    accessoriesLabel: accessories.label,
    dataStatus: risk.label,
    dataIssues: risk.issues,
    advice: advice.join(" ")
  };
}

function renderProposal() {
  const proposal = getProposal();
  if (!proposal) return;

  elements.proposalSale.textContent = yen(proposal.sale);
  elements.proposalBuyMax.textContent = yen(proposal.buyMax);
  elements.proposalProfit.textContent = yen(proposal.profit);
  elements.proposalMargin.textContent = `${Math.round(proposal.actualMargin)}%`;
  elements.proposalAdvice.textContent = proposal.advice;
}

function getAppraisalReview(proposal, actionLabel) {
  if (!proposal || proposal.dataStatus === "査定利用OK") {
    return {
      status: "確認不要",
      confirmedAt: "",
      action: actionLabel
    };
  }

  const message = [
    "このデータは査定前確認が必要です。",
    "",
    `クラブ: ${proposal.club.maker} ${proposal.club.model}`,
    `確認内容: ${proposal.dataIssues}`,
    "",
    `${actionLabel}を続けますか？`
  ].join("\n");

  if (!confirm(message)) return null;

  return {
    status: "要確認を確認して実行",
    confirmedAt: new Date().toISOString(),
    action: actionLabel
  };
}

function buildAppraisalRecord(review = { status: "未確認", confirmedAt: "", action: "" }) {
  const proposal = getProposal();
  if (!proposal) return null;

  return {
    id: `appraisal-${Date.now()}`,
    date: elements.appraisalDateInput.value || todayISO(),
    staffName: elements.staffNameInput.value.trim(),
    customerName: elements.customerNameInput.value.trim(),
    dealStatus: elements.dealStatusInput.value,
    maker: proposal.club.maker,
    model: proposal.club.model,
    category: proposal.club.category,
    year: proposal.club.year,
    loft: proposal.club.loft,
    shaft: proposal.club.shaft,
    flex: proposal.club.flex,
    condition: proposal.conditionLabel,
    stock: proposal.stockLabel,
    accessories: proposal.accessoriesLabel,
    targetMargin: proposal.targetMargin,
    repairCost: proposal.repairCost,
    saleProposal: proposal.sale,
    buyLimit: proposal.buyMax,
    profit: proposal.profit,
    margin: Math.round(proposal.actualMargin),
    source: proposal.club.source || "",
    updatedAt: proposal.club.updatedAt || "",
    confidence: proposal.club.confidence || "",
    dataStatus: proposal.dataStatus,
    dataIssues: proposal.dataIssues,
    reviewStatus: review.status,
    reviewConfirmedAt: review.confirmedAt,
    reviewAction: review.action,
    advice: proposal.advice
  };
}

function saveCurrentAppraisal() {
  const proposal = getProposal();
  if (!proposal) return;
  const review = getAppraisalReview(proposal, "履歴保存");
  if (!review) return;
  const record = buildAppraisalRecord(review);
  if (!record) return;
  appraisalHistory.unshift(record);
  appraisalHistory = appraisalHistory.slice(0, 300);
  saveHistory();
  renderHistory();
  elements.saveAppraisalButton.textContent = "保存しました";
  setTimeout(() => {
    elements.saveAppraisalButton.textContent = "履歴に保存";
  }, 1200);
}

function renderHistory() {
  if (!appraisalHistory.length) {
    elements.historyList.innerHTML = `<p class="empty-history">まだ査定履歴がありません。</p>`;
    return;
  }

  elements.historyList.innerHTML = appraisalHistory.slice(0, 20).map((record) => `
    <div class="history-item">
      <div>
        <strong>${record.maker} ${record.model}</strong>
        <span>${record.date} / ${record.dealStatus} / ${record.staffName || "担当未入力"}</span>
      </div>
      <div>
        <strong>${yen(record.buyLimit)}</strong>
        <span>販売 ${yen(record.saleProposal)} / 粗利率 ${record.margin}% / ${escapeHtml(record.dataStatus || "確認未記録")} / ${escapeHtml(record.reviewStatus || "確認未記録")}</span>
      </div>
    </div>
  `).join("");
}

function updateAppStatus() {
  elements.versionLabel.textContent = APP_VERSION;
  elements.storageStatus.textContent = canUseLocalStorage() ? "保存OK" : "保存不可";
  elements.storageStatus.className = canUseLocalStorage() ? "is-ok" : "is-warning";

  if (!("serviceWorker" in navigator)) {
    elements.offlineStatus.textContent = location.protocol === "file:" ? "直接起動" : "オフライン非対応";
    elements.offlineStatus.className = "is-warning";
    return;
  }

  if (location.protocol === "file:") {
    elements.offlineStatus.textContent = "直接起動";
    elements.offlineStatus.className = "is-warning";
    return;
  }

  navigator.serviceWorker.register("./sw.js")
    .then(() => {
      elements.offlineStatus.textContent = "オフラインOK";
      elements.offlineStatus.className = "is-ok";
    })
    .catch(() => {
      elements.offlineStatus.textContent = "オフライン未設定";
      elements.offlineStatus.className = "is-warning";
    });
}

function exportHistoryCsv() {
  const headers = [
    "date", "staffName", "customerName", "dealStatus", "maker", "model", "category", "year", "loft", "shaft", "flex",
    "condition", "stock", "accessories", "targetMargin", "repairCost", "saleProposal", "buyLimit", "profit", "margin",
    "source", "updatedAt", "confidence", "dataStatus", "dataIssues", "reviewStatus", "reviewConfirmedAt", "reviewAction", "advice"
  ];
  const body = appraisalHistory.map((record) => headers.map((key) => csvEscape(record[key])).join(","));
  const blob = new Blob([[headers.join(","), ...body].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `used-golf-appraisal-history-${todayISO()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clearHistory() {
  if (!appraisalHistory.length) return;
  if (!confirm("査定履歴をすべて削除しますか？")) return;
  appraisalHistory = [];
  saveHistory();
  renderHistory();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildPrintSheet(review) {
  const record = buildAppraisalRecord(review);
  if (!record) return "";

  return `
    <div class="print-document">
      <header>
        <div>
          <p>中古ゴルフクラブ相場サイト</p>
          <h1>査定票</h1>
        </div>
        <dl>
          <div><dt>査定日</dt><dd>${escapeHtml(record.date)}</dd></div>
          <div><dt>担当者</dt><dd>${escapeHtml(record.staffName || "未入力")}</dd></div>
          <div><dt>お客様名</dt><dd>${escapeHtml(record.customerName || "未入力")}</dd></div>
          <div><dt>対応状況</dt><dd>${escapeHtml(record.dealStatus)}</dd></div>
        </dl>
      </header>

      <section>
        <h2>クラブ情報</h2>
        <table>
          <tbody>
            <tr><th>メーカー / モデル</th><td>${escapeHtml(record.maker)} ${escapeHtml(record.model)}</td></tr>
            <tr><th>種類</th><td>${escapeHtml(record.category)}</td></tr>
            <tr><th>年式</th><td>${escapeHtml(record.year)}</td></tr>
            <tr><th>仕様</th><td>${escapeHtml(record.loft)} / ${escapeHtml(record.shaft)} / ${escapeHtml(record.flex)}</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>査定条件</h2>
        <table>
          <tbody>
            <tr><th>状態</th><td>${escapeHtml(record.condition)}</td></tr>
            <tr><th>在庫回転</th><td>${escapeHtml(record.stock)}</td></tr>
            <tr><th>付属品</th><td>${escapeHtml(record.accessories)}</td></tr>
            <tr><th>目標粗利率</th><td>${escapeHtml(record.targetMargin)}%</td></tr>
            <tr><th>整備費</th><td>${yen(record.repairCost)}</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>提案価格</h2>
        <div class="print-price-grid">
          <div><span>販売提案</span><strong>${yen(record.saleProposal)}</strong></div>
          <div><span>買取上限</span><strong>${yen(record.buyLimit)}</strong></div>
          <div><span>想定粗利</span><strong>${yen(record.profit)}</strong></div>
          <div><span>粗利率</span><strong>${escapeHtml(record.margin)}%</strong></div>
        </div>
      </section>

      <section>
        <h2>根拠・確認</h2>
        <table>
          <tbody>
            <tr><th>根拠</th><td>${escapeHtml(record.source || "未設定")}</td></tr>
            <tr><th>更新日</th><td>${escapeHtml(record.updatedAt || "未設定")}</td></tr>
            <tr><th>信頼度</th><td>${escapeHtml(record.confidence || "未設定")}</td></tr>
            <tr><th>査定確認</th><td>${escapeHtml(record.dataStatus || "確認未記録")}</td></tr>
            <tr><th>確認内容</th><td>${escapeHtml(record.dataIssues || "未設定")}</td></tr>
            <tr><th>実行確認</th><td>${escapeHtml(record.reviewStatus || "未確認")}</td></tr>
            <tr><th>確認日時</th><td>${escapeHtml(record.reviewConfirmedAt || "不要")}</td></tr>
            <tr><th>判断メモ</th><td>${escapeHtml(record.advice)}</td></tr>
          </tbody>
        </table>
      </section>

      <footer>
        <p>提示額は現物確認、付属品、相場変動により変更される場合があります。</p>
        <div>お客様確認欄: ________________________________</div>
      </footer>
    </div>
  `;
}

function printAppraisalSheet() {
  const proposal = getProposal();
  if (!proposal) return;
  const review = getAppraisalReview(proposal, "査定票印刷");
  if (!review) return;
  elements.printSheet.innerHTML = buildPrintSheet(review);
  window.print();
}

function matchesQualityFilter(club) {
  const filter = elements.qualityFilter.value;
  const issues = getAuditIssues(club);
  if (!filter) return true;
  if (filter 