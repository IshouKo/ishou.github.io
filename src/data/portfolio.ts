export type TimelineItem = {
  date?: string;
  title: string;
  description?: string;
  href?: string;
};

export const publications: TimelineItem[] = [
  {
    date: "2026",
    title: "IEEE ICIP 2026",
    description:
      'Weixiang Hu, Bohan Huang, Shigeaki Namiki, Yuka Ogino, Takahiro Toizumi, Atsushi Ito, Yoshimitsu Aoki. “EMARS: Event-based Motion-Aware Correction, Deblurring and Interpolation of Rolling Shutter Images”',
    href: "https://2026.ieeeicip.org/list-of-accepted-regular-and-special-session-papers/",
  },
  {
    date: "2026",
    title: "MIRU 2026",
    description:
      "胡 煒翔, 黄 柏翰, 並木 重哲, 荻野 有加, 戸泉 貴裕, 伊藤 厚史, 青木 義満. 「イベントデータを用いた動き推定に基づくローリングシャッター画像の歪み補正・ブレ除去およびフレーム補間」",
    href: "https://miru-committee.github.io/miru2026/program/timetable/",
  },
];

export const researchExperience: TimelineItem[] = [
  {
    date: "2026",
    title: "CVPR 2026 Submission Experience",
    description:
      "Full-paper submission, peer-review response analysis, and rebuttal experience for a computer-vision research project.",
  },
];

export const patents: TimelineItem[] = [
  {
    title: "画像処理装置、画像処理方法及びプログラム",
    description: "PCT国際出願",
  },
];

export const internships: TimelineItem[] = [
  {
    date: "2026/09 – 2026/11",
    title: "NEC バイオメトリクス研究所 — Incoming R&D Intern",
    description:
      "画像認識エンジン強化のためのセンシング最適化に関する研究開発 / Research on AI-friendly image sensing and enhancement.",
  },
  {
    date: "2026/07 – Present",
    title: "光通信 / コア・コンサルティング・グループ — AI Intern",
    description:
      "LLM、OCR、RPA、APIを用いた企業業務自動化システムの設計・開発。",
  },
  {
    date: "2026/01 – 2026/07",
    title: "Crystal Method — AI System Development Engineer Intern",
    description:
      "AIアバターチャットWebサービスの運用開発、Webサービスのモバイルアプリ化、日本語音声合成の学習・環境構築。",
  },
];

export const awards: TimelineItem[] = [
  { date: "2024/04 – 2026/03", title: "イオンスカラシップ" },
  { date: "2023/10 – 2024/03", title: "慶應義塾大学給費奨学金" },
  { date: "2023/04 – 2023/09", title: "山岡憲一記念基金奨学金" },
];

export const education: TimelineItem[] = [
  {
    date: "2026/04 – Present",
    title: "慶應義塾大学大学院 理工学研究科",
    description: "総合デザイン工学専攻 電気情報工学カリキュラム 青木研究室",
  },
  {
    date: "2022/04 – 2026/03",
    title: "慶應義塾大学 理工学部",
    description: "電気情報工学科 青木研究室",
  },
];

export const skillGroups = [
  {
    title: "プログラミング言語",
    values: ["Python", "C", "C++", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "MATLAB"],
  },
  {
    title: "フレームワーク・ライブラリ",
    values: ["PyTorch", "TensorFlow", "OpenCV", "NumPy", "pandas", "scikit-learn", "React", "React Native", "FastAPI"],
  },
  {
    title: "ツール・開発環境",
    values: ["Git", "GitHub", "Linux", "Docker", "Xcode", "Claude Code", "Codex"],
  },
  {
    title: "AI研究・開発領域",
    values: ["Deep Learning", "Machine Learning", "Computer Vision", "LLM Application", "STT/TTS", "AI Agent", "Infrastructure"],
  },
  {
    title: "言語・その他",
    values: ["English Paper Reading & Writing", "Japanese", "English", "Chinese", "Semiconductor"],
  },
];

export const certifications = [
  "画像処理エンジニア検定 エキスパート",
  "TOEFL iBT 108/120 — Reading 30, Listening 27, Speaking 24, Writing 27",
  "日本語能力試験 N1",
  "普通自動車第一種運転免許",
];

export const articles = [
  {
    label: "Language Learning",
    title: "TOEFL108点・N1を取った僕の外国語勉強法",
    description:
      "AI・コンピュータビジョン研究者の立場から、AI時代に外国語を学ぶ意味と、単語・Reading・Listening・Speaking・Writingの勉強法を紹介します。",
    href: "https://note.com/apt_marten8681/n/ne70bbefba774",
  },
];
