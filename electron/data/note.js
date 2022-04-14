const pickBy = require('lodash/pickBy')
const isEmpty = require('lodash/isEmpty')
const removeMarkdown = require('remove-markdown')
const { get, create, find, delete: deleteR, update, db} = require('../db')
const tables = require('./tables')

module.exports = {
    get(query) {

        const parameters = {
            select: 'id, title, SUBSTRING(content, 0, 80) as content, created_at, updated_at',
            orderBy: 'id desc'
        };
    
        query = pickBy(query, (value, key) => {
            if (! key.match(/folderId|s/)) {
                return false;
            }

            if (! value) return false;
    
            return Boolean(value.trim())
        });
    
        if (! isEmpty(query)) {
            parameters.where = [];

            const { s, folderId } = query;
    
            if (s) {
                parameters.where.push([
                    'title', 'like', s + '%'
                ])
            }
            if (folderId) {
                parameters.where.push([
                    'folder_id', folderId
                ])
            }
        }

        const data = get('notes', parameters);
    
        const tagsQuery = `SELECT ${tables.TAG}.*, ${tables.NOTE_TAG}.note_id FROM ${tables.TAG} JOIN ${tables.NOTE_TAG} 
            ON ${tables.TAG}.id = ${tables.NOTE_TAG}.tag_id AND ${tables.NOTE_TAG}.note_id 
            IN(${data.map(s => '?').join(', ')})`;
    
        const tags = db.prepare(tagsQuery).all(...data.map(n => n.id))
    
        // const tags = db.prepare(`SELECT * FROM ${tables.TAG} JOIN ${tables.NOTE_TAG} ON ${tables.TAG}.id = ${tables.NOTE_TAG}.tag_id`)
    
        return data.map((note) => {
            return {
                ...note,
                content: removeMarkdown(note.content),
                tags: tags.filter(t => t.note_id === note.id)
            }
        })
    },
    find(id) {
        const data = find(tables.NOTE, id)

        data.tags = db.prepare(
            `SELECT id, name FROM ${tables.TAG} JOIN ${tables.NOTE_TAG} on tags.id = note_tag.tag_id AND note_tag.note_id = ?`
        ).all(id)

        return { data };
    }
}