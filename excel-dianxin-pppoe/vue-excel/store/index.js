export default {
  state: {
    excelFiles: [],
    user: {}
  },
  getters: {
    excelFiles: state => state.excelFiles,
    user: state => state.user
  },
  mutations: {
    saveExcelFile(state, file) {
      state.excelFiles = file;
    },
    saveUserInfo(state, user) {
      state.user = user;
    }
  },
  actions: {
    increment(context) {
      context.commit('saveExcelFile')
    }
  }
}

