const Router = require('router');
const finalhandler = require('finalhandler')
const { get, create } = require('./db')
const bodyParser = require('body-parser')


const router = Router();

router.use(bodyParser.json())

/**
 * Get all notes
 * 
 * @param {Electron.ProtocolRequest} request 
 * @param {Electron.ProtocolResponse} response 
 */
router.get('/notes', (request, response) => {
    const data = get('notes');

    response.setHeader('Content-Type', 'application/json; charset=utf-8')

    response.end(JSON.stringify({
        data
    }))
});

/**
 * Get all notes
 * 
 * @param {Electron.ProtocolRequest} request 
 * @param {Electron.ProtocolResponse} response 
 */
router.post('/notes', (request, response) => {

    create('notes', {
        title: 'Title',
        content: 'Content'
    })

    response.setHeader('Content-Type', 'application/json; charset=utf-8')

    response.end(JSON.stringify(request.body))
})


/**
 * Handle custom protocal request
 * 
 * @param {Electron.ProtocolRequest} request 
 * @param {Electron.ProtocolResponse} response 
 */
exports.requestListener = (request, response) => {
    router(request, response, finalhandler(request, response))
}