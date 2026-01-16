// src/App.tsx

import { useState, useEffect, useCallback } from 'react';
import { Note, PagedResponse } from './types';
import { api } from './api';
import { NoteCard } from './components/NoteCard';
import { LeaveNote } from './components/LeaveNote';
import { Toast } from './components/Toast';
import { Header } from './components/Header';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchNotes = useCallback(async (pageNum: number, append = false) => {
    try {
      setLoading(true);
      const response: PagedResponse<Note> = await api.getNotes(pageNum);
      setNotes((prev) => (append ? [...prev, ...response.items] : response.items));
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
      setPage(pageNum);
    } catch {
      setToast({ message: 'Could not load notes', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes(0);
  }, [fetchNotes]);

  const handleNoteCreated = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
    setTotalItems((prev) => prev + 1);
    setToast({ message: 'Your echo drifts into the void', type: 'success' });
  };

  const handleError = (message: string) => {
    setToast({ message, type: 'error' });
  };

  const loadMore = () => {
    if (page < totalPages - 1) {
      fetchNotes(page + 1, true);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 pb-24 max-w-2xl">
        <LeaveNote onNoteCreated={handleNoteCreated} onError={handleError} />

        {/* Section divider */}
        <section className="mt-16 md:mt-24" aria-label="Notes">
          <div className="flex items-center gap-6 mb-8 md:mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[--border-subtle] to-transparent"></div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-[--text-faint] uppercase">
                Echoes
              </span>
              {totalItems > 0 && (
                <span className="px-2 py-0.5 bg-[--bg-elevated] rounded-full text-[10px] text-[--text-muted] tabular-nums">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[--border-subtle] to-transparent"></div>
          </div>

          {loading && notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 border-2 border-[--border-subtle] border-t-[--accent] rounded-full animate-spin"></div>
              <span className="text-xs text-[--text-faint] tracking-wider">Loading echoes...</span>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20">
              <span className="font-serif text-6xl text-[--accent] opacity-20">∅</span>
              <p className="text-[--text-muted] mt-4 font-light">
                Nothing here yet. Be the first to leave an echo.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-5">
              {notes.map((note, index) => (
                <NoteCard key={note.id} note={note} index={index} />
              ))}
            </div>
          )}

          {page < totalPages - 1 && (
            <div className="flex justify-center mt-12 md:mt-16">
              <button
                onClick={loadMore}
                disabled={loading}
                className="group flex items-center gap-2 px-6 py-3 text-sm text-[--text-muted] hover:text-[--text-secondary] border border-[--border-subtle] hover:border-[--border-hover] rounded-xl transition-all duration-300 disabled:opacity-30 focus:outline-none"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[--border-subtle] border-t-[--accent] rounded-full animate-spin"></span>
                    <span>Loading</span>
                  </>
                ) : (
                  <>
                    <span>Load more echoes</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[--border-subtle] py-8 mt-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[--text-faint]">
            <span className="tracking-wider">ECHO © {new Date().getFullYear()}. By MartelleV.</span>
            <span className="font-serif italic text-[--text-muted]">
              "Thoughts that outlive the moment"
            </span>
          </div>
        </div>
      </footer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
