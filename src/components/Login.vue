<template>
  <div class="login-box">
    <mu-appbar class="title" title="登录"></mu-appbar>
    <main>
    	<mu-text-field v-model="value" label="Access Token" :errorText="error" labelFloat/>
    	<mu-raised-button @click="login" label="登录" class="demo-raised-button" primary/>
    </main> 
    <bottomNavigation class='bottom'></bottomNavigation>
  </div>
</template>

<script>
	import axios from 'axios'
	import bottomNavigation from './public/bottomNavigation'
	export default{
		components:{
			bottomNavigation
		},
		data(){
			return {
				value:'',
				error:''
			}
		},
		methods:{
			login(){
				// 'Access Token: 55b176a9-8a6a-4b0b-b13c-1c04e9db5d1a'
				let _this=this;
				axios.post('https://www.vue-js.com/api/v1/accesstoken',{accesstoken:_this.value})
				.then(function(response){
					//console.log(response);
					localStorage.setItem('accesstoken',_this.value);
					localStorage.setItem('user_id',response.data.id);
					localStorage.setItem('loginname',response.data.loginname);
					_this.$router.push({
						path:'/personal'
					})
				})
				.catch(function(error){
					console.log(error)
					_this.error="输入错误，请重新输入"
				})
			}
		}	
	}
</script>
<style scoped>
	.login-box{
		display: flex;
		flex-direction: column;
	}
	.title{
		text-align:center;
		height: 5rem;
	}
	main{
		flex: 1;
		margin: 5rem 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.demo-raised-button{
		margin-top: 2rem;
		width:100%;
	}
</style>