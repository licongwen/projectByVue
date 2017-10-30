<template>
	<div class="message">
		<mu-appbar class='title'  title='消息'></mu-appbar>
		<main>
			<mu-tabs :value='activeTabValue' @change='tabChange'>
				<mu-tab value='notred' title='未读消息'></mu-tab>
				<mu-tab value='red' title='已读消息'></mu-tab>
			</mu-tabs>
		</main>
		<bottomNavigation class='bottom'></bottomNavigation>
	</div>
</template>
<script type="text/javascript">
	import bottomNavigation from './public/bottomNavigation'
	export default{
		components:{
			bottomNavigation
		},
		data(){
			return{
				activeTabValue:'notred'
			}
		},
		watch:{
			'$scope':'this.tabChange()'
		},
		methods:{
			tabChange(val){
				let _this=this;
				_this.activeTabValue=val;
			}
		}
	}
</script>
<style scoped>
	.title{
		text-align: center;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		width:100%;
	}
</style>