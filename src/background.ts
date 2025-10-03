import { v4 as uuidv4 } from "uuid";
import browser from "webextension-polyfill";
import { db } from "./db";

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "add-web-note",
    title: "Add Note",
    contexts: ["selection"],
  });
});

browser.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "add-web-note" && info.selectionText) {
    await db.notes.add({
      id: uuidv4(),
      content: info.selectionText, // ✅ Use selected text here
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  }
});
