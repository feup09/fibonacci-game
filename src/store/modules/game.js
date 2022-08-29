const state = {
  score: 0,
  restart: true,
};

const getters = {
  score(state) {
    return state.score;
  },
  restart(state) {
    return state.restart;
  },
};

const actions = {};

const mutations = {
  resetScore(state) {
    state.score = 0;
  },
  incrementScore(state) {
    state.score++;
  },
  restartGame(state) {
    state.restart = true;
  },
  resetRestart(state) {
    state.restart = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
