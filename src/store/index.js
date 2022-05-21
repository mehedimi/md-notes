import { createStore } from "vuex";
import note from "./note";
import folder from "./folder";
import tag from "./tag";
import option from "./option";
import tab from "./tab";

export default createStore({
  modules: {
    note,
    folder,
    tag,
    option,
    tab,
  },
});
