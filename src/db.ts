import Dexie from "dexie";
import { Note } from "./types";


class NoteDB extends Dexie {
    notes: Dexie.Table<Note, string>;

    constructor() {
        super("NoteDatabase");
        this.version(1).stores({
            notes: "id, createdAt, updatedAt"
        });
        this.notes = this.table("notes");
    }

}

export const db = new NoteDB();
