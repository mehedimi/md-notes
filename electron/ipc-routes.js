const { ipcMain } = require("electron");
const note = require("./data/note");
const folder = require("./data/folder");
const tag = require("./data/tag");
const { Validator } = require("node-input-validator");
const pick = require("lodash/pick");
const moment = require("moment");
const { create, update, delete: deleteR } = require("./db");
const tables = require("./data/tables");

/**
 * Note Handlers
 */
ipcMain.handle("get:notes", (event, args) => {
  return {
    data: note.get(args),
  };
});

ipcMain.handle("post:notes", async (event, payload) => {
  const v = new Validator(payload, {
    title: "required|string",
    folder_id: "required",
  });

  v.niceNames({
    folder_id: "folder",
  });

  const matched = await v.check();

  if (!matched) {
    return {
      errors: v.errors,
    };
  }

  let body = pick(payload, ["folder_id", "title", "content"]);

  body = Object.assign(body, {
    created_at: moment().format(),
    updated_at: moment().format(),
    content: body.content || "",
  });

  const data = create("notes", body);

  return {
    ...body,
    id: data.lastInsertRowid,
  };
});

ipcMain.handle("get:notes/:note", (event, noteId) => {
  return note.find(noteId);
});

ipcMain.handle("patch:notes/:note", (event, noteId, payload) => {
  const data = pick(payload, ["title", "content", "folder_id"]);

  const updatedAt = moment().format();

  update(tables.NOTE, noteId, {
    ...data,
    updated_at: updatedAt,
  });

  return {
    updated_at: updatedAt,
  };
});

ipcMain.handle("delete:notes/:note", (event, noteId) => {
  deleteR(tables.NOTE, {
    where: [["id", noteId]],
  });

  return {
    message: "Success!",
  };
});

ipcMain.handle("delete:notes/:note/tags/:tag", (event, noteId, tagId) => {
  deleteR(tables.NOTE_TAG, {
    where: [
      ["tag_id", tagId],
      ["note_id", noteId],
    ],
  });
});

/**
 * @param noteId
 * @param action copy|move|e-pdf|e-md|e-json
 */
ipcMain.handle("patch:notes/:note/:action", (event, noteId, action) => {});

/**
 * Folder Handlers
 */
ipcMain.handle("get:folders", (event, args) => {
  return folder.get(args);
});

ipcMain.handle("post:folders", async (event, body) => {
  const v = new Validator(body, {
    name: "required|string",
    icon: "required|string",
  });

  const matched = await v.check();

  if (!matched) {
    return {
      errors: v.errors,
    };
  }

  const payload = pick(body, ["name", "icon"]);

  const data = create("folders", payload);

  return {
    data: {
      ...payload,
      id: data.lastInsertRowid,
    },
  };
});

ipcMain.handle("delete:folders/:folder", (event, folderId) => {
  deleteR(tables.NOTE, {
    where: [["folder_id", folderId]],
  });

  deleteR(tables.FOLDER, {
    where: [["id", folderId]],
  });

  return {
    message: "Folder deleted!",
  };
});

/**
 * Tag Handlers
 */

ipcMain.handle("get:tags", (event, args) => {
  return tag.get(args);
});

ipcMain.handle("post:tags", async (event, body) => {
  const v = new Validator(body, {
    name: "required|string|maxLength:30",
  });

  const matched = await v.check();

  if (!matched) {
    return {
      errors: v.errors,
    };
  }

  const tagResponse = create(tables.TAG, pick(body, ["name"]), true);

  if (!tagResponse.changes) {
    return {
      errors: {},
    };
  }

  return {
    id: tagResponse.lastInsertRowid,
    name: body.name,
  };
});

ipcMain.handle("post:notes/:note/tags/:tag", (event, note_id, tag_id) => {
  const noteTag = create(
    tables.NOTE_TAG,
    {
      note_id,
      tag_id,
    },
    true
  );

  return {
    success: Boolean(noteTag.changes),
  };
});
