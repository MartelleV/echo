// src/components/NoteCard.tsx
import { Note } from '../types';
import { formatRelativeTime } from '../utils';

interface NoteCardProps {
  note: Note;
  index: number;
}

export function NoteCard({ note, index }: NoteCardProps) {
  // Generate a subtle unique accent for variety
  const hueShift = (index * 15) % 30;

  return (
    <article
      className="group relative p-5 md:p-6 bg-[--bg-card] border border-[--border-subtle] rounded-2xl hover:border-[--border-hover] hover:bg-[--bg-elevated] transition-all duration-500 animate-fade-in"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Subtle left accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to bottom, hsl(${260 + hueShift}, 50%, 60%), transparent)`,
        }}
      ></div>

      {/* Quote mark */}
      <span className="font-serif text-2xl md:text-3xl text-[--accent] opacity-20 leading-none select-none">
        "
      </span>

      <p className="font-serif text-base md:text-lg text-[--text-primary] leading-relaxed whitespace-pre-wrap break-words mt-1 mb-6">
        {note.message}
      </p>

      <footer className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[--accent] to-[--accent-soft] opacity-60 flex items-center justify-center">
            <span className="text-xs font-medium text-white uppercase">
              {(note.author || 'A')[0]}
            </span>
          </div>
          <div>
            <span className="block text-sm text-[--text-secondary] font-medium">
              {note.author || 'Anonymous'}
            </span>
            <time dateTime={note.createdAt} className="text-xs text-[--text-faint]">
              {formatRelativeTime(note.createdAt)}
            </time>
          </div>
        </div>

        {/* Subtle interaction hint */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs text-[--text-faint]">✦</span>
        </div>
      </footer>
    </article>
  );
}
