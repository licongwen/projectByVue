<template>
	<div class="subscribe">
		<mu-appbar class='title' title='发布'></mu-appbar>
		<bottomNavigation class='bottom'></bottomNavigation>
	</div>
</template>
<script>
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
