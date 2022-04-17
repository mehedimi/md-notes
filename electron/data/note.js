const pickBy = require("lodash/pickBy");
const isEmpty = require("lodash/isEmpty");
const { get, find, db } = require("../db");
const tables = require("./tables");

module.exports = {
  get(query) {
    const parameters = {
      select: "id, title, folder_id, created_at, updated_at",
      orderBy: "id desc",
    };

    query = pickBy(query, (value, key) => {
      if (!key.match(/folderId|s/)) {
        return false;
      }

      if (!value) return false;

      return Boolean(value.trim());
    });

    if (!isEmpty(query)) {
      parameters.where = [];

      const { s, folderId } = query;

      if (s) {
        parameters.where.push(["title", "like", s + "%"]);
      }
      if (folderId) {
        parameters.where.push(["folder_id", folderId]);
      }
    }

    return get("notes", parameters);
  },
  find(id) {
    const data = find(tables.NOTE, id);

    data.tags = db
      .prepare(
        `SELECT id, name FROM ${tables.TAG} JOIN ${tables.NOTE_TAG} on tags.id = note_tag.tag_id AND note_tag.note_id = ?`
      )
      .all(id);

    return { data };
  },
};
