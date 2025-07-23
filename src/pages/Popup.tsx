// import { NoteListView } from "@/components/note-list-view";
// import { useNotes } from "@/hooks/use-notes";
// import type { Note } from "@/types";
// import { Button, Card, CardContent, TextareaAutosize } from "@mui/material";
// import { motion } from "framer-motion";
// import { Edit, Save, Trash2, XCircle } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// // Component for the inline new note composer
// function NewNoteCard({
//   onSave,
//   onCancel,
// }: {
//   onSave: (content: string) => void;
//   onCancel: () => void;
// }) {
//   const [content, setContent] = useState("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     // Autofocus the textarea when the component mounts
//     textareaRef.current?.focus();
//   }, []);

//   const handleSave = () => {
//     if (content.trim()) {
//       onSave(content);
//     }
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: -20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: -20, scale: 0.95 }}
//       transition={{ duration: 0.2 }}
//     >
//       <Card>
//         <CardContent>
//           <TextareaAutosize
//             ref={textareaRef}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="What's on your mind?"
//             // className="resize-none text-sm border-none focus-visible:ring-0 p-0"
//             // rows={4}
//           />
//         </CardContent>
//         <div className="bg-muted/50 dark:bg-muted/20 px-4 py-2 flex justify-end items-center gap-2">
//           <Button variant="outlined" size="small" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             size="small"
//             onClick={handleSave}
//             disabled={!content.trim()}
//           >
//             <Save className="h-4 w-4 mr-2" />
//             Save
//           </Button>
//         </div>
//       </Card>
//     </motion.div>
//   );
// }

// // Component for displaying an existing note
// function NoteCard({
//   note,
//   onEdit,
//   onDelete,
//   isEditing,
//   onSave,
//   onCancelEdit,
//   editedContent,
//   setEditedContent,
//   timeAgo,
// }: any) {
//   return (
//     <motion.div layout transition={{ duration: 0.2 }}>
//       <Card className="overflow-hidden">
//         <CardContent className="p-4">
//           {isEditing ? (
//             <TextareaAutosize
//               value={editedContent}
//               onChange={(e) => setEditedContent(e.target.value)}
//               className="resize-none text-sm"
//               autoFocus
//             />
//           ) : (
//             <p className="text-sm text-foreground whitespace-pre-wrap break-words">
//               {note.content}
//             </p>
//           )}
//         </CardContent>
//         <div className="bg-muted/50 dark:bg-muted/20 px-4 py-2 flex justify-between items-center">
//           <p className="text-xs text-muted-foreground">
//             {isEditing ? "Editing..." : `Updated ${timeAgo(note.updatedAt)}`}
//           </p>
//           <div className="flex items-center gap-1">
//             {isEditing ? (
//               <>
//                 <Button
//                   onClick={() => onSave(note.id)}
//                   className="h-7 w-7 text-primary hover:text-primary"
//                   aria-label="Save note"
//                 >
//                   <Save className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   onClick={onCancelEdit}
//                   className="h-7 w-7 text-muted-foreground hover:text-destructive"
//                   aria-label="Cancel edit"
//                 >
//                   <XCircle className="h-4 w-4" />
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   onClick={() => onEdit(note)}
//                   className="h-7 w-7 text-muted-foreground hover:text-primary"
//                   aria-label="Edit note"
//                 >
//                   <Edit className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   onClick={() => onDelete(note.id)}
//                   className="h-7 w-7 text-muted-foreground hover:text-destructive"
//                   aria-label="Delete note"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   );
// }

// export default function Popup() {
//   const { notes, addNote, deleteNote, updateNote } = useNotes();
//   const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
//   const [editedContent, setEditedContent] = useState("");
//   const [isAdding, setIsAdding] = useState(false);

//   const handleEditClick = (note: Note) => {
//     setIsAdding(false); // Cancel adding if starting an edit
//     setEditingNoteId(note.id);
//     setEditedContent(note.content);
//   };

//   const handleCancelEdit = () => {
//     setEditingNoteId(null);
//     setEditedContent("");
//   };

//   const handleSaveEdit = (id: string) => {
//     if (editedContent.trim()) {
//       updateNote(id, editedContent);
//     }
//     handleCancelEdit();
//   };

//   const handleSaveNewNote = (content: string) => {
//     addNote(content);
//     setIsAdding(false);
//   };

//   const handleAddNewClick = () => {
//     handleCancelEdit(); // Cancel any ongoing edit
//     setIsAdding(true);
//   };

//   const timeAgo = (date: Date) => {
//     const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
//     let interval = seconds / 31536000;
//     if (interval > 1) return Math.floor(interval) + "y ago";
//     interval = seconds / 2592000;
//     if (interval > 1) return Math.floor(interval) + "mo ago";
//     interval = seconds / 86400;
//     if (interval > 1) return Math.floor(interval) + "d ago";
//     interval = seconds / 3600;
//     if (interval > 1) return Math.floor(interval) + "h ago";
//     interval = seconds / 60;
//     if (interval > 1) return Math.floor(interval) + "m ago";
//     return "just now";
//   };

//   return (
//     <main className="app-container">
//       <NoteListView
//         notes={notes}
//         onNoteSelect={() => {}}
//         onAddNoteClick={() => {}}
//         timeAgo={timeAgo}
//       />
//     </main>
//   );
// }

import { NoteCreateView } from "@/components/note-create-view";
import { NoteDetailView } from "@/components/note-detail-view";
import { NoteEditView } from "@/components/note-edit-view";
import { NoteListView } from "@/components/note-list-view";
import { useNotes } from "@/hooks/use-notes";
import { useState } from "react";

// Custom AlertDialog component
function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="alert-dialog-overlay" onClick={onClose}>
      <div
        className="alert-dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="alert-dialog-header">
          <h3 className="alert-dialog-title">Are you absolutely sure?</h3>
          <p className="alert-dialog-description">
            This action cannot be undone. This will permanently delete your
            note.
          </p>
        </div>
        <div className="alert-dialog-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-action" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Popup() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [view, setView] = useState<{
    mode: "list" | "detail" | "create" | "edit";
    noteId?: string;
  }>({ mode: "list" });
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const handleNoteSelect = (id: string) =>
    setView({ mode: "detail", noteId: id });
  const handleEditSelect = (id: string) =>
    setView({ mode: "edit", noteId: id });
  const handleBack = () => setView({ mode: "list" });

  const handleSaveNewNote = (content: string) => {
    addNote(content);
    handleBack();
  };

  const handleSaveEditNote = (id: string, content: string) => {
    updateNote(id, content);
    handleBack();
  };

  const handleDeleteRequest = (id: string) => {
    setNoteToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
      setNoteToDelete(null);
      handleBack();
    }
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "just now";
  };

  const currentNote = notes.find((n) => n.id === view.noteId);

  const renderView = () => {
    switch (view.mode) {
      case "detail":
        return currentNote ? (
          <NoteDetailView
            note={currentNote}
            onBack={handleBack}
            onEdit={handleEditSelect}
            onDelete={handleDeleteRequest}
          />
        ) : null;
      case "create":
        return (
          <NoteCreateView onSave={handleSaveNewNote} onCancel={handleBack} />
        );
      case "edit":
        return currentNote ? (
          <NoteEditView
            note={currentNote}
            onSave={handleSaveEditNote}
            onCancel={handleBack}
          />
        ) : null;
      case "list":
      default:
        return (
          <NoteListView
            notes={notes}
            onNoteSelect={handleNoteSelect}
            onAddNoteClick={() => setView({ mode: "create" })}
            timeAgo={timeAgo}
          />
        );
    }
  };

  return (
    <main className="app-container">
      {renderView()}
      <AlertDialog
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
