import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    signUpStep: 0,      //注册步骤：1-注册账号，2-选择类型，3-填写资料
    signUpInfo: {},     //注册临时保存用户数据
    userInfo: {},       //用户数据
    imgTypes: [{categoryName: "全部图片", createTime: null, iconNum: 0, id: null, officiaUserId: null}]        //图片分组数据
  },

  mutations: {
    setSignUpStep(state, data) {
      state.signUpStep = data
    },
    setSignUpInfo(state, data) {
      state.signUpInfo = data
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setImgTypes(state, data) {
      state.imgTypes = data
    },
  }
})

export default store