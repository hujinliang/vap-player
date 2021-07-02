import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
    state : {
        src: '',
        config: '',
        params: [],
        width: 300,
        height: 300,
        fps: 20,
        configJson: {},
    },
    actions : {

    },
    mutations : {
        SET_SRC(state, src) {
            state.src = src
        },
        SET_CONFIG(state, config) {
            state.config = config
        },
        SET_CONFIG_JSON(state, config) {
            state.configJson = config
        },
        SET_PARAMS(state, params){
            state.params = params
        }
    },
    getters : {
        src : state => state.src,
        config : state => state.config,
        configJson : state => state.configJson || {},
        params : state => state.params || [],
        width : state => state.width,
        height:state => state.height,
        fps : state => state.fps,
    }
})

export default store
