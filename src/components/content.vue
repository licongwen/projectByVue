<template>
	<div class="content">
		<mu-appbar class='title' :title='contentData.title'>
			<mu-icon-button @click='back' icon='arrow_back'  slot='left'/>
		</mu-appbar>
		<main class="main">
			<!-- 标题区 -->
			<header class="md_header">
				<h1>
					<span class="tag" v-if="contentData.top">置顶</span>
					<span class="tag" v-else-if='contentData.good'>精华</span>
					{{contentData.title}}
				</h1>
				<mu-checkbox v-if='accesstoken' v-model='collection' uncheckIcon='favorite_border' checkedIcon='favorite' :label="collection_txt" class='demo_checkbox' />
				<div class="label">
					<span>发布于 {{contentData.create_at | time}}</span>
					<span>作者 {{contentData.author.loginname}}</span>
					<span>{{contentData.visit_count}} 次浏览</span>
					<span>来自 {{contentData.tab | change}}</span>
				</div>
			</header>
			<!-- 内容区 -->
			<article class="md_content" v-html='contentData.content'></article>
			<!-- 评论区 -->
		</main>
	</div>
</template>
<script>
	import axios from 'axios'
	import timeago from 'timeago.js'
	 
	export default{
		data(){
			return{
				accesstoken:'',
				user_id:'',
				loginname:'',
				contentData:{
					author:{},
					replies:{}
				},
				collection_txt:'收藏主题',
				collection:false

			}
		},
		created(){
			this.accesstoken=localStorage.getItem('accesstoken');
			this.user_id=localStorage.getItem('user_id');
			this.loginname=localStorage.getItem('loginname');
			this.getData()
		},
		watch:{
			collection:function(newVal){
				if(newVal){
					this.collection_txt='取消收藏'
				}else{
					this.collection_txt='收藏主题'
				}
			}
		},
		filters:{
			time(val){
				let newVal=new Date(val);
				let thisVal=timeago();
				return thisVal.format(newVal,'zh_CN');
			},
			change:function(val){
				if(val==='share'){
					return	'分享'
				}
				if(val==='job'){
					return '招聘'
				}
				if(val == 'aks'){
					return '问答'
				}
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
				//this.$router.back();
			},
			getData(){
				let _this=this;
				let id=this.$route.query.id;
				let url='https://www.vue-js.com/api/v1/topic/'+id;
				axios.get(url).then(function(response){
					console.log(response.data.data);
					_this.contentData=response.data.data;
				})
			}
		}
	}
</script>
<style scoped>
	.content{
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow-scrolling:touch; 
	}
	.title{
		text-align: center;
		position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    z-index: 1;
	}
	.main{
		margin-top: 5rem;
	}
	
	.tag{
		background-color: #009688;
		color:#fff;
		padding:0.2rem 0.6rem;
		border-radius:0.2rem;
	}
	.demo_checkbox{
		font-size:20px;
		font-weight:700;
	}
	.md_header{
		padding: 1rem;
	}
	.md_header h1{
		font-weight: 700;
	}
	.md_header .label span:before{
		content:'•';
		padding:0 0.5rem;
	}
	.md_header .label span{
		font-size:14px;
		color: #838383;
		font-weight:400;
		padding:0 0.2rem;
	}
	/*内容区*/
	.md_content{
		padding: 1rem;
		border-top:1px solid #e5e5e5;
		margin-bottom: 2rem;
	}
	.md_content h1,
	.md_content h2,
	.md_content h3,
	.md_content h4,
	.md_content h5,
	.md_content h6{
		font-weight: 700;
	}
	.md_content p{
		font-size:15px;
		line-height: 1.7rem;
		overflow: auto;
	}
	.md_content h2{
		font-size:26px;
		margin:30px 0 15px;
		border-bottom: 1px solid #eee;
	}
	.md_content h3{
		margin: 30px 0 15px;
		border-bottom: 1px solid #eee;
		font-size:24.5px;
	}
	.md_content pre{
		font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
	    font-size: 14px;
	    border-radius: 0;
	    padding: 1rem;
	    border: 0;
	    margin: 1rem 0;
	    border-width: 1px 0;
	    background: #f7f7f7;
	}
	.md_content ul {
	    list-style-type: disc;
	    margin: 0 0 1rem 2rem;
	}

	.md_content ol {
	    list-style: decimal;
	    margin-left: 2em;
	}

	.md_content li {
	    line-height: 2.5rem;
	}

	.md_content a {
	    display: block;
	}

	.md_content img {
	    height: auto;
	    max-width: 100%;
	    vertical-align: middle;
	    border: 0;
	}
</style>