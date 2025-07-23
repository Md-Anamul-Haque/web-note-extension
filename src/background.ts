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

    await browser.notifications.create({
      type: "basic",
      iconUrl: "icon.png", // ✅ must exist in public/assets and declared in manifest
      title: "Note Saved",
      message: "Your selected text was saved as a note.",
    });
  }
});
