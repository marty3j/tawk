import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Articles from './components/Articles.vue'
import Categories from './components/Categories.vue'


Vue.component('categorylist', Categories)
Vue.component('articleslist', Articles)


new Vue({
	el: '#app',

	render: h => h(App)
});