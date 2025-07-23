import { Button } from "@mui/material";
import { PenIcon, TrashIcon } from "lucide-react";
import type { Note } from "../types";

interface NoteDetailViewProps {
  note: Note;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteDetailView({
  note,
  onBack,
  onEdit,
  onDelete,
}: NoteDetailViewProps) {
  return (
    <div className="view">
      <header className="view-header">
        <button
          className="btn btn-ghost btn-icon"
          onClick={onBack}
          aria-label="Go back"
        >
          {"<"}
        </button>
        <div>
          <Button
            onClick={() => onEdit(note.id)}
            aria-label="Edit note"
            variant="contained"
          >
            <PenIcon />
          </Button>
          <Button
            onClick={() => onDelete(note.id)}
            aria-label="Delete note"
            variant="outlined"
            color="warning"
          >
            <TrashIcon
              // style={{
              //   width: "20px",
              //   height: "20px",
              // }}
              color="#ff0000"
            />
          </Button>
        </div>
      </header>
      <div className="view-content" style={{ whiteSpace: "pre-wrap" }}>
        {note.content}
      </div>
    </div>
  );
}
