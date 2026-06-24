import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуги', href: '#services' },
  { label: 'Работы', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

const SERVICES = [
  { icon: 'Scissors', title: 'Стрижки', desc: 'Женские, мужские и детские стрижки от топ-мастеров', price: 'от 1 500 ₽' },
  { icon: 'Palette', title: 'Окрашивание', desc: 'Airtouch, балаяж, шатуш и сложные цвета', price: 'от 4 500 ₽' },
  { icon: 'Sparkles', title: 'Уход', desc: 'Ботокс, кератин и реконструкция волос', price: 'от 2 800 ₽' },
  { icon: 'Crown', title: 'Укладки', desc: 'Вечерние и свадебные образы под ключ', price: 'от 2 000 ₽' },
];

const GALLERY = [
  { from: '#1a1625', to: '#e11d6e', tag: 'Балаяж', label: 'Тёмный → платина' },
  { from: '#7c3aed', to: '#f59e0b', tag: 'Колор', label: 'Каре с цветом' },
  { from: '#0f766e', to: '#ec4899', tag: 'Airtouch', label: 'Холодный блонд' },
  { from: '#be123c', to: '#facc15', tag: 'Стрижка', label: 'Объёмный боб' },
  { from: '#4338ca', to: '#06b6d4', tag: 'Уход', label: 'Восстановление' },
  { from: '#831843', to: '#fb7185', tag: 'Укладка', label: 'Голливудские волны' },
];

const REVIEWS = [
  { name: 'Алина К.', text: 'Лучшее окрашивание в городе! Мастер подобрала идеальный оттенок, держится месяцами.', stars: 5 },
  { name: 'Марина С.', text: 'Преобразили меня полностью. Вышла из салона другим человеком, спасибо!', stars: 5 },
  { name: 'Ольга В.', text: 'Атмосфера супер, кофе, музыка и результат на высоте. Записалась уже на следующий раз.', stars: 5 },
];

const Index = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: 'Заполните поля', description: 'Укажите имя и номер телефона' });
      return;
    }
    toast({ title: 'Заявка отправлена!', description: `${name}, мы перезвоним вам в ближайшее время.` });
    setName('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-mesh text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4">
          <a href="#home" className="font-display font-black text-xl tracking-tight">
            STUDIO<span className="text-gradient"> LUMÉ</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <Button asChild className="rounded-full font-semibold">
            <a href="#booking">Записаться</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-float-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
              <Icon name="Sparkles" size={15} /> Парикмахерская нового поколения
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Твой новый <span className="text-gradient">образ</span> начинается здесь
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Окрашивание, стрижки и уход от мастеров, которые любят своё дело. Запишись онлайн за минуту.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full font-semibold text-base h-13 px-8">
                <a href="#booking">Записаться онлайн <Icon name="ArrowRight" size={18} className="ml-1" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full font-semibold text-base h-13 px-8 border-2">
                <a href="#gallery">Наши работы</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              {[['8 лет', 'на рынке'], ['12k+', 'клиентов'], ['4.9', 'рейтинг']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-2xl">{v}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute inset-0 -z-10 animate-blob bg-gradient-to-br from-primary via-secondary to-accent blur-2xl opacity-40" />
            <div className="aspect-square rounded-[2.5rem] animate-blob bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl">
              <Icon name="Scissors" size={120} className="text-white/90" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-4 bg-foreground text-background overflow-hidden whitespace-nowrap">
        <div className="marquee inline-block">
          {Array(2).fill(0).map((_, i) => (
            <span key={i} className="font-display font-bold text-lg uppercase tracking-wider">
              {' Окрашивание • Стрижки • Уход • Укладки • Балаяж • Airtouch • Кератин • Преображения •'}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28">
        <div className="container px-4">
          <h2 className="font-display font-black text-4xl md:text-5xl text-center">Наши <span className="text-gradient">услуги</span></h2>
          <p className="text-center text-muted-foreground mt-3 max-w-md mx-auto">Полный спектр услуг для красоты ваших волос</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {SERVICES.map((s) => (
              <div key={s.title} className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon name={s.icon} size={26} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                <p className="mt-4 font-bold text-primary">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-28 bg-foreground/[0.02]">
        <div className="container px-4">
          <h2 className="font-display font-black text-4xl md:text-5xl text-center">Галерея <span className="text-gradient">преображений</span></h2>
          <p className="text-center text-muted-foreground mt-3 max-w-md mx-auto">Реальные работы наших мастеров</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {GALLERY.map((g, i) => (
              <div key={i} className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer">
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <Icon name="Sparkles" size={64} className="text-white" />
                </div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-foreground text-xs font-bold uppercase tracking-wide">{g.tag}</span>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-display font-bold text-lg">{g.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 md:py-28">
        <div className="container px-4">
          <h2 className="font-display font-black text-4xl md:text-5xl text-center">Что говорят <span className="text-gradient">клиенты</span></h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {REVIEWS.map((r) => (
              <div key={r.name} className="p-7 rounded-3xl bg-card border border-border/60 shadow-sm">
                <div className="flex gap-1 mb-4 text-accent">
                  {Array(r.stars).fill(0).map((_, i) => <Icon key={i} name="Star" size={18} className="fill-current" />)}
                </div>
                <p className="text-foreground/80 leading-relaxed">«{r.text}»</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {r.name[0]}
                  </div>
                  <span className="font-semibold">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-14 bg-gradient-to-br from-primary via-secondary to-secondary text-white shadow-2xl">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="grid md:grid-cols-2 gap-10 items-center relative">
              <div>
                <h2 className="font-display font-black text-4xl md:text-5xl leading-tight">Запишись на приём</h2>
                <p className="mt-4 text-white/80 text-lg max-w-sm">Оставьте имя и телефон — перезвоним и подберём удобное время.</p>
                <div className="mt-6 space-y-2 text-white/80 text-sm">
                  <p className="flex items-center gap-2"><Icon name="Clock" size={16} /> Ежедневно с 9:00 до 21:00</p>
                  <p className="flex items-center gap-2"><Icon name="MapPin" size={16} /> ул. Модная, 12, Москва</p>
                </div>
              </div>
              <form onSubmit={submit} className="bg-white/95 backdrop-blur p-6 rounded-3xl space-y-4 text-foreground">
                <div>
                  <label className="text-sm font-medium">Ваше имя</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Анна" className="mt-1.5 h-12 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium">Номер телефона</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className="mt-1.5 h-12 rounded-xl" />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl h-12 font-semibold text-base">
                  Отправить заявку <Icon name="Send" size={17} className="ml-1.5" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь на обработку данных</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACTS */}
      <footer id="contacts" className="bg-foreground text-background py-14">
        <div className="container px-4 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-display font-black text-xl">STUDIO LUMÉ</div>
            <p className="mt-3 text-background/60 text-sm max-w-xs">Парикмахерская, где каждый образ — произведение искусства.</p>
          </div>
          <div className="space-y-2 text-sm text-background/70">
            <p className="flex items-center gap-2"><Icon name="Phone" size={16} /> +7 (495) 123-45-67</p>
            <p className="flex items-center gap-2"><Icon name="Mail" size={16} /> hello@studiolume.ru</p>
            <p className="flex items-center gap-2"><Icon name="MapPin" size={16} /> ул. Модная, 12, Москва</p>
          </div>
          <div className="flex gap-3 md:justify-end items-start">
            {['Instagram', 'Send', 'MessageCircle'].map((ic) => (
              <a key={ic} href="#" className="w-11 h-11 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Icon name={ic} size={19} />
              </a>
            ))}
          </div>
        </div>
        <div className="container px-4 mt-10 pt-6 border-t border-background/10 text-background/40 text-xs text-center">
          © 2026 Studio Lumé. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;
