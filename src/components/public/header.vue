<template>
	<div class="hello">
		<mu-appbar class='title' title='Vue.js中文社区'>
			<mu-icon-button slot='left'>
				<img class="logo" src="https://www.vue-js.com/public/images/vue.png"/>
			</mu-icon-button>
			<mu-icon-menu slot="right" icon="more_vert" :value='theme' >
				<mu-menu-item title='LIGHT' value='teal'/> 
				<mu-menu-item title='CARBON' value='teal'/>
				<mu-menu-item title='TEAL' value='teal'/> 
			</mu-icon-menu>
		</mu-appbar>
	</div>
</template>
<script>
	import axios from 'axios'
	// import light from '!raw-loader!muse-ui/dist/theme-default.css'
	// import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
	// import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
	export default{
		data(){
			return {
				theme:'teal'
			}
		},
		methods:{
			changeTheme(theme){

			}
		}
	}
</script>
<style scoped>
	.title{
		text-align: center;
		height: 5rem;
	}
	.mu-icon-button{
		padding:0.4rem;
	}
</style>