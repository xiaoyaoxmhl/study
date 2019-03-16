
import Vue from 'vue'
export default {
    addNum(state, num) {
        state.count += num;
    },

    //不要在这里操作异步数据
    addCountByasync(state, payload) {
        console.log(payload)
        setTimeout(() => {

            state.count += payload.num;
        }, 1000)
    },
    addCountByasync2(state, num) {
        state.count += num;
    },
    changeStateProp(state,name){
    	console.log(name);
    	// state.myProp.name = name;


    	// Mutation 需遵守 Vue 的响应规则

			// 既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

			// 1.最好提前在你的 store 中初始化好所有所需属性。

			// 2.当需要在对象上添加新属性时，你应该

	// 手动设置  给state中的状态 添加属性
	Vue.set(state.myProp,'name',name);



    }

}