div><dt>お客様名</dt><dd>${escapeHtml(record.customerName || "未入力")}</dd></div>
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
  if (filter === "issues") return issues.length > 0;
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

  imported.forE