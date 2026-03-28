import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const STARS_COUNT = 120;

function generateStars() {
  return Array.from({ length: STARS_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));
}

const stars = generateStars();

function FullereneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <polygon points="50,8 78,25 78,60 50,77 22,60 22,25" stroke="currentColor" strokeWidth="1.2" opacity="0.7" fill="none" />
      <polygon points="50,20 68,30 68,55 50,65 32,55 32,30" stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="none" />
      <circle cx="50" cy="8" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="78" cy="25" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="78" cy="60" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="77" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="22" cy="60" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="22" cy="25" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default function Index() {
  const [visible, setVisible] = useState(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el;
  };

  return (
    <div
      className="min-h-screen font-montserrat overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #04030f 0%, #080520 30%, #0d0b2e 60%, #1a1045 100%)" }}
    >
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula glow blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-10 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-10 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)", animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-10 w-64 h-64 rounded-full opacity-5 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #00d4aa 0%, transparent 70%)", animationDelay: "3s" }}
        />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="absolute top-16 right-8 md:right-20 opacity-20 animate-float text-yellow-400 w-24 h-24 md:w-40 md:h-40">
          <FullereneIcon className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-8 md:left-20 opacity-15 animate-float-slow text-teal-400 w-16 h-16 md:w-28 md:h-28">
          <FullereneIcon className="w-full h-full" />
        </div>

        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 text-sm font-montserrat tracking-widest uppercase"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              background: "rgba(201,168,76,0.05)",
              color: "rgba(201,168,76,0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Icon name="Sparkles" size={14} />
            Онлайн-встреча для педагогов
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-base md:text-lg font-montserrat" style={{ color: "rgba(232,228,255,0.7)" }}>
              <Icon name="Calendar" size={18} className="text-yellow-400" />
              <span>5 апреля</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-yellow-400/50" />
            <div className="flex items-center gap-2 text-base md:text-lg font-montserrat" style={{ color: "rgba(232,228,255,0.7)" }}>
              <Icon name="Clock" size={18} className="text-yellow-400" />
              <span>19:00 МСК</span>
            </div>
          </div>

          <h1
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light mb-2 leading-none"
            style={{ color: "#f0d080", textShadow: "0 0 60px rgba(201,168,76,0.4)" }}
          >
            Рождение
          </h1>
          <h1
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-semibold italic mb-2 leading-none"
            style={{ color: "#ffffff", textShadow: "0 0 40px rgba(255,255,255,0.2)" }}
          >
            педагогического
          </h1>
          <h1
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light mb-10 leading-none"
            style={{ color: "#00d4aa", textShadow: "0 0 60px rgba(0,212,170,0.4)" }}
          >
            Вдохновения
          </h1>

          <p className="text-base md:text-lg font-montserrat font-light max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: "rgba(184,176,216,0.7)" }}>
            Пространство квантовой педагогики, где каждый управляет своим состоянием и вдохновляет других
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://vk.com/rostobraz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-montserrat font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)",
                color: "#04030f",
                boxShadow: "0 0 30px rgba(201,168,76,0.3)",
              }}
            >
              <Icon name="Users" size={18} />
              Присоединиться в ВКонтакте
            </a>
            <a
              href="https://wa.me/79270721673"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-montserrat font-medium text-base transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(0,212,170,0.5)",
                background: "rgba(0,212,170,0.08)",
                color: "#00d4aa",
                backdropFilter: "blur(10px)",
              }}
            >
              <Icon name="MessageCircle" size={18} />
              Связаться в WhatsApp
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <Icon name="ChevronDown" size={24} className="text-yellow-400" />
        </div>
      </section>

      {/* ─── ДЛЯ КОГО ─── */}
      <section className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div ref={addRef(0)} className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-montserrat mb-4" style={{ color: "rgba(201,168,76,0.6)" }}>
              <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
              Аудитория встречи
              <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white">
              Для <span style={{ color: "#f0d080" }}>кого</span> эта встреча?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "Flame" as const,
                title: "На грани выгорания",
                text: "Для педагогов, которые находятся на стадии выгорания и ищут выход из состояния усталости",
                color: "#c9a84c",
                glow: "rgba(201,168,76,0.15)",
              },
              {
                icon: "Lightbulb" as const,
                title: "В поиске Вдохновения",
                text: "Для тех, кто ищет Вдохновение в образовании и хочет снова почувствовать радость от своей профессии",
                color: "#00d4aa",
                glow: "rgba(0,212,170,0.15)",
              },
              {
                icon: "Building" as const,
                title: "Руководители учебных заведений",
                text: "Для организаторов, которые ищут Вдохновения для педагогического коллектива",
                color: "#a78bfa",
                glow: "rgba(167,139,250,0.15)",
              },
            ].map((item, i) => (
              <div
                key={i}
                ref={addRef(i + 1)}
                className="relative rounded-2xl p-8 opacity-0 translate-y-10 transition-all duration-700 hover:scale-105 cursor-default"
                style={{
                  transitionDelay: `${i * 150}ms`,
                  background: `radial-gradient(circle at top left, ${item.glow}, transparent 60%), rgba(255,255,255,0.03)`,
                  border: `1px solid ${item.color}22`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  <Icon name={item.icon} size={22} />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed font-montserrat" style={{ color: "rgba(184,176,216,0.6)" }}>{item.text}</p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl opacity-30"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── О ЧЁМ ВСТРЕЧА ─── */}
      <section className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div ref={addRef(4)} className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-montserrat mb-4" style={{ color: "rgba(201,168,76,0.6)" }}>
              <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
              Программа встречи
              <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white">
              О чём будем <span style={{ color: "#f0d080" }}>говорить</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Почему происходит выгорание",
                text: "Разберём глубинные причины педагогического выгорания и поймём механизмы его возникновения",
              },
              {
                num: "02",
                title: "Где искать Вдохновение",
                text: "Откроем источники вдохновения, которые находятся внутри каждого педагога",
              },
              {
                num: "03",
                title: "Атмосфера Творчества",
                text: "Как создать атмосферу Творчества среди педагогов и сделать коллектив живым и вдохновлённым",
              },
              {
                num: "04",
                title: "От внешней к внутренней мотивации",
                text: "Как перейти от оценок и денег — к радости от самого процесса. Ключ к устойчивому вдохновению",
              },
            ].map((item, i) => (
              <div
                key={i}
                ref={addRef(i + 5)}
                className="flex gap-5 p-6 rounded-2xl opacity-0 translate-y-10 transition-all duration-700 group"
                style={{
                  transitionDelay: `${i * 120}ms`,
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <div
                  className="font-cormorant text-4xl font-light shrink-0 leading-none mt-1"
                  style={{ color: "rgba(201,168,76,0.3)" }}
                >
                  {item.num}
                </div>
                <div>
                  <h3 className="font-cormorant text-xl md:text-2xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-montserrat" style={{ color: "rgba(184,176,216,0.5)" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── СПИКЕР ─── */}
      <section className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div ref={addRef(9)} className="opacity-0 translate-y-10 transition-all duration-700">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-montserrat mb-4" style={{ color: "rgba(201,168,76,0.6)" }}>
                <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
                Спикер встречи
                <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
              </div>
              <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white">
                Познакомьтесь со <span style={{ color: "#f0d080" }}>спикером</span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="relative shrink-0">
                <div
                  className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
                  style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }}
                />
                <div
                  className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden flex items-end justify-center"
                  style={{ border: "1px solid rgba(201,168,76,0.2)", background: "linear-gradient(to bottom, rgba(13,11,46,0.6) 0%, rgba(4,3,15,0.8) 100%)" }}
                >
                  <img
                    src="https://cdn.poehali.dev/projects/4d42a0ab-9035-47df-ab8c-33a5c4f90991/bucket/69c7a875-7d5f-4950-8750-0182c4dc3020.png"
                    alt="Ефремова Мария Викторовна"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-16 h-16 text-yellow-400 opacity-40 animate-spin-slow">
                  <FullereneIcon className="w-full h-full" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 text-teal-400 opacity-30 animate-float-slow">
                  <FullereneIcon className="w-full h-full" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-cormorant text-3xl md:text-4xl font-semibold text-white mb-1">
                  Ефремова Мария Викторовна
                </h3>
                <p className="text-sm font-montserrat font-medium tracking-wide uppercase mb-6" style={{ color: "#c9a84c" }}>
                  Руководитель · Педагог · Психолог
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Многодетная мама", "Основатель Центра «Вдохновения»", "Квантовая педагогика"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-montserrat px-3 py-1 rounded-full"
                      style={{
                        border: "1px solid rgba(0,212,170,0.3)",
                        color: "rgba(0,212,170,0.8)",
                        background: "rgba(0,212,170,0.05)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid rgba(201,168,76,0.15)",
                      background: "rgba(201,168,76,0.04)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <p className="font-cormorant text-lg italic mb-2" style={{ color: "rgba(232,228,255,0.8)" }}>
                      Центр поддержки семейного образования «Вдохновение»
                    </p>
                    <p className="text-sm leading-relaxed font-montserrat" style={{ color: "rgba(184,176,216,0.6)" }}>
                      Единое пространство: ребёнок — родитель — учитель. Все три участника влияют на процесс
                      в равной степени — как атомы углерода в молекуле фуллерен.
                    </p>
                  </div>

                  <div
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid rgba(0,212,170,0.15)",
                      background: "rgba(0,212,170,0.04)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <p className="text-sm leading-relaxed font-montserrat" style={{ color: "rgba(184,176,216,0.6)" }}>
                      Пространство квантовой педагогики, где каждый не только управляет процессом своей жизни,
                      но и берёт ответственность за свои мысли и за своё состояние.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FULLERENE VISUAL ─── */}
      <section className="relative z-10 py-16 px-4 flex justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-48 h-48 mx-auto text-yellow-400 opacity-30 animate-spin-slow">
              <FullereneIcon className="w-full h-full" />
            </div>
            <div
              className="absolute inset-0 mx-auto text-teal-400 opacity-15 animate-spin-slow"
              style={{ animationDirection: "reverse", width: "192px", height: "192px" }}
            >
              <FullereneIcon className="w-full h-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-cormorant text-sm italic text-center" style={{ color: "rgba(201,168,76,0.5)", maxWidth: "8rem" }}>
                молекула<br />фуллерен
              </p>
            </div>
          </div>
          <p className="font-cormorant text-lg md:text-xl italic mt-6 max-w-md mx-auto" style={{ color: "rgba(184,176,216,0.5)" }}>
            «Каждый участник равен и важен — как атом в молекуле фуллерен»
          </p>
        </div>
      </section>

      {/* ─── ФИНАЛЬНЫЙ ПРИЗЫВ ─── */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div ref={addRef(10)} className="opacity-0 translate-y-10 transition-all duration-700">
            <div
              className="relative rounded-3xl p-10 md:p-16 overflow-hidden"
              style={{
                background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, rgba(13,11,46,0.8) 70%)",
                border: "1px solid rgba(201,168,76,0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="absolute top-4 left-4 w-8 h-8 text-yellow-400 opacity-20">
                <FullereneIcon className="w-full h-full" />
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 text-yellow-400 opacity-20">
                <FullereneIcon className="w-full h-full" />
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8 text-yellow-400 opacity-20">
                <FullereneIcon className="w-full h-full" />
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8 text-yellow-400 opacity-20">
                <FullereneIcon className="w-full h-full" />
              </div>

              <div className="flex items-center justify-center gap-3 text-sm mb-6 font-montserrat tracking-widest uppercase" style={{ color: "rgba(201,168,76,0.6)" }}>
                <Icon name="Calendar" size={16} />
                5 апреля · 19:00 МСК
                <Icon name="Calendar" size={16} />
              </div>

              <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white mb-4">
                Присоединяйтесь
              </h2>
              <p className="font-cormorant text-2xl md:text-3xl italic mb-8" style={{ color: "#f0d080" }}>
                к сообществу вдохновлённых педагогов
              </p>

              <p className="text-sm font-montserrat leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(184,176,216,0.6)" }}>
                Вместе мы создадим пространство, где каждый учитель снова почувствует силу, смысл и радость от своей профессии
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://vk.com/rostobraz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-10 py-4 rounded-full font-montserrat font-bold text-base transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
                  style={{
                    background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)",
                    color: "#04030f",
                    boxShadow: "0 0 40px rgba(201,168,76,0.35)",
                  }}
                >
                  <Icon name="Users" size={20} />
                  Сообщество в ВКонтакте
                </a>
                <a
                  href="https://wa.me/79270721673"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-10 py-4 rounded-full font-montserrat font-medium text-base transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
                  style={{
                    border: "1px solid rgba(0,212,170,0.5)",
                    background: "rgba(0,212,170,0.08)",
                    color: "#00d4aa",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Icon name="MessageCircle" size={20} />
                  +7 927 072-16-73
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs font-montserrat" style={{ color: "rgba(184,176,216,0.3)" }}>
          © 2025 Центр поддержки семейного образования «Вдохновение» · Ефремова Мария Викторовна
        </p>
      </footer>
    </div>
  );
}