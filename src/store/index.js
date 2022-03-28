import { createStore } from "vuex";
import note from './note'
import folder from "./folder";
import tag from './tag'

export default createStore({
    modules: {
        note,
        folder,
        tag
    }
})