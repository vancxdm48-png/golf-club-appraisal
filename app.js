const STORAGE_KEY = "usedGolfMarketClubs";
const HISTORY_STORAGE_KEY = "usedGolfMarketAppraisalHistory";
const APP_VERSION = "v1.8.0";
const SAMPLE_DATA_DATE = "2026-06-15";
const DATA_FRESH_DAYS = 45;
const LOW_MARGIN_THRESHOLD = 25;
const CSV_HEADERS = ["maker", "model", "category", "year", "loft", "shaft", "flex", "sale", "buy", "source", "updatedAt", "confidence", "memo"];

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
  { maker: "Scotty Cameron", model: "PHANTOM X 5.5", category: "パター", year: 2021, loft: "34inch", shaft: "Steel", flex: "-", sale: 45800, buy: 28000, memo: "高額帯。保証書、カバー、状態を細かく確認。" },
  { maker: "Scotty Cameron", model: "SUPER SELECT NEWPORT 2", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 54800, buy: 34000, memo: "人気が強い。偽物対策と付属品確認が必須。" },
  { maker: "TaylorMade", model: "Spider GTX", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 19800, buy: 10800, memo: "大型マレット需要。塗装状態を確認。" },
  { maker: "PING", model: "2023 ANSER", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 19800, buy: 11200, memo: "定番形状。長さとグリップ状態を確認。" }
];

const expandedMarketData = [
  { maker: "YAMAHA", model: "RMX VD/X", category: "ドライバー", year: 2023, loft: "10.5", shaft: "TENSEI TR", flex: "S", sale: 34800, buy: 19800, memo: "国内ブランドのやさしい系。純正シャフト需要あり。" },
  { maker: "YAMAHA", model: "inpres DRIVE STAR", category: "ドライバー", year: 2022, loft: "10.5", shaft: "SPEEDER NX for Yamaha", flex: "SR", sale: 32800, buy: 18500, memo: "軽量でつかまり重視。シニア層にも確認。" },
  { maker: "PRGR", model: "RS JUST", category: "ドライバー", year: 2022, loft: "10.5", shaft: "Diamana FOR PRGR", flex: "S", sale: 27800, buy: 15000, memo: "国内ブランド。弾道調整機能と付属品を確認。" },
  { maker: "HONMA", model: "T//WORLD GS", category: "ドライバー", year: 2021, loft: "10.5", shaft: "SPEEDTUNED 48", flex: "R", sale: 19800, buy: 9800, memo: "軽量モデル。状態が良いと初心者向けに出しやすい。" },
  { maker: "ONOFF", model: "AKA", category: "ドライバー", year: 2022, loft: "10.5", shaft: "SMOOTH KICK MP-522D", flex: "R", sale: 34800, buy: 19800, memo: "固定ファンあり。グリップとカバー状態を確認。" },
  { maker: "XXIO", model: "X-eks 2022", category: "ドライバー", year: 2022, loft: "10.5", shaft: "Miyazaki AX-2", flex: "S", sale: 32800, buy: 18500, memo: "ゼクシオ系でも少しハードな層向け。" },
  { maker: "TaylorMade", model: "SIM2 MAX", category: "ドライバー", year: 2021, loft: "10.5", shaft: "TENSEI BLUE TM50", flex: "S", sale: 26800, buy: 14500, memo: "型落ちでも人気。クラウン傷で差が出る。" },
  { maker: "Callaway", model: "MAVRIK MAX", category: "ドライバー", year: 2020, loft: "10.5", shaft: "Diamana 40 for Callaway", flex: "SR", sale: 19800, buy: 9800, memo: "やさしい系の中古入門価格帯。" },
  { maker: "Titleist", model: "TSi3", category: "ドライバー", year: 2020, loft: "9.0", shaft: "TSP110 50", flex: "S", sale: 27800, buy: 15200, memo: "低ロフトは対象客を絞って提案。" },
  { maker: "SRIXON", model: "ZX5 Mk II LS", category: "ドライバー", year: 2022, loft: "9.5", shaft: "Diamana ZX-II", flex: "S", sale: 32800, buy: 18800, memo: "低スピン系。ヘッドスピード層に注意。" },

  { maker: "YAMAHA", model: "RMX VD", category: "フェアウェイウッド", year: 2023, loft: "5W 18", shaft: "TENSEI TR", flex: "S", sale: 24800, buy: 13500, memo: "国内ブランドFW。5Wは比較的動きやすい。" },
  { maker: "PRGR", model: "RS JUST", category: "フェアウェイウッド", year: 2022, loft: "5W 18", shaft: "Diamana FOR PRGR", flex: "S", sale: 19800, buy: 9800, memo: "価格帯で勝負しやすい。" },
  { maker: "HONMA", model: "T//WORLD GS", category: "フェアウェイウッド", year: 2021, loft: "7W 21", shaft: "SPEEDTUNED 48", flex: "R", sale: 16800, buy: 7800, memo: "7W需要あり。軽量シャフトは状態重視。" },
  { maker: "ONOFF", model: "AKA", category: "フェアウェイウッド", year: 2022, loft: "5W 18", shaft: "SMOOTH KICK MP-522F", flex: "R", sale: 24800, buy: 13800, memo: "同ブランドで揃えたい客向け。" },
  { maker: "TaylorMade", model: "SIM2 MAX", category: "フェアウェイウッド", year: 2021, loft: "5W 18", shaft: "TENSEI BLUE TM50", flex: "S", sale: 19800, buy: 10200, memo: "型落ち人気。クラウン傷を確認。" },
  { maker: "Callaway", model: "EPIC MAX", category: "フェアウェイウッド", year: 2021, loft: "7W 21", shaft: "Diamana 40 for Callaway", flex: "SR", sale: 19800, buy: 10500, memo: "7Wは買い足し需要が強い。" },
  { maker: "SRIXON", model: "ZX Mk II", category: "フェアウェイウッド", year: 2022, loft: "3W 15", shaft: "Diamana ZX-II", flex: "S", sale: 22800, buy: 12200, memo: "競技寄り。3Wは状態差が出やすい。" },

  { maker: "YAMAHA", model: "inpres DRIVE STAR", category: "ユーティリティ", year: 2022, loft: "U5 23", shaft: "SPEEDER NX for Yamaha", flex: "SR", sale: 22800, buy: 12800, memo: "軽量UT。やさしい番手として動きやすい。" },
  { maker: "PRGR", model: "RS JUST", category: "ユーティリティ", year: 2022, loft: "U4 22", shaft: "Diamana FOR PRGR", flex: "S", sale: 17800, buy: 8800, memo: "価格が合えば動かしやすい。" },
  { maker: "HONMA", model: "T//WORLD GS", category: "ユーティリティ", year: 2021, loft: "U5 24", shaft: "SPEEDTUNED 48", flex: "R", sale: 15800, buy: 7200, memo: "軽量帯。ヘッドカバー有無を確認。" },
  { maker: "ONOFF", model: "AKA", category: "ユーティリティ", year: 2022, loft: "U5 23", shaft: "SMOOTH KICK MP-522U", flex: "R", sale: 23800, buy: 13500, memo: "同ブランド買い足し需要あり。" },
  { maker: "MIZUNO", model: "JPX FLI-HI", category: "ユーティリティ", year: 2022, loft: "U4 22", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 19800, buy: 10500, memo: "アイアン型に近い需要。通常UTと分けて説明。" },
  { maker: "Titleist", model: "U505", category: "ユーティリティ", year: 2021, loft: "U3 20", shaft: "N.S.PRO 880 AMC", flex: "S", sale: 24800, buy: 14200, memo: "アイアン型UT。競技層向け。" },
  { maker: "SRIXON", model: "ZX UTILITY", category: "ユーティリティ", year: 2020, loft: "U3 20", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 16800, buy: 8200, memo: "アイアン型。番手とシャフト重量を確認。" },

  { maker: "PING", model: "G430 #7", category: "単品アイアン", year: 2022, loft: "7I", shaft: "N.S.PRO 850GH neo", flex: "S", sale: 11800, buy: 5600, memo: "試打落ちや補充需要。カラーコードを確認。" },
  { maker: "PING", model: "i230 #7", category: "単品アイアン", year: 2022, loft: "7I", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 13800, buy: 7200, memo: "単品でも需要あり。ライ角カラーが重要。" },
  { maker: "TaylorMade", model: "P790 #7", category: "単品アイアン", year: 2021, loft: "7I", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 12800, buy: 6500, memo: "人気モデルの単品。セット補充需要。" },
  { maker: "Callaway", model: "APEX #7", category: "単品アイアン", year: 2021, loft: "7I", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 9800, buy: 4600, memo: "練習用、補充用で動く。" },
  { maker: "DUNLOP", model: "XXIO 12 #7", category: "単品アイアン", year: 2021, loft: "7I", shaft: "MP1200", flex: "R", sale: 11800, buy: 5800, memo: "軽量単品。シニア層の補充需要。" },
  { maker: "MIZUNO", model: "JPX 923 HOT METAL #7", category: "単品アイアン", year: 2022, loft: "7I", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 12800, buy: 6800, memo: "試打用にも使いやすいスペック。" },
  { maker: "Titleist", model: "T200 #7", category: "単品アイアン", year: 2023, loft: "7I", shaft: "N.S.PRO 105T", flex: "S", sale: 15800, buy: 8800, memo: "高年式単品。打痕が少なければ強め。" },
  { maker: "SRIXON", model: "ZX5 Mk II #7", category: "単品アイアン", year: 2022, loft: "7I", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 13800, buy: 7600, memo: "人気モデルの単品補充需要。" },

  { maker: "YAMAHA", model: "RMX VD/M", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 74800, buy: 44000, memo: "国内軟鉄系。フェース状態とロフト調整跡を確認。" },
  { maker: "YAMAHA", model: "inpres DRIVE STAR", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "SPEEDER NX for Yamaha", flex: "SR", sale: 64800, buy: 38000, memo: "軽量飛び系。シニア層需要。" },
  { maker: "PRGR", model: "03 IRON", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "Diamana FOR PRGR", flex: "S", sale: 54800, buy: 31500, memo: "飛び系。番手構成を明確にする。" },
  { maker: "HONMA", model: "BERES NX", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "VIZARD FOR NX", flex: "R", sale: 72800, buy: 43000, memo: "高価格帯。グレードと状態を確認。" },
  { maker: "ONOFF", model: "AKA", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "SMOOTH KICK MP-522I", flex: "R", sale: 64800, buy: 38000, memo: "固定ファンあり。軽量カーボン需要。" },
  { maker: "FOURTEEN", model: "TB-5 FORGED", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 59800, buy: 35000, memo: "やさしい軟鉄系。状態良好なら訴求しやすい。" },
  { maker: "COBRA", model: "KING LTDx", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "KBS TOUR LITE", flex: "S", sale: 42800, buy: 23500, memo: "価格訴求型。初心者から中級者向け。" },
  { maker: "Titleist", model: "T100", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "Dynamic Gold 120", flex: "S200", sale: 74800, buy: 45000, memo: "上級者向け。摩耗、ロフトライ調整跡を確認。" },

  { maker: "FOURTEEN", model: "DJ-5", category: "ウェッジ", year: 2021, loft: "56", shaft: "N.S.PRO DS-91w", flex: "WEDGE", sale: 9800, buy: 4700, memo: "やさしいウェッジ。ソール傷を確認。" },
  { maker: "FOURTEEN", model: "RM-α", category: "ウェッジ", year: 2023, loft: "52", shaft: "N.S.PRO TS-114w", flex: "WEDGE", sale: 12800, buy: 6600, memo: "国内ウェッジ需要。ロフト別管理。" },
  { maker: "PRGR", model: "R45 WEDGE", category: "ウェッジ", year: 2021, loft: "45", shaft: "Steel", flex: "WEDGE", sale: 6800, buy: 2800, memo: "チッパー系。用途説明が必要。" },
  { maker: "ONOFF", model: "FROG'S LEAP II", category: "ウェッジ", year: 2021, loft: "58", shaft: "N.S.PRO 950GH", flex: "S", sale: 9800, buy: 4600, memo: "バンカー苦手層向け。特殊形状として説明。" },
  { maker: "PING", model: "s159", category: "ウェッジ", year: 2024, loft: "56", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 16800, buy: 9200, memo: "高年式。グラインド表記を確認。" },
  { maker: "TaylorMade", model: "MG4", category: "ウェッジ", year: 2023, loft: "58", shaft: "Dynamic Gold EX", flex: "S200", sale: 13800, buy: 7200, memo: "新しめのウェッジ。フェース摩耗を確認。" },

  { maker: "TaylorMade", model: "TP TRUSS B1TH", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 24800, buy: 14200, memo: "トラス系人気。ネック形状を正確に記録。" },
  { maker: "TaylorMade", model: "Spider TOUR X", category: "パター", year: 2024, loft: "34inch", shaft: "Steel", flex: "-", sale: 32800, buy: 19800, memo: "高年式。塗装欠けとカバー有無を確認。" },
  { maker: "PING", model: "DS72", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 22800, buy: 12800, memo: "中型マレット。長さとグリップ状態を確認。" },
  { maker: "Odyssey", model: "WHITE HOT VERSA SEVEN", category: "パター", year: 2023, loft: "34inch", shaft: "Steel", flex: "-", sale: 19800, buy: 11000, memo: "視認性の高い人気形状。" },
  { maker: "Odyssey", model: "ELEVEN TOUR LINED", category: "パター", year: 2022, loft: "34inch", shaft: "STROKE LAB", flex: "-", sale: 19800, buy: 10800, memo: "大型マレット。フェースインサート状態を確認。" },
  { maker: "Scotty Cameron", model: "FUTURA 5W", category: "パター", year: 2017, loft: "34inch", shaft: "Steel", flex: "-", sale: 32800, buy: 19000, memo: "旧型でも需要あり。傷とカバーを確認。" },
  { maker: "Bettinardi", model: "BB1", category: "パター", year: 2022, loft: "34inch", shaft: "Steel", flex: "-", sale: 34800, buy: 20500, memo: "専門ブランド。状態が良ければ差別化しやすい。" }
];

const extraIronSetData = [
  { maker: "PING", model: "G425", category: "アイアンセット", year: 2020, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 59800, buy: 35000, memo: "やさしい定番。カラーコードと番手構成を確認。" },
  { maker: "PING", model: "i525", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 74800, buy: 44000, memo: "中空系。飛距離性能と見た目の良さで需要あり。" },
  { maker: "PING", model: "i210", category: "アイアンセット", year: 2018, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 54800, buy: 31500, memo: "旧型でも指名買いあり。ライ角カラーを確認。" },
  { maker: "TaylorMade", model: "P770 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 85800, buy: 52000, memo: "人気の中空系。状態が良ければ強めに評価。" },
  { maker: "TaylorMade", model: "P790 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 89800, buy: 55000, memo: "高年式P790。番手構成とシャフト違いを確認。" },
  { maker: "TaylorMade", model: "SIM2 MAX", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "TENSEI BLUE TM60", flex: "S", sale: 42800, buy: 23500, memo: "初心者から中級者向け。価格訴求で動かしやすい。" },
  { maker: "TaylorMade", model: "Qi IRON", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "Diamana BLUE TM60", flex: "S", sale: 79800, buy: 47000, memo: "高年式の飛び系。カーボン仕様は軽量需要あり。" },
  { maker: "Callaway", model: "ROGUE ST MAX FAST", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "SPEEDER NX 40 for Callaway", flex: "R", sale: 54800, buy: 31500, memo: "軽量モデル。シニア層向けの需要が強い。" },
  { maker: "Callaway", model: "MAVRIK MAX", category: "アイアンセット", year: 2020, loft: "5本セット", shaft: "Diamana 50 for Callaway", flex: "S", sale: 39800, buy: 21500, memo: "価格帯が合えば初心者向けに出しやすい。" },
  { maker: "Callaway", model: "X FORGED STAR 2021", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 59800, buy: 35000, memo: "軟鉄飛び系。打痕とメッキ状態を確認。" },
  { maker: "Callaway", model: "APEX 21", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 59800, buy: 35000, memo: "中級者向け。シャフト重量で需要が変わる。" },
  { maker: "Titleist", model: "T150", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold 120", flex: "S200", sale: 92800, buy: 58000, memo: "競技志向の高年式。摩耗が少なければ強め。" },
  { maker: "Titleist", model: "T350", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "N.S.PRO 880 AMC", flex: "S", sale: 82800, buy: 50000, memo: "やさしいTitleist。セット構成を確認。" },
  { maker: "Titleist", model: "620 CB", category: "アイアンセット", year: 2019, loft: "6本セット", shaft: "Dynamic Gold", flex: "S200", sale: 54800, buy: 32000, memo: "上級者向け。打痕と溝の状態を細かく見る。" },
  { maker: "DUNLOP", model: "XXIO 11", category: "アイアンセット", year: 2019, loft: "5本セット", shaft: "MP1100", flex: "R", sale: 42800, buy: 24000, memo: "型落ちでも需要あり。軽量カーボンの状態を確認。" },
  { maker: "DUNLOP", model: "XXIO X-eks 2022", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "Miyazaki AX-2", flex: "S", sale: 59800, buy: 35000, memo: "ゼクシオ系でもしっかりめ。Sフレックス需要。" },
  { maker: "SRIXON", model: "ZX7 Mk II", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "Dynamic Gold DST", flex: "S200", sale: 74800, buy: 45000, memo: "競技志向。フェース摩耗とライ角調整跡を確認。" },
  { maker: "SRIXON", model: "ZX4 Mk II", category: "アイアンセット", year: 2022, loft: "5本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 64800, buy: 38000, memo: "飛び系でやさしい。中級者向け需要。" },
  { maker: "MIZUNO", model: "Mizuno Pro 223", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 74800, buy: 45000, memo: "Mizuno Pro系の中核。状態が良ければ強め。" },
  { maker: "MIZUNO", model: "JPX 921 HOT METAL", category: "アイアンセット", year: 2020, loft: "5本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 44800, buy: 25000, memo: "価格帯が下がり動かしやすい飛び系。" },
  { maker: "MIZUNO", model: "Mizuno Pro 243", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold 95", flex: "S200", sale: 92800, buy: 58000, memo: "高年式Mizuno Pro。スペック違いを丁寧に確認。" },
  { maker: "BRIDGESTONE", model: "222CB+", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 64800, buy: 38000, memo: "やさしめ軟鉄。国内ブランド需要あり。" },
  { maker: "BRIDGESTONE", model: "233HF", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "VANQUISH BS50i", flex: "S", sale: 69800, buy: 42000, memo: "飛び系。カーボン仕様は軽量需要。" },
  { maker: "YAMAHA", model: "RMX VD/R", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold 120", flex: "S200", sale: 79800, buy: 48000, memo: "上級者向け軟鉄。状態が良ければ強め。" },
  { maker: "YAMAHA", model: "RMX VD40", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "N.S.PRO 850GH neo", flex: "S", sale: 44800, buy: 25000, memo: "やさしい国内モデル。価格で動かしやすい。" },
  { maker: "PRGR", model: "02 IRON", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 64800, buy: 38000, memo: "飛びと操作性の中間。番手構成を確認。" },
  { maker: "HONMA", model: "TW757 P", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 49800, buy: 28000, memo: "国内ブランド。価格訴求で動かしやすい。" },
  { maker: "ONOFF", model: "KURO 2021", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 54800, buy: 31500, memo: "固定ファンあり。黒系ヘッドは傷を確認。" },
  { maker: "FOURTEEN", model: "PC-3", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "FT-50i", flex: "S", sale: 42800, buy: 23500, memo: "やさしい飛び系。軽量カーボン仕様。" },
  { maker: "COBRA", model: "KING FORGED TEC", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "KBS TOUR LITE", flex: "S", sale: 59800, buy: 35000, memo: "中空系。価格帯が合えば差別化しやすい。" }
];

const moreIronSetData = [
  { maker: "PING", model: "G710", category: "アイアンセット", year: 2020, loft: "5本セット", shaft: "ALTA DISTANZA BLACK 40", flex: "R", sale: 54800, buy: 31500, memo: "軽量でやさしい中空系。シニア層、女性寄り需要も確認。" },
  { maker: "PING", model: "G700", category: "アイアンセット", year: 2018, loft: "6本セット", shaft: "N.S.PRO 950GH", flex: "S", sale: 44800, buy: 25000, memo: "旧型中空。フェース面とソール傷で価格差が出る。" },
  { maker: "PING", model: "BLUEPRINT S", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 115", flex: "S", sale: 118000, buy: 76000, memo: "上級者向け高年式。カスタムシャフトとライ角カラーを確認。" },
  { maker: "PING", model: "BLUEPRINT T", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "Dynamic Gold EX TOUR ISSUE", flex: "S200", sale: 128000, buy: 82000, memo: "操作性重視。対象客は狭いが美品は強めに評価。" },
  { maker: "PING", model: "i59", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 69800, buy: 41000, memo: "競技寄り。打痕、カラーコード、番手構成を確認。" },
  { maker: "TaylorMade", model: "P7MC 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold EX TOUR ISSUE", flex: "S200", sale: 92800, buy: 58000, memo: "軟鉄キャビティ。上級者向けで状態確認を細かく行う。" },
  { maker: "TaylorMade", model: "P7MB 2023", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold EX TOUR ISSUE", flex: "S200", sale: 89800, buy: 55000, memo: "マッスルバック。需要は限定的だが美品は指名買いあり。" },
  { maker: "TaylorMade", model: "P790 2019", category: "アイアンセット", year: 2019, loft: "6本セット", shaft: "N.S.PRO 950GH", flex: "S", sale: 54800, buy: 31500, memo: "型落ちP790。価格訴求と状態確認が重要。" },
  { maker: "TaylorMade", model: "M4 2021", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "REAX 90 JP", flex: "S", sale: 32800, buy: 16800, memo: "初心者向け価格帯。グリップ劣化と番手欠品を確認。" },
  { maker: "TaylorMade", model: "RBZ SPEEDLITE", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "RBZ STEEL", flex: "S", sale: 29800, buy: 14800, memo: "スターターセット需要。傷より価格の分かりやすさを重視。" },
  { maker: "Callaway", model: "APEX PRO 21", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "Dynamic Gold 105", flex: "S200", sale: 64800, buy: 38000, memo: "中上級者向け。フェース摩耗とシャフト重量を確認。" },
  { maker: "Callaway", model: "APEX PRO 24", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 TOUR 105", flex: "S", sale: 108000, buy: 70000, memo: "高年式APEX。美品は強め、傷ありは慎重に。" },
  { maker: "Callaway", model: "PARADYM Ai SMOKE", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "TENSEI 50 for Callaway", flex: "S", sale: 89800, buy: 55000, memo: "高年式の飛び系。カーボン仕様は軽量需要あり。" },
  { maker: "Callaway", model: "BIG BERTHA 23", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "SPEEDER NX 40 for Callaway", flex: "R", sale: 74800, buy: 44000, memo: "やさしさ重視。シニア層向けに提案しやすい。" },
  { maker: "Callaway", model: "EPIC MAX FAST", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "ELDIO 40 for Callaway", flex: "A", sale: 52800, buy: 30000, memo: "軽量レディース寄り。フレックス表記と長さを確認。" },
  { maker: "Titleist", model: "T100S", category: "アイアンセット", year: 2021, loft: "6本セット", shaft: "N.S.PRO MODUS3 115", flex: "S", sale: 74800, buy: 45000, memo: "競技志向の飛び系。T100との違いを明確に記録。" },
  { maker: "Titleist", model: "T300 2021", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "N.S.PRO 880 AMC", flex: "S", sale: 54800, buy: 31500, memo: "やさしいTitleist。中級者の買い替え需要あり。" },
  { maker: "Titleist", model: "T400", category: "アイアンセット", year: 2020, loft: "5本セット", shaft: "3D055", flex: "R", sale: 54800, buy: 31500, memo: "軽量・飛距離系。シニア層需要と番手構成を確認。" },
  { maker: "Titleist", model: "718 AP2", category: "アイアンセット", year: 2017, loft: "6本セット", shaft: "Dynamic Gold AMT", flex: "S200", sale: 44800, buy: 25000, memo: "旧型でも根強い人気。摩耗とメッキ剥がれを確認。" },
  { maker: "DUNLOP", model: "XXIO 10", category: "アイアンセット", year: 2017, loft: "5本セット", shaft: "MP1000", flex: "R", sale: 32800, buy: 17500, memo: "価格帯が下がり買いやすい。軽量カーボン状態を確認。" },
  { maker: "DUNLOP", model: "XXIO 13 LADIES", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "MP1300L", flex: "L", sale: 82800, buy: 50000, memo: "レディース高年式。長さ、グリップ、番手構成を確認。" },
  { maker: "DUNLOP", model: "XXIO 12 LADIES", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "MP1200L", flex: "L", sale: 59800, buy: 35000, memo: "レディース需要あり。状態が良ければ回転しやすい。" },
  { maker: "SRIXON", model: "ZX5", category: "アイアンセット", year: 2020, loft: "6本セット", shaft: "N.S.PRO 950GH DST", flex: "S", sale: 54800, buy: 31500, memo: "型落ちでも人気。ZX7との組み合わせにも注意。" },
  { maker: "SRIXON", model: "ZX7", category: "アイアンセット", year: 2020, loft: "6本セット", shaft: "Dynamic Gold DST", flex: "S200", sale: 59800, buy: 35000, memo: "競技志向。フェース摩耗が少ない個体は強めに評価。" },
  { maker: "SRIXON", model: "Z-FORGED II", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold DST", flex: "S200", sale: 89800, buy: 55000, memo: "マッスルバック。需要は狭いが状態の良い個体は訴求可。" },
  { maker: "MIZUNO", model: "Mizuno Pro 245", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 108000, buy: 70000, memo: "高年式中空系。飛距離性能と打感を説明しやすい。" },
  { maker: "MIZUNO", model: "Mizuno Pro 241", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "Dynamic Gold 120", flex: "S200", sale: 92800, buy: 58000, memo: "上級者向け。ライ角、ロフト調整跡を確認。" },
  { maker: "MIZUNO", model: "JPX 923 FORGED", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 74800, buy: 45000, memo: "軟鉄飛び系。JPX系の中でも状態で差が出る。" },
  { maker: "MIZUNO", model: "JPX 921 FORGED", category: "アイアンセット", year: 2020, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 54800, buy: 31500, memo: "型落ち軟鉄系。中級者需要あり。" },
  { maker: "MIZUNO", model: "MP-20 MMC", category: "アイアンセット", year: 2019, loft: "6本セット", shaft: "Dynamic Gold 120", flex: "S200", sale: 59800, buy: 35000, memo: "MP系指名買いあり。打痕とシャフト錆を確認。" },
  { maker: "BRIDGESTONE", model: "201CB", category: "アイアンセット", year: 2020, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 49800, buy: 28000, memo: "国内軟鉄キャビティ。状態良好なら提案しやすい。" },
  { maker: "BRIDGESTONE", model: "202CBP", category: "アイアンセット", year: 2020, loft: "6本セット", shaft: "N.S.PRO 950GH neo", flex: "S", sale: 44800, buy: 25000, memo: "やさしめツアー系。価格帯で動かしやすい。" },
  { maker: "BRIDGESTONE", model: "242CB+", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 92800, buy: 58000, memo: "高年式国内モデル。美品は強め、更新日を必ず確認。" },
  { maker: "YAMAHA", model: "RMX VD/M 2025", category: "アイアンセット", year: 2024, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 92800, buy: 58000, memo: "新しめの国内軟鉄。相場更新を短い間隔で確認。" },
  { maker: "YAMAHA", model: "inpres UD+2 2021", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "Air Speeder for Yamaha", flex: "R", sale: 49800, buy: 28000, memo: "飛距離特化。シニア層向けの定番候補。" },
  { maker: "YAMAHA", model: "inpres UD+2 LADIES", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "Air Speeder for Yamaha", flex: "L", sale: 49800, buy: 28000, memo: "レディース飛び系。状態と長さを確認。" },
  { maker: "PRGR", model: "05 IRON", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "MCI FOR PRGR", flex: "R", sale: 64800, buy: 38000, memo: "やさしい飛び系。Rフレックス需要を確認。" },
  { maker: "PRGR", model: "01 IRON", category: "アイアンセット", year: 2023, loft: "6本セット", shaft: "N.S.PRO MODUS3 115", flex: "S", sale: 69800, buy: 41000, memo: "操作性重視。対象客は絞られるが状態良好なら強め。" },
  { maker: "HONMA", model: "BERES AIZU", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "ARMRQ MX", flex: "R", sale: 128000, buy: 82000, memo: "高価格帯。グレード、星数、保証書を必ず確認。" },
  { maker: "HONMA", model: "T//WORLD TR21 X", category: "アイアンセット", year: 2020, loft: "6本セット", shaft: "VIZARD TR20-65", flex: "S", sale: 44800, buy: 25000, memo: "中空系。価格訴求で中級者に提案しやすい。" },
  { maker: "ONOFF", model: "AKA 2024", category: "アイアンセット", year: 2024, loft: "5本セット", shaft: "SMOOTH KICK MP-524I", flex: "R", sale: 89800, buy: 55000, memo: "高年式軽量。固定ファンとシニア層需要。" },
  { maker: "ONOFF", model: "LADY 2023", category: "アイアンセット", year: 2023, loft: "5本セット", shaft: "SMOOTH KICK LP-423I", flex: "L", sale: 74800, buy: 44000, memo: "レディース需要。傷、グリップ、長さを確認。" },
  { maker: "FOURTEEN", model: "TB-7 FORGED", category: "アイアンセット", year: 2022, loft: "6本セット", shaft: "N.S.PRO MODUS3 105", flex: "S", sale: 69800, buy: 41000, memo: "軟鉄系。状態が良いと固定ファンに訴求しやすい。" },
  { maker: "FOURTEEN", model: "IF-700 FORGED", category: "アイアンセット", year: 2020, loft: "5本セット", shaft: "FT-70i", flex: "S", sale: 39800, buy: 21500, memo: "やさしい軟鉄系。番手構成とシャフト表記を確認。" },
  { maker: "COBRA", model: "KING RADSPEED", category: "アイアンセット", year: 2021, loft: "5本セット", shaft: "KBS TOUR 90", flex: "S", sale: 34800, buy: 18500, memo: "価格訴求型。初心者から中級者向け。" },
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

const sampleCatalog = [...marketData, ...additionalMarketData, ...expandedMarketData, ...extraIronSetData, ...moreIronSetData];

function makeClubId(club, index = 0) {
  return normalizeSearchText(`${club.maker}-${club.model}-${club.category}-${club.year}-${club.loft}-${club.shaft}-${index}`);
}

function makeCatalogKey(club) {
  return normalizeSearchText(`${club.maker}-${club.model}-${club.category}-${club.year}-${club.loft}-${club.shaft}-${club.flex}`);
}

function normalizeClub(club, index = 0) {
  return {
    id: club.id || makeClubId(club, index),
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
  if (typeof localStorage === "undefined") {
    return [];
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(saved) && saved.length) {
      return saved
        .map(normalizeClub)
        .filter(isValidClub)
        .filter((club) => !isBuiltInSample(club));
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return [];
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

const elements = {
  versionLabel: document.getElementById("versionLabel"),
  storageStatus: document.getElementById("storageStatus"),
  offlineStatus: document.getElementById("offlineStatus"),
  importStatus: document.getElementById("importStatus"),
  search: document.getElementById("searchInput"),
  categoryFilter: document.getElementById("categoryFilter"),
  conditionFilter: document.getElementById("conditionFilter"),
  qualityFilter: document.getElementById("qualityFilter"),
  sortSelect: document.getElementById("sortSelect"),
  minMarginInput: document.getElementById("minMarginInput"),
  table: document.getElementById("marketTable"),
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

function marginRate(club) {
  if (!club.adjustedSale) return 0;
  return ((club.adjustedSale - club.adjustedBuy) / club.adjustedSale) * 100;
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

  const categories = [...new Set(clubs.map((club) => club.category))];
  elements.categoryChips.innerHTML = categories
    .map((category) => {
      const count = clubs.filter((club) => club.category === category).length;
      return `<span class="chip">${category} ${count}件</span>`;
    })
    .join("");

  renderAudit();
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
      setImportStatus("CSV有効データなし", "is-warning");
      elements.csvInput.value = "";
      return;
    }

    const result = mergeImportedClubs(imported);
    setImportStatus(`CSV追加${result.added}件 更新${result.updated}件`, "is-ok");

    if (imported.length) {
      selectedIndex = 0;
      saveClubs();
      renderTable();
    }
    elements.csvInput.value = "";
  };
  reader.onerror = () => {
    setImportStatus("CSV読込失敗", "is-warning");
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

elements.appraisalDateInput.value = elements.appraisalDateInput.value || todayISO();
updateAppStatus();
renderTable({ autoSelectFirst: true });
updateExternalKeyword();
renderHistory();
