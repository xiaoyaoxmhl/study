import Vue from 'vue'

// 1.导入Vuex
import Vuex from 'vuex'

// 2.注入
Vue.use(Vuex)

export default  new Vuex.Store({
	// 五大将
	state:{
		count:1,
		msg:'学习vux',
		lists:[
			{id:1,msg:"我的生活"},
			{id:2,msg:"抽烟"},
			{id:3,msg:"喝酒"},
			{id:4,msg:"烫头"}

		]
	},
	getters:{

		lists(state){
			console.log(state);
			return state.lists;
		},
		item:(state)=>(i)=>{
			return state.lists[i]
		}
	},
	mutations:{
		addNum(state,num){
			state.count+=num;
		},

		//不要在这里操作异步数据
		addCountByasync(state,payload){
			console.log(payload)
			setTimeout(()=>{

				state.count+=payload.num;
			}, 1000)
		},
		addCountByasync2(state,num){
			state.count+=num;
		}


	},
	actions:{
		addCountByasync({commit},payload){
			console.log(payload);
			setTimeout(()=>{
				commit('addCountByasync2',payload.num)
			},1000)
		}
	}


})

