import { createStore } from "vuex";
import game from "./modules/game";

const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  modules: { game },
  strict: debug,
});

export default store;
