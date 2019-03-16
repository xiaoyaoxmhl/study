export default {
    count(state){
    	return state.count
    },
    lists(state) {
        console.log(state);
        return state.lists;
    },
    item: (state) => (i) => {
        return state.lists[i]
    },
    myProp(state){
    	return state.myProp;
    }
}