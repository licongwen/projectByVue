<template>
	<div class="home">
		<mu-appbar class='title' title='Vue.js中文社区'></mu-appbar>

		<bottomNavigation class='bottom'></bottomNavigation>
	</div>
</template>
<script type="text/javascript">
	import bottomNavigation from './public/bottomNavigation.vue'
	export default{
		components:{
			bottomNavigation
		}
	}
</script>
<style>
	.title{
		text-align: center;
	}
	
</style>