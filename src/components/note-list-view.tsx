import type { Note } from "../types";

interface NoteListViewProps {
  notes: Note[];
  onNoteSelect: (id: string) => void;
  onAddNoteClick: () => void;
  timeAgo: (date: Date) => string;
}

export function NoteListView({
  notes,
  onNoteSelect,
  onAddNoteClick,
  timeAgo,
}: NoteListViewProps) {
  return (
    <div className="note-list-container">
      <header className="view-header">
        <h1 className="view-header-title">QuickNotes</h1>
      </header>
      <div className="note-list-scroll-area">
        {notes.length > 0 ? (
          <div className="note-list">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-card"
                onClick={() => onNoteSelect(note.id)}
              >
                <div className="note-card-content">
                  <p className="note-card-title">
                    {note.content.split("\n")[0]}
                  </p>
                  <p className="note-card-date">{`Updated ${timeAgo(
                    note.updatedAt!
                  )}`}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No notes yet!</p>
            <p>Tap the '+' button to add your first note.</p>
          </div>
        )}
      </div>
      <button
        className="btn fab"
        onClick={onAddNoteClick}
        aria-label="Add Note"
      >
        +
      </button>
    </div>
  );
}
