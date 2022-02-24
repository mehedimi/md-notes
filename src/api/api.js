import axios from "axios";


// let baseURL = 'md-notes://notes'

let baseURL = 'http://127.0.0.1:8080'

axios.defaults.baseURL = baseURL

export default axios

