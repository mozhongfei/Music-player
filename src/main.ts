import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import FastClick from 'fastclick'
FastClick.prototype.focus = (targetElement: any) => {
  let length
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month"
  ) {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  }
}

FastClick.attach(document.body)

import 'vant/lib/index.css';
import { Slider , Search, Badge, Swipe, SwipeItem, Lazyload, Icon, Tabbar, TabbarItem, Circle, Popup, Button, NavBar, Switch, Form, Field, NumberKeyboard   } from 'vant';

Vue.use(Search);
Vue.use(Badge);
Vue.use(Slider);
Vue.use(Swipe);
Vue.use(Popup);
Vue.use(NavBar);
Vue.use(SwipeItem);
Vue.use(Circle);
Vue.use(NumberKeyboard);
Vue.use(Switch);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Lazyload,{
  loading: require('./assets/img/home/jia.gif'),
  preload: 1.3,
});
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);

// 注册全局事件总线
Vue.prototype.$bus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
