<template>
	<div class="subscribe">
		<mu-appbar class='title' title='发布话题'></mu-appbar>
		<main>
			<mu-select-field class='text' v-model='list' :labelFocusClass="['label-foucs']" label="选择板块">
				<mu-menu-item v-for="text,index in lists" :key='index' :value='index' :title='text'/>
			</mu-select-field>
			<mu-text-field class='text' primary v-model="title" label='标题' hintText='标题字数，10字以上' />
			<mu-text-field class='text content' v-model='content' primary hintText="输入文本，支持markdown格式" multiLine :row='5' :underlineShow="false" />
			<mu-raised-button @click="setData" label="发布话题" class="demo-raised-button" icon="near_me" primary/>
		</main>
		<mu-dialog :open='!accesstoken'>
			请先登陆
			<mu-flat-button slot='actions' to='/' label='取消'/>
			<mu-flat-button slot='actions' to='login' label='确定'/>
		</mu-dialog>
		<mu-dialog :open='publish' title='提示:'>
			{{tips}}
			<mu-flat-button slot='actions' primary @click='close' label='确定' />
		</mu-dialog>
		<bottomNavigation></bottomNavigation>
	</div>
</template>
<script>
	import bottomNavigation from './public/bottomNavigation.vue'
	import axios from 'axios'
	import marked from 'marked'
	export default{
		components:{
			bottomNavigation
		},
		data(){
			return{
				accesstoken:'',
				list:0,
				lists:['分享','问答','招聘'],
				title:'',
				content:'',
				tips:'请输入正确的格式',
				publish:false,
				tab:''
			}
		},
		created(){
			this.accesstoken=localStorage.getItem('accesstoken');
		},
		methods:{
			close(){
				this.publish=false;
			},
			setData(){
				let _this=this;
				if(this.list===0){
					this.tab='share'
				}
				if(this.list===1){
					this.tab='ask'
				}
				if(this.list===2){
					this.tab='job'
				}
				this.content=marked(this.content);
				axios.post('https://www.vue-js.com/api/v1/topics',{
					accesstoken:_this.accesstoken,
					title: _this.title,
					tab: _this.tab,
					content: _this.content
				}).then(function(response){
					console.log(response)
					_this.title='';
					_this.content='';
					_this.tab='';
					setTimeout(function(){
						_this.tips='发布成功';
						_this.publish=true;
					},1000)
					
				})
				.catch(function(){
					_this.publish=true;
				})
			}
		}
	}
</script>
<style scoped>
	.subscribe{
		display: flex;
		flex-direction: column; 
	}
	.title{
		text-align: center;
		height: 5rem;
	}
	main{
		flex:1;
		margin: 5rem 0;
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}
	.text{
		width: 100%;
	}
	.content{
		flex:1;
		background-color: #f7f7f7;
		padding: 1rem;
		overflow-y: auto;
		height: 10rem;
		width: 100%;
	}
	textarea{
		height: 10rem;
	}
</style>
