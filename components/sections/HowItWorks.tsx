export default function HowItWorks() {
  const steps = [
    {
      icon: "☀",
      title: "Күн панельдері",
      desc: "Жоғары тиімді моноблокты панельдер күн көзінен таза электр энергиясын өндіреді. Орташа 850 МВт қуат.",
      tag: "SOLAR · 28% ҮЛЕС",
    },
    {
      icon: "🌬",
      title: "Жел турбиналары",
      desc: "Тәулік бойы жұмыс істейтін тік осьті турбиналар тұрақты қосымша энергия береді. Орташа жел 6,2 м/с.",
      tag: "WIND · 32% ҮЛЕС",
    },
    {
      icon: "🔋",
      title: "Литий-фосфат батареясы",
      desc: "Артық өндірілген энергияны сақтайды. Кеште майнингті үздіксіз қамтамасыз етеді. Сыйымдылығы 2,4 МВт·сағ.",
      tag: "STORAGE · LFP",
    },
    {
      icon: "🧠",
      title: "AI энергия диспетчері",
      desc: "Нейрондық желі ауа-райын болжайды, жүктемені бөледі және оңтайлы майнинг кестесін құрады.",
      tag: "AI · DEEP LEARNING",
    },
    {
      icon: "⛏",
      title: "Майнинг модулі",
      desc: "ASIC чиптері тек жасыл энергия қолжетімді кезде жұмыс істейді. Динамикалық хэшрейт басқару.",
      tag: "MINING · 12 TH/s",
    },
    {
      icon: "♻",
      title: "Жылу рекуперациясы",
      desc: "Майнингтен шыққан жылу теплица мен жергілікті тұрғын үйлерді жылытады. Шығынсыз цикл.",
      tag: "RECYCLE · 95%",
    },
  ];

  return (
    <section id="qalai">
      <div className="reveal">
        <div className="section-tag">02 · Технология</div>
        <h2 className="section-title">
          GreenChain
          <br />
          қалай жұмыс істейді
        </h2>
        <p className="section-subtitle">
          Алты қадамдық автономды экожүйе. Әр компонент AI-мен үйлестірілген, әр ватт есепке алынған.
        </p>
      </div>

      <div className="timeline">
        {steps.map((s, i) => (
          <div key={i} className="step reveal">
            <div className="step-card">
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
              <div className="step-tag">{s.tag}</div>
            </div>
            <div className="step-num">{i + 1}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
