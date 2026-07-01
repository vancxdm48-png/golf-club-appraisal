OBRA", model: "KING RADSPEED", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "KBS TOUR 90", flex: "S", sale: 34800, buy: 18500, memo: "価格訴求型。初心者から中級者向け。" },
  { maker: "COBRA", model: "KING TOUR 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "KBS TOUR", flex: "S", sale: 69800, buy: 41000, memo: "ツアー系。流通量は少なめで状態が重要。" }
];

const conditionRates = {
  S: { sale: 1.12, buy: 1.15, label: "美品S" },
  A: { sale: 1.06, buy: 1.08, label: "良品A" },
  B: { sale: 1, buy: 1, label: "標準B" },
  C: { sale: 0.84, buy: 0.78, label: "傷ありC" },
  D: { sale: 0.62, buy: 0.5, label: "難ありD" }
};

const proposalStockRates = {
  fast: { sale: 1.03, buy: 1.05, label: "回転早い" },
  normal: { sale: 1, buy: 1, label: "回転標準" },
  slow: { sale: 0.94, buy: 0.88, label: "回転遅い" }
};

const proposalAccessoryRates = {
  full: { sale: 1.02, buy: 1.04, label: "付属品完備" },
  normal: { sale: 1, buy: 1, label: "付属品標準" },
  missing: { sale: 0.95, buy: 0.9, label: "付属品不足" }
};

const aliasGroups = [
  ["PING", "ピン"],
  ["TaylorMade", "テーラーメイド", "テイラーメイド", "テーラー", "テイラー"],
  ["Callaway", "キャロウェイ", "キャラウェイ"],
  ["DUNLOP", "ダンロップ", "XXIO", "ゼクシオ"],
  ["Titleist", "タイトリスト", "VOKEY", "ボーケイ"],
  ["Odyssey", "オデッセイ"],
  ["MIZUNO", "ミズノ"],
  ["BRIDGESTONE", "ブリヂストン", "ブリジストン"],
  ["YAMAHA", "ヤマハ"],
  ["PRGR", "プロギア"],
  ["HONMA", "ホンマ", "本間"],
  ["ONOFF", "オノフ"],
  ["FOURTEEN", "フォーティーン"],
  ["COBRA", "コブラ"],
  ["Bettinardi", "ベティナルディ"],
  ["Scotty Cameron", "スコッティキャメロン", "スコッティ", "キャメロン"],
  ["SRIXON", "スリクソン"],
  ["Cleveland", "クリーブランド"],
  ["Qi10", "キューアイテン", "キューアイ10"],
  ["G430", "ジーヨンサンマル"],
  ["PARADYM", "パラダイム"],
  ["STEALTH", "ステルス"],
  ["APEX", "エイペックス"],
  ["Mizuno Pro", "ミズノプロ"],
  ["inpres", "インプレス"],
  ["BERES", "ベレス"],
  ["RMX", "リミックス"],
  ["BLUEPRINT", "ブループリント"],
  ["BIG BERTHA", "ビッグバーサ"],
  ["Ai SMOKE", "エーアイスモーク", "AIスモーク"],
  ["UD+2", "ユーディープラスツー", "ユーディープラス2"],
  ["FORGED", "フォージド"],
  ["N.S.PRO", "NSPRO", "NSプロ", "エヌエスプロ"],
  ["MODUS", "MODUS3", "モーダス"],
  ["Dynamic Gold", "DG", "ダイナミックゴールド"],
  ["Diamana", "ディアマナ"],
  ["TENSEI", "テンセイ"],
  ["VENTUS", "ベンタス"],
  ["ALTA", "アルタ"],
  ["SPEEDER", "スピーダー"],
  ["VANQUISH", "ヴァンキッシュ", "バンキッシュ"],
  ["VIZARD", "ヴィザード", "ビザード"],
  ["STROKE LAB", "ストロークラボ"],
  ["Steel", "スチール"]
];

const currentMarketSampleData = [
  { maker: "PING", model: "G430 MAX", category: "ドライバー", year: 2022, loft: "10.5", shaft: "ALTA J CB BLACK", flex: "S", sale: 39800, buy: 23500, memo: "定番人気。G440系との比較で価格調整が必要。" },
  { maker: "PING", model: "G430 MAX 10K", category: "ドライバー", year: 2024, loft: "10.5", shaft: "ALTA J CB BLACK", flex: "S", sale: 54800, buy: 33000, memo: "高MOIモデル。美品は強め、傷ありは外部確認。" },
  { maker: "TaylorMade", model: "Qi10 MAX", category: "ドライバー", year: 2024, loft: "10.5", shaft: "Diamana BLUE TM50", flex: "S", sale: 49800, buy: 30000, memo: "高年式だが流通量が増加。状態と付属品で差が出る。" },
  { maker: "TaylorMade", model: "SIM2 MAX", category: "ドライバー", year: 2021, loft: "10.5", shaft: "TENSEI BLUE TM50", flex: "S", sale: 34800, buy: 28000, memo: "型落ちでも指名買いあり。クラウン傷とヘッドカバー有無を確認。" },
  { maker: "Callaway", model: "ELYTE", category: "ドライバー", year: 2025, loft: "10.5", shaft: "VENTUS GREEN 5 for Callaway", flex: "S", sale: 64800, buy: 40000, memo: "高年式。新品実売との価格差を必ず確認。" },
  { maker: "Callaway", model: "PARADYM Ai SMOKE MAX", category: "ドライバー", year: 2024, loft: "10.5", shaft: "TENSEI 50 for Callaway", flex: "S", sale: 49800, buy: 30000, memo: "人気継続。シャフト違いと状態ランクで差が出る。" },
  { maker: "Titleist", model: "GT2", category: "ドライバー", year: 2024, loft: "10.0", shaft: "TENSEI 1K BLUE", flex: "S", sale: 69800, buy: 44000, memo: "競技志向の高年式。カスタムシャフトは別確認。" },
  { maker: "DUNLOP", model: "XXIO 13", category: "ドライバー", year: 2023, loft: "10.5", shaft: "MP1300", flex: "R", sale: 44800, buy: 27000, memo: "シニア層需要が安定。軽量シャフトの傷を確認。" },
  { maker: "BRIDGESTONE", model: "B3 MAX", category: "ドライバー", year: 2024, loft: "10.5", shaft: "VANQUISH BS50", flex: "S", sale: 42800, buy: 25500, memo: "国内ブランド。純正仕様は比較しやすい。" },
  { maker: "COBRA", model: "DARKSPEED X", category: "ドライバー", year: 2024, loft: "10.5", shaft: "SPEEDER NX for Cobra", flex: "S", sale: 32800, buy: 18500, memo: "価格訴求型。状態が良いものを中心に評価。" },

  { maker: "PING", model: "G430 MAX", category: "フェアウェイウッド", year: 2022, loft: "5W 18", shaft: "ALTA J CB BLACK", flex: "S", sale: 28800, buy: 16800, memo: "5W需要が安定。ヘッドカバー有無を確認。" },
  { maker: "TaylorMade", model: "Qi10", category: "フェアウェイウッド", year: 2024, loft: "5W 18", shaft: "Diamana BLUE TM50", flex: "S", sale: 34800, buy: 21000, memo: "高年式FW。新品価格との開きを確認。" },
  { maker: "Callaway", model: "PARADYM Ai SMOKE MAX", category: "フェアウェイウッド", year: 2024, loft: "5W 18", shaft: "TENSEI 50 for Callaway", flex: "S", sale: 32800, buy: 19500, memo: "5W、7Wは需要あり。ソール傷を確認。" },
  { maker: "Titleist", model: "TSR2", category: "フェアウェイウッド", year: 2022, loft: "3W 15", shaft: "TSP111 50", flex: "S", sale: 27800, buy: 16000, memo: "3Wは対象客が絞られる。シャフトで相場差。" },
  { maker: "DUNLOP", model: "XXIO 13", category: "フェアウェイウッド", year: 2023, loft: "5W 18", shaft: "MP1300", flex: "R", sale: 33800, buy: 20500, memo: "軽量FW。R、SRの需要差を確認。" },
  { maker: "BRIDGESTONE", model: "B3 MAX", category: "フェアウェイウッド", year: 2024, loft: "5W 18", shaft: "VANQUISH BS50", flex: "S", sale: 29800, buy: 17500, memo: "同シリーズ買い足し需要あり。" },

  { maker: "PING", model: "G430 HYBRID", category: "ユーティリティ", year: 2022, loft: "U4 22", shaft: "ALTA J CB BLACK", flex: "S", sale: 24800, buy: 14500, memo: "U4、U5は安定需要。番手を正確に確認。" },
  { maker: "TaylorMade", model: "Qi10 RESCUE", category: "ユーティリティ", year: 2024, loft: "U4 22", shaft: "Diamana BLUE TM60", flex: "S", sale: 29800, buy: 17800, memo: "高年式UT。カバー有無とソール傷を確認。" },
  { maker: "Callaway", model: "PARADYM Ai SMOKE", category: "ユーティリティ", year: 2024, loft: "U4 21", shaft: "TENSEI 50 for Callaway", flex: "S", sale: 28800, buy: 17000, memo: "高年式。ロフト違いで相場差が出る。" },
  { maker: "Titleist", model: "TSR2 HYBRID", category: "ユーティリティ", year: 2022, loft: "U4 21", shaft: "TENSEI 1K HY", flex: "S", sale: 24800, buy: 14500, memo: "競技層需要。シャフト重量に注意。" },
  { maker: "DUNLOP", model: "XXIO 13", category: "ユーティリティ", year: 2023, loft: "H5 23", shaft: "MP1300", flex: "R", sale: 28800, buy: 17500, memo: "軽量UT。シニア層向けに動きやすい。" },
  { maker: "SRIXON", model: "ZX Mk II HYBRID", category: "ユーティリティ", year: 2022, loft: "U4 22", shaft: "Diamana ZX-II", flex: "S", sale: 21800, buy: 12500, memo: "アイアンセットとの組み合わせ需要あり。" },

  { maker: "PING", model: "G430", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO 850GH neo", flex: "S", sale: 72800, buy: 44000, memo: "やさしい定番。カラーコードと番手構成を確認。" },
  { maker: "PING", model: "i230", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 79800, buy: 48500, memo: "競技志向で人気。ライ角カラーと打痕を確認。" },
  { maker: "TaylorMade", model: "Qi IRON", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "Diamana BLUE TM60", flex: "S", sale: 76800, buy: 45500, memo: "高年式の飛び系。カーボン仕様は軽量需要あり。" },
  { maker: "TaylorMade", model: "P790 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 85800, buy: 52000, memo: "中空アイアンの定番。状態が良ければ強め。" },
  { maker: "Callaway", model: "PARADYM Ai SMOKE", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "TENSEI 50 for Callaway", flex: "S", sale: 85800, buy: 52000, memo: "高年式飛び系。新品実売との比較が必要。" },
  { maker: "Callaway", model: "APEX Ai200", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 108000, buy: 70000, memo: "高価格帯。美品と傷ありで差が大きい。" },
  { maker: "Titleist", model: "T200 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO 105T", flex: "S", sale: 89800, buy: 56000, memo: "人気が高い。フェース摩耗とシャフト違いを確認。" },
  { maker: "Titleist", model: "T150", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold 120", flex: "S200", sale: 89800, buy: 56000, memo: "競技志向の高年式。状態が良ければ強め。" },
  { maker: "DUNLOP", model: "XXIO 13", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "MP1300", flex: "R", sale: 79800, buy: 48500, memo: "シニア層需要。軽量カーボンは状態重視。" },
  { maker: "SRIXON", model: "ZX5 Mk II", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 67800, buy: 40500, memo: "中級者から競技層まで需要あり。" },
  { maker: "MIZUNO", model: "Mizuno Pro 245", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 99800, buy: 65000, memo: "高年式中空系。美品は強めに評価。" },
  { maker: "MIZUNO", model: "JPX 923 FORGED", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 72800, buy: 44000, memo: "軟鉄飛び系。JPX系の中でも人気。" },
  { maker: "BRIDGESTONE", model: "242CB+", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 89800, buy: 56000, memo: "高年式国内モデル。傷ありは慎重に。" },
  { maker: "YAMAHA", model: "RMX VD/M", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 89800, buy: 56000, memo: "新しめの国内軟鉄。相場更新を短い間隔で確認。" },

  { maker: "Titleist", model: "VOKEY SM10", category: "ウェッジ", year: 2024, loft: "56", shaft: "Dynamic Gold", flex: "S200", sale: 15800, buy: 8600, memo: "高年式。ロフト、バウンス、グラインド表記を確認。" },
  { maker: "Cleveland", model: "RTX 6 ZIPCORE", category: "ウェッジ", year: 2023, loft: "58", shaft: "N.S.PRO 950GH", flex: "S", sale: 10800, buy: 5200, memo: "ウェッジは消耗品。溝とフェース面を確認。" },
  { maker: "Callaway", model: "OPUS", category: "ウェッジ", year: 2024, loft: "52", shaft: "Dynamic Gold", flex: "S200", sale: 14800, buy: 7800, memo: "高年式。仕上げとソール形状を確認。" },
  { maker: "TaylorMade", model: "MILLED GRIND 4", category: "ウェッジ", year: 2023, loft: "56", shaft: "Dynamic Gold", flex: "S200", sale: 12800, buy: 6500, memo: "ノーメッキ部のサビと摩耗を説明。" },
  { maker: "PING", model: "GLIDE 4.0", category: "ウェッジ", year: 2022, loft: "56", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 11800, buy: 6000, memo: "PINGユーザーの買い足し需要あり。" },

  { maker: "Odyssey", model: "AI-ONE #7", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 21800, buy: 12800, memo: "ネック形状と長さを確認。カバー有無で差。" },
  { maker: "Odyssey", model: "AI-ONE JAILBIRD MINI", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 29800, buy: 18000, memo: "話題性あり。状態とカバー有無を確認。" },
  { maker: "Scotty Cameron", model: "SUPER SELECT NEWPORT 2", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 52800, buy: 33000, memo: "高額帯。偽物対策と付属品確認が必須。" },
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
  { maker: "Taylor