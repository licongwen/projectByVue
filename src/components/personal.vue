<template>
	<div class="personal">
		<mu-appbar class="title" title="个人中心">
		</mu-appbar>
		<main>
			<img :src="user.avatar_url"/>
			<span class="name">{{userData.loginname}}</span>
			<div class="timer">
				<span>积分：{{userData.score}}</span>
				<span>注册时间：{{userData.create_at | datatime}}</span>
			</div>
			<section class="content">
				<mu-list>
					<mu-list-item class="list" title="最近主题" v-if="userData.recent_topics" :open='false'  toggleNested>
						<mu-icon class="icon" slot="left" value="insert_drive_file"/>
						<mu-list-item v-for="item in userData.recent_topics" :title="item.title" :key='item.id' slot="nested">
							<mu-icon class="icon" slot="left" value="description"/>
						</mu-list-item>
						<span class="count">{{userData.recent_topics.length}}个</span>
					</mu-list-item>
					<mu-list-item title="最近回复" v-if='userData.recent_replies' :open='false' class="list" toggleNested>
						<mu-icon class="icon" slot="left" value="drafts"/>
						<mu-list-item v-for='item in userData.recent_replies' :key='item.id' :title='item.title' slot="nested">
							<mu-icon class="icon" slot="left" value="description"/>
						</mu-list-item>
						<span class="count">{{userData.recent_replies.length}}个</span>
					</mu-list-item>
					<mu-list-item title="收藏主题" v-if='userData.collect_topics' :open='false' class="list" toggleNested>
						<mu-icon class="icon" slot="left" value="folder"/>
						<mu-list-item v-for='item in userData.collect_topics' :key='item.id' :title='item.title' slot="nested">
							<mu-icon class="icon" slot="left" value="folder_open"/>
						</mu-list-item>
						<span class="count">{{userData.collect_topics.length}}个</span>
					</mu-list-item>
				</mu-list>
			</section>
			<mu-raised-button @click="logout" class="demo-raised-button" label="退出登录" icon="power_settings_new"/>
		</main>
		<bottomNavigation class='bottom'></bottomNavigation>
	</div>
</template>
<script>
	import axios from 'axios'
	import bottomNavigation from './public/bottomNavigation.vue'
	export default({
		components:{
			bottomNavigation
		},
		data(){
			return{
				accesstoken:'',
				user:{},
				userData:{}
			}
		},
		created(){
			let _this=this;
			_this.accesstoken=localStorage.getItem('accesstoken');
			_this.getData();
		},
		filters:{
			datatime:function(val){
				let time=new Date(val);
				return time.toLocaleString()
			}
		},
		methods:{
			getData(){
				let _this=this;
				axios.post('https://www.vue-js.com/api/v1/accesstoken',{accesstoken:_this.accesstoken})
				.then(function(response){
					console.log(response.data);
					_this.user=response.data;
					_this.getUserData();
				})
			},
			getUserData(){
				let _this=this;
				axios.get('https://www.vue-js.com/api/v1/user/'+_this.user.loginname)
				.then(function(response){
					console.log(response.data);
					_this.userData=response.data.data;
				})
				.catch(function(req){
					console.log(req)
				})
			},
			logout(){
				let _this=this;
				localStorage.removeItem('accesstoken');
				localStorage.removeItem('loginname');
				localStorage.removeItem('user_id');
				_this.$router.push({
					path:'/login'
				})
			}
		}
	})
</script>

<style scoped>
	.personal{
		display: flex;
		flex-direction: column;
		background-color: #f8f8f8;
	}
	.title {
	    text-align: center;
	    height: 5rem;
	}

	main {
	    flex: 1;
	    margin: 5rem 0;
	   	
	    display: flex;
	    flex-direction: column;
	    /*justify-content: center;*/
	    align-items: center;
	    padding: 1rem;
	    background-color: #f8f8f8;
	}

	.demo-raised-button {
	    width: 100%;
	    background: #009688;
	    color:#f8f8f8;
	}

	main>img {
	    width: 8rem;
	    height: 8rem;
	    border-radius: 50%;
	    margin: 1rem 0;
	}

	.name {
	    color: #009688;
	    font-weight: 700;
	    font-size: 24px;
	}

	.timer {
	    display: flex;
	    justify-content: space-around;
	    width: 100%;
	    margin: 1rem 0;
	}

	.content {
	    flex: 1;
	    width: 100%;
	    height:180px;
	    overflow-y: auto;
	    margin-bottom: 1rem;
	}

	.mu-list {
	    padding: 0;
	}

	.list:first-child {
	    border-top: 1px solid #009688;
	}

	.count {
	    background-color: #009688;
	    color: #fff;
	    padding: 0.1rem 0.6rem;
	    border-radius: 0.2rem;
	    margin-top: 2rem;
	}

	.icon {
	    color: #009688;
	}
</style>