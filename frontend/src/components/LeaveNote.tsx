// src/components/LeaveNote.tsx

import { useState, FormEvent } from 'react';
import { Note } from '../types';
import { api } from '../api';

interface LeaveNoteProps {
  onNoteCreated: (note: Note) => void;
  onError: (message: string) => void;
}

export function LeaveNote({ onNoteCreated, onError }: LeaveNoteProps) {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ message?: string; author?: string }>({});
  const [focused, setFocused] = useState(false);

  const MAX_MESSAGE_LENGTH = 1000;
  const MAX_AUTHOR_LENGTH = 100;

  const validate = (): boolean => {
    const newErrors: { message?: string; author?: string } = {};
    const trimmedMessage = message.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedMessage) {
      newErrors.message = 'Share something';
    } else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = 'Too long';
    }

    if (trimmedAuthor.length > MAX_AUTHOR_LENGTH) {
      newErrors.author = 'Name too long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const note = await api.createNote({
        message: message.trim(),
        author: author.trim() || undefined,
      });
      onNoteCreated(note);
      setMessage('');
      setAuthor('');
      setErrors({});
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const messageLength = message.trim().length;
  const isOverLimit = messageLength > MAX_MESSAGE_LENGTH;
  const hasContent = message.trim().length > 0;

  return (
    <section
      className={`relative bg-[--bg-card] border rounded-2xl p-5 md:p-8 transition-all duration-500 ${
        focused
          ? 'border-[--accent-soft] shadow-[0_0_60px_rgba(139,126,200,0.08)]'
          : 'border-[--border-subtle]'
      }`}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
        <div className="absolute top-3 right-3 w-1 h-8 bg-gradient-to-b from-[--accent] to-transparent opacity-40"></div>
        <div className="absolute top-3 right-3 w-8 h-1 bg-gradient-to-r from-transparent to-[--accent] opacity-40"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quote-style label */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-serif text-3xl md:text-4xl text-[--accent] opacity-40 leading-none">
            "
          </span>
          <span className="text-xs tracking-[0.2em] text-[--text-faint] uppercase">New Echo</span>
        </div>

        <div>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="What's on your mind tonight?"
            rows={5}
            className={`w-full px-0 py-2 bg-transparent border-0 border-b text-[--text-primary] placeholder-[--text-faint] focus:outline-none resize-none font-serif text-lg md:text-xl leading-relaxed ${
              errors.message
                ? 'border-red-400/50'
                : 'border-[--border-subtle] focus:border-[--accent-soft]'
            }`}
            aria-describedby={errors.message ? 'message-error' : 'message-count'}
            aria-invalid={!!errors.message}
            aria-label="Your message"
          />
          <div className="flex justify-between mt-3">
            {errors.message ? (
              <p id="message-error" className="text-xs text-red-400/80" role="alert">
                {errors.message}
              </p>
            ) : (
              <span></span>
            )}
            <span
              id="message-count"
              className={`text-xs tabular-nums ${isOverLimit ? 'text-red-400/80' : 'text-[--text-faint]'}`}
            >
              {messageLength} / {MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end pt-2">
          <div className="flex-1">
            <label
              htmlFor="author"
              className="block text-xs tracking-wider text-[--text-faint] mb-2 uppercase"
            >
              Sign as
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Anonymous"
              className={`w-full px-4 py-3 bg-[--bg-deep] border rounded-xl text-[--text-primary] placeholder-[--text-faint] focus:outline-none focus:border-[--accent-soft] text-sm ${
                errors.author ? 'border-red-400/50' : 'border-[--border-subtle]'
              }`}
              aria-describedby={errors.author ? 'author-error' : undefined}
              aria-invalid={!!errors.author}
            />
            {errors.author && (
              <p id="author-error" className="text-xs text-red-400/80 mt-2" role="alert">
                {errors.author}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || !hasContent || isOverLimit}
            className="group relative px-8 py-3 bg-[--accent] hover:bg-[--accent-soft] rounded-xl text-sm font-medium text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[--accent] focus:outline-none overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Sending</span>
                </>
              ) : (
                <>
                  <span>Publish Note</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}
