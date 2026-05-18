# 🌿 GreenChain Mining

> Блокчейн энергиясын азайтатын интеллектуалды экожүйе

Премиум деңгейдегі, cinematic анимациялары бар, AI dashboard және 3D майнинг фермасымен жабдықталған Next.js 15 стартап сайты.

---

## 🚀 Іске қосу

```bash
# 1. Тәуелділіктерді орнату
npm install

# 2. Әзірлеу режимі
npm run dev

# 3. Өндіріс үшін build
npm run build
npm run start
```

Сайт `http://localhost:3000` мекенжайында ашылады.

---

## ⚡ Технологиялар

- **Next.js 15** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **Three.js** — 3D сценалар (Hero, Майнинг фермасы, Жер глобусы)
- **HTML5 Canvas** — реалтайм визуализациялар (BG, AI нейрондық желі, графиктер)

---

## 📁 Folder Structure

```
greenchain-mining/
├── app/
│   ├── layout.tsx              # Root layout, шрифттер, metadata
│   ├── page.tsx                # Басты бет
│   └── globals.css             # Барлық стильдер
│
├── components/
│   ├── ui/
│   │   ├── Loader.tsx          # Loading screen
│   │   ├── CustomCursor.tsx    # Glow cursor
│   │   ├── Background.tsx      # Blockchain торы + particles
│   │   ├── Navigation.tsx      # Top nav
│   │   └── RevealObserver.tsx  # Scroll анимациялар
│   │
│   └── sections/
│       ├── Hero.tsx            # 1-бөлім: Hero + 3D blockchain
│       ├── Problem.tsx         # 2-бөлім: Мәселе + comparison
│       ├── HowItWorks.tsx      # 3-бөлім: 6 қадамдық timeline
│       ├── Dashboard.tsx       # 4-бөлім: Live energy dashboard
│       ├── Farm3D.tsx          # 5-бөлім: Three.js 3D ферма
│       ├── KazakhstanCase.tsx  # 6-бөлім: Шымкент мысалы
│       ├── AIControl.tsx       # 7-бөлім: AI орталық
│       ├── Future.tsx          # 8-бөлім: Болашақ + Жер глобусы
│       ├── CTA.tsx             # Call-to-action
│       └── Footer.tsx          # 9-бөлім: Footer
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🎬 Сайттың бөлімдері

| № | Бөлім | Не бар |
|---|---|---|
| 1 | **Hero** | Three.js 3D blockchain тор, glow buttons, animated counters |
| 2 | **Мәселе** | 4 проблема карточкасы + Traditional VS GreenChain |
| 3 | **Қалай жұмыс істейді** | 6 қадамдық cinematic timeline |
| 4 | **Live Dashboard** | 6 KPI, real-time chart, donut, тірі сағат |
| 5 | **3D Ферма** | Three.js: панельдер, турбиналар, контейнерлер, drones |
| 6 | **Қазақстан** | Before/After (1500→500 kWh), animated bar |
| 7 | **AI** | Нейрондық желі визуализация + live log stream |
| 8 | **Болашақ** | 6 карточка + wireframe Earth |
| 9 | **Footer** | Premium glow, әлеуметтік желілер |

---

## 🎨 Дизайн стилі

- **Қара фон** + **Neon green** (#00ff9d) + **Cyan** (#22d3ee)
- **Glassmorphism** карточкалар
- **Cinematic анимациялар** (scroll-triggered)
- **Custom cursor** glow ring-пен
- **Cyberpunk + AI interface** атмосфера

---

## 📱 Responsive

✅ Desktop (1920px+) · ✅ Laptop · ✅ Tablet · ✅ Mobile

Custom cursor мобильді құрылғыларда автоматты түрде өшеді.

---

## 🌍 Тіл

Барлық интерфейс **толықтай қазақ тілінде**.

---

## 📜 Лицензия

Университеттің практикалық тапсырмасы үшін жасалды.

**GreenChain Mining** — болашақтың экомайнингі. Қазақстаннан әлемге. 🌿
