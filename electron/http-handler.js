const Router = require('router');
const finalhandler = require('finalhandler')
const { get, create, find, delete: deleteR, update } = require('./db')
const bodyParser = require('body-parser')
const moment = require('moment')
const { Validator } = require('node-input-validator')
const pick  = require('lodash/pick')
const pickBy = require('lodash/pickBy')
const isEmpty = require('lodash/isEmpty')
const tables = require('./data/tables');
const queryString = require('query-string')
const removeMarkdown = require('remove-markdown')

const router = Router();

router.use(bodyParser.json())

router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    req.query = queryString.parseUrl(req.url).query
    next()
})

/**
 * Get all notes
 * 
 * @param {Electron.ProtocolRequest} req
 * @param {Electron.ProtocolResponse} res
 */
router.get('/folders', (req, res) => {
    const data = get(tables.FOLDER, {
        orderBy: 'name asc'
    });

    res.end(JSON.stringify({
        data
    }))
});

router.post('/folders', async (req, res) => {
    const v = new Validator(req.body, {
        name: 'required|string',
        icon: 'required|string'
    })

    const matched = await v.check();
    
    if (! matched) {
        res.statusCode = 422;
        return res.end(JSON.stringify(v.errors))
    }

    const payload = pick(req.body, ['name', 'icon']);

    const data = create('folders', payload);

    res.statusCode = 201;
    res.end(JSON.stringify({
        data: {
            ...payload,
            id: data.lastInsertRowid
        }
    }))

})

router.delete('/folders/:folder', (req, res) => {

    const { folder } = req.params;

    deleteR(tables.NOTE, {
        where: [
            ['folder_id', folder]
        ]
    });

    deleteR(tables.FOLDER, {
        where: [
            ['id', folder]
        ]
    });

    res.end(JSON.stringify({
        message: 'Folder deleted!'        
    }))
})

/**
 * Get all notes
 * 
 * @param {Electron.ProtocolRequest} request 
 * @param {Electron.ProtocolResponse} response 
 */
router.get('/notes', (request, response) => {
    const parameters = {
        select: 'id, title, SUBSTRING(content, 0, 80) as content, created_at, updated_at',
        orderBy: 'id desc'
    };

    const query = pickBy(request.query, (value, key) => {
        if (! key.match(/folder_id|s/)) {
            return false;
        }

        return Boolean(value.trim())
    });

    if (! isEmpty(query)) {
        parameters.where = [];
        const { s, folder_id } = query;

        if (s) {
            parameters.where.push([
                'title', 'like', s + '%'
            ])
        }
        if (folder_id) {
            parameters.where.push([
                'folder_id', folder_id
            ])
        }
    }
    const data = get('notes', parameters);

    response.end(JSON.stringify({
        data: data.map((note) => {
            return {
                ...note,
                content: removeMarkdown(note.content)
            }
        })
    }))
});

/**
 * Get all notes
 * 
 * @param {Electron.ProtocolRequest} request 
 * @param {Electron.ProtocolResponse} response 
 */
router.post('/notes', async (request, response) => {
    const v = new Validator(request.body, {
        title: 'required|string',
        folder_id: 'required'
    })

    v.niceNames({
        folder_id: 'folder'
    })

    const matched = await v.check();
    
    if (! matched) {
        response.statusCode = 422;
        return response.end(JSON.stringify(v.errors))
    }

    let body = pick(request.body, ['folder_id', 'title', 'content']);

    body = Object.assign(body, {
        created_at: moment().format(),
        updated_at: moment().format(),
        content: body.content || ''
    })

    const data = create('notes', body);

    response.end(
        JSON.stringify({
            ...body,
            id: data.lastInsertRowid 
        })
    );
})

router.get('/notes/:note', (req, res) => {
    const { note: noteId} = req.params;

    const data = find(tables.NOTE, noteId)

    res.end(JSON.stringify({
        data
    }))
})

router.patch('/notes/:note', async (req, res) => {
    const { note: noteId } = req.params;

    const v = new Validator(req.body, {
        content: 'required|string',
    })

    const matched = await v.check();

    if (! matched) {
        res.statusCode = 422;
        return res.end(JSON.stringify(v.errors))
    }
    const updatedAt = moment().format();

    update(tables.NOTE, noteId, {
        content: req.body.content,
        updated_at: updatedAt
    })

    res.end(JSON.stringify({
        updated_at: updatedAt
    }))
})


/**
 * Handle custom protocol request
 * 
 * @param {Electron.ProtocolRequest} request 
 * @param {Electron.ProtocolResponse} response 
 */
exports.requestListener = (request, response) => {
    router(request, response, finalhandler(request, response))
}