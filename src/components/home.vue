<!-- <template>
	<div class="wrapper">
		<isHeader class='header'></isHeader>
		<tabs class='tab'></tabs>
		<bottomNavigation></bottomNavigation>
	</div>
</template> -->
<template>
    <div class="wrapper">
        <isHeader class="header"></isHeader>
        <!-- <keep-alive> -->
        <tabs class="tab"></tabs>
        <!-- </keep-alive> -->
        <bottomNavigation></bottomNavigation>
    </div>
</template>
<script type="text/javascript">
	import bottomNavigation from './public/bottomNavigation.vue'
	import isHeader from './public/header.vue'
	import tabs from './public/tabs.vue'
	export default{
		components:{
			bottomNavigation,
			isHeader,
			tabs
		}
	}
</script>
<style scoped>
	.wrapper{
		display: flex;
		flex-direction: column;
		/*height: 100vh;*/
	}
	.header{
		position: fixed;		
		top: 0;
	    left: 0;
	    right: 0;
	    z-index: 1;
	}
	.tab{
		flex: 1;
    	margin: 9rem 0 5rem 0;
	}
	
</style>