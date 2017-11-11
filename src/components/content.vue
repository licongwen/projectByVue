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
			<ul v-if='contentData.replies.length' class="replies"> 
				<li>{{contentData.replies.length}}条回复</li>
				<li class="reply" v-for='(list,index) of contentData.replies' :key='list.id'>
					<section class="msg">
						<div class="author">
							<router-link :to="{path:'/login'}" :src='list.author.avatar_url' tag="img" alt="user"></router-link>
								<span class='name'>{{list.author.loginname}}</span>
								<span class="timer">{{index+1}}楼•{{list.create_at | time}}</span>
						</div>
						<!-- 未登录状态下点赞 -->
						<div @click="open" v-if="list.ups.length && !accesstoken" class="ups">
							<mu-icon value="thumb_up" :size="16"/>
							<span>{{list.ups.length}}</span>
						</div>
						<!-- 登录状态下点赞 -->
						<div @click="open" v-if="accesstoken" class="ups">
							<mu-icon value="thumb_up" :size="16" @click="like(index)"/>
							<span>{{list.ups.length}}</span>
							<mu-icon class="textsms" value="textsms" :size='16' @click="changeReply(index)"/>
						</div>
					</section>
					<p v-html="list.content"></p>
					<div v-if="accesstoken" class="reply_show" v-show="list.reply_show">
						<textarea v-model="single_reply" class="reply" placeholder="请输入内容..." rows="5"></textarea>
						<mu-raised-button label="回复" class="demo-raised-button" primary @click="single_reply_content(index)"/>
						<mu-raised-button  label="取消" class="demo-raised-button" @click="exit_single_reply_content(index)"  primary/>
					</div>
				</li>
			</ul>
			<ul v-if="accesstoken" class="replies">
				<li>添加回复</li>
				<li>
					<textarea v-model="reply" class="reply" placeholder="请输入回复内容..." rows="5"></textarea>
					<mu-raised-button label="回复" class="demo-raised-button" primary/>
				</li>
			</ul>
		</main>
		<!-- 弹出提示框 -->
		<mu-dialog v-if="!accesstoken" :open="dialog" title="友情提示:" @close="close">
			请先登录，登陆后即可点赞。
			<mu-flat-button slot="actions" @click="close" primary label="取消" />
			<mu-flat-button to="/login" slot="actions" @click="close" primary label="确定" />
		</mu-dialog>
		<mu-dialog v-if="accesstoken" :open='isReply' title="提示：" @click="close">
			{{tips}}
			<mu-flat-button slot="actions" @click="close" primary label="确定"/>
		</mu-dialog>
	</div>
</template>
<script>
	import axios from 'axios'
	import timeago from 'timeago.js'
	import Vue from 'vue'
	 
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
				collection:false,
				single_reply:'',
				reply:'',
				dialog:false,
				isReply:false,
				tips:''

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
			},
			open(){
				this.dialog=true;
			},
			close(){
				this.dialog=false;
			},
			like(index){
				let _this=this;
				let reply_id=_this.contentData.replies[index].id;
				axios.post('https://www.vue-js.com/api/v1/reply/' + reply_id + '/ups',{accesstoken:_this.accesstoken})
				.then(function(response){
					_this.getData();
				})	
			},
			changeReply(index) {
                //点击对评论进行回复
                let arr = this.contentData.replies;
                arr.map(function(item, i) {
                    index === i ? Vue.set(item, 'reply_show', true) : Vue.set(item, 'reply_show', false)
                })

                this.single_reply = '@' + this.contentData.replies[index].author.loginname + ' '
            },
            exit_single_reply_content(index){
            	this.single_reply='';
            	let arr = this.contentData.replies;
            	arr[index].reply_show=false;
            	Vue.set(arr,index,arr[index])
            },
            single_reply_content(index){
            	let id = this.$route.query.id;
            	let _this=this;
            	axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies',{
            		accesstoken:_this.accesstoken,
            		content:_this.single_reply,
            		reply_id:_this.contentData.replies[index].id
            	})
            	.then(function(response){
            		_this.tips='回复成功!';
            		_this.isReply=true;
            		setTimeout(function(){
            			_this.isReply=false;
            		},1500)
            		_this.getData();
            		_this.single_reply=''
            	})
            	.catch(function(error) {
                    that.tips = '请输入回复内容...'
                    that.isReply = true
                    setTimeout(function() {
                        that.isReply = false
                    }, 1500)
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
	/*评论区*/
	.replies{

	}
	.replies>li{
		padding: 1rem;
	}
	.replies>li:first-child{
		background:#f6f6f6;
	}
	.reply{
		border-top: 1px solid #f0f0f0;
	}
	.reply>.msg{
		display:flex;
		justify-content: space-between;
		padding-bottom: 1rem;
	}
	.reply>p{
		margin-bottom:2rem;
	}
	.author>img{
		width:3rem;
		height:3rem;
		vertical-align:top;
	}
	.author>.name{
		color:#666;
		font-weight:700;
	}
	.author>.timer{
		color:#08c;
	}
	.msg>.ups{
		display:flex;
		align-items: center;
		color: #009688;
	}
	.ups>span{
		margin-left: 0.5rem;
	}
	.reply{
		width:100%;
	}
	.textsms{
		margin-left: 1rem;
		color:#009688;
	}
	.reply_show{
		animation: reply_show 1s ease;
	}
	@keyframes reply_show{
		0%{
			opacity:0;
		}
		100%{
			opacity:1;
		}
	}
</style>