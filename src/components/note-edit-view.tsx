import { useState } from "react";
import type { Note } from "../types";

interface NoteEditViewProps {
  note: Note;
  onSave: (id: string, content: string) => void;
  onCancel: () => void;
}

export function NoteEditView({ note, onSave, onCancel }: NoteEditViewProps) {
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    if (content.trim()) {
      onSave(note.id, content);
    }
  };

  return (
    <div className="view">
      <header className="view-header">
        <button
          className="btn btn-ghost btn-icon"
          onClick={onCancel}
          aria-label="Go back"
        >
          {"<"}
        </button>
        <button className="btn" onClick={handleSave} disabled={!content.trim()}>
          Save Changes
        </button>
      </header>
      <div className="view-content">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="textarea"
          autoFocus
        />
      </div>
    </div>
  );
}
