import { createStore } from "vuex";
import note from './note'
import folder from "./folder";

export default createStore({
    modules: {
        note,
        folder
    }
})