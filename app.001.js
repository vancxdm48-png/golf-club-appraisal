const STORAGE_KEY = "usedGolfMarketClubs";
const HISTORY_STORAGE_KEY = "usedGolfMarketAppraisalHistory";
const APP_VERSION = "v1.10.4";
const SAMPLE_DATA_DATE = "2026-07-01";
const DATA_FRESH_DAYS = 45;
const LOW_MARGIN_THRESHOLD = 25;
const CSV_HEADERS = ["maker", "model", "category", "year", "loft", "shaft", "flex", "sale", "buy", "source", "updatedAt", "confidence", "memo"];
const DEMO_MARKET = {
  keyword: "TaylorMade SIM2 MAX",
  category: "ドライバー",
  yahoo: 34500,
  mercari: 36800,
  rakuten: 39800,
  buy: 28000
};

const marketData = [
  { maker: "PING", model: "G430 MAX", category: "ドライバー", year: 2022, loft: "10.5", shaft: "ALTA J CB BLACK", flex: "S", sale: 42800, buy: 24500, memo: "人気が安定。純正付属品とクラウン傷で差が出やすい。" },
  { maker: "TaylorMade", model: "Qi10 MAX", category: "ドライバー", year: 2024, loft: "10.5", shaft: "Diamana BLUE TM50", flex: "S", sale: 54800, buy: 32000, memo: "高年式モデル。美品は回転が速く、在庫過多時は早めの価格調整。" },
  { maker: "TaylorMade", model: "STEALTH2", category: "ドライバー", year: 2023, loft: "10.5", shaft: "TENSEI RED TM50", flex: "S", sale: 33800, buy: 18500, memo: "流通量が多い。状態ランクで提示額を細かく分ける。" },
  { maker: "Callaway", model: "PARADYM", category: "ドライバー", year: 2023, loft: "10.5", shaft: "VENTUS TR 5 for Callaway", flex: "S", sale: 39800, buy: 22000, memo: "純正とカスタムシャフトで需要が分かれる。" },
  { maker: "DUNLOP", model: "XXIO 13", category: "ドライバー", year: 2023, loft: "10.5", shaft: "MP1300", flex: "R", sale: 46800, buy: 27500, memo: "シニア層需要が強い。軽量シャフトは状態重視。" },
  { maker: "Titleist", model: "TSR2", category: "ドライバー", year: 2022, loft: "10.0", shaft: "TSP111 50", flex: "S", sale: 37800, buy: 21500, memo: "競技志向の需要あり。ロフトとシャフトで相場差。" },

  { maker: "PING", model: "G430 MAX", category: "フェアウェイウッド", year: 2022, loft: "5W 18", shaft: "ALTA J CB BLACK", flex: "S", sale: 29800, buy: 16800, memo: "5Wは需要が安定。ソール傷を確認。" },
  { maker: "TaylorMade", model: "STEALTH2", category: "フェアウェイウッド", year: 2023, loft: "3W 15", shaft: "TENSEI RED TM50", flex: "S", sale: 21800, buy: 11800, memo: "3Wは難しさがあり、状態と価格のバランスが重要。" },
  { maker: "Callaway", model: "PARADYM X", category: "フェアウェイウッド", year: 2023, loft: "5W 18", shaft: "VENTUS TR 5 for Callaway", flex: "SR", sale: 25800, buy: 14200, memo: "5W、7Wは安定需要。カバー有無も確認。" },
  { maker: "DUNLOP", model: "XXIO 12", category: "フェアウェイウッド", year: 2021, loft: "5W 18", shaft: "MP1200", flex: "R", sale: 23800, buy: 13200, memo: "軽量モデルは年式が古くても売れ筋。" },

  { maker: "PING", model: "G430 HYBRID", category: "ユーティリティ", year: 2022, loft: "U4 22", shaft: "ALTA J CB BLACK", flex: "S", sale: 25800, buy: 14800, memo: "U4、U5は需要が高い。番手欠け補充に向く。" },
  { maker: "TaylorMade", model: "Qi10 RESCUE", category: "ユーティリティ", year: 2024, loft: "U4 22", shaft: "Diamana BLUE TM60", flex: "S", sale: 31800, buy: 18800, memo: "高年式で相場は強め。シャフト違いに注意。" },
  { maker: "Callaway", model: "APEX UW", category: "ユーティリティ", year: 2023, loft: "19", shaft: "VENTUS 5 for Callaway", flex: "S", sale: 27800, buy: 15800, memo: "独自需要あり。一般UTと分けて見る。" },
  { maker: "Titleist", model: "TSR2 HYBRID", category: "ユーティリティ", year: 2022, loft: "U4 21", shaft: "TENSEI 1K HY", flex: "S", sale: 25800, buy: 14500, memo: "競技層向け。シャフト重量で需要差。" },

  { maker: "MIZUNO", model: "JPX 923 HOT METAL", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 64800, buy: 38000, memo: "セット本数と番手欠品を必ず確認。" },
  { maker: "Titleist", model: "T200", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "N.S.PRO 105T", flex: "S", sale: 85800, buy: 52000, memo: "人気が高い。ライ角調整跡やフェース摩耗を確認。" },
  { maker: "DUNLOP", model: "XXIO 12", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "MP1200", flex: "R", sale: 52800, buy: 30000, memo: "軽量カーボンのセットは安定需要。" },
  { maker: "Callaway", model: "APEX DCB", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO Zelos 8", flex: "S", sale: 54800, buy: 31500, memo: "やさしい軟鉄系。状態が良いと提示しやすい。" },
  { maker: "SRIXON", model: "ZX5 Mk II", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 69800, buy: 42000, memo: "競技層から中級者まで需要が広い。" },

  { maker: "Titleist", model: "VOKEY SM9", category: "ウェッジ", year: 2022, loft: "52", shaft: "Dynamic Gold", flex: "S200", sale: 12800, buy: 6200, memo: "溝の摩耗とソール形状を確認。" },
  { maker: "Titleist", model: "VOKEY SM10", category: "ウェッジ", year: 2024, loft: "56", shaft: "Dynamic Gold", flex: "S200", sale: 16800, buy: 9200, memo: "高年式。ロフトとバウンス表記を正確に記録。" },
  { maker: "Cleveland", model: "RTX 6 ZIPCORE", category: "ウェッジ", year: 2023, loft: "58", shaft: "N.S.PRO 950GH", flex: "S", sale: 11800, buy: 5600, memo: "ウェッジは消耗品。美品のみ強めに評価。" },
  { maker: "PING", model: "GLIDE 4.0", category: "ウェッジ", year: 2022, loft: "56", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 12800, buy: 6500, memo: "PINGユーザーの買い足し需要あり。" },

  { maker: "Odyssey", model: "TRI-HOT 5K DOUBLE WIDE", category: "パター", year: 2022, loft: "34inch", shaft: "STROKE LAB", flex: "-", sale: 24800, buy: 14200, memo: "純正カバー有無で価格差が出る。" },
  { maker: "Odyssey", model: "AI-ONE #7", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 22800, buy: 13200, memo: "ネック形状と長さを確認。" },
  { maker: "Scotty Cameron", model: "SELECT NEWPORT 2", category: "パター", year: 2020, loft: "34inch", shaft: "Steel", flex: "-", sale: 42800, buy: 26000, memo: "偽物対策として刻印、重量、カバーを確認。" },
  { maker: "PING", model: "PLD ANSER", category: "パター", year: 2022, loft: "34inch", shaft: "Steel", flex: "-", sale: 32800, buy: 19500, memo: "高価格帯パター。打痕とグリップ状態を確認。" }
];

const additionalMarketData = [
  { maker: "PING", model: "G425 MAX", category: "ドライバー", year: 2020, loft: "10.5", shaft: "ALTA J CB SLATE", flex: "S", sale: 29800, buy: 16800, memo: "定番人気。年式が進んでも指名買いがある。" },
  { maker: "PING", model: "G410 PLUS", category: "ドライバー", year: 2019, loft: "10.5", shaft: "ALTA J CB RED", flex: "S", sale: 22800, buy: 12200, memo: "中古入門価格帯。レンチ、カバー有無を確認。" },
  { maker: "Callaway", model: "ROGUE ST MAX", category: "ドライバー", year: 2022, loft: "10.5", shaft: "VENTUS 5 for Callaway", flex: "S", sale: 29800, buy: 16500, memo: "やさしさ重視で需要が広い。" },
  { maker: "Callaway", model: "EPIC SPEED", category: "ドライバー", year: 2021, loft: "10.5", shaft: "Diamana 50 for Callaway", flex: "S", sale: 22800, buy: 11800, memo: "価格帯が下がり、買い替え需要に合いやすい。" },
  { maker: "Titleist", model: "TSi2", category: "ドライバー", year: 2020, loft: "10.0", shaft: "TSP110 50", flex: "S", sale: 26800, buy: 14800, memo: "Titleistの中では扱いやすいモデル。" },
  { maker: "BRIDGESTONE", model: "B2 HT", category: "ドライバー", year: 2023, loft: "10.5", shaft: "VANQUISH BS50", flex: "S", sale: 34800, buy: 19800, memo: "国内ブランド需要。純正シャフトの状態を見る。" },
  { maker: "MIZUNO", model: "ST-X 230", category: "ドライバー", year: 2023, loft: "10.5", shaft: "TOUR AD GM D", flex: "S", sale: 29800, buy: 16200, memo: "流通量は多くないため、状態が良ければ訴求しやすい。" },
  { maker: "COBRA", model: "AEROJET MAX", category: "ドライバー", year: 2023, loft: "10.5", shaft: "SPEEDER NX for Cobra", flex: "S", sale: 27800, buy: 14800, memo: "価格訴求で動かしやすいモデル。" },

  { maker: "PING", model: "G425 MAX", category: "フェアウェイウッド", year: 2020, loft: "7W 20.5", shaft: "ALTA J CB SLATE", flex: "S", sale: 24800, buy: 13800, memo: "7Wは探している客が多く、状態が良いと動きやすい。" },
  { maker: "TaylorMade", model: "Qi10", category: "フェアウェイウッド", year: 2024, loft: "5W 18", shaft: "Diamana BLUE TM50", flex: "S", sale: 36800, buy: 21800, memo: "高年式。ヘッドカバー有無で印象が変わる。" },
  { maker: "Callaway", model: "ROGUE ST MAX", category: "フェアウェイウッド", year: 2022, loft: "5W 18", shaft: "VENTUS 5 for Callaway", flex: "S", sale: 21800, buy: 11800, memo: "やさしいFWとして安定需要。" },
  { maker: "Titleist", model: "TSR2", category: "フェアウェイウッド", year: 2022, loft: "3W 15", shaft: "TSP111 50", flex: "S", sale: 29800, buy: 16800, memo: "競技志向。3Wは状態とシャフトで差が出る。" },
  { maker: "BRIDGESTONE", model: "B2 HT", category: "フェアウェイウッド", year: 2023, loft: "5W 18", shaft: "VANQUISH BS50", flex: "S", sale: 24800, buy: 13800, memo: "国内ブランドの同シリーズ買い足し需要。" },
  { maker: "MIZUNO", model: "ST-Z 230", category: "フェアウェイウッド", year: 2023, loft: "5W 18", shaft: "TOUR AD GM F", flex: "S", sale: 22800, buy: 12200, memo: "在庫が薄い場合は比較対象として置きやすい。" },

  { maker: "PING", model: "G425 HYBRID", category: "ユーティリティ", year: 2020, loft: "U5 26", shaft: "ALTA J CB SLATE", flex: "S", sale: 21800, buy: 12200, memo: "U5はアイアン代替需要が強い。" },
  { maker: "TaylorMade", model: "STEALTH2 RESCUE", category: "ユーティリティ", year: 2023, loft: "U4 22", shaft: "TENSEI RED TM60", flex: "S", sale: 22800, buy: 12800, memo: "同シリーズ利用者の追加購入に向く。" },
  { maker: "Callaway", model: "PARADYM", category: "ユーティリティ", year: 2023, loft: "U4 21", shaft: "VENTUS TR 5 for Callaway", flex: "S", sale: 24800, buy: 14200, memo: "高年式で比較されやすい。" },
  { maker: "DUNLOP", model: "XXIO 12", category: "ユーティリティ", year: 2021, loft: "H5 23", shaft: "MP1200", flex: "R", sale: 21800, buy: 12500, memo: "軽量UT。R、SRの需要を分けて管理。" },
  { maker: "BRIDGESTONE", model: "B2 HT", category: "ユーティリティ", year: 2023, loft: "H4 22", shaft: "VANQUISH BS50h", flex: "S", sale: 22800, buy: 12800, memo: "国内ブランドの買い足し需要。" },
  { maker: "SRIXON", model: "ZX Mk II HYBRID", category: "ユーティリティ", year: 2022, loft: "U4 22", shaft: "Diamana ZX-II", flex: "S", sale: 23800, buy: 13500, memo: "アイアンセットとの組み合わせ需要あり。" },

  { maker: "PING", model: "G430", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO 850GH neo", flex: "S", sale: 74800, buy: 45000, memo: "やさしいアイアンで需要が広い。番手欠品を確認。" },
  { maker: "PING", model: "i230", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 82800, buy: 50000, memo: "競技志向の人気モデル。ライ角カラーも確認。" },
  { maker: "TaylorMade", model: "P790 2021", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 74800, buy: 44500, memo: "中空アイアンの定番。フェース摩耗と打痕を見る。" },
  { maker: "TaylorMade", model: "STEALTH", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "TENSEI RED TM60", flex: "S", sale: 54800, buy: 31500, memo: "やさしいカーボン仕様。初心者向け需要。" },
  { maker: "Callaway", model: "PARADYM", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 72800, buy: 43000, memo: "高年式で訴求しやすい。セット構成を確認。" },
  { maker: "DUNLOP", model: "XXIO 13", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "MP1300", flex: "R", sale: 82800, buy: 50000, memo: "軽量・高年式で強め。シニア層需要。" },
  { maker: "BRIDGESTONE", model: "221CB", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 64800, buy: 38000, memo: "軟鉄鍛造。上級者向けの状態確認が重要。" },
  { maker: "MIZUNO", model: "Mizuno Pro 225", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "Dynamic Gold 95", flex: "S200", sale: 69800, buy: 42000, memo: "Mizuno Pro系は指名買いあり。" },

  { maker: "Callaway", model: "JAWS RAW", category: "ウェッジ", year: 2022, loft: "52", shaft: "Dynamic Gold", flex: "S200", sale: 10800, buy: 5200, memo: "ノーメッキ仕様はサビと摩耗を説明する。" },
  { maker: "Callaway", model: "JAWS FORGED", category: "ウェッジ", year: 2023, loft: "56", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 12800, buy: 6400, memo: "軟鉄系。フェース面の状態を重視。" },
  { maker: "Cleveland", model: "RTX FULL-FACE", category: "ウェッジ", year: 2021, loft: "58", shaft: "Dynamic Gold", flex: "S200", sale: 9800, buy: 4600, memo: "特殊形状。合う客には刺さるが回転は価格次第。" },
  { maker: "TaylorMade", model: "MILLED GRIND 3", category: "ウェッジ", year: 2021, loft: "56", shaft: "Dynamic Gold", flex: "S200", sale: 9800, buy: 4700, memo: "ソール摩耗とノーメッキ部分の状態を確認。" },
  { maker: "MIZUNO", model: "T24", category: "ウェッジ", year: 2023, loft: "58", shaft: "Dynamic Gold 95", flex: "S200", sale: 13800, buy: 7200, memo: "新しめの軟鉄ウェッジ。状態が良ければ強め。" },

  { maker: "Odyssey", model: "WHITE HOT OG #5", category: "パター", year: 2021, loft: "34inch", shaft: "Steel", flex: "-", sale: 14800, buy: 7800, memo: "定番インサート。カバー有無を確認。" },
  { maker: "Odyssey", model: "TEN TRIPLE TRACK", category: "パター", year: 2020, loft: "34inch", shaft: "STROKE LAB", flex: "-", sale: 16800, buy: 9000, memo: "アライメント系。塗装欠けを確認。" },
  { mak