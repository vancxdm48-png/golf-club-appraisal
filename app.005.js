 52800, buy: 33000, memo: "高額帯。偽物対策と付属品確認が必須。" },
  { maker: "PING", model: "PLD ANSER", category: "パター", year: 2022, loft: "34inch", shaft: "Steel", flex: "-", sale: 31800, buy: 19000, memo: "高価格帯パター。打痕とグリップ状態を確認。" },
  { maker: "TaylorMade", model: "Spider Tour X", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 28800, buy: 17000, memo: "大型マレット需要。塗装欠けを確認。" },
  { maker: "Bettinardi", model: "Queen B 6", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 42800, buy: 26000, memo: "高額帯。状態と純正カバー有無を確認。" },

  { maker: "Fujikura", model: "VENTUS BLACK", category: "シャフト", year: 2024, loft: "ドライバー用", shaft: "VENTUS BLACK 6", flex: "S", sale: 29800, buy: 17000, memo: "VELOCORE表記、長さ、スリーブ種別を確認。" },
  { maker: "Graphite Design", model: "TOUR AD VF", category: "シャフト", year: 2024, loft: "ドライバー用", shaft: "TOUR AD VF-5", flex: "S", sale: 24800, buy: 14000, memo: "スリーブ、長さ、グリップ状態で差が出る。" },
  { maker: "PING", model: "G430 MAX ヘッド", category: "ヘッドのみ", year: 2022, loft: "10.5", shaft: "ヘッドのみ", flex: "-", sale: 29800, buy: 17500, memo: "ヘッド単体。レンチ、カバー、ウェイト状態を確認。" }
].map((club) => ({
  ...club,
  source: "現在相場サンプル 2026-07-01",
  updatedAt: "2026-07-01",
  confidence: "参考",
  memo: `${club.memo} 実査定前に外部相場を確認。`
}));

const extraCurrentMarketSampleData = [
  { maker: "PING", model: "G440 MAX", category: "ドライバー", year: 2025, loft: "10.5", shaft: "ALTA J CB BLUE", flex: "S", sale: 64800, buy: 40000, memo: "新しめのPING主力。新品実売との差を確認。" },
  { maker: "PING", model: "G440 LST", category: "ドライバー", year: 2025, loft: "9.0", shaft: "PING TOUR 2.0 BLACK", flex: "S", sale: 69800, buy: 44000, memo: "低スピン系。対象客は絞られるが美品は強め。" },
  { maker: "TaylorMade", model: "Qi35 MAX", category: "ドライバー", year: 2025, loft: "10.5", shaft: "Diamana BLUE TM50", flex: "S", sale: 69800, buy: 44000, memo: "高年式。流通量が増える前提で外部確認。" },
  { maker: "TaylorMade", model: "Qi35 LS", category: "ドライバー", year: 2025, loft: "9.0", shaft: "Diamana BLACK TM60", flex: "S", sale: 72800, buy: 46000, memo: "低スピン系。ロフトとシャフトで価格差。" },
  { maker: "Callaway", model: "ELYTE X", category: "ドライバー", year: 2025, loft: "10.5", shaft: "VENTUS GREEN 5 for Callaway", flex: "SR", sale: 62800, buy: 39000, memo: "つかまり系。軽量仕様は状態重視。" },
  { maker: "Titleist", model: "GT3", category: "ドライバー", year: 2024, loft: "9.0", shaft: "TENSEI 1K BLACK", flex: "S", sale: 72800, buy: 46000, memo: "競技志向。純正とカスタムで差が大きい。" },
  { maker: "DUNLOP", model: "XXIO 14", category: "ドライバー", year: 2025, loft: "10.5", shaft: "MP1400", flex: "R", sale: 62800, buy: 39000, memo: "軽量最新系。シニア需要を確認。" },
  { maker: "SRIXON", model: "ZXi5", category: "ドライバー", year: 2024, loft: "9.5", shaft: "Diamana ZXi", flex: "S", sale: 49800, buy: 30000, memo: "競技寄り国内モデル。状態で差が出る。" },

  { maker: "PING", model: "G440 MAX", category: "フェアウェイウッド", year: 2025, loft: "5W 18", shaft: "ALTA J CB BLUE", flex: "S", sale: 42800, buy: 26000, memo: "新しめのFW。カバー有無を確認。" },
  { maker: "TaylorMade", model: "Qi35 MAX", category: "フェアウェイウッド", year: 2025, loft: "5W 18", shaft: "Diamana BLUE TM50", flex: "S", sale: 44800, buy: 27000, memo: "高年式FW。新品価格とのバランス確認。" },
  { maker: "Callaway", model: "ELYTE", category: "フェアウェイウッド", year: 2025, loft: "5W 18", shaft: "VENTUS GREEN 5 for Callaway", flex: "S", sale: 43800, buy: 26500, memo: "高年式。ソール傷とカバー有無を確認。" },
  { maker: "Titleist", model: "GT2", category: "フェアウェイウッド", year: 2024, loft: "3W 15", shaft: "TENSEI 1K BLUE", flex: "S", sale: 44800, buy: 27000, memo: "競技層需要。3Wは対象客を確認。" },
  { maker: "DUNLOP", model: "XXIO 14", category: "フェアウェイウッド", year: 2025, loft: "5W 18", shaft: "MP1400", flex: "R", sale: 42800, buy: 26000, memo: "軽量FW。シニア層向けに強い。" },
  { maker: "SRIXON", model: "ZXi", category: "フェアウェイウッド", year: 2024, loft: "5W 18", shaft: "Diamana ZXi", flex: "S", sale: 34800, buy: 20500, memo: "国内競技系。シャフトで相場差。" },

  { maker: "PING", model: "G440 HYBRID", category: "ユーティリティ", year: 2025, loft: "U4 22", shaft: "ALTA J CB BLUE", flex: "S", sale: 34800, buy: 21000, memo: "新しめUT。番手とカバー有無を確認。" },
  { maker: "TaylorMade", model: "Qi35 RESCUE", category: "ユーティリティ", year: 2025, loft: "U4 22", shaft: "Diamana BLUE TM60", flex: "S", sale: 35800, buy: 21500, memo: "高年式。ロフト違いに注意。" },
  { maker: "Callaway", model: "ELYTE HYBRID", category: "ユーティリティ", year: 2025, loft: "U4 21", shaft: "VENTUS GREEN 5 for Callaway", flex: "S", sale: 34800, buy: 21000, memo: "高年式UT。状態と付属品を確認。" },
  { maker: "Titleist", model: "GT2 HYBRID", category: "ユーティリティ", year: 2024, loft: "U4 21", shaft: "TENSEI 1K HY", flex: "S", sale: 33800, buy: 20500, memo: "競技向け。シャフト重量で需要差。" },
  { maker: "DUNLOP", model: "XXIO 14", category: "ユーティリティ", year: 2025, loft: "H5 23", shaft: "MP1400", flex: "R", sale: 34800, buy: 21000, memo: "軽量UT。シニア層需要。" },
  { maker: "BRIDGESTONE", model: "B3 MAX", category: "ユーティリティ", year: 2024, loft: "H4 22", shaft: "VANQUISH BS50h", flex: "S", sale: 25800, buy: 15000, memo: "国内ブランド。買い足し需要あり。" },

  { maker: "PING", model: "G440", category: "アイアンセット", year: 2025, loft: "6本セット", shaft: "N.S.PRO 850GH neo", flex: "S", sale: 92800, buy: 59000, memo: "新しめのやさしい系。カラーコード確認。" },
  { maker: "PING", model: "BLUEPRINT S", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 115", flex: "S", sale: 108000, buy: 70000, memo: "上級者向け高年式。ライ角カラー確認。" },
  { maker: "TaylorMade", model: "Qi35 IRON", category: "アイアンセット", year: 2025, loft: "5本セット", shaft: "Diamana BLUE TM60", flex: "S", sale: 92800, buy: 59000, memo: "高年式飛び系。カーボン仕様は状態重視。" },
  { maker: "TaylorMade", model: "P770 2024", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 99800, buy: 65000, memo: "人気中空系。フェース摩耗を確認。" },
  { maker: "Callaway", model: "ELYTE X", category: "アイアンセット", year: 2025, loft: "5本セット", shaft: "SPEEDER NX 40 for Callaway", flex: "R", sale: 92800, buy: 59000, memo: "軽量飛び系。シニア層向け。" },
  { maker: "Callaway", model: "APEX Ai300", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 99800, buy: 65000, memo: "やさしいAPEX系。状態差が大きい。" },
  { maker: "Titleist", model: "T350 2023", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "N.S.PRO 880 AMC", flex: "S", sale: 79800, buy: 48500, memo: "やさしいTitleist。番手構成確認。" },
  { maker: "Titleist", model: "T100 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold 120", flex: "S200", sale: 92800, buy: 59000, memo: "競技志向。摩耗とライ角調整跡確認。" },
  { maker: "DUNLOP", model: "XXIO 14", category: "アイアンセット", year: 2025, loft: "5本セット", shaft: "MP1400", flex: "R", sale: 99800, buy: 65000, memo: "最新軽量系。状態と番手構成を確認。" },
  { maker: "DUNLOP", model: "XXIO 13 LADIES", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "MP1300L", flex: "L", sale: 74800, buy: 44000, memo: "レディース需要。長さとグリップ確認。" },
  { maker: "SRIXON", model: "ZXi5", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 82800, buy: 50000, memo: "中級者向け競技系。状態で評価。" },
  { maker: "SRIXON", model: "ZXi7", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "Dynamic Gold DST", flex: "S200", sale: 89800, buy: 56000, memo: "上級者向け。フェース摩耗確認。" },
  { maker: "MIZUNO", model: "Mizuno Pro 243", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold 95", flex: "S200", sale: 85800, buy: 52000, memo: "軟鉄系。打痕とメッキ状態を確認。" },
  { maker: "MIZUNO", model: "JPX 925 HOT METAL", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 82800, buy: 50000, memo: "飛び系。番手構成を確認。" },
  { maker: "BRIDGESTONE", model: "241CB", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 85800, buy: 52000, memo: "国内軟鉄系。美品は強め。" },
  { maker: "YAMAHA", model: "inpres DRIVESTAR", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "SPEEDER NX for Yamaha", flex: "R", sale: 79800, buy: 48500, memo: "軽量飛び系。シニア需要。" },
  { maker: "PRGR", model: "05 IRON", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "MCI FOR PRGR", flex: "R", sale: 59800, buy: 35000, memo: "やさしい飛び系。R需要確認。" },

  { maker: "Titleist", model: "VOKEY SM10", category: "ウェッジ", year: 2024, loft: "50", shaft: "Dynamic Gold", flex: "S200", sale: 15800, buy: 8600, memo: "ロフトとグラインド表記を確認。" },
  { maker: "Titleist", model: "VOKEY SM10", category: "ウェッジ", year: 2024, loft: "58", shaft: "Dynamic Gold", flex: "S200", sale: 15800, buy: 8600, memo: "バウンスとグラインドで差が出る。" },
  { maker: "Cleveland", model: "RTX 6 ZIPCORE", category: "ウェッジ", year: 2023, loft: "52", shaft: "Dynamic Gold", flex: "S200", sale: 10800, buy: 5200, memo: "溝摩耗とサビを確認。" },
  { maker: "Callaway", model: "JAWS RAW", category: "ウェッジ", year: 2022, loft: "58", shaft: "Dynamic Gold", flex: "S200", sale: 9800, buy: 4600, memo: "ノーメッキ部の状態を説明。" },
  { maker: "MIZUNO", model: "T24", category: "ウェッジ", year: 2023, loft: "56", shaft: "Dynamic Gold 95", flex: "S200", sale: 12800, buy: 6500, memo: "軟鉄ウェッジ。状態良好なら評価。" },
  { maker: "FOURTEEN", model: "DJ-6", category: "ウェッジ", year: 2023, loft: "56", shaft: "N.S.PRO TS-114w", flex: "WEDGE", sale: 12800, buy: 6500, memo: "やさしいウェッジ。ソール状態確認。" },

  { maker: "Odyssey", model: "AI-ONE MILLED #7 T", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 39800, buy: 24000, memo: "高年式。カバー有無で差。" },
  { maker: "Odyssey", model: "WHITE HOT VERSA #7", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 19800, buy: 11000, memo: "人気形状。塗装欠けを確認。" },
  { maker: "Scotty Cameron", model: "PHANTOM 5.5", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 62800, buy: 39000, memo: "高額帯。偽物対策必須。" },
  { maker: "Scotty Cameron", model: "STUDIO STYLE NEWPORT 2", category: "パター", year: 2025, loft: "34inch", shaft: "Steel", flex: "-", sale: 74800, buy: 48000, memo: "新しめ高額帯。付属品確認。" },
  { maker: "PING", model: "2024 ANSER 2D", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 24800, buy: 14500, memo: "定番形状。グリップ状態確認。" },
  { maker: "TaylorMade", model: "Spider Tour Z", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 28800, buy: 17000, memo: "大型マレット。塗装状態確認。" },
  { maker: "Bettinardi", model: "BB1", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 45800, buy: 28000, memo: "高額帯。カバー有無確認。" },

  { maker: "Fujikura", model: "VENTUS BLUE", category: "シャフト", year: 2024, loft: "ドライバー用", shaft: "VENTUS BLUE 5", flex: "S", sale: 27800, buy: 16000, memo: "VELOCORE有無、長さ、スリーブ確認。" },
  { maker: "Fujikura", model: "SPEEDER NX BLACK", category: "シャフト", year: 2023, loft: "ドライバー用", shaft: "SPEEDER NX BLACK 50", flex: "S", sale: 22800, buy: 12500, memo: "スリーブ種別と長さ確認。" },
  { maker: "Mitsubishi Chemical", model: "Diamana WB", category: "シャフト", year: 2024, loft: "ドライバー用", shaft: "Diamana WB 53", flex: "S", sale: 24800, buy: 14000, memo: "カスタムシャフト。傷とチップカット確認。" },
  { maker: "Graphite Design", model: "TOUR AD DI", category: "シャフト", year: 2023, loft: "ドライバー用", shaft: "TOUR AD DI-6", flex: "S", sale: 19800, buy: 11000, memo: "定番。スリーブと長さで差。" },
  { maker: "PING", model: "G440 MAX ヘッド", category: "ヘッドのみ", year: 2025, loft: "10.5", shaft: "ヘッドのみ", flex: "-", sale: 49800, buy: 30000, memo: "ヘッド単体。カバー、レンチ、ウェイト確認。" },
  { maker: "TaylorMade", model: "Qi10 MAX ヘッド", category: "ヘッドのみ", year: 2024, loft: "10.5", shaft: "ヘッドのみ", flex: "-", sale: 39800, buy: 23500, memo: "ヘッド単体。クラウン傷とスリーブ周り確認。" }
].map((club) => ({
  ...club,
  source: "追加現在相場サンプル 2026-07-01",
  updatedAt: "2026-07-01",
  confidence: "参考",
  memo: `${club.memo} 実査定前に外部相場を確認。`
}));

const sampleCatalog = [...currentMarketSampleData, ...extraCurrentMarketSampleData];

function makeClubId(club, index = 0) {
  return normalizeSearchText(`${club.maker}-${club.model}-${club.category}-${club.year}-${club.loft}-${club.shaft}-${index}`);
}

function makeCatalogKey(club) {
  return normalizeSearchText(`${club.maker}-${club.model}-${club.category}-${club.year}-${club.loft}-${club.shaft}-${club.flex}`);
}

function normalizeClub(club, index = 0) {
  return {
    id: club.id || makeClubId(club, in