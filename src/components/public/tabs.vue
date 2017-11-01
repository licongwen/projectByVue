<template>
	<div ref='myElement' class="demo-infinite-container main">
		<mu-tabs class='tabs' :value='activeTab' @change="changeTab">
			<mu-tab value='all' title='全部'/>
			<mu-tab value='good' title='精华'/>
			<mu-tab value='weex' title='weex'/>
			<mu-tab value='share' title='分享'/>
			<mu-tab value='ask' title='问答'/>
			<mu-tab value='job' title='招聘'/>
		</mu-tabs>
		<mu-list>
			<template v-for="(item,index) in items">
				<section class="list">
					<router-link :to="{path:'/login'}" :src='item.author.avatar_url' tag='img' alt='user'>
					</router-link>
					<router-link :to="{path:'/login'}" tag='div' class='content'>
						<div class="list_title">
							<span v-if='item.top'>置顶</span>
							<span v-else-if='item.good'>精华</span>
							<span v-else-if="item.tab==='share'" :style="styleObj">分享</span>
							<span v-else-if="item.tab==='ask'" :style="styleObj">问答</span>
							<span v-else-if="item.tab==='job'" :style="styleObj">招聘</span>
							<h3>{{item.title}}</h3>
						</div>
						<div class="timer">
							<span>{{item.reply_count}}/{{item.visit_count}}</span>
							<span>{{item.last_reply_at | time}}</span>
						</div>
					</router-link>
				</section>
			</template>
			<p class="nomore" v-show='nomore'>没有更多了。。。</p>
		</mu-list>
		<section v-if="!items.length"> 
			暂无话题
		</section>
		<mu-infinite-scroll :scroller='scroller' :loading="loading" @load='loadMore'/>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				loading:false,
				scroller:null,
				nomore:false,
				activeTab:'all',
				items:[],
				url:'https://www.vue-js.com/api/v1/topics?tab=all',
				page:1,
				scrollValue:null,
				styleObj:{
					backgroundColor:'#999'
				}
			}
		},
		created(){
			this.getData()
		},
		mounted(){
			this.$refs.myElement.addEventListener('scroll',this.getScroll)
        	this.scroller = this.$el
		},
		update(){
			scrollValue = 200;
		},
		filters:{
			time:function(val){
				return new Date(val).toLocaleString();
			}
		},
		methods:{
			getScroll(){
				this.scrollValue=this.$refs.myElement.scrollTop;
				
			},
			loadMore(){
				if(!this.nomore){
					this.loading=true;					
					this.page+=1;
					let url = this.url+'&page='+this.page;
					let arr = [];
					setTimeout(()=>{
						let _this=this;
						axios.get(url).then(function(response){
							arr=response.data.data;
							if(arr.length === 0){
								_this.loading = false;
								_this.nomore = true;
								return
							}
							_this.items=[..._this.items,...arr];
							arr=[];
						})
						this.loading=false;
					},1000)
				}
			},
			changeTab(val){
				this.page=1;
				this.nomore=false;
				this.activeTab=val;
				this.url='https://www.vue-js.com/api/v1/topics?tab='+val;
				this.getData(this.url);
			},
			getData(){
				let _this=this;
				axios.get(_this.url)
				.then(function(response){
					console.log(response.data.data)
					_this.items=response.data.data;
				})
			}
		}
	}
</script>
<style scoped>
	.main{
		overflow: auto;
		border:1px solid #d9d9d9;
	}
	.tab .tabs{
		margin-top: 5rem;
		height: 4rem;
		position: fixed;
		left:0;
		right:0;
		top:0;
		border-top:1px solid rgba(255,255,255,.1);
		display: flex;
		justify-content: space-around;
	}
	.mu-tab-link,.mu-tab-active{
	    white-space: nowrap;
	}
	.list{
		display: flex;
		padding:1rem;
		border-bottom: 1px solid #999;
	}
	.list>img{
		width:4rem;
		height: 4rem;
		border-radius:50%;
		margin-right: 1rem;
	}
	.content{
		display: flex;
		flex:1;
		flex-direction: column;
		justify-content: space-around;
	}
	.list_title>span{
		background-color:#009688;
		color:#fff;
		padding: 0.2rem;
		border-radius: 0.2rem;
	}
	.list_title>h3{
		display: inline;
		font-weight: 700;
	}
	.timer{
		display: flex;
		justify-content: space-around;
		color:#999;
	}
</style>