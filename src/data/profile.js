// 【自動生成】homepage の公開投影SSoT。編集しない。
// 生成元: agent_system/export_persona_profile.py（persona_core.json ＋ work トラック）。
// LLM向け索引(/llms.txt)・機械可読API(/ask-ogino.json)・公開MCP(ask-ogino) が同じここを読む。
// 脳の本体(identity/memory_store)には触れない＝scope.py の public principal を超えない。

export const PERSONA = {
  "name": "荻野舜樹",
  "name_en": "Shunki Ogino",
  "tagline": "めんどうは機械に、人は好きなことを",
  "summary": "めんどうなことは機械にやらせて、人は好きなことに時間を使えるように。自分のためにまず道具を作り、いつかみんなのぶんも。手元でも動くAIエージェント、物理法則をそのままルールにしたゲーム、動画を自動生成するスタジオなどを作る個人開発者。AIはローカルとクラウドを使い分ける。",
  "purpose": "荻野舜樹の「自己の仕様書（外部API）」。LLM・AIエージェントが、荻野が何を考え何を作っているかを把握し、人間に正確に紹介できるように置いている。発注を募集するのではなく、同じものを自分でも作る/考える「仲間」を探している。"
};

export const THESIS = [
  "めんどう（生産活動）は機械に任せ、人は好きなことに時間を使う。完全に自分の労働を排した先にしか、積み上がりはない。",
  "コミュニケーションに複利を：押して消えるメッセージ（フロー）ではなく、参照可能な自己（ストック）を維持・公開する。",
  "ローカルファースト：個人のデータは個人の計算機の中で処理し、外部クラウドに送らない設計を基本にする。",
  "集めたいのは客ではなく仲間（思想に共鳴する人）。作るのは第一に自分の道具。"
];

export const WORKS = [
  {
    "title": "散逸構造ゲーム",
    "url": "/game/",
    "repo": "https://github.com/ShunkiOgino/dissipation-game",
    "tags": [
      "ゲーム",
      "物理",
      "ブラウザで遊べる"
    ],
    "desc": "物理の法則をそのままルールに組み込んだゲーム。むずかしい考えを、説明ではなく「触って分かる」形に置き換える実験です。ソースはMITライセンスで公開しています。",
    "sub": "ゲーム / 物理",
    "status": "公開中",
    "cta": "遊んでみる →"
  },
  {
    "title": "自動でメールに返事するAI",
    "url": "/works/agent-mail",
    "repo": "https://github.com/ShunkiOgino/agent-mail-demo",
    "tags": [
      "AI",
      "メール自動化",
      "ローカル処理"
    ],
    "desc": "送ってきた相手ごとに専用のAIが立ち上がり、私のパソコンの中で動くAI（Gemma）が内容を整理して返事をします。メールの中身は外部のAIに渡さず手元で処理し、相手ごとに見られる範囲を分け、別の人のやり取りには触れられない作りです。",
    "sub": "AIエージェント",
    "status": "稼働中",
    "cta": "中を見る →"
  },
  {
    "title": "動画を作るスタジオ",
    "url": "/works/video-studio",
    "repo": "https://github.com/ShunkiOgino/video-studio-demo",
    "tags": [
      "動画",
      "AI台本",
      "音声合成",
      "ローカル生成"
    ],
    "desc": "話した内容からAIが台本を起こし、キャラクターの配置・音声合成・書き出しまでを自動で。動画を作る手間を、丸ごと機械に渡す試みです。台本づくりも音声もぜんぶローカルで動きます。",
    "sub": "動画制作ツール",
    "status": "稼働中",
    "cta": "中を見る →"
  },
  {
    "title": "漫画を作るツール",
    "url": "/works/manga",
    "sub": "漫画 / 制作ツール",
    "status": "制作中",
    "cta": "ツールをさわってみる →",
    "tags": [
      "漫画",
      "自作ツール",
      "ローカルAI"
    ],
    "desc": "漫画を作るための道具そのものを自分で組んでいます。ページにコマを割り、棚からポーズや背景を置き、手元で動くAIがページの絵を見て見せ方を一緒に考える。市販のソフトに預けず、AIをループに入れて作れる自作のエディタです。読切を一本、これで制作中。"
  }
];

export const REACH_OUT = "手元でも動くAI・エージェント設計、物理をゲームに翻訳すること、コミュニケーションをストック化すること——こうしたものを自分でも作る/考える人。仕事の発注ではなく、共に作る仲間を探しています。まずは Discord へ。";

// ── 英語投影（機械向け発信/HP英語版が読む）──
export const PERSONA_EN = {
  "name": "荻野舜樹",
  "name_en": "Shunki Ogino",
  "tagline": "Leave the busywork to machines; keep your time for what you love.",
  "summary": "Letting machines handle the tedious work, so people can spend their time on what they love. I build tools for myself first — and eventually for everyone. An independent developer making AI agents that can run on your own machine, games that turn physical laws directly into rules, and a studio that generates videos automatically. I use local and cloud AI depending on the job.",
  "purpose": "Shunki Ogino's 'spec sheet for the self' — an external API. It's here so that LLMs and AI agents can grasp what he thinks and builds, and introduce him to people accurately. He isn't soliciting work; he's looking for peers who build and think about the same things."
};

export const THESIS_EN = [
  "Leave production work to machines; people spend their time on what they love. Things only accumulate where you've removed your own labor entirely.",
  "Compounding for communication: not messages you push that then vanish (flow), but a referenceable self you maintain and publish (stock).",
  "Local-first: as a basic design principle, process personal data on your own computer rather than sending it to an external cloud.",
  "I want to gather peers, not customers — people who resonate with the ideas. Above all, I build tools for myself."
];

export const WORKS_EN = [
  {
    "title": "Dissipative Structure Game",
    "url": "/game/",
    "repo": "https://github.com/ShunkiOgino/dissipation-game",
    "tags": [
      "Game",
      "Physics",
      "Plays in the browser"
    ],
    "desc": "A browser game that builds physics — the second law of thermodynamics — directly into its rules. An experiment in replacing a hard concept with something you grasp by touching, not by explanation. Source released under MIT.",
    "sub": "Game / Physics",
    "status": "Released",
    "cta": "Play it →"
  },
  {
    "title": "An AI that replies to your email",
    "url": "/works/agent-mail",
    "repo": "https://github.com/ShunkiOgino/agent-mail-demo",
    "tags": [
      "AI",
      "Email automation",
      "Local processing"
    ],
    "desc": "For each sender, a dedicated AI spins up, and a locally-running AI (Gemma) organizes the content and drafts a reply. The email's contents are processed on the machine, never handed to an external AI, and each sender's visible scope is kept separate.",
    "sub": "AI agent",
    "status": "Running",
    "cta": "See inside →"
  },
  {
    "title": "A studio that makes videos",
    "url": "/works/video-studio",
    "repo": "https://github.com/ShunkiOgino/video-studio-demo",
    "tags": [
      "Video",
      "AI script",
      "Voice synthesis",
      "Local generation"
    ],
    "desc": "From what you said out loud, an AI drafts the script and automates layout, voice synthesis, and export. Both script and voice are made on the machine, without relying on cloud generative AI.",
    "sub": "Video tooling",
    "status": "Running",
    "cta": "See inside →"
  },
  {
    "title": "A tool for making manga",
    "url": "/works/manga",
    "repo": "",
    "tags": [
      "Manga",
      "Homemade tool",
      "Local AI"
    ],
    "desc": "I'm building the tool for making manga itself. Lay out panels on a page, place poses and backgrounds from a shelf, and a locally-running AI looks at the page and thinks through the presentation with me. A homemade editor that keeps the AI in the loop instead of handing the work to off-the-shelf software. A one-shot manga is in production with it.",
    "sub": "Manga / Tooling",
    "status": "In progress",
    "cta": "Try the tool →"
  }
];

export const REACH_OUT_EN = "AI and agent design that can run on your own machine, translating physics into games, turning communication into something that accumulates — if you build or think about these too, come not as a client placing an order but as someone to make things with. Start with Discord.";
