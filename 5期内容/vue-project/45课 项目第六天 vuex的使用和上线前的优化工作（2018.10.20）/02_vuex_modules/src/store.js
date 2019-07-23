import Vue from 'vue'
import Vuex from 'vuex'

import moduleA from './store/moduleA/index'

export default  new Vuex.Store({
	modules:{
		a:moduleA
	}

})

