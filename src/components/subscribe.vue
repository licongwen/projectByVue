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
	.subscribr{
		display: flex;
		flex-direction: column; 
	}
	.title{
		text-align: center;
		height: 5rem;
	}
</style>
