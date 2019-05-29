import Vue from 'vue'
import lazyload from 'vue-lazyload'

Vue.use(lazyload, {
  error: require('../src/assets/images/loading2.jpeg'),
  loading: require('../src/assets/images/loading2.jpeg')
})
