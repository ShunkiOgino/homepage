"""
Video Studio — デモ版
AgentHive / oMLX に接続するとすべての機能が使えます。
このデモではサンプルデータでUIの全体像を体験できます。
"""

import json
import os
import requests
import streamlit as st

# ── 接続先（環境変数で上書き可能）──────────────────────────────
HIVE_BASE     = os.environ.get("HIVE_BASE",     "http://localhost:3000")
OMLX_BASE_URL = os.environ.get("OMLX_BASE_URL", "http://localhost:8080")
OMLX_API_KEY  = os.environ.get("OMLX_API_KEY",  "")

# ── 接続チェック ──────────────────────────────────────────────
def hive_alive() -> bool:
    try:
        return requests.get(f"{HIVE_BASE}/docs", timeout=2).status_code < 500
    except Exception:
        return False

def mlx_alive() -> bool:
    try:
        return requests.get(f"{OMLX_BASE_URL}/v1/models", timeout=2).status_code in (200, 401, 403)
    except Exception:
        return False

# ── サンプルデータ ─────────────────────────────────────────────
SAMPLE_SCRIPTS = [
    {
        "name": "2025-05-28_AI活用術.md",
        "title": "中小企業こそAIを使うべき3つの理由",
        "sections": ["オープニング", "理由①コスト削減", "理由②スピード", "理由③差別化", "まとめ"],
        "total_speech": 42,
        "mao_count": 22,
        "nise_count": 20,
        "telop_count": 8,
        "preview": """# 中小企業こそAIを使うべき3つの理由

## オープニング
こはる: ねえはると、最近AIって流行ってるじゃない？
はると: そうだね。ChatGPTとか、もうみんな使ってるよね。
こはる: でも中小企業ってまだ全然活用できてない会社も多い気がして。

## 理由①コスト削減
はると: <強調:人件費を30%カット>した例もあるんだよ実は。
こはる: えっマジ？ <ツッコミ:どんだけ削れんの！>
""",
    },
    {
        "name": "2025-05-20_システム開発.md",
        "title": "小さな会社のシステム化、どこから始める？",
        "sections": ["導入", "現状の課題", "解決策", "事例紹介", "まとめ"],
        "total_speech": 38,
        "mao_count": 18,
        "nise_count": 20,
        "telop_count": 6,
        "preview": """# 小さな会社のシステム化、どこから始める？

## 導入
こはる: 今日はシステム化の話ね。
はると: そう。「Excelでいいじゃん」って思ってる社長、多いよね。
こはる: わかる。でもそれが罠なんだよね <吹き出し:実は限界がある>

## 現状の課題
はると: まず<強調:属人化>が一番の問題。
""",
    },
    {
        "name": "2025-05-10_補助金活用.md",
        "title": "IT補助金2025、申請のポイントを解説",
        "sections": ["概要", "対象企業", "申請手順", "注意点"],
        "total_speech": 30,
        "mao_count": 14,
        "nise_count": 16,
        "telop_count": 5,
        "preview": """# IT補助金2025、申請のポイントを解説

## 概要
こはる: 今日は補助金の話！
はると: IT導入補助金、今年も受付始まったよ。
""",
    },
]

SAMPLE_DECORATIONS = [
    {"type": "ツッコミ", "text": "どんだけ削れんの！", "line_idx": 8, "reason": "驚きの強調", "position": 0.7},
    {"type": "強調",    "text": "人件費を30%カット",  "line_idx": 7, "reason": "数字の訴求力", "position": 0.5},
    {"type": "吹き出し","text": "実は限界がある",     "line_idx": 12, "reason": "心の声補足",  "position": 0.3},
    {"type": "sfx",    "text": "ピコーン",           "line_idx": 15, "reason": "転換ポイント", "position": 0.9},
]

SAMPLE_L2D_MODELS = [
    "こはる (デフォルト)",
    "はると (デフォルト)",
    "こはる / サマー衣装",
    "はると / カジュアル",
]

SAMPLE_BG_IMAGES = [
    "room-interior-illustration.jpeg",
    "office-modern.jpeg",
    "studio-dark.jpeg",
    "outdoor-city.jpeg",
]

STYLE_OPTIONS = [
    ("interview", "🎤 インタビュー（落ち着いた対話）"),
    ("variety",   "🎉 バラエティ（テロップ多用・派手）"),
]
STYLE_LABELS = {k: lbl for k, lbl in STYLE_OPTIONS}


# ── Streamlit UI ──────────────────────────────────────────────
st.set_page_config(
    page_title="🎬 Video Studio",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown("""
<style>
body, .stApp { background: #0d0d14; color: #e0e0e0; }
.status-ok  { color: #00d4ff; font-size: 13px; font-weight: 600; }
.status-bad { color: #ff6b6b; font-size: 13px; font-weight: 600; }
.demo-banner {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border: 1px solid #00d4ff44;
    border-radius: 8px;
    padding: 12px 18px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #a0c8ff;
}
.demo-banner strong { color: #00d4ff; }
.summary-card {
    background: #1a1a2e;
    border-left: 3px solid #7c5cbf;
    padding: 12px 16px;
    border-radius: 4px;
    margin: 8px 0;
}
.ratio-bar { display: flex; height: 6px; border-radius: 3px; overflow: hidden; margin-top: 4px; }
.ratio-mao  { background: #c084fc; }
.ratio-nise { background: #60a5fa; }
.disabled-btn {
    opacity: 0.45;
    cursor: not-allowed;
    font-size: 12px;
    color: #888;
    border: 1px dashed #444;
    padding: 4px 10px;
    border-radius: 4px;
    display: inline-block;
    margin-top: 4px;
}
</style>
""", unsafe_allow_html=True)


# ── ヘッダー ──────────────────────────────────────────────────
st.title("🎬 Video Studio")

# 接続チェック
_hive = hive_alive()
_mlx  = mlx_alive()
is_demo = not (_hive and _mlx)

hc1, hc2, hc3, hc4 = st.columns([3, 1, 1, 1])
with hc1:
    if is_demo:
        st.markdown("""<div class="demo-banner">
        🔌 <strong>デモモード</strong> — AgentHive / oMLX に接続すると全機能が使えます。
        接続が必要なボタンはグレー表示されています。
        </div>""", unsafe_allow_html=True)
with hc2:
    if _hive:
        st.markdown('<span class="status-ok">● Hive 接続</span>', unsafe_allow_html=True)
    else:
        st.markdown('<span class="status-bad">● Hive 停止</span>', unsafe_allow_html=True)
with hc3:
    if _mlx:
        st.markdown('<span class="status-ok">● MLX 接続</span>', unsafe_allow_html=True)
    else:
        st.markdown('<span class="status-bad">● MLX 停止</span>', unsafe_allow_html=True)

st.markdown("---")


# ── セッション初期化 ──────────────────────────────────────────
if "cfg" not in st.session_state:
    st.session_state.cfg = {
        "style": "interview",
        "char_disp": 360,
        "mao_cx": 290,
        "nise_cx": 990,
        "char_bot_y": 618,
        "l2d_scale": 1.0,
        "l2d_mao_oy": 0.0,
        "l2d_nise_oy": 0.0,
        "tts_speed": 1.05,
        "l2d_mao_model": "",
        "l2d_nise_model": "",
        "bg_image": "",
    }
if "sel_script_idx" not in st.session_state:
    st.session_state.sel_script_idx = 0
if "log_text" not in st.session_state:
    st.session_state.log_text = ""
if "generated_script" not in st.session_state:
    st.session_state.generated_script = ""


# ══════════════════════════════════════════════════════════════
# 📜 元ファイル → 台本変換
# ══════════════════════════════════════════════════════════════
with st.expander("📜 元ファイル → 台本 変換", expanded=False):
    st.caption(
        "**インタビューログ** または **既存の台本** を入力して、"
        "**こはる/はると** の対話形式に変換します。"
    )
    if is_demo:
        st.info("🔌 この機能は **AgentHive + oMLX** への接続が必要です。")

    lc1, lc2, lc3 = st.columns([1, 1, 1], gap="medium")

    with lc1:
        st.markdown("##### 📄 元ファイル")
        demo_files = ["🎙 interview_log_20250520.md (45KB)",
                      "🎙 interview_log_20250510.md (38KB)",
                      "🎬 2025-05-01_既存台本.md (12KB)"]
        st.selectbox("元ファイル", demo_files, key="src_select_demo",
                     label_visibility="collapsed", disabled=is_demo)
        st.text_area("内容（編集可）", value=st.session_state.log_text,
                     height=280, key="log_text_area",
                     label_visibility="collapsed", disabled=is_demo)

    with lc2:
        st.markdown("##### 🪄 変換プロンプト")
        st.caption("ここを編集することで、台本の体裁・話者特性を自由に調整できます。")
        sample_prompt = (
            "こはる（明るい・ツッコミ役）とはると（落ち着いた・解説役）の対話形式に変換してください。\n"
            "各セクションは ## で区切り、テロップは [TELOP: テキスト] 形式で入れてください。\n"
            "視聴者が飽きないよう、ツッコミやリアクションを自然に入れてください。"
        )
        st.text_area("プロンプト", value=sample_prompt, height=350,
                     key="prompt_demo", label_visibility="collapsed",
                     disabled=is_demo)

    with lc3:
        st.markdown("##### ✨ 生成台本")
        if is_demo:
            st.markdown('<span class="disabled-btn">▶️ ログを台本に変換（要接続）</span>',
                        unsafe_allow_html=True)
            st.text_area("結果", value="（AgentHive + oMLX 接続後に使用可能）",
                         height=300, key="result_demo",
                         label_visibility="collapsed", disabled=True)
        else:
            if st.button("▶️ ログを台本に変換", type="primary",
                         use_container_width=True, key="convert_btn"):
                st.info("変換処理を開始します...")

st.markdown("---")


# ══════════════════════════════════════════════════════════════
# 🎭 装飾エディタ
# ══════════════════════════════════════════════════════════════
DECO_HELP_MD = """
**マークアップ記法**（セリフ内に直接書ける）:
- `<ツッコミ:本文>` ― 黄色ポップ・斜め配置。驚き・突き放しに
- `<吹き出し:本文>` ― 漫画風の白い吹き出し。心の声・補足に
- `<強調:キーワード>` ― 画面中央に大型赤縁文字。数字や核心ワード
- `<sfx:擬音>` ― 右下に「♪ ピコーン」など。転換ポイントに
"""

with st.expander("🎭 装飾エディタ（ツッコミ・強調・吹き出し・sfx）", expanded=False):
    st.markdown(DECO_HELP_MD)
    st.info("💡 **ハイブリッド方式**: 装飾は ① 台本に直接書く / ② `.deco.json` で別管理 の両方が使えます。")

    if is_demo:
        st.warning("🔌 AI自動挿入は AgentHive 接続時に使用可能です。装飾データのサンプルを表示しています。")

    dc1, dc2 = st.columns([3, 2], gap="medium")

    with dc1:
        from collections import Counter
        inline_cnt = Counter({"ツッコミ": 1, "強調": 1, "吹き出し": 1})
        file_cnt   = Counter(d["type"] for d in SAMPLE_DECORATIONS)

        cm1, cm2 = st.columns(2)
        with cm1:
            st.metric("✍️ 台本インラインタグ", sum(inline_cnt.values()),
                      " / ".join(f"{k}:{v}" for k, v in inline_cnt.items()))
        with cm2:
            st.metric("📄 .deco.json", f"{len(SAMPLE_DECORATIONS)} 個",
                      " / ".join(f"{k}:{v}" for k, v in file_cnt.items()))

        ac1, ac2 = st.columns([2, 1])
        with ac1:
            st.button("🎭 AI で自動挿入", use_container_width=True,
                      type="primary", key="deco_auto_btn", disabled=is_demo)
        with ac2:
            st.button("🗑 .deco.json を削除", use_container_width=True,
                      key="deco_clear_btn", disabled=is_demo)

        with st.expander(f"🔍 装飾の理由（AI判断）  {len(SAMPLE_DECORATIONS)}件", expanded=True):
            icon_map = {"ツッコミ": "💥", "吹き出し": "💭", "強調": "✨", "sfx": "♪"}
            for d in SAMPLE_DECORATIONS:
                icon = icon_map.get(d["type"], "•")
                st.markdown(
                    f"- {icon} **{d['type']}**: 「{d['text']}」 "
                    f"@ line{d['line_idx']} pos={d['position']} "
                    f"_({d['reason']})_"
                )

    with dc2:
        st.markdown("##### 🪄 プロファイル: **variety**")
        st.caption("`data/decorate_prompts/variety.md` の内容。ここを編集することで AI の判断ロジックが変わる。")
        sample_prof = (
            "## バラエティプロファイル\n\n"
            "### ツッコミを入れる基準\n"
            "- 数字や驚きの事実が出てきたとき\n"
            "- 逆説・意外性のある展開\n\n"
            "### 強調を入れる基準\n"
            "- 動画の核心キーワード\n"
            "- 視聴者に覚えてほしい数字\n"
        )
        st.text_area("プロファイル内容", value=sample_prof, height=300,
                     key="prof_area_demo", label_visibility="collapsed",
                     disabled=is_demo)
        st.button("💾 プロファイル保存", use_container_width=True,
                  key="prof_save_demo", disabled=is_demo)

st.markdown("---")


# ══════════════════════════════════════════════════════════════
# 📷 画像リクエスト
# ══════════════════════════════════════════════════════════════
with st.expander("📷 画像リクエスト（AI検出 → アサイン → Telegram通知）", expanded=False):
    st.caption(
        "LLM には画像は見せられないが、「ここに画像があると伝わる」箇所はテキストで判定できる。"
        "AI がリクエストを生成 → ユーザーが画像をアサイン → 動画レンダリング時に合成。"
    )
    if is_demo:
        st.info("🔌 画像リクエストの抽出・Telegram通知は AgentHive 接続時に使用可能です。")

    ic1, ic2, ic3 = st.columns([2, 1, 1])
    with ic1:
        st.button("🔍 AI で画像リクエストを抽出", use_container_width=True,
                  type="primary", key="scan_img_btn", disabled=is_demo)
    with ic2:
        st.button("📨 Telegramで通知", use_container_width=True,
                  key="notify_tg_btn", disabled=is_demo)

    st.markdown("##### 📋 画像リクエスト一覧（サンプル）")
    sample_img_reqs = [
        {"priority": "high",   "text": "AI活用率グラフ",       "category": "データ",   "reason": "数字の視覚化に効果的"},
        {"priority": "medium", "text": "中小企業オフィスの様子", "category": "雰囲気",   "reason": "共感を生む映像"},
        {"priority": "low",    "text": "ChatGPTの画面",        "category": "参考資料", "reason": "視聴者の理解補助"},
    ]
    prio_icon = {"high": "🔴", "medium": "🟡", "low": "🟢"}
    assigned = 1
    st.metric("ステータス", f"{assigned} / {len(sample_img_reqs)} 件アサイン済み")
    for req in sample_img_reqs:
        with st.container(border=True):
            cc1, cc2 = st.columns([2, 3])
            with cc1:
                icon = "✅" if req["priority"] == "high" else "⏳"
                st.markdown(f"**{icon} {prio_icon[req['priority']]} {req['text']}**  _{req['category']}_")
                st.caption(f"理由: {req['reason']}")
            with cc2:
                st.selectbox("既存画像から選択", ["(選択しない)", "photo_001.jpg", "photo_002.jpg"],
                             key=f"img_pick_{req['text']}", disabled=is_demo)
                st.button("💾 紐づけ", key=f"assign_{req['text']}", disabled=is_demo)

st.markdown("---")


# ══════════════════════════════════════════════════════════════
# 🎬 制作スタイル + 台本選択 + プレビュー
# ══════════════════════════════════════════════════════════════

# スタイル選択
style_keys = [k for k, _ in STYLE_OPTIONS]
cfg = st.session_state.cfg
sc1, sc2 = st.columns([1, 3])
with sc1:
    chosen_style = st.radio(
        "🎬 制作スタイル",
        style_keys,
        index=style_keys.index(cfg.get("style", "interview")),
        format_func=lambda k: STYLE_LABELS.get(k, k),
        horizontal=False,
        key="style_radio",
    )
with sc2:
    st.markdown("##### 各スタイルの特徴")
    st.markdown(
        "- **🎤 インタビュー**: 黒バー字幕・落ち着いた色・対話の流れを丁寧に見せる\n"
        "- **🎉 バラエティ**: 黄色テロップ・派手な配色・キーワードが画面中央にバンと出る"
    )
cfg["style"] = chosen_style

st.markdown("---")


# 台本選択 + プレビュー
script_names = [s["name"] for s in SAMPLE_SCRIPTS]
top_left, top_right = st.columns([1, 2], gap="large")

with top_left:
    st.subheader("📝 台本")
    sel_idx = st.session_state.sel_script_idx
    selected_name = st.selectbox(
        "台本ファイル（最終更新順）",
        script_names,
        index=sel_idx,
        key="script_select",
    )
    st.session_state.sel_script_idx = script_names.index(selected_name)
    summary = SAMPLE_SCRIPTS[st.session_state.sel_script_idx]

    mao_pct  = int(summary["mao_count"] / summary["total_speech"] * 100)
    nise_pct = 100 - mao_pct

    st.markdown(f"""
<div class="summary-card">
  <div style="font-size:18px;font-weight:600;color:#e0d0ff;margin-bottom:8px">
    {summary['title']}
  </div>
  <div style="color:#9ec5fb;font-size:13px">
    セクション {len(summary['sections'])} 件 / セリフ {summary['total_speech']} 行 / テロップ {summary['telop_count']} 件
  </div>
</div>
<div style="margin:8px 0">
  <div style="font-size:12px;color:#aaa;margin-bottom:4px">
    出番比率: こはる {summary['mao_count']} ({mao_pct}%) / はると {summary['nise_count']} ({nise_pct}%)
  </div>
  <div class="ratio-bar">
    <div class="ratio-mao"  style="width:{mao_pct}%"></div>
    <div class="ratio-nise" style="width:{nise_pct}%"></div>
  </div>
</div>
""", unsafe_allow_html=True)

    picked_scene = st.selectbox(
        "🧭 プレビューするシーン",
        ["▶ タイトル画面"] + summary["sections"],
        key="preview_section_pick",
    )

    with st.expander(f"📑 全セクション ({len(summary['sections'])})", expanded=False):
        for i, sec in enumerate(summary["sections"], 1):
            st.markdown(f"**{i}. {sec}**")

    with st.expander("📖 本文プレビュー", expanded=False):
        st.code(summary["preview"], language="markdown")


with top_right:
    st.subheader("🎨 動画プレビュー（一枚絵）")
    st.info(
        "⬇ 下のパネルでキャラ・背景・配置を選んで「🔄 プレビュー更新」を押してください\n\n"
        "（プレビュー生成は **ローカル環境の `video_maker.py`** が必要です）"
    )

st.markdown("---")


# ══════════════════════════════════════════════════════════════
# 🎭 ビジュアル設定
# ══════════════════════════════════════════════════════════════
st.subheader("🎭 ビジュアル設定")

new = dict(cfg)

vc1, vc2, vc3 = st.columns(3)
with vc1:
    st.markdown("##### 👈 左キャラ")
    sel_mao = st.selectbox("2Dモデル", SAMPLE_L2D_MODELS, index=0, key="sel_mao")
with vc2:
    st.markdown("##### 👉 右キャラ")
    sel_nise = st.selectbox("2Dモデル", SAMPLE_L2D_MODELS, index=1, key="sel_nise")
with vc3:
    st.markdown("##### 🖼 背景")
    sel_bg = st.selectbox("画像", SAMPLE_BG_IMAGES, index=0, key="sel_bg")

with st.expander("📐 配置・サイズ", expanded=True):
    pc1, pc2 = st.columns(2)
    with pc1:
        new["char_disp"] = st.slider("キャラ表示サイズ (px)", 200, 480, int(cfg.get("char_disp", 360)), 10)
        new["char_bot_y"] = st.slider("キャラ下端 Y", 500, 680, int(cfg.get("char_bot_y", 618)), 5)
    with pc2:
        new["mao_cx"]  = st.slider("👈 左キャラ X 中心", 100, 600, int(cfg.get("mao_cx", 290)), 5)
        new["nise_cx"] = st.slider("👉 右キャラ X 中心", 700, 1200, int(cfg.get("nise_cx", 990)), 5)

with st.expander("🎚 Live2D / TTS（詳細）", expanded=False):
    new["l2d_scale"] = st.slider("Live2D スケール（両キャラ共通）", 0.4, 1.5, float(cfg.get("l2d_scale", 1.0)), 0.05)
    lc1, lc2 = st.columns(2)
    with lc1:
        new["l2d_mao_oy"]  = st.slider("👈 左キャラ Yオフセット", -1.0, 0.5, float(cfg.get("l2d_mao_oy", 0.0)), 0.05)
    with lc2:
        new["l2d_nise_oy"] = st.slider("👉 右キャラ Yオフセット", -1.0, 0.5, float(cfg.get("l2d_nise_oy", 0.0)), 0.05)
    new["tts_speed"] = st.slider("TTS 速度", 0.8, 1.5, float(cfg.get("tts_speed", 1.05)), 0.05)

# アクションボタン
bc1, bc2, bc3, bc4 = st.columns([1, 1, 1, 2])
with bc1:
    if st.button("🔄 プレビュー更新", use_container_width=True, type="primary"):
        if is_demo:
            st.info("ローカル環境（`video_maker.py`）への接続が必要です。")
        else:
            st.info("プレビュー生成中...")
with bc2:
    if st.button("💾 設定保存", use_container_width=True):
        st.session_state.cfg = new
        st.success("設定を保存しました ✓ (デモ: セッション内のみ)")
with bc3:
    if st.button("↻ リセット", use_container_width=True):
        st.session_state.cfg = {
            "style": "interview", "char_disp": 360, "mao_cx": 290,
            "nise_cx": 990, "char_bot_y": 618, "l2d_scale": 1.0,
            "l2d_mao_oy": 0.0, "l2d_nise_oy": 0.0, "tts_speed": 1.05,
        }
        st.rerun()
with bc4:
    st.button("▶️ この設定で動画生成", use_container_width=True,
              type="primary", disabled=is_demo, key="gen_video_btn")
    if is_demo:
        st.caption("🔌 AgentHive 接続で有効")

st.markdown("---")

# 最新動画エリア
st.subheader("🎞 最新動画")
st.info("動画生成後、ここにプレビューが表示されます。（ローカル環境でのみ動作）")

st.markdown("---")
st.markdown(
    '<p style="color:#555;font-size:12px;text-align:center;">'
    'ONSIGHT Video Studio — '
    '<a href="https://onsight.vercel.app" style="color:#666;">onsight.vercel.app</a>'
    '</p>',
    unsafe_allow_html=True,
)
