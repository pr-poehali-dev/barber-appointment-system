import { useState, useEffect, useRef } from 'react';

// ─── конфетти ───────────────────────────────────────────────────────────────
const COLORS = ['#f43f82', '#fb923c', '#facc15', '#a78bfa', '#34d399', '#60a5fa', '#f9a8d4'];

function spawnConfetti() {
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.width = (Math.random() * 8 + 6) + 'px';
    el.style.height = (Math.random() * 8 + 6) + 'px';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
    el.style.animationDelay = (Math.random() * 1.2) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

// ─── данные квиза ────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    text: 'Выбери словосочетание, которое вызывает больше эмоций',
    options: ['шкаф в гостиную', 'люстра на кухню', 'забор для дома'],
    correct: 2,
  },
  {
    text: 'На чём ты ездишь?',
    options: ['на машине', 'на такси', 'на красненьком', 'на автобусе', 'на синеньком'],
    correct: 2,
  },
  {
    text: 'Как ты планировала провести сегодняшний день?',
    options: [
      'в ресторане под Анну Асти',
      'на ВДНХ',
      'я буду дома, и пусть хоть одна ... попробует меня вытащить',
    ],
    correct: 2,
  },
  {
    text: 'Трактор нужен, чтобы...',
    options: [
      'Работать на стройке',
      'Работать в поле',
      'Хасанить под самагонкой',
      'Понтоваться тем, что у тебя есть трактор',
    ],
    correct: 2,
  },
];

type Screen = 'intro' | 'quiz' | 'success' | 'congrats';

const CONGRATS_TEXT = `Танюш, с днём рождения!

Ты — человек, который умеет превращать обычные моменты в особенные. Наши разговоры о заборах, люстрах и поездках на красненьком — это маленькие детали большой и классной жизни, которую ты проживаешь.

Пусть в этот день всё будет именно так, как ты хочешь: уютно, по-своему, без лишней суеты. Ну или наоборот — весело и неожиданно, если вдруг кто-то всё-таки вытащит 😄

Желаю тебе здоровья, тепла, исполнения задуманного и ещё больше поводов для улыбки.

С любовью и уважением ✨`;

const Index = () => {
  const [screen, setScreen] = useState<Screen>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const wrongTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current); }, []);

  const handleOption = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = QUESTIONS[qIndex];
    if (idx === q.correct) {
      setWrong(false);
      setTimeout(() => {
        if (qIndex < QUESTIONS.length - 1) {
          setQIndex(qIndex + 1);
          setSelected(null);
          setAnimKey(k => k + 1);
        } else {
          setScreen('success');
        }
      }, 700);
    } else {
      setWrong(true);
      setShakeKey(k => k + 1);
      wrongTimerRef.current = setTimeout(() => {
        setSelected(null);
        setWrong(false);
      }, 1800);
    }
  };

  const handleContinue = () => {
    spawnConfetti();
    setScreen('congrats');
  };

  const progress = (qIndex / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">

      {/* INTRO */}
      {screen === 'intro' && (
        <div className="animate-pop-in text-center max-w-md">
          <div className="text-6xl mb-6 inline-block animate-pulse-ring rounded-full p-2">💌</div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-5">
            Это секретное письмо<br />
            <span className="italic text-primary">только для Тани.</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Давай убедимся, что это она
          </p>
          <button
            onClick={() => setScreen('quiz')}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Это я, начинаем ✨
          </button>
        </div>
      )}

      {/* QUIZ */}
      {screen === 'quiz' && (
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Вопрос {qIndex + 1} из {QUESTIONS.length}</span>
              <span>{Math.round(progress + 33)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress + 33}%`,
                  background: 'linear-gradient(90deg, hsl(340 80% 58%), hsl(15 90% 65%))',
                }}
              />
            </div>
          </div>

          <div key={animKey} className="animate-pop-in bg-card rounded-3xl shadow-xl border border-border/40 p-8">
            <p className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-snug mb-8">
              {QUESTIONS[qIndex].text}
            </p>

            <div className="flex flex-col gap-3">
              {QUESTIONS[qIndex].options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = idx === QUESTIONS[qIndex].correct;
                const isWrongChoice = isSelected && !isCorrect;

                let cls = 'w-full text-left px-6 py-4 rounded-2xl border-2 text-base font-medium transition-all duration-200 ';
                if (selected === null) {
                  cls += 'border-border bg-background hover:border-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer';
                } else if (isSelected && isCorrect) {
                  cls += 'border-green-400 bg-green-50 text-green-700 scale-[1.01]';
                } else if (isWrongChoice) {
                  cls += 'border-destructive bg-destructive/10 text-destructive';
                } else {
                  cls += 'border-border bg-background text-muted-foreground opacity-40 cursor-default';
                }

                return (
                  <button key={idx} onClick={() => handleOption(idx)} disabled={selected !== null} className={cls}>
                    <span className="mr-3 text-muted-foreground font-normal">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {wrong && (
              <div
                key={shakeKey}
                className="animate-shake mt-6 flex items-center gap-3 px-5 py-3 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive font-medium"
              >
                <span className="text-xl">🤔</span>
                Я начинаю сомневаться, что это Таня...
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {screen === 'success' && (
        <div className="animate-pop-in text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-snug mb-3">
            Теперь я уверен, что это ты.
          </h2>
          <p className="font-display text-2xl md:text-3xl font-semibold text-primary italic mb-1">
            Татьяна Дмитриевна,
          </p>
          <p className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10">
            рад приветствовать!
          </p>
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Продолжить 🎂
          </button>
        </div>
      )}

      {/* CONGRATS */}
      {screen === 'congrats' && (
        <div className="animate-pop-in w-full max-w-xl py-8">
          <div className="bg-card rounded-3xl shadow-2xl border border-border/40 p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-5xl">🌸</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary italic mt-3">
                С Днём рождения!
              </h2>
            </div>
            <div>
              {CONGRATS_TEXT.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-foreground/85 leading-relaxed text-base md:text-lg mb-5 last:mb-0 animate-float-up"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-8 text-center text-3xl tracking-widest">
              🌸 🎂 ✨ 🎈 💐
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;