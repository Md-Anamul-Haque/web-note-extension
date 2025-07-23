import { useState } from "react";

interface NoteCreateViewProps {
  onSave: (content: string) => void;
  onCancel: () => void;
}

export function NoteCreateView({ onSave, onCancel }: NoteCreateViewProps) {
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
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
          Save Note
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
