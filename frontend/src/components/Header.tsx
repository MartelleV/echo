// src/components/Header.tsx

export function Header() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const welcomeHeader =
    hour < 12 ? 'The Stillness of' : hour < 18 ? 'The Hush of' : 'The Silence of';
  const timeOfDay = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Midnight';

  const dateStr = now
    .toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase();

  return (
    <header className="relative pt-8 pb-16 md:pt-12 md:pb-24 px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#1a1428] rounded-full blur-[180px] opacity-30"></div>
        <div className="absolute top-20 right-1/4 w-[200px] h-[200px] bg-[#2d2050] rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Top bar with date */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[--text-faint]">
            {dateStr}
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[--accent] animate-pulse"></span>
            <span className="text-[10px] md:text-xs tracking-wider text-[--text-muted]">live</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center md:text-left">
          <p className="text-xs md:text-sm tracking-[0.2em] text-[--accent] mb-3 uppercase">
            {greeting}, Dreamer
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-[--text-primary] leading-[1.1] mb-6">
            {welcomeHeader}
            <br />
            <span className="italic text-[--text-secondary]">{timeOfDay}</span>
          </h1>
          <p className="text-sm md:text-base mx-auto md:mx-0 text-[--text-muted] max-w-md font-light leading-relaxed">
            Thoughts drift here like stars fading at dawn. Leave an echo, read the whispers of
            strangers.
          </p>
        </div>
      </div>
    </header>
  );
}
