
import Valid from './validate'
import Axios from './axios'
import Store from './store'
// import Md5 from 'js-md5'

export default {
  install(Vue, options) {

    /*  validate  */
    Vue.prototype.$valid = Valid

    /*  axios  */
    Vue.prototype.$axios = Axios

    /*  axios  */
    Vue.prototype.$store = Store

    /*  md5  */
    // Vue.prototype.$md5 = Md5

    /*  funs  */
    Vue.prototype.$funs = {

      //处理地址或hash中间显示为*号
      //hLen头部长度 - Number
      //fLen尾部长度 - Number
      cutString(str, hLen, fLen) {
        let head = str.slice(0, hLen)
        let body = '****'
        let foot = str.slice(-1 * fLen)
        return head + body + foot
      },

      //时间戳转换成标准格式
      // getTime(timestamp) {
      //   if(!timestamp || isNaN(timestamp)) {
      //     return new Error('时间戳格式错误')
      //   }

      //   timestamp = String(timestamp)
      //   if(timestamp.length === 10) {
      //       timestamp = timestamp * 1000
      //   } else {
      //       timestamp = Number(timestamp)
      //   }

      //   let date = timestamp ? new Date(timestamp) : new Date()

      //   let y = date.getFullYear()
      //   let m = date.getMonth() + 1 //月份是0~11，要加1为当前月
      //   let d = date.getDate()
      //   let h = date.getHours()
      //   let min = date.getMinutes()
      //   let s = date.getSeconds()
        
      //   m = (m >= 1 && m <= 9) ? ("0" + m) : m
      //   d = (d >= 1 && d <= 9) ? ("0" + d) : d
      //   h = (h >= 0 && h <= 9) ? ("0" + h) : h
      //   min = (min >= 0 && min <= 9) ? ("0" + min) : min
      //   s = (s >= 0 && s <= 9) ? ("0" + s) : s

      //   return `${y}-${m}-${d} ${h}:${min}:${s}`
      // },
      getTime(timestamp) {
        let date = timestamp ? new Date(timestamp) : new Date()

        let y = date.getFullYear()
        let m = date.getMonth() + 1 //月份是0~11，要加1为当前月
        let d = date.getDate()
        let h = date.getHours()
        let min = date.getMinutes()
        let s = date.getSeconds()
        
        m = (m >= 1 && m <= 9) ? ("0" + m) : m
        d = (d >= 1 && d <= 9) ? ("0" + d) : d
        h = (h >= 0 && h <= 9) ? ("0" + h) : h
        min = (min >= 0 && min <= 9) ? ("0" + min) : min
        s = (s >= 0 && s <= 9) ? ("0" + s) : s

        return `${y}-${m}-${d} ${h}:${min}:${s}`
      },

      // 转换视频时长
      getVideoTime(time) {
        let m = parseInt(time / 60)
        m = (m <= 9) ? ("0" + m) : m
        let s = parseInt((time % 60))
        s = (s <= 9) ? ("0" + s) : s
        return m + ':' + s
      },

      //动态设置表格高度
      setTableHeight(e, offset) {
        if(e)
        return e.$el.parentNode.clientHeight - offset
      },

      //设置\获取page size
      // setPageSize(val) {
      //   localStorage.setItem('pageSize', val)
      //   Store.commit('setPageSize', val)
      // },
      // getPageSize() {
      //   let val = localStorage.getItem('pageSize')
      //   val && Store.commit('setPageSize', Number(val))
      // },

      // 获取图片分组
      async getImgTypes() {
        setTimeout( async () => {
          let res = await Axios.getImgTypes({officiaUserId: Store.state.userInfo.id})
          if(res.code === 0) {
            Store.commit('setImgTypes', res.data)
            return true
          }
        }, 2000)
      },

    }
  }
}
