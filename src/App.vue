<template>
	<div>
		<tawk-header></tawk-header>
		<!-- <router-view/> -->
		<h1>changes from new branch</h1>
	</div>
</template>

<script>
import Header from './components/Header.vue'

export default {
	components:{
		'tawk-header': Header
	}
}
</script>

<style lang="scss" scoped>
	@import 'scss/main.scss';
</style>