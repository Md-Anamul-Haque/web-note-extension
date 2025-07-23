"use client"

import { db } from "@/db"
import type { Note } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([])

    // Load from IndexedDB once
    useEffect(() => {
        db.notes.orderBy("createdAt").reverse().toArray().then(setNotes).catch((error) => {
            console.error("Failed to load notes from IndexedDB", error)
            setNotes([])
        })
    }, [])

    const refreshNotes = useCallback(() => {
        db.notes.orderBy("createdAt").reverse().toArray().then(setNotes)
    }, [])

    const addNote = useCallback(async (content: string) => {
        if (content.trim() === "") return
        const now = new Date()
        const newNote: Note = {
            id: uuidv4(),
            content,
            createdAt: now,
            updatedAt: now,
        }
        await db.notes.add(newNote)
        refreshNotes()
    }, [refreshNotes])

    const deleteNote = useCallback(async (id: string) => {
        await db.notes.delete(id)
        refreshNotes()
    }, [refreshNotes])

    const updateNote = useCallback(async (id: string, content: string) => {
        const note = await db.notes.get(id)
        if (!note) return
        await db.notes.update(id, {
            content,
            updatedAt: new Date(),
        })
        refreshNotes()
    }, [refreshNotes])

    return { notes, addNote, deleteNote, updateNote }
}
