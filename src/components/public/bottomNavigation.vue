<template>
	<mu-paper>
		<mu-bottom-nav :value='bottomnav' @change='changeVal'>
			<mu-bottom-nav-item to='/home' value='首页' title='首页' icon='home' />
			<mu-bottom-nav-item to='/subscribe' value='发布' title='发布' icon='subject' />
			<mu-bottom-nav-item to='/message' value='消息' title='消息' icon='message' />
			<mu-bottom-nav-item :to='mytab' value='我的' title='我的' icon='person'/>
		</mu-bottom-nav>
	</mu-paper>
</template>

<script>
	export default {
		data(){
			return{
				bottomnav:'首页',
				mytab:'/login'
			}
		},
		created(){
			this.changeRouter();
		},
		watch:{
			'$route':'changeRouter'
		},
		methods:{			
			changeVal(val){
				this.bottomnav=val
			},
			changeRouter(){
				let _this=this;
				let accessKey=localStorage.getItem('accesstoken');
				if(accessKey){
					_this.mytab='/personal';
				}else{
					_this.mytab='/login';
				}
			}
		}
	}
</script>