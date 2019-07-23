export default {
    addCountByasync({ commit }, payload) {
        console.log(payload);
        setTimeout(() => {
            commit('addCountByasync2', payload.num)
        }, 1000)
    },
    changeStateProp({commit},payload){
    	commit('changeStateProp',payload.name);
    }

}