export default function Problem() {
  const problems = [
    {
      num: "01",
      icon: "⚡",
      title: "Шектен тыс энергия",
      desc: "Жыл сайын 150 ТВт·сағ электр энергиясы — бүкіл Аргентина елінен көп.",
      stat: "+38% жыл сайын өсуде",
    },
    {
      num: "02",
      icon: "🔥",
      title: "Қызу шығару",
      desc: "Майнинг фермалары 80°C-қа дейін қызады, орасан зор салқындату жүйелерін қажет етеді.",
      stat: "85°C орташа температура",
    },
    {
      num: "03",
      icon: "☁",
      title: "CO₂ ластануы",
      desc: "Жыл сайын 65 миллион тонна көміртек шығарындысы — Нидерландыдан көп.",
      stat: "65M тонна CO₂",
    },
    {
      num: "04",
      icon: "💸",
      title: "Қымбат электр",
      desc: "Майнинг компаниялары айына $4 миллиардқа жуық электр энергиясына төлейді.",
      stat: "$4B/ай шығын",
    },
  ];

  return (
    <section id="mesele">
      <div className="reveal">
        <div className="section-tag">01 · Проблема</div>
        <h2 className="section-title">
          Дәстүрлі майнинг
          <br />
          планетаны жалмап жатыр
        </h2>
        <p className="section-subtitle">
          Бір биткоин транзакциясы орташа отбасының 70 күндік электр тұтынуына тең. Бұл — климат дағдарысының жасырын
          драйвері.
        </p>
      </div>

      <div className="problem-grid">
        {problems.map((p) => (
          <div key={p.num} className="problem-card reveal">
            <div className="problem-card-num">{p.num}</div>
            <div className="problem-card-icon">{p.icon}</div>
            <div className="problem-card-title">{p.title}</div>
            <div className="problem-card-desc">{p.desc}</div>
            <div className="problem-card-stat">{p.stat}</div>
          </div>
        ))}
      </div>

      <div className="compare reveal">
        <div className="compare-side compare-bad">
          <div className="compare-label">— Дәстүрлі майнинг</div>
          <div className="compare-title">Ескі модель</div>
          <ul className="compare-list">
            <li>
              Энергия көзі <span className="val">Көмір · Газ</span>
            </li>
            <li>
              kWh/блок <span className="val">1 500</span>
            </li>
            <li>
              CO₂ шығарылым <span className="val">Жоғары</span>
            </li>
            <li>
              Салқындату <span className="val">Су · Фреон</span>
            </li>
            <li>
              AI оптимизация <span className="val">Жоқ</span>
            </li>
            <li>
              Жылу қайта пайдалану <span className="val">0%</span>
            </li>
          </ul>
        </div>
        <div className="compare-vs">VS</div>
        <div className="compare-side compare-good">
          <div className="compare-label">+ GreenChain Mining</div>
          <div className="compare-title">Жаңа жүйе</div>
          <ul className="compare-list">
            <li>
              Энергия көзі <span className="val">Күн · Жел</span>
            </li>
            <li>
              kWh/блок <span className="val">500</span>
            </li>
            <li>
              CO₂ шығарылым <span className="val">Нөл</span>
            </li>
            <li>
              Салқындату <span className="val">AI · Табиғи</span>
            </li>
            <li>
              AI оптимизация <span className="val">24/7</span>
            </li>
            <li>
              Жылу қайта пайдалану <span className="val">95%</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
