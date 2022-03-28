import axios from "axios";


// let baseURL = 'notes://init'

let baseURL = 'http://127.0.0.1:8080'

axios.defaults.baseURL = baseURL

export default axios

