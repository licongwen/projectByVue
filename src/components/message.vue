<template>
	<div class="message">
		<mu-appbar class='title'  title='消息中心'></mu-appbar>
		<main>
			<mu-tabs class='activeTab' :value='activeTabValue' @change='tabChange'>
				<mu-tab value='notread' title='未读消息'></mu-tab>
				<mu-tab value='read' title='已读消息'></mu-tab>
				<span v-if='count'>{{count}}</span>
			</mu-tabs>
			<!-- 未读消息 -->
			<ul class="lists" v-if='accesstoken' v-show="activeTabValue==='notread'">
				<router-link class='list' :to="{path:'/personal'}" tag='li' v-for='item in hasnot_read_messages' :key='item.id'>
					<div class="user">
						<p>123</p>
						<img :src='item.author.avatar_url' alt='user'/>
						<span>{{item.author.loginname}}</span>
					</div>
					<div class="content">
						<h2 v-if='item.reply.content' v-html='markdownChange(item.reply.content)'></h2>
						<h2 v-if='!item.reply.content'>此内容已被作者删除</h2>
						<p>来自：《{{item.topic.title}}》</p>
					</div>
					<div class="timer" v-if='item.reply.content'>
						<span>{{item.reply.create_at | time}}</span>
					</div>
				</router-link>
				<li v-if='!hasnot_read_messages.length'>暂无未读消息</li>
			</ul>
			<!-- 已读消息 -->
			<ul class="lists" v-if='accesstoken' v-show="activeTabValue==='read'">
				<router-link class='list' :to="{path:'/personal'}" tag='li' v-for='item in has_read_messages' :key='item.id'>
					<div class="user">
						<img :src='item.author.avatar_url' alt='user'/>
						<span>{{item.author.loginname}}</span>
					</div>
					<div class="content">
						<h2 v-if='item.reply.content' v-html='markdownChange(item.reply.content)'></h2>
						<h2 v-if='!item.reply.content'>此内容已被作者删除</h2>
						<p>来自：《{{item.topic.title}}》</p>
					</div>
					<div class="timer" v-if='item.reply.content'>
						<span>{{item.reply.create_at | time}}</span>
					</div>
				</router-link>
				<li v-if='!has_read_messages.length'>没有消息</li>
			</ul>
			<p class="tips" v-if='!accesstoken'>请先登录。去登陆:</p>
			<mu-raised-button v-if='count' label="全部标记为已读" class="login-button" v-show="activeTabValue==='notread' " icon="done_all" @click="markAll" primary/>
		</main>
		<bottomNavigation class='bottom'></bottomNavigation>
	</div>
</template>
<script type="text/javascript">
	import bottomNavigation from './public/bottomNavigation'
	import axios from 'axios'
	import marked from 'marked'
	export default{
		components:{
			bottomNavigation
		},
		data(){
			return{
				activeTabValue:'notread',
				accesstoken:'',
				hasnot_read_messages: [],
            	has_read_messages: [],
            	count:null
			}
		},
		filters:{
			time:function(val){
				return new Date(val).toLocaleString();
			}
		},
		created(){
			this.accesstoken=localStorage.getItem('accesstoken');
			if(this.accesstoken){
				this.getMessage();
			}
		},
		methods:{
			tabChange(val){
				this.activeTabValue=val;
			},
			getMessage(){
				let _this=this;
				//let url='https://www.vue-js.com/api/v1/messages?accesstoken=' + this.accesstoken;
				axios.get('https://www.vue-js.com/api/v1/messages?accesstoken=' + _this.accesstoken)
				.then(function(response){
					console.log(response.data.data.has_read_messages);
					_this.has_read_messages=response.data.data.has_read_messages;
				})
				axios.get('https://www.vue-js.com/api/v1/message/count?accesstoken='+_this.accesstoken)
				.then(function(response){
					console.log(response.data.data);
					_this.count=response.data.data;
				})
			},
			markdownChange(val){
				return marked(val)
			},
			markAll(){
				let _this=this;
				axios.post('https://www.vue-js.com/api/v1/message/mark_all',{accesstoken:_this.accesstoken})
				.then(function(response){
					console.log(response);
					_this.getMessage();
				})
			}
		}
	}
</script>
<style scoped>
	.message{
		display: flex;
		flex-direction: column;
	}
	.title{
		text-align: center;
		height: 5rem;
	}
	main{
		/*margin: 5rem 0;*/
		display: flex;
		flex:1;
		flex-direction: column;
	}
	.activeTab{
		position: relative;
		border-top:1px solid rgba(255,255,255,.1);
	}
	.lists{
		flex:1;
		padding:1rem;
		overflow-y: auto;
	}
	.list{
		display: flex;
		justify-content: space-between;
		background-color: #f8f8f8 ;
		padding:1rem;
		margin-bottom:1rem;
	}
	.user{
		display: flex;
		flex-direction:column;
		align-items:center;
		width:6rem;
	}
	.user>img{
		height: 4rem;
		width:4rem;
		border-radius:50%;
	}
	.content{
		display:flex;
		flex:1;
		flex-direction:column;
		justify-content: space-around;
	}
	.content>h2{
		font-weight:700;
		font-size:16px;
	}
	.content>p{
		color:#999;
		font-size:12px;
	}
	.timer{
		margin-left:1rem;
		width:5rem;
		display:flex;
		align-items: center;
		justify-content: flex-end;
	}
	.login-button{
		margin-top: 5px;
	}
	.tips{
		padding: 1rem;
	}
</style>